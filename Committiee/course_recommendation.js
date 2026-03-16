
const searchInput = document.getElementById('courseSearch');
const majorSelect = document.getElementById('major');
const yearSelect = document.getElementById('year');
const creditInput = document.getElementById('credit_compleed');


[searchInput, majorSelect, yearSelect, creditInput].forEach(element => {
    element.addEventListener('input', applyFilters);
});

function applyFilters() {

    const searchText = searchInput.value.toLowerCase();
    const selectedMajor = majorSelect.value.toLowerCase();
    const selectedYear = yearSelect.options[yearSelect.selectedIndex].text.toLowerCase();
    const maxCredit = parseFloat(creditInput.value) || Infinity; 

    const rows = document.querySelectorAll(".student-table tbody tr");

    rows.forEach(row => {

        const rowText = row.innerText.toLowerCase();
        const rowMajor = row.cells[4].innerText.toLowerCase();
        const rowCredit = parseFloat(row.cells[3].innerText);
        const rowYear = row.cells[6].innerText.toLowerCase();

  
        const matchesSearch = rowText.includes(searchText);
        const matchesMajor = (selectedMajor === "all" || rowMajor === selectedMajor);
        const matchesYear = (yearSelect.value === "all" || rowYear === selectedYear);
        const matchesCredit = rowCredit <= maxCredit;


        if (matchesSearch && matchesMajor && matchesYear && matchesCredit) {
            row.style.display = ""; 
        } else {
            row.style.display = "none"; 
        }
    });
}

function sort(order) { 
    const tbody = document.querySelector(".student-table tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort((rowA, rowB) => {
        const valA = parseInt(rowA.cells[3].innerText) || 0;
        const valB = parseInt(rowB.cells[3].innerText) || 0;

        return order === 'asc' ? valA - valB : valB - valA;
    });
    
    rows.forEach(row => tbody.appendChild(row));
}