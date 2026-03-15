const searchInput = document.getElementById('courseSearch');
const tableRows = document.querySelectorAll('.course-table tbody tr');

searchInput.oninput = () => {
    let filter = searchInput.value.toLowerCase();

    for (let row of tableRows) {
        let content = row.innerText.toLowerCase();
        row.style.display = content.includes(filter) ? "" : "none";
    }
};