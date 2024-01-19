import { calculateTotal, toggleLock, adjustSliders, displaySliderValues } from './sliderUtils.js';

const allSliders = Array.from(document.querySelectorAll('.slider'));
const lockButtons = document.querySelectorAll('.lockButton');
const totalBudgetInput = document.querySelector('#totalBudget');
let percentagesParagraph = document.querySelector('.percentages');
let unlockedSliders = [...allSliders];
let lockedSliders = [];

lockButtons.forEach((lockButton, index) => {
    lockButton.addEventListener('click', function() {
        toggleLock(this, index, allSliders, unlockedSliders, lockedSliders, totalBudgetInput);
    });
});

allSliders.forEach(slider => {
    slider.addEventListener('input', function() {
        adjustSliders(this, unlockedSliders, totalBudgetInput);
        displaySliderValues(allSliders, totalBudgetInput,percentagesParagraph);
    });
});