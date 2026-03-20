const searchInput = document.getElementById('search');
const tableRows = document.querySelectorAll('.course-table tbody tr');

searchInput.oninput = () => {
    let filter = searchInput.value.toLowerCase();

    for (let row of tableRows) {
        let content = row.innerText.toLowerCase();
        row.style.display = content.includes(filter) ? "" : "none";
    }
};


const majorDropdown = document.getElementById('course');
const instructorDropdown = document.getElementById('instructor');

const applyDropdownFilters = () => {
    const selectedMajor = majorDropdown.value.toLowerCase(); 
    const selectedInstructor = instructorDropdown.options[instructorDropdown.selectedIndex].text;

    for (let row of tableRows) {
        const courseId = row.cells[0].innerText.toLowerCase();
        const instructorName = row.cells[2].innerText;

        const majorMatch = (selectedMajor === 'all' || courseId.includes(selectedMajor.substring(0, 3)));
        const instructorMatch = (instructorDropdown.value === 'all' || instructorName === selectedInstructor);

        if (majorMatch && instructorMatch) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
};

majorDropdown.onchange = applyDropdownFilters;
instructorDropdown.onchange = applyDropdownFilters;