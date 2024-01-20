// Import utility functions from sliderUtils.js
import { calculateTotal, toggleLock, adjustSliders, displaySliderValues, renderPieChart } from './sliderUtils.js';

// Get all lock buttons, sliders, and the total budget input from the DOM
const lockButtons = document.querySelectorAll('.lockButton');
const allSliders = Array.from(document.querySelectorAll('.slider'));
const totalBudgetInput = document.querySelector('#totalBudget');
const originalBudget = document.querySelector('#originalBudget');

// Initialize the original total budget and the unlocked and locked sliders
let originalTotalBudget = { value: Number(totalBudgetInput.value) };
let percentagesParagraph = document.querySelector('.percentages');
let unlockedSliders = [...allSliders];
let lockedSliders = [];

// When the DOM is fully loaded, render the pie chart with fake values
document.addEventListener('DOMContentLoaded', (event) => {
    // Define the categories and fake values
    let categories = ["Housing", "Transportation", "Loan", "Living Groceries", "Healthcare", "Children", "Savings", "Bills", "Hobbies", "Holidays"];
    let fakeValues = [20, 60, 5, 5, 1, 3, 2, 1, 2, 1]; // Adjust these values as needed

    // Render the pie chart with fake values
    renderPieChart(fakeValues, categories);
    
    // Event listeners for advice buttons
    const bunnyButton = document.getElementById("bunnyButton");
    const friendButton = document.getElementById("friendButton");
    const sociopathButton = document.getElementById("sociopathButton");
    const adviceDiv = document.getElementById("adviceDiv");
    const roundedPercentages = {};
    

    // Define the generateHousingAdvice function
    function generateHousingAdvice(level) {
        let advice = "";
        if (level === "bunny") {
            advice = "Bunny housing advice: Consider finding a more affordable place or sharing expenses.";
        } else if (level === "friend") {
            advice = "Friend housing advice: Your housing expenses are rather high. You're going to need to look into ways to reduce these.<br>Maybe consider renting some of your un-used space?";
        } else if (level === "sociopath") {
            advice = "Sociopath housing advice: Converting a van or moving in a whole load of lodgers are looking like strong options for you right now.";
        }
        return advice; 
    }

    function generateTransportationAdvice(level) {
        let advice = "";
        if (level === "bunny") {
            advice = "Bunny transportation advice: Your transportation expenses are higher than recommended. Consider using public transportation or carpooling to save money.";
        } else if (level === "friend") {
            advice = "Friend transportation advice: Your transportation costs are a bit high. Look for ways to reduce these expenses, like using a more fuel-efficient vehicle or biking for short trips.";
        } else if (level === "sociopath") {
            advice = "Sociopath transportation advice: Your transportation spending is off the charts. It's time to sell that luxury car and start taking the bus. And if you can't afford the bus, it's time to start cycling or skateboarding!";
        }
        return advice;
    }

    // Function to determine advice type based on user input percentages and thresholds
    function determineAdviceType(level, roundedPercentages) {
        // Define thresholds for different categories
        const housingThreshold = 40; 
        const transportationThreshold = 15;

        // Check if the Housing percentage exceeds the threshold
        if (roundedPercentages["Housing"] > housingThreshold) {
            // If it exceeds, call the housing advice function
            const housingAdvice = generateHousingAdvice(level, roundedPercentages["Housing"]);
            return housingAdvice;
        } else if(roundedPercentages["Transportation"] > transportationThreshold) {
            // If the transportation percentage exceeds the threshold, generate transportation advice
            const transportationAdvice = generateTransportationAdvice(level, roundedPercentages["Transportation"]);
            return transportationAdvice;
        } else {
            // If no thresholds are triggered, return generic advice based on the level
            if (level === "bunny") {
                return "Bunny advice: Everything is looking great, keep being your awesome self!";
            } else if (level === "friend") {
                return "Friend advice: You're not triggering any warnings. You are considered financially healthy. Well done!";
            } else if (level === "sociopath") {
                return "Sociopath advice: Let's be honest, you knew this was ok already. You're just looking for praise and affirmation, aren't you? Here you go then.... (*slow claps*)";
            }
        }
    }

    let level = ""; // Initialize the level variable

    bunnyButton.addEventListener("click", function () {
        level = "bunny";
        if (!originalTotalBudget.value) {
            // Display a message to input the Total Budget first
            adviceDiv.textContent = "You seem to have forgotten to fill in important details.";
        } else {
            allSliders.forEach((slider, index) => {
                const displayAmount = slider.parentElement.querySelector('.displayAmount');
                const category = categories[index];
                const percentage = (Number(displayAmount.value) / totalBudgetInput.value) * 100;

                roundedPercentages[category] = Math.round(percentage);
            });

            console.log("User input percentages:", roundedPercentages);
            // Determine advice type based on level and user input percentages
            const advice = determineAdviceType(level, roundedPercentages);

            // Display the determined advice
            adviceDiv.innerHTML = advice;
        }
    });

    friendButton.addEventListener("click", function () {
        level = "friend";
        if (!originalTotalBudget.value) {
            // Display a message to input the Total Budget first
            adviceDiv.textContent = "Please input the Total Budget before getting advice.";
        } else {
            allSliders.forEach((slider, index) => {
                const displayAmount = slider.parentElement.querySelector('.displayAmount');
                const category = categories[index];
                const percentage = (Number(displayAmount.value) / totalBudgetInput.value) * 100;

                roundedPercentages[category] = Math.round(percentage);
            });

            console.log("User input percentages:", roundedPercentages);
            // Determine advice type based on level and user input percentages
            const advice = determineAdviceType(level, roundedPercentages);

            // Display the determined advice
            adviceDiv.innerHTML = advice;
        }
    });

    sociopathButton.addEventListener("click", function () {
        level = "sociopath";
        if (!originalTotalBudget.value) {
            // Display a message to input the Total Budget first
            adviceDiv.textContent = "Stop pretending you don't know how forms work and put some values in. Don't be an impatient little weirdo!";
        } else {
            allSliders.forEach((slider, index) => {
                const displayAmount = slider.parentElement.querySelector('.displayAmount');
                const category = categories[index];
                const percentage = (Number(displayAmount.value) / totalBudgetInput.value) * 100;

                roundedPercentages[category] = Math.round(percentage);
            });

            console.log("User input percentages:", roundedPercentages);
            // Determine advice type based on level and user input percentages
            const advice = determineAdviceType(level, roundedPercentages);

            // Display the determined advice
            adviceDiv.innerHTML = advice;
        }
    });
});

// When the total budget input value changes, update the original total budget and display it

totalBudgetInput.addEventListener('change', function() {
    originalTotalBudget.value = Number(this.value);
    originalBudget.value = this.value;
});

// When the original budget input value changes, update the total budget
originalBudget.addEventListener('change', function() {
    totalBudgetInput.value = this.value;
    originalTotalBudget.value = Number(this.value);
});
// Add a click event listener to each lock button to toggle the lock
lockButtons.forEach((lockButton, index) => {
    lockButton.addEventListener('click', function() {
        toggleLock(this, index, allSliders, unlockedSliders, lockedSliders, totalBudgetInput,originalTotalBudget);
    });
});

// Add an input event listener to each slider to adjust the sliders and display their values
allSliders.forEach((slider, index) => {
    slider.addEventListener('input', function() {
        adjustSliders(this, unlockedSliders, totalBudgetInput, originalTotalBudget);
        displaySliderValues(allSliders, totalBudgetInput, originalTotalBudget, percentagesParagraph);
    });

    // Add a change event listener to each display amount input to update the corresponding slider and the other sliders
    let displayAmount = slider.parentElement.querySelector('.displayAmount');
    displayAmount.addEventListener('change', function() {
        // Calculate the percentage that the input value represents of the total budget
        let percentage = (Number(this.value) / totalBudgetInput.value) * 100;
        // If the user's input exceeds the total budget, display a warning message
        if (percentage > 100) {
            alert('Your input exceeds the total budget!');
            return;
        }
        // Set the value of the corresponding slider to this percentage
        allSliders[index].value = percentage;
        // Calculate the remaining budget
        let remainingBudget = totalBudgetInput.value - this.value;
        // Update the total budget input value
        totalBudgetInput.value = remainingBudget;
        // Calculate the total value of the other unlocked sliders
        let totalUnlockedValue = unlockedSliders.reduce((total, slider) => total + Number(slider.value), 0) - percentage;
        // Set the value of the unlocked sliders proportionally based on their current values
        unlockedSliders.forEach(slider => {
            if (slider !== allSliders[index]) {
                let proportion = Number(slider.value) / totalUnlockedValue;
                slider.value = proportion * remainingBudget / totalBudgetInput.value * 100;
            }
        });
        // Call the displaySliderValues function to update the display of all sliders
        if (percentagesParagraph) {
            displaySliderValues(allSliders, totalBudgetInput, originalTotalBudget, percentagesParagraph)
        } else {
            // console.error('percentagesParagraph element not found');
        }
    });
});