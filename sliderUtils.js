export function calculateTotal(unlockedSliders) {
    let total = 0;
    unlockedSliders.forEach(slider => {
        total += Number(slider.value);
    });
    return total;
}

export function toggleLock(lockButton, index, allSliders, unlockedSliders, lockedSliders, totalBudgetInput) {
    lockButton.classList.toggle('locked');
    allSliders[index].disabled = lockButton.classList.contains('locked');

    let icon = lockButton.querySelector('.lock-icon');   

    let totalBudget = Number(totalBudgetInput.value);

    let displayAmount=allSliders[index].parentElement.querySelector('.displayAmount');

    if (lockButton.classList.contains('locked')) {
        icon.classList.remove('fa-unlock');
        icon.classList.add('fa-lock');

        allSliders[index].lockedDisplayAmount = Number(displayAmount.value);
        let sliderIndex = unlockedSliders.indexOf(allSliders[index]);
        if (sliderIndex > -1) {
            unlockedSliders.splice(sliderIndex, 1);
            lockedSliders.push(allSliders[index]);
            allSliders[index].lockedValue = Number(allSliders[index].value);

            unlockedSliders.forEach(slider => {
                slider.value = 0;
            });

            let subtractedAmount = allSliders[index].lockedValue / 100 * totalBudget;
            allSliders[index].subtractedAmount = subtractedAmount;
            totalBudget -= subtractedAmount;
        }
    } else {
        icon.classList.remove('fa-lock');
        icon.classList.add('fa-unlock');
        let sliderIndex = lockedSliders.indexOf(allSliders[index]);
        if (sliderIndex > -1) {
            lockedSliders.splice(sliderIndex, 1);
            unlockedSliders.push(allSliders[index]);
            totalBudget += allSliders[index].subtractedAmount;
        }
    }

    totalBudgetInput.value = totalBudget.toFixed(2);
    allSliders[index].dispatchEvent(new Event('input'));
}

export function adjustSliders(slider, unlockedSliders, totalBudgetInput) {
    let totalBudget = Number(totalBudgetInput.value);
    let total = calculateTotal(unlockedSliders);
    let excess = total - 100;

    if (excess > 0) {
        let totalOtherSliders = total - slider.value;
        unlockedSliders.forEach(otherSlider => {
            if (otherSlider !== slider) {
                let proportion = otherSlider.value / totalOtherSliders;
                otherSlider.value = (otherSlider.value - excess * proportion).toFixed(2);
            }
        });
    } else if (excess < 0) {
        let totalOtherSliders = total - slider.value;
        unlockedSliders.forEach(otherSlider => {
            if (otherSlider !== slider) {
                let proportion = otherSlider.value / totalOtherSliders;
                otherSlider.value = (otherSlider.value - excess * proportion).toFixed(2);
            }
        });
    }
}

export function displaySliderValues(allSliders, totalBudgetInput) {
    let totalBudget = Number(totalBudgetInput.value);
    allSliders.forEach(slider => {
        let displayAmount = slider.parentElement.querySelector('.displayAmount');
        if (!slider.disabled) {
            // Use the value property to set the value of the displayAmount input
            displayAmount.value = (slider.value / 100 * totalBudget).toFixed(2);
        } else {
            // Use the value property to set the value of the displayAmount input
            displayAmount.value = slider.lockedDisplayAmount;
        }
});
}