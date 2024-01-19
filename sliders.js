import { calculateTotal, toggleLock, adjustSliders, displaySliderValues } from './sliderUtils.js';

const allSliders = Array.from(document.querySelectorAll('.slider'));
const lockButtons = document.querySelectorAll('.lockButton');
const totalBudgetInput = document.querySelector('#totalBudget');
let percentagesParagraph = document.querySelector('.percentages');
let unlockedSliders = [...allSliders];
let lockedSliders = [];

let originalTotalBudget = { value: Number(totalBudgetInput.value) };

totalBudgetInput.addEventListener('change', function() {
    originalTotalBudget.value = Number(this.value);
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
            console.error('percentagesParagraph element not found');
        }
    });
});