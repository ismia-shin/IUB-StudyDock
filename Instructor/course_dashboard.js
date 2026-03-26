const searchInput = document.getElementById('courseSearch');
const tableRows = document.querySelectorAll('.course-table tbody tr');

searchInput.oninput = () => {
    let filter = searchInput.value.toLowerCase();

    for (let row of tableRows) {
        let content = row.innerText.toLowerCase();
        row.style.display = content.includes(filter) ? "" : "none";
    }
};

function deleteRow(btn) {
    if (confirm("Are you sure you want to delete this course?")) {
        const row = btn.parentElement.parentElement;
        row.remove();
    }
}

document.getElementById('addNewBtn').onclick = function() {
    const id = prompt("Enter Course ID (e.g., CSE101):");
    const name = prompt("Enter Course Name:");
    const instructor = prompt("Enter Instructor Name:");
    const credit = prompt("Enter Course Credit:")
    
    if (id && name) {
        const table = document.querySelector(".course-table tbody");
        const newRow = `
        <tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${instructor}</td>
            <td>${credit}</td>
            <td>
                <a href="#" class="action-link">Content</a> | 
                <a href="#" class="action-link">Assessment</a> <br>
                <a href="#" class="action-link">Student</a> | 
                <a href="#" class="action-link">Grade</a> 
            </td>
            <td>
                <button onclick="deleteRow(this)">Delete</button>
                <button onclick="editRow(this)">Edit</button>
            </td>
        </tr>`;
        table.innerHTML += newRow;
    }
};

function editRow(btn) {
    const row = btn.parentElement.parentElement;
    
    const currentID = row.cells[0].innerText;
    const currentName = row.cells[1].innerText;
    const currentCredit =  row.cells[3].innerText;

    const newID = prompt("Edit Course ID:", currentID);
    const newName = prompt("Edit Course Name:", currentName);
    const newCredit = prompt("Edit Course Credit:", currentCredit);

    if (newID) row.cells[0].innerText = newID;
    if (newName) row.cells[1].innerText = newName;
    if (newCredit) row.cells[3].innerText = currentCredit;
}

