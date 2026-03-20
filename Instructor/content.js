const searchInput = document.getElementById('contentSearch');
searchInput.oninput = () => {
    let filter = searchInput.value.toLowerCase();
    const currentRows = document.querySelectorAll('.content-table tbody tr');

    for (let row of currentRows) {
        let content = row.innerText.toLowerCase();
        row.style.display = content.includes(filter) ? "" : "none";
    }
};

function deleteRow(btn) {
    if (confirm("Are you sure you want to delete this?")) {
        btn.parentElement.parentElement.remove();
    }
}

document.getElementById('addNewBtn').onclick = function() {
    let name = prompt("Content Name:");
    let type = prompt("Content Type (Video/PDF):");
    let url = prompt("Enter URL:");
    let date = new Date().toLocaleDateString();

    if (name && type) {
        let table = document.querySelector(".content-table tbody");
        let newRow = `
            <tr>
                <td>${name}</td>
                <td>${type}</td>
                <td>${date}</td>
                <td>--</td>
                <td><a href="${url}" class="action-link">Link</a></td>
                <td>
                    <button onclick="deleteRow(this)">Delete</button>
                    <button onclick="editRow(this)">Edit</button>
                </td>
            </tr>`;
        table.innerHTML += newRow;
    }
};

function editRow(btn) {
    let row = btn.parentElement.parentElement;
    
    let currentURL = row.cells[4].querySelector('a') ? row.cells[4].querySelector('a').href : "#";

    let newName = prompt("Edit Name:", row.cells[0].innerText);
    let newType = prompt("Edit Type:", row.cells[1].innerText);
    let newURL  = prompt("Edit URL:", currentURL);

    if (newName) row.cells[0].innerText = newName;
    if (newType) row.cells[1].innerText = newType;
    
    if (newName || newType || newURL) {
        row.cells[2].innerText = new Date().toLocaleDateString();
    }
    if (newURL) {
        row.cells[4].innerHTML = `<a href="${newURL}" class="action-link">Link</a>`;
    }
}