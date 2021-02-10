const url = "http://localhost:7070/api/crud/";

const dataRead = () => {
    fetch(url)
    .then(response => response.json())
    .then(response => {
        if (response.length > 0) {
            displayStudents(response)
        }
        else {
            loadDefaultData();
        }
    })
}

const loadDefaultData = () => {
    const data = [
        {
            "name": "Jan",
            "lastName": "Kowalski",
            "adress": "ul. Ładna 3/7",
            "phoneNumber": 600500300
        },
        {
            "name": "Andrzej",
            "lastName": "Nowak",
            "adress": "ul. Pogodna 1",
            "phoneNumber": 528645789
        },
        {
            "name": "Anna",
            "lastName": "Koczorowska",
            "adress": "ul. Bogumiła Morskiego 6",
            "phoneNumber": 601147895
        },
        {
            "name": "Witold",
            "lastName": "Kruk",
            "adress": "os. Zachodnie 124B/13",
            "phoneNumber": 866985223
        },
        {
            "name": "Marianna",
            "lastName": "Wnuk",
            "adress": "ul. Maltńska 122",
            "phoneNumber": 511200304
        }
    ]

    data.forEach(element => {
        fetch (url + "add_student/", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(element)
        })
    });

    setTimeout(() => window.location.reload(), 200);
}

const displayStudents = (data) => {
    const studentContainer = document.getElementById("student-container");

    const studentList = document.createElement("div");
    studentList.className = "student-list";

    studentList.innerHTML += `<div class="single-student single-student--header">
                                    <div class="single-student__id">ID</div>
                                    <div class="single-student__first-name">First name</div>
                                    <div class="single-student__last-name">Last name</div>
                                    <div class="single-student__address">Address</div>
                                    <div class="single-student__phone-number">Phone number</div>
                                    <div class="single-student__actions">Actions</div>
                                </div>`;
                                
    data.forEach(element => {
        studentList.innerHTML += `<div class="single-student" data-id=` + element.id + `>
                                        <div class="single-student__id">` + element.id + `</div>
                                        <div class="single-student__first-name">` + element.name + `</div>
                                        <div class="single-student__last-name">` + element.lastName + `</div>
                                        <div class="single-student__address">` + element.adress + `</div>
                                        <div class="single-student__phone-number">` + element.phoneNumber + `</div>
                                        <div class="single-student__actions">
                                            <button class="single-student__actions--edit" onclick="copyDataToForm(` + element.id + `);">edit</button>
                                            <button class="single-student__actions--delete" onclick="deleteStudent(` + element.id + `);">delete</button>
                                        </div>
                                    </div>`;

        
    });

    studentList.innerHTML += `<div id="student-actions" class="student-actions">
                                    <div class="student-actions__id">
                                        <input type="text" disabled id="input-id">
                                    </div>
                                    <div class="student-actions__first-name">
                                        <input type="text" id="input-firstName">
                                    </div>
                                    <div class="student-actions__last-name">
                                        <input type="text" id="input-lastName">
                                    </div>
                                    <div class="student-actions__address">
                                        <input type="text" id="input-address">
                                    </div>
                                    <div class="student-actions__phone-number">
                                        <input type="text" id="input-phoneNumber">
                                    </div>
                                    <div class="student-actions__buttons">
                                        <button class="student-actions__buttons--add" onclick="addStudent();">add</button>
                                        <button class="student-actions__buttons--edit disabled" onclick="editStudent();">edit</button>
                                    </div>
                                </div>`;

    studentContainer.appendChild(studentList);
}

const addStudent = () => {
    const dataContainer = document.querySelector("#student-actions");
    const firstName = dataContainer.querySelector("#input-firstName").value;
    const lastName = dataContainer.querySelector("#input-lastName").value;
    const address = dataContainer.querySelector("#input-address").value;
    const phoneNumber = dataContainer.querySelector("#input-phoneNumber").value;

    fetch (url + "add_student/", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: firstName, lastName: lastName, adress: address, phoneNumber: phoneNumber })
    })
    .then(response => { setTimeout(() => window.location.reload(), 200); })
}

const deleteStudent = (id) => {
    fetch (url + "delete_student/" + id, {
        method: "delete"
    })
    .then(response => response.json)
    .then(response => { setTimeout(() => window.location.reload(), 200); })
}

const copyDataToForm = (value) => {
    const selectedData = document.querySelector(".student-container").querySelector("[data-id=\"" + value + "\"]");

    const formContainer = document.querySelector("#student-actions");

    const id = formContainer.querySelector("#input-id");
    id.value = selectedData.querySelector(".single-student__id").innerText;
    
    const firstName = formContainer.querySelector("#input-firstName");
    firstName.value = selectedData.querySelector(".single-student__first-name").innerText;

    const lastName = formContainer.querySelector("#input-lastName");
    lastName.value = selectedData.querySelector(".single-student__last-name").innerText;

    const address = formContainer.querySelector("#input-address");
    address.value = selectedData.querySelector(".single-student__address").innerText;

    const phoneNumber = formContainer.querySelector("#input-phoneNumber");
    phoneNumber.value = selectedData.querySelector(".single-student__phone-number").innerText;

    const addButton = formContainer.querySelector(".student-actions__buttons--add");
    addButton.classList.add("disabled");
    const editButton = formContainer.querySelector(".student-actions__buttons--edit");
    editButton.classList.remove("disabled");
}

const editStudent = () => {
    const dataContainer = document.querySelector("#student-actions");
    const id = dataContainer.querySelector("#input-id").value;
    const firstName = dataContainer.querySelector("#input-firstName").value;
    const lastName = dataContainer.querySelector("#input-lastName").value;
    const address = dataContainer.querySelector("#input-address").value;
    const phoneNumber = dataContainer.querySelector("#input-phoneNumber").value;

    fetch (url + "edit_student/" + id, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: firstName, lastName: lastName, adress: address, phoneNumber: phoneNumber })
    })
    .then(response => { setTimeout(() => window.location.reload(), 200); })
}

document.addEventListener("DOMContentLoaded", function(event) {
    dataRead();
});