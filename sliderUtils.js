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
}
export function displaySliderValues(allSliders, totalBudgetInput, originalTotalBudget, percentagesParagraph) {
    let totalBudget = Number(totalBudgetInput.value);
    let percentages = [];

    allSliders.forEach(slider => {
        // If slider.parentElement is undefined, skip this iteration
        if (!slider.parentElement) {
            return;
        }

        let displayAmount = slider.parentElement.querySelector('.displayAmount');
        let amount;
        if (!slider.disabled) {
            amount = (slider.value / 100 * totalBudget).toFixed(2);
            displayAmount.value = amount;
        } else {
            displayAmount.value = slider.lockedDisplayAmount;
        }
        let percentage = (Number(displayAmount.value) / Number(originalTotalBudget.value) * 100);
        percentages.push(percentage.toFixed(2));
    });




    // Calculate the actual budget amounts for each category
    let budgetAmounts = percentages.map(percentage => parseFloat((percentage / 100 * originalTotalBudget.value).toFixed(2)));

    let categories = ["Housing", "Transportation", "Loan", "Living Groceries", "Healthcare", "Children", "Savings", "Bills", "Hobbies", "Holidays"];

    // Calculate the total budget used so far
    let totalUsedBudget = budgetAmounts.reduce((a, b) => a + b, 0);

    // Calculate the remaining budget
    let remainingBudget = originalTotalBudget.value - totalUsedBudget;

    // If there are fewer budgetAmounts than categories, add a single slice for the remaining budget
    if (budgetAmounts.length < categories.length) {
        budgetAmounts.push(remainingBudget);
        categories.push("Remaining Budget");
    }


    if (budgetAmounts.length === 0) {
        renderPieChart([], []);
    } else {
        // Calculate the total budget used so far
        let totalUsedBudget = budgetAmounts.reduce((a, b) => a + b, 0);

        // Calculate the remaining budget
        let remainingBudget = originalTotalBudget.value - totalUsedBudget;

        // If there are fewer budgetAmounts than categories, add a single slice for the remaining budget
        if (budgetAmounts.length < categories.length) {
            budgetAmounts.push(remainingBudget);
            categories.push("Remaining Budget");
        }

        // Call the new function to render the pie chart
        renderPieChart(budgetAmounts, categories);
    }

    return percentages.map(Number);
}

export function renderPieChart(budgetAmounts, categories) {
    let colors = ['#77AAAD', '#EE8866', '#EEDD88', '#FFAABB', '#99DDFF', 
    '#44BB99', '#BBCC33', '#AAAA00', '#DDDDDD', '#fde35a'];

    let series = budgetAmounts.map((amount, index) => {
    return { 
    values: [amount], 
    text: categories[index],  // This will be used as the label
    backgroundColor: colors[index % colors.length],  // Set the color for this slice
    // Add this to display the label on the chart
    tooltip: {
    text: `${categories[index]}: $${amount}`
            }
        };
    });

    let myConfig = {
        type: 'pie',
        title: {
            text: 'Budget Distribution',
            fontFamily: 'Wire One',
            fontSize: 60,
        },
        // backgroundColor:'#1f8275',
        series: series,
        plot: {
            sizeFactor: 100,
            tooltip: {
                text: "%t: %v (%npv%)",
                decimals: 2,
                thousandSeparator: ","
            },
            valueBox: {
                placement: 'out',
                text: '%t\n%npv%',
                // fontFamily: 'Wire One',
                fontSize: 20,
            },

        },
    };

    // Render the chart
    zingchart.render({
        id: 'myChart',
        data: myConfig
    });
}