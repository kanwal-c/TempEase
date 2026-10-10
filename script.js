const form = document.getElementById("converter-form");
const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset-btn");

const celsiusResult = document.getElementById("celsius-result");
const fahrenheitResult = document.getElementById("fahrenheit-result");
const kelvinResult = document.getElementById("kelvin-result");

// Convert every temperature to Celsius first.
function convertToCelsius(value, unit) {
    if (unit === "C") {
        return value;
    }

    if (unit === "F") {
        return (value - 32) * 5 / 9;
    }

    if (unit === "K") {
        return value - 273.15;
    }
}

// Display a number without unnecessary decimal places.
function formatTemperature(value) {
    const rounded = Number(value.toFixed(4));

    return rounded.toLocaleString("en-US", {
        maximumFractionDigits: 4,
        useGrouping: false
    });
}

// Convert the entered temperature.
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const value = temperatureInput.valueAsNumber;
    const unit = unitSelect.value;

    message.textContent = "";
    message.className = "message";

    // Check for empty or invalid input.
    if (temperatureInput.value.trim() === "" || !Number.isFinite(value)) {
        showError("Please enter a valid temperature.");
        return;
    }

    // Reject temperatures below absolute zero.
    const minimums = {
        C: -273.15,
        F: -459.67,
        K: 0
    };

    if (value < minimums[unit]) {
        showError("Temperature cannot be below absolute zero.");
        return;
    }

    // Convert the input into Celsius.
    const celsius = convertToCelsius(value, unit);

    // Calculate the other units from Celsius.
    const fahrenheit = (celsius * 9 / 5) + 32;
    const kelvin = celsius + 273.15;

    // Display all three results.
    celsiusResult.textContent = formatTemperature(celsius) + " °C";
    fahrenheitResult.textContent = formatTemperature(fahrenheit) + " °F";
    kelvinResult.textContent = formatTemperature(kelvin) + " K";

    message.textContent = "Conversion completed successfully!";
    message.classList.add("success");
});

// Show an error and clear old results.
function showError(text) {
    message.textContent = text;

    celsiusResult.textContent = "—";
    fahrenheitResult.textContent = "—";
    kelvinResult.textContent = "—";
}

// Reset the form and all results.
resetButton.addEventListener("click", function () {
    form.reset();

    celsiusResult.textContent = "—";
    fahrenheitResult.textContent = "—";
    kelvinResult.textContent = "—";

    message.textContent = "";
    message.className = "message";

    temperatureInput.focus();
});