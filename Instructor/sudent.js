const searchInput = document.getElementById('search');
searchInput.oninput = () => {
    let filter = searchInput.value.toLowerCase();
    const currentRows = document.querySelectorAll('.table tbody tr');

    for (let row of currentRows) {
        let content = row.innerText.toLowerCase();
        row.style.display = content.includes(filter) ? "" : "none";
    }
};