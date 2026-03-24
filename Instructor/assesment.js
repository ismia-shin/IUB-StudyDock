const searchInput = document.getElementById('assesmentSearch');

searchInput.oninput = () => {
    let filter = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('.assesment-table tbody tr');

    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
    });
};

function deleteRow(btn) {
    if (confirm("Are you sure you want to delete this?")) {
        btn.closest("tr").remove();
    }
}

document.getElementById('addNewBtn').onclick = function() {
    let name = prompt("Assessment Name:");
    let desc = prompt("Description:");
    let dueDate = prompt("Due Date (e.g. 25 March 2026):");
    let url = prompt("Material URL:");

    if (!name || !desc || !dueDate) {
        alert("Please fill all required fields!");
        return;
    }

    let today = new Date().toLocaleDateString();

    let table = document.querySelector(".assesment-table tbody");

    let newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${name}</td>
        <td>${desc}</td>
        <td>${dueDate}</td>
        <td>${today}</td>
        <td><a href="${url || '#'}" class="action-link" target="_blank">Link</a></td>
        <td>
            <button onclick="deleteRow(this)">Delete</button>
            <button onclick="editRow(this)">Edit</button>
        </td>
    `;

    table.appendChild(newRow);
};

function editRow(btn) {
    let row = btn.closest("tr");

    let name = row.cells[0].innerText;
    let desc = row.cells[1].innerText;
    let due = row.cells[2].innerText;
    let link = row.cells[4].querySelector("a").href;

    let newName = prompt("Edit Name:", name);
    let newDesc = prompt("Edit Description:", desc);
    let newDue = prompt("Edit Due Date:", due);
    let newURL = prompt("Edit URL:", link);

    if (newName) row.cells[0].innerText = newName;
    if (newDesc) row.cells[1].innerText = newDesc;
    if (newDue) row.cells[2].innerText = newDue;

    if (newURL) {
        row.cells[4].innerHTML = `<a href="${newURL}" class="action-link" target="_blank">Link</a>`;
    }

    row.cells[3].innerText = new Date().toLocaleDateString(); // update posted date
}