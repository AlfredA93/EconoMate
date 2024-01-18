// Get all the sliders, lock buttons and the total budget input
const sliders = document.querySelectorAll('.slider');
const lockButtons = document.querySelectorAll('.lockButton');
const totalBudgetInput = document.querySelector('#totalBudget');

// Function to calculate the total value of all sliders
function calculateTotal() {
    let total = 0;
    sliders.forEach(slider => {
        if (!slider.isLocked) {
            total += Number(slider.value);
        }
    });
    return total;
}

// Function to calculate the total locked amount
function calculateLockedAmount() {
    let total = 0;
    sliders.forEach(slider => {
        if (slider.isLocked) {
            total += slider.lockedAmount;
        }
    });
    return total;
}

// Add an input event listener to each slider
// Add an input event listener to each slider
sliders.forEach(slider => {
    slider.addEventListener('input', function() {
        let totalBudget = Number(totalBudgetInput.value);
        let totalLockedAmount = calculateLockedAmount();
        let remainingBudget = totalBudget - totalLockedAmount;
        let total = calculateTotal();
        let excess = total - 100;
        let decreasePerSlider = excess / (sliders.length - 1);

        // Decrease the value of the other sliders proportionally
        sliders.forEach(otherSlider => {
            if (otherSlider !== this && !otherSlider.isLocked) {
                otherSlider.value = Math.max(0, otherSlider.value - decreasePerSlider);
            }
        });

        // Calculate the amount of money allocated to each slider
        sliders.forEach(slider => {
            let amount;
            if (slider.isLocked) {
                amount = slider.lockedAmount; // Use the locked amount if the slider is locked
            } else {
                if (slider.value === slider.max) {
                    // If the slider is at its maximum value, set its amount to the remaining budget
                    amount = remainingBudget;
                } else {
                    amount = (slider.value / 100) * remainingBudget;
                }
            }
            let displayAmount = slider.parentElement.querySelector('.displayAmount');
            displayAmount.textContent = `Amount: ${amount.toFixed(2)}`;
        });
    });
});
// Add a click event listener to each lock button

lockButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        let slider = sliders[index];
        slider.isLocked = !slider.isLocked; // Toggle the locked state of the slider
        if (slider.isLocked) {
            // Store the locked amount when the slider is locked
            slider.lockedAmount = (slider.value / 100) * Number(totalBudgetInput.value);
        } else {
            // Reset the locked amount when the slider is unlocked
            slider.lockedAmount = 0;
        }
        this.textContent = slider.isLocked ? 'Unlock' : 'Lock'; // Update the button text
    });
});