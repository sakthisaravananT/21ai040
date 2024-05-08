function getNumbers() {
    var numberId = document.getElementById("numberId").value;
    if (!numberId) {
        alert("Please enter a number ID");
        return;
    }

    fetch(`/numbers/${numberId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Display the result with the input number
            displayResult(data, numberId);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById("result").innerText = "Error fetching data. Please try again.";
        });
}

function displayResult(data, numberId) {
    var resultDiv = document.getElementById("result");
    var numbers = data.numbers;
    var sum = numbers.reduce((acc, curr) => acc + curr, 0);
    var average = sum / numbers.length;

    resultDiv.innerHTML = `
        <p>Number ID: ${numberId}</p>
        <p>Numbers: ${numbers.join(", ")}</p>
        <p>Previous Window: ${data.previous_window.join(", ")}</p>
        <p>Current Window: ${data.current_window.join(", ")}</p>
        <p>Average: ${average.toFixed(2)}</p>
    `;
}
