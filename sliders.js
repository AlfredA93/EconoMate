// Get all the sliders, lock buttons and the total budget input
const sliders = document.querySelectorAll('.slider');
const lockButtons = document.querySelectorAll('.lockButton');
const totalBudgetInput = document.querySelector('#totalBudget');

// Function to calculate the total value of all sliders
function calculateTotal() {
    let total = 0;
    sliders.forEach(slider => {
        total += Number(slider.value);
    });
    return total;
}
// Add a click event listener to each lock button
lockButtons.forEach((lockButton, index) => {
    lockButton.addEventListener('click', function() {
        // Toggle the locked state of the slider
        this.classList.toggle('locked');
        sliders[index].disabled = this.classList.contains('locked');

        // If the slider is locked, subtract its value from the total budget
        if (this.classList.contains('locked')) {
            totalBudgetInput.value -= sliders[index].value / 100 * totalBudgetInput.value;
        } else { // If the slider is unlocked, add its value back to the total budget
            totalBudgetInput.value = Number(totalBudgetInput.value) + (sliders[index].value / 100 * totalBudgetInput.value);
        }
    });
});

// Add an input event listener to each slider
sliders.forEach(slider => {
    slider.addEventListener('input', function() {
        let totalBudget = Number(totalBudgetInput.value);
        let total = calculateTotal();
        let excess = total - 100;

        // If the total exceeds 100, decrease the value of the other sliders
        if (excess > 0) {
            let totalOtherSliders = total - this.value;
            sliders.forEach(otherSlider => {
                if (otherSlider !== this && !otherSlider.disabled) {
                    let proportion = otherSlider.value / totalOtherSliders;
                    otherSlider.value = (otherSlider.value - excess * proportion).toFixed(2);
                }
            });
        } else if (excess < 0) { // If the total is less than 100, increase the value of the other sliders
            let totalOtherSliders = total - this.value;
            sliders.forEach(otherSlider => {
                if (otherSlider !== this && !otherSlider.disabled) {
                    let proportion = otherSlider.value / totalOtherSliders;
                    otherSlider.value = (otherSlider.value - excess * proportion).toFixed(2);
                }
            });
        }

        // Display the value for each slider based on its percentage of the total budget
        sliders.forEach(slider => {
            let displayAmount = slider.nextElementSibling;
            displayAmount.textContent = (slider.value / 100 * totalBudget).toFixed(2);
        });

        // Calculate and log the sum of the values of all sliders
        let sum = 0;
        sliders.forEach(slider => {
            sum += Number(slider.value) / 100 * totalBudget;
        });
        console.log(sum.toFixed(2));
    });
});