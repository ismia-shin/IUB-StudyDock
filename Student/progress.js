const searchInput = document.getElementById('courseSearch');
const tableRows = document.querySelectorAll('.course-table tbody tr');

searchInput.oninput = () => {
    let filter = searchInput.value.toLowerCase();

    for (let row of tableRows) {
        let content = row.innerText.toLowerCase();
        row.style.display = content.includes(filter) ? "" : "none";
    }
};

function sortDate(order) {
    const tbody = document.querySelector(".course-table tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort((rowA, rowB) => {
        const dateTextA = rowA.cells[2].innerText;
        const dateTextB = rowB.cells[2].innerText;


        const [d1, m1, y1] = dateTextA.split('/');
        const [d2, m2, y2] = dateTextB.split('/');
        
        const dateA = new Date(y1, m1 - 1, d1);
        const dateB = new Date(y2, m2 - 1, d2);

        if (order === 'asc') {
            return dateA - dateB; 
        } else {
            return dateB - dateA; 
        }
    });
    
    rows.forEach(row => tbody.appendChild(row));
}