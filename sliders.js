// Get all the sliders, lock buttons and the total budget input
const allSliders = Array.from(document.querySelectorAll('.slider'));
const lockButtons = document.querySelectorAll('.lockButton');
const totalBudgetInput = document.querySelector('#totalBudget');

let unlockedSliders = [...allSliders];
let lockedSliders = [];

// Function to calculate the total value of all sliders
function calculateTotal() {
    let total = 0;
    unlockedSliders.forEach(slider => {
        total += Number(slider.value);
    });
    return total;
}

// Add a click event listener to each lock button
lockButtons.forEach((lockButton, index) => {
    lockButton.addEventListener('click', function() {
        // Toggle the locked state of the slider
        this.classList.toggle('locked');
        allSliders[index].disabled = this.classList.contains('locked');

        let totalBudget = Number(totalBudgetInput.value);
        console.log(`This the total budget at the start${totalBudget}`);

        // If the slider is locked, move it from unlockedSliders to lockedSliders
        if (this.classList.contains('locked')) {
            allSliders[index].lockedDisplayAmount = allSliders[index].nextElementSibling.textContent;
            let sliderIndex = unlockedSliders.indexOf(allSliders[index]);
            if (sliderIndex > -1) {
                unlockedSliders.splice(sliderIndex, 1);
                lockedSliders.push(allSliders[index]);
                allSliders[index].lockedValue = Number(allSliders[index].value); // Store the value of the slider when it gets locked

                // Set the value of all unlocked sliders to 0
                unlockedSliders.forEach(slider => {
                    slider.value = 0;
                });

                let subtractedAmount = allSliders[index].lockedValue / 100 * totalBudget;
                allSliders[index].subtractedAmount = subtractedAmount;
                totalBudget -= subtractedAmount;
                console.log(`This the total budget after locked${totalBudget}`);
            }
        } else { // If the slider is unlocked, move it from lockedSliders to unlockedSliders
            let sliderIndex = lockedSliders.indexOf(allSliders[index]);
            if (sliderIndex > -1) {
                lockedSliders.splice(sliderIndex, 1);
                unlockedSliders.push(allSliders[index]);

                // Add the amount of the unlocked slider back to the total budget
                totalBudget += allSliders[index].subtractedAmount;
                console.log(`This the total budget after unlocked${totalBudget}`);
            }
        }

        // Update the total budget
        totalBudgetInput.value = totalBudget.toFixed(2);

        // Trigger input event to recalculate values
        allSliders[index].dispatchEvent(new Event('input'));
    });
});

// Add an input event listener to each slider
allSliders.forEach(slider => {
    slider.addEventListener('input', function() {
        let totalBudget = Number(totalBudgetInput.value);
        let total = calculateTotal();
        let excess = total - 100;

        // If the total exceeds 100, decrease the value of the other sliders
        if (excess > 0) {
            let totalOtherSliders = total - this.value;
            unlockedSliders.forEach(otherSlider => {
                if (otherSlider !== this) {
                    let proportion = otherSlider.value / totalOtherSliders;
                    otherSlider.value = (otherSlider.value - excess * proportion).toFixed(2);
                }
            });
        } else if (excess < 0) { // If the total is less than 100, increase the value of the other sliders
            let totalOtherSliders = total - this.value;
            unlockedSliders.forEach(otherSlider => {
                if (otherSlider !== this) {
                    let proportion = otherSlider.value / totalOtherSliders;
                    otherSlider.value = (otherSlider.value - excess * proportion).toFixed(2);
                }
            });
        }

        // Display the value for each slider based on its percentage of the total budget
        allSliders.forEach(slider => {
            let displayAmount = slider.nextElementSibling;
            if (!slider.disabled) {
                displayAmount.textContent = (slider.value / 100 * totalBudget).toFixed(2);
            } else {
                displayAmount.textContent = slider.lockedDisplayAmount; // Use the stored displayAmount for locked sliders
            }
        });

        // Calculate and log the sum of the values of all sliders
        let sum = 0;
        allSliders.forEach(slider => {
            if (!slider.disabled) {
                sum += Number(slider.value) / 100 * totalBudget;
            } else {
                sum += Number(slider.lockedValue) / 100 * totalBudget; // Use the stored value for locked sliders
            }
        });
     
    });
});