import { calculateTotal, toggleLock, adjustSliders, displaySliderValues, renderPieChart } from './sliderUtils.js';

const lockButtons = document.querySelectorAll('.lockButton');
const allSliders = Array.from(document.querySelectorAll('.slider'));
const totalBudgetInput = document.querySelector('#totalBudget');
const originalBudgetParagraph = document.querySelector('#originalBudget');
let originalTotalBudget = { value: Number(totalBudgetInput.value) };
let percentagesParagraph = document.querySelector('.percentages');
let unlockedSliders = [...allSliders];
let lockedSliders = [];


document.addEventListener('DOMContentLoaded', (event) => {
    // Define the categories
    let categories = ["Housing", "Transportation", "Loan", "Living Groceries", "Healthcare", "Children", "Savings", "Bills", "Hobbies", "Holidays"];

    // Define fake values
    let fakeValues = [20, 60, 5, 5, 1, 3, 2, 1, 2, 1]; // Adjust these values as needed

    // Render the pie chart with fake values
    renderPieChart(fakeValues, categories);
});
totalBudgetInput.addEventListener('change', function() {
    originalTotalBudget.value = Number(this.value);
    originalBudgetParagraph.textContent = `Original Budget: $${originalTotalBudget.value}`;
});

lockButtons.forEach((lockButton, index) => {
    lockButton.addEventListener('click', function() {
        toggleLock(this, index, allSliders, unlockedSliders, lockedSliders, totalBudgetInput,originalTotalBudget);
    });
});

allSliders.forEach((slider, index) => {
    slider.addEventListener('input', function() {
        adjustSliders(this, unlockedSliders, totalBudgetInput,originalTotalBudget);
        displaySliderValues(allSliders, totalBudgetInput,originalTotalBudget, percentagesParagraph);
    });

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