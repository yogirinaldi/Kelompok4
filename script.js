const employeesList = document.getElementById('employeesList')
const alertMessage = document.getElementById('alertMessage');
const prevEmployee = document.getElementById('previewEmployee');
const editEmployee = document.getElementById('editEmployee');

let employees = '';
let employeesArr = [];

let firstNameValue =  document.getElementById('firstName-add');
let lastNameValue = document.getElementById('lastName-add');
let emailValue = document.getElementById('email-add');
let addressValue = document.getElementById('address-add');
let phoneValue = document.getElementById('phone-add');


//GET ALL DATA
const renderData = (data) => {
    data.forEach((post) => {
        employees += `
            <tr id="${post._id}">   
                <td>
                  <div class="d-flex px-2 py-1">
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-xs"> ${post.firstName}</h6>
                    </div>
                  </div>
                  
                </td>
                <td>
                  <p class="text-xs font-weight-bold mb-0">${post.lastName}</p>
                </td>
                <td class="align-middle text-sm">
                  <p class="text-xs font-weight-bold mb-0">${post.email}</p>
                </td>
                <td class="align-middle">
                  <p class="text-xs font-weight-bold mb-0">${post.address}</p>
                </td>
                <td class="align-middle">
                  <p class="text-xs font-weight-bold mb-0">${post.phone}</p>
                </td>
                <td class="align-middle">
                  <a href="#" data-bs-toggle="modal" data-bs-target="#modal-preview"><i class="material-icons">visibility</i></a>
                  <a href="#" data-bs-toggle="modal" data-bs-target="#modal-edit"><i class="material-icons">edit</i></a>
                  <a href="#" data-bs-toggle="modal" data-bs-target="#modal-delete"><i class="material-icons">delete_forever</i></a>
                </td>
              </tr>`;
        
    });
    employeesList.innerHTML = employees;
};

fetch("https://untitled-etb861i34su6.runkit.sh/api/employees")
  .then((res) => res.json())
  .then((data) => {
    employeesArr = data;
    if (employeesArr.length > 0) {
      renderData(employeesArr);
    }
  });




// Create a new employee
// method: POST

function saveEmployee() {
    //console.log(firstNameValue.value);

    fetch('https://untitled-etb861i34su6.runkit.sh/api/employees/add', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            firstName: firstNameValue.value,
            lastName: lastNameValue.value,
            email: emailValue.value,
            address: addressValue.value,
            phone: phoneValue.value
        })
    })
    .then(res => res.json())
    .then(data => {
        renderData([data]);
        employeesArr.push(data);

        alertMessage.innerHTML = `
        <div class="alert alert-success text-white alert-dismissible fade show" role="alert">
          <span class="alert-icon"><i class="ni ni-like-2"></i></span>
          <span class="alert-text"><strong>Add!</strong> Employee added successfully!</span>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
        </div>`;
      alertDismiss();

    });

    // reset the form
    firstNameValue.value = '';
    lastNameValue.value = '';
    emailValue.value = '';
    addressValue.value = '';
    phoneValue.value = '';


      
}


let idEmployee = "";

employeesList.addEventListener('click', (e) => {
    e.preventDefault();
    idEmployee = e.target.parentElement.parentElement.parentElement.id;



    //GET DATA BY ID
    employeesArr.forEach((item)=>{
    if (item._id == idEmployee) {
      prevEmployee.innerHTML = `
                      <div class="row">
                        <div class="col"><p class="lead mb-0">First Name</p></div>
                        <div class="col"><p class="mb-0">${item.firstName}</p></div>
                      </div>

                      <div class="row">
                        <div class="col">
                          <p class="lead mb-0">Last Name</p>
                        </div>
                        <div class="col">
                          <p class="mb-0">${item.lastName}</p>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col">
                          <p class="lead mb-0">Email</p>
                        </div>
                        <div class="col">
                          <p class="mb-0">${item.email}</p>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col">
                          <p class="lead mb-0">Address</p>
                        </div>
                        <div class="col">
                          <p class="mb-0">${item.address}</p>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col">
                          <p class="lead mb-0">Phone</p>
                        </div>
                        <div class="col">
                          <p class="mb-0">${item.phone}</p>
                        </div>
                      </div>`;
                      
      editEmployee.innerHTML = `
                      <form>
                        <div class="row">
                          <div class="col">
                            <div class="input-group input-group-static mb-2">
                              <label>First Name</label>
                              <input type="text" value="${item.firstName}" class="form-control" id="first_name">
                            </div>
                          </div>
                          <div class="col">
                            <div class="input-group input-group-static mb-2">
                              <label>Last Name</label>
                              <input type="text" value="${item.lastName}" class="form-control mb-2">
                            </div>
                          </div>
                        </div>
                      
                        <div class="input-group input-group-static mb-2">
                          <label>Email</label>
                          <input type="email" value="${item.email}" class="form-control">
                        </div>
                        <div class="input-group input-group-static mb-2">
                          <label>Address</label>
                          <input type="address" value="${item.address}" class="form-control mb-2">
                        </div>
                        <div class="input-group input-group-static mb-2">
                          <label>Phone</label>
                          <input type="tel" value="${item.phone}" class="form-control">
                        </div>
                      </form>`;  

    
    }
  });
    

});


function deleteEmployee() {

    // Delete a student
    // method: DELETE
    fetch('https://untitled-etb861i34su6.runkit.sh/api/employees/' + idEmployee, {
            method: 'DELETE'
        })
        .then(() => {
          $(document).ready(function(){
            $("#"+idEmployee).remove();            
          });
          employeesArr.splice(employeesArr.findIndex((item)=> item._id === idEmployee),1);
          employees = "";

            if (employeesArr.length == 0) {
                employeesList.innerHTML = `
                <tr>
                  <td colspan="6">
                    <p class="lead text-center">Record is empty</p>
                  </td>                
                </tr>`;
              }else{
                renderData(employeesArr);
              }

        alertMessage.innerHTML = `
          <div class="alert alert-danger text-white alert-dismissible fade show" role="alert">
            <span class="alert-icon"><i class="ni ni-like-2"></i></span>
            <span class="alert-text"><strong>Delete!</strong> Employee deleted successfuly!</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;
        alertDismiss();
                   
        });
      

}

function alertDismiss(){
  window.setTimeout(function() {
    $(".alert").fadeTo(500, 0).slideUp(500, function(){
        $(this).remove(); 
    });
  }, 3500);
}

