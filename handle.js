let studentApi = "http://localhost:3000/students";

//start

function start() {
  getStudents(renderStudents);
  let createBtn = document.querySelector(".create-btn");
  createBtn.addEventListener("click", handleCreateStudent);
}

start();

//getStudents
function getStudents(callback) {
  fetch(studentApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

//renderStudents
function renderStudents(students) {
  let getStudentTable = document.querySelector(".student");

  const previousStudents = document.querySelectorAll(".student-record");

  if (previousStudents && previousStudents.length) {
    previousStudents.forEach((student) => {
      student.remove();
    });
  }

  let htmls = students.map(function (student) {
    return `
            <tr class="student-record student-${student.id}">
                <th><p class="student-record id-text">${student.studentId}</p></th>
                <th><p class="student-record name-text">${student.name}</p></th>
                <th><p class="student-record address-text">${student.address}</p></th>
                <th>
                <button onclick="handleDeleteStudent(${student.id})" class="js-btn remove-btn"><p style="font-size: 15px">REMOVE</p></button>
                <button onclick="handleEditStudent(${student.id})" class="js-btn edit-btn"><p style="font-size: 15px">EDIT</p></button>
                </th>
            </tr>
                    `;
  });
  getStudentTable.insertAdjacentHTML("afterend", htmls.join(""));
}

//create Student
function createStudent(data) {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(studentApi, options)
    .then(function (response) {
      response.json();
    })
    .then(function () {
      getStudents(renderStudents);
    });
}

//Handle create student
function handleCreateStudent() {
  let createBtn = document.querySelector(".create-btn");
  if (createBtn.innerText === "CREATE") {
    let studentId = document.querySelector('input[name="id"]').value;
    let name = document.querySelector('input[name="name"]').value;
    let address = document.querySelector('input[name="address"]').value;

    let formData = {
      studentId: studentId,
      name: name,
      address: address,
    };
    //push new student

    createStudent(formData, function () {
      getStudents(renderStudents);
      document.querySelector('input[name="id"]').value = "";
      document.querySelector('input[name="name"]').value = "";
      document.querySelector('input[name="address"]').value = ""
    });
  }
}

//Handle delete Student
function handleDeleteStudent(id) {
  let options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(studentApi + "/" + id, options)
    .then(function (response) {
      response.json();
    })
    .then(function () {
      let studentItem = document.querySelector(".student-" + id);
      if (studentItem) {
        studentItem.remove();
      }
    });
}

//edit student
function editStudent(data, id, callback) {
  let options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(studentApi + "/" + id, options)
    .then((response) => {
      return response.json();
    })
    .then(callback);
}

//handle edit student
function handleEditStudent(id) {
  let studentId = document
    .querySelector(".student-" + id)
    .querySelector(".id-text");
  let name = document
    .querySelector(".student-" + id)
    .querySelector(".name-text");
  let address = document
    .querySelector(".student-" + id)
    .querySelector(".address-text");

  document.querySelector('input[name="id"]').value = studentId.innerText;
  document.querySelector('input[name="name"]').value = name.innerText;
  document.querySelector('input[name="address"]').value = address.innerText;

  let saveBtn = document.querySelector(".create-btn");
  saveBtn.innerText = "SAVE";

  saveBtn.onclick = function () {
    let inputStudentId = document.querySelector('input[name="id"]').value;
    let inputName = document.querySelector('input[name="name"]').value;
    let inputAddress = document.querySelector('input[name="address"]').value;

    let formData = {
      studentId: inputStudentId,
      name: inputName,
      address: inputAddress,
    };
    //save new student information

    if (saveBtn.innerText === "SAVE") {
      editStudent(formData, id, function () {
        saveBtn.innerText = "CREATE";
        getStudents(renderStudents);

        document.querySelector('input[name="id"]').value = "";
        document.querySelector('input[name="name"]').value = "";
        document.querySelector('input[name="address"]').value = "";
      });
    }
  };
}
