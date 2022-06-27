const employeesList = document.getElementById('employeesList');
const alertMessage = document.getElementById('alertMessage');
const prevEmployee = document.getElementById('previewEmployee');
const formEmployee = document.getElementById('formEmployee');

let employeesHTML = '';
let employeesArr = [];


let firstNameValue;
let lastNameValue;
let emailValue;
let addressValue;
let phoneValue;


//GET ALL DATA
const renderData = (data) => {
    data.forEach((post) => {
        employeesHTML += `
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
                  <a href="#" data-bs-toggle="modal" data-bs-target="#modal-add-edit"><i class="material-icons">edit</i></a>
                  <a href="#" data-bs-toggle="modal" data-bs-target="#modal-delete"><i class="material-icons">delete_forever</i></a>
                </td>
              </tr>`;
        
    });
    employeesList.innerHTML = employeesHTML;
};

fetch("https://untitled-etb861i34su6.runkit.sh/api/employees")
  .then((res) => res.json())
  .then((data) => {
    employeesArr = data;
    if (employeesArr.length > 0) {
      renderData(employeesArr);
    }
  });




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

      //EDIT EMPLOYEE
      formEmployee.innerHTML = `
      <div class="modal-header">
                <h6 class="modal-title" id="modal-title">Edit</h6>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div class="modal-body">
                <form id="EditSubmit" onsubmit="return updateEmployee()">
                  <div class="row">
                    <div class="col">
                      <div class="input-group input-group-static mb-2">
                        <label>First Name</label>
                        <input type="text" class="form-control" id="firstName" value="${item.firstName}" required>
                      </div>
                    </div>
                    <div class="col">
                      <div class="input-group input-group-static mb-2">
                        <label>Last Name</label>
                        <input type="text" class="form-control mb-2" id="lastName" value="${item.lastName}" required>
                      </div>
                    </div>
                  </div>                  
                  
                  <div class="input-group input-group-static mb-2">
                    <label>Email</label>
                    <input type="email" class="form-control" id="email" value="${item.email}" required>
                  </div>
                  <div class="input-group input-group-static mb-2">
                    <label>Address</label>
                    <input type="address" class="form-control mb-2" id="address" value="${item.address}" required>
                  </div>
                  <div class="input-group input-group-static mb-2">
                    <label>Phone</label>
                    <input type="tel" class="form-control" id="phone" value="${item.phone}" pattern="[+]62[0-9]{11}" placeholder="+6281234567890" required>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="submit" form="EditSubmit" class="btn bg-gradient-primary" data-bs-dismiss="modal">Save</button>
                <button type="button" class="btn btn-link  ml-auto" data-bs-dismiss="modal">Close</button>
              </div>`;

    
    }
  });

  firstNameValue = document.getElementById('firstName');
  lastNameValue = document.getElementById('lastName');
  emailValue = document.getElementById('email');
  addressValue = document.getElementById('address');
  phoneValue = document.getElementById('phone');
    

});


function AddButton() {
  formEmployee.innerHTML = `
              <div class="modal-header">
                <h6 class="modal-title" id="modal-title">Add</h6>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div class="modal-body">
                <form id="AddSubmit" onsubmit="return saveEmployee()">
                  <div class="row">
                    <div class="col">
                      <div class="input-group input-group-static mb-2">
                        <label>First Name</label>
                        <input type="text" class="form-control" id="firstName" required>
                      </div>
                    </div>
                    <div class="col">
                      <div class="input-group input-group-static mb-2">
                        <label>Last Name</label>
                        <input type="text" class="form-control mb-2" id="lastName" required>
                      </div>
                    </div>
                  </div>                  
                  
                  <div class="input-group input-group-static mb-2">
                    <label>Email</label>
                    <input type="email" class="form-control" id="email" required>
                  </div>
                  <div class="input-group input-group-static mb-2">
                    <label>Address</label>
                    <input type="address" class="form-control mb-2" id="address" required>
                  </div>
                  <div class="input-group input-group-static mb-2">
                    <label>Phone</label>
                    <input type="tel" class="form-control" id="phone" pattern="[+]62[0-9]{11}" placeholder="+6281234567890" required>
                  </div>
                  
                </form>
              </div>
              <div class="modal-footer">
                <button type="submit" form="AddSubmit" class="btn bg-gradient-primary" data-bs-dismiss="modal">Save</button>
                <button type="button" class="btn btn-link  ml-auto" data-bs-dismiss="modal">Close</button>
              </div>`;

  firstNameValue = document.getElementById('firstName');
  lastNameValue = document.getElementById('lastName');
  emailValue = document.getElementById('email');
  addressValue = document.getElementById('address');
  phoneValue = document.getElementById('phone');
}




// Create a new employee
// method: POST

function saveEmployee() {
    //console.log("firstNameValue.value");

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
          <span class="alert-icon"><i class="material-icons align-middle">thumb_up</i></span>
          <span class="alert-text"><strong>Add!</strong> Employee added successfully!</span>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
        </div>`;
      alertDismiss();

    });

    return false;
      
}


function updateEmployee() {
  fetch('https://untitled-etb861i34su6.runkit.sh/api/employees/' + idEmployee, {
    method: 'PATCH',
    headers: {
        'Content-type': 'application/json',
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
    .then(() => {
      for (let i = 0; i < employeesArr.length; i++) {
        if (employeesArr[i]._id === idEmployee) {
          employeesArr[i].firstName = firstNameValue.value;
          employeesArr[i].lastName = lastNameValue.value;
          employeesArr[i].email = emailValue.value;
          employeesArr[i].address = addressValue.value;
          employeesArr[i].phone = phoneValue.value;          
        }
                
      }
      employeesHTML = '';
      renderData(employeesArr);


      alertMessage.innerHTML = `
      <div class="alert alert-info text-white alert-dismissible fade show" role="alert">
        <span class="alert-icon"><i class="material-icons align-middle">thumb_up</i></span>
        <span class="alert-text"><strong>Edit!</strong> Employee updated successfully!</span>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
      alertDismiss();

    });

    return false;

  
}




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

            if (employeesArr.length > 0) {
              employeesHTML = '';
              renderData(employeesArr);                
            }else{       
              employeesHTML = '';         
                employeesList.innerHTML = `
                <tr>
                  <td colspan="6">
                    <p class="lead text-center">Record is empty</p>
                  </td>
                </tr>`;
              }

        alertMessage.innerHTML = `
          <div class="alert alert-danger text-white alert-dismissible fade show" role="alert">
            <span class="alert-icon"><i class="material-icons align-middle">thumb_up</i></span>
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

