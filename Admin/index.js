document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('keyup', () => {
            const filter = searchInput.value.toLowerCase();
            const rows = document.querySelectorAll('.table tbody tr');
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(filter) ? '' : 'none';
            });
        });
    }

    const addBtn = document.getElementById('addNewProfileBtn') || 
                   document.getElementById('addNewCourseBtn') || 
                   document.getElementById('addNewContentBtn');

    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const tableBody = document.querySelector('.table tbody');
            const btnId = addBtn.id;
            let newRow = document.createElement('tr');

            if (btnId === 'addNewProfileBtn') {
                const id = prompt("Enter Student ID:");
                const fname = prompt("Enter First Name:");
                const lname = prompt("Enter Last Name:");
                const dob = prompt("Enter Date of Birth:");
                const major = prompt("Enter Major:");
                const addr = prompt("Enter Address:");
                
                if (id && fname) {
                    newRow.innerHTML = `<td>${id}</td><td>${fname}</td><td>${lname}</td><td>${dob}</td><td>${major}</td><td>${addr}</td>
                                        <td><button onclick="deleteRow(this)">Delete</button> <button onclick="editProfileRow(this)">Edit</button></td>`;
                    tableBody.appendChild(newRow);
                }
            } 
            else if (btnId === 'addNewCourseBtn') {
                const id = prompt("Enter Course ID:");
                const name = prompt("Enter Course Name:");
                const inst = prompt("Enter Instructor:");
                const cred = prompt("Enter Credit:");
                
                if (id && name) {
                    newRow.innerHTML = `<td>${id}</td><td>${name}</td><td>${inst}</td><td>${cred}</td><td><a href="../Student/course.html" class="action-link">View</a></td>
                                        <td><button onclick="deleteRow(this)">Delete</button> <button onclick="editCourseRow(this)">Edit</button></td>`;
                    tableBody.appendChild(newRow);
                }
            }
            else if (btnId === 'addNewContentBtn') {
                const cName = prompt("Enter Course Name:");
                const contName = prompt("Enter Content Name:");
                const type = prompt("Enter Content Type:");
                const date = prompt("Enter Date Uploaded:", new Date().toLocaleDateString());
                const link = prompt("Enter Link URL:"); // FIXED TYPO: changed promt to prompt

                if (cName && contName) {
                    newRow.innerHTML = `<td>${cName}</td><td>${contName}</td><td>${type}</td><td>${date}</td>
                                        <td><a href="${link || '#'}" class="action-link">Link</a></td>
                                        <td><button onclick="deleteRow(this)">Delete</button> <button onclick="editcontentRow(this)">Edit</button></td>`;
                    tableBody.appendChild(newRow);
                }
            }
        });
    }
});


function deleteRow(btn) {
    if (confirm("Are you sure you want to delete this record?")) {
        btn.closest('tr').remove();
    }
}

function editProfileRow(btn) {
    const row = btn.closest('tr');
    const labels = ["ID", "First Name", "Last Name", "DOB", "Major", "Address"];
    for (let i = 0; i < labels.length; i++) {
        let newValue = prompt(`Edit ${labels[i]}:`, row.cells[i].innerText);
        if (newValue !== null) row.cells[i].innerText = newValue;
    }
}

function editCourseRow(btn) {
    const row = btn.closest('tr');
    const labels = ["Course ID", "Course Name", "Instructor", "Credit"];
    for (let i = 0; i < labels.length; i++) {
        let newValue = prompt(`Edit ${labels[i]}:`, row.cells[i].innerText);
        if (newValue !== null) row.cells[i].innerText = newValue;
    }
}

function editcontentRow(btn) {
    const row = btn.closest('tr');
    const labels = ["Course Name", "Content Name", "Content Type", "Date Uploaded"];
    
    for (let i = 0; i < labels.length; i++) {
        let newValue = prompt(`Edit ${labels[i]}:`, row.cells[i].innerText);
        if (newValue !== null) row.cells[i].innerText = newValue;
    }

    const linkElem = row.cells[4].querySelector('a');
    let newUrl = prompt("Edit Link URL:", linkElem ? linkElem.getAttribute('href') : "");
    if (newUrl !== null && linkElem) {
        linkElem.setAttribute('href', newUrl);
    }
}