export function calculateTotal(unlockedSliders) {
    let total = 0;
    unlockedSliders.forEach(slider => {
        total += Number(slider.value);
    });
    return total;
}

export function toggleLock(lockButton, index, allSliders, unlockedSliders, lockedSliders, totalBudgetInput,originalTotalBudget) {
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

            // Calculate the remaining budget
            let remainingBudget = totalBudget - allSliders[index].lockedValue;
            // Calculate the percentage of the remaining budget that each unlocked slider should receive
            let remainingPercentage = (remainingBudget / totalBudget) * 100 / unlockedSliders.length;
            // Set the value of the unlocked sliders to this percentage
            unlockedSliders.forEach(slider => {
                slider.value = remainingPercentage;
            });

            let subtractedAmount = allSliders[index].lockedValue / 100 * totalBudget;
            allSliders[index].subtractedAmount = subtractedAmount;
            totalBudget -= subtractedAmount;
        }

        console.log('Original total budget after locking:', originalTotalBudget.value);
    } else {
        icon.classList.remove('fa-lock');
        icon.classList.add('fa-unlock');
        let sliderIndex = lockedSliders.indexOf(allSliders[index]);
        if (sliderIndex > -1) {
            lockedSliders.splice(sliderIndex, 1);
            unlockedSliders.push(allSliders[index]);
            totalBudget += allSliders[index].subtractedAmount;
        }

        console.log('Original total budget after unlocking:', originalTotalBudget.value);
    }

    totalBudgetInput.value = totalBudget.toFixed(2);
    allSliders[index].dispatchEvent(new Event('input'));
}
export function adjustSliders(slider, unlockedSliders, totalBudgetInput, originalTotalBudget) {
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

    console.log('Original total budget after adjusting sliders:', originalTotalBudget.value);
}
export function displaySliderValues(allSliders, totalBudgetInput, originalTotalBudget, percentagesParagraph) {
    let totalBudget = Number(totalBudgetInput.value);
    let percentages = [];

    allSliders.forEach(slider => {
        let displayAmount = slider.parentElement.querySelector('.displayAmount');
        if (!slider.disabled) {
            console.log('Original total budget when displaying values:', originalTotalBudget.value);
            let amount = (slider.value / 100 * totalBudget).toFixed(2);
            displayAmount.value = amount;
        } else {
            displayAmount.value = slider.lockedDisplayAmount;
            let percentage = (Number(slider.lockedDisplayAmount) / Number(originalTotalBudget.value) * 100);
            percentages.push(percentage.toFixed(2));
        }
    });

    percentagesParagraph.textContent = percentages.join(', ');
}