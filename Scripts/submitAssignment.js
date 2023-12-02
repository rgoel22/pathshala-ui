document.addEventListener('DOMContentLoaded', function () {
    // Load and display assignment details for submission
    displayAssignmentDetails();
    
    // Display user data (you can customize this based on your user data)
    showData();

    displaySubmissionForm();
});

function displayAssignmentDetails() {
    // Retrieve the selected assignment details from localStorage
    const currentAssignment = JSON.parse(localStorage.getItem('currentAssignment'));

    if(currentAssignment) {
    // Update the displayed assignment details
    document.getElementById("selectedAssignmentDetails").innerHTML = `
    <div class="add">
      <p><span>Topic Name:</span> ${currentAssignment.topicName}</p>
      <p><span>Assignment Name:</span> ${currentAssignment.assignmentName}</p>
      <p><span>Assignment Description:</span> ${currentAssignment.assignmentDescription}</p>
    </div>
    `;

    // You can add additional code to handle the display of the assignment details as needed
    } else {
    console.error('No assignment details found.');
    }

    // Retrieve the selected course name from localStorage
    let selectedCourseName = JSON.parse(localStorage.getItem('selectedCourseName')) || "YourSelectedCourseName";

    // Update the displayed course name
    document.getElementById("selectedCourseDisplay").innerHTML = `<span style="font-weight: bold;">Selected Course: ${selectedCourseName}</span>`;
}

function showData() {
    let emailData = JSON.parse(localStorage.getItem("currentUser"));
    let userData = JSON.parse(localStorage.getItem("currentType"));

    // Display the logged-in user close to the logout button
    document.querySelector(".guest").innerHTML = `
        <p>${emailData} (${userData})</p>
    `;
}

function submitAssignment() {
    // Logic to handle assignment submission
    // You can implement the submission logic based on your requirements
    alert('Assignment submitted!');
    // Redirect to the assignments page or perform any other action
    window.location.href = 'assignments.html';
}

function displaySubmissionForm() {
    let assignmentSubmitDiv = document.getElementById('assignmentSubmit');
    assignmentSubmitDiv.innerHTML = `
        <div class="submission-form">
            <label for="answer"><span>Answer:</span></label>
            <br> <br>
            <div class="answer-container">
                <textarea id="answer" rows="6" cols="100" placeholder="Type your answer here..."></textarea>
            </div>
            <br><br>
            <label class="attachLabel" for="answer"><span>Attach Answer File:</span></label>
            <br>
            <input type="file" accept=".pdf, .doc, .docx" style="width: 40%;" />
            <br> <br>
            <button onclick="submitAssignment()">Submit</button>
        </div>
    `;
}

function submitAnswer() {
    // Get the answer and attachment from the form
    let answer = document.getElementById('answer').value;
    let attachmentInput = document.getElementById('attachment');
    
    if (!answer.trim() && !attachmentInput.files.length) {
        alert('Please provide an answer or attach a file.');
        return;
    }

    // Read the attached file as a base64-encoded string
    const reader = new FileReader();
    reader.onload = function (e) {
        const attachmentContent = e.target.result.split(",")[1]; // Remove the data URL prefix

        // Store the submitted answer and attachment in localStorage or handle the submission logic
        const submission = {
            answer,
            attachment: {
                fileName: attachmentInput.files[0].name,
                fileContent: attachmentContent,
            },
        };

        localStorage.setItem('submission', JSON.stringify(submission));

        alert('Answer submitted successfully!');
        
        // Optionally, you can redirect to another page or perform additional actions
        // window.location.href = 'some_other_page.html';
    };

    // Read the file as a data URL (base64)
    reader.readAsDataURL(attachmentInput.files[0]);
}
