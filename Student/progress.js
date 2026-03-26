const searchInput = document.getElementById('courseSearch');
const getTableRows = () => document.querySelectorAll('.course-table tbody tr');

searchInput.oninput = () => {
    let filter = searchInput.value.toLowerCase();
    const rows = getTableRows();

    for (let row of rows) {
        let content = row.innerText.toLowerCase();
        row.style.display = content.includes(filter) ? "" : "none";
    }
    updateChart(); 
};

function updateChart() {
    const canvas = document.getElementById('gradeChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const allRows = Array.from(getTableRows());
    const visibleRows = allRows.filter(row => row.style.display !== "none");

    const dataPoints = visibleRows.map(row => {
        const dateText = row.cells[2].innerText;
        const grade = parseFloat(row.cells[4].innerText);

        if (dateText === "--" || isNaN(grade)) return null;

        const [d, m, y] = dateText.split('/');
        return {
            x: new Date(y, m - 1, d),
            y: grade,
            label: row.cells[1].innerText 
        };
    }).filter(point => point !== null);

    dataPoints.sort((a, b) => a.x - b.x);

    const labels = dataPoints.map(p => p.x.toLocaleDateString());
    const grades = dataPoints.map(p => p.y);

    if (window.myChart) { 
        window.myChart.destroy(); 
    }

    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Grade Progress',
                data: grades,
                borderColor: '#ff00c8',
                backgroundColor: 'rgba(255, 0, 200, 0.1)',
                borderWidth: 3,
                tension: 0.3, 
                pointRadius: 6,
                pointBackgroundColor: '#ff00c8',
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: { display: true, text: 'Score' }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        afterLabel: (context) => `Task: ${dataPoints[context.dataIndex].label}`
                    }
                }
            }
        }
    });
}

function sortDate(order) {
    const tbody = document.querySelector(".course-table tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort((rowA, rowB) => {
        const parseDate = (txt) => {
            const [d, m, y] = txt.split('/');
            return txt === "--" ? new Date(0) : new Date(y, m - 1, d);
        };
        const dateA = parseDate(rowA.cells[2].innerText);
        const dateB = parseDate(rowB.cells[2].innerText);
        return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
    
    rows.forEach(row => tbody.appendChild(row));
    updateChart(); 
}

document.addEventListener('DOMContentLoaded', updateChart);