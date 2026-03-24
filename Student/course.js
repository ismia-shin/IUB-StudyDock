function submit(btn) {
    let submissionUrl = prompt("Please enter the URL for your submission:");

    if (submissionUrl === null) return; 
    
    if (submissionUrl.trim() === "") {
        alert("Submission failed. URL cannot be empty.");
        return;
    }

    let row = btn.closest("tr");
    let actionCell = row.cells[5];

    actionCell.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 5px;">
            <a href="${submissionUrl}" target="_blank" class="action-link">View Submission</a>
            <span style="color: green; font-size: 0.8rem; font-weight: bold;">✓ Submitted</span>
            <button onclick="submit(this)" style="font-size: 0.7rem; padding: 2px 5px;">Resubmit</button>
        </div>
    `;

    alert("Assessment submitted successfully!");
}