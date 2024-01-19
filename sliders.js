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