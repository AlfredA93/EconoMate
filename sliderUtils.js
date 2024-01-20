let percentages =[]
let budgetAmounts =[]

// This function calculates the total value of all unlocked sliders
export function calculateTotal(unlockedSliders) {
    // Initialize a variable to hold the total value
    let total = 0;

    // Loop through each slider in the unlockedSliders array
    unlockedSliders.forEach(slider => {
        // Add the value of the current slider to the total
        // The slider value is converted to a number before adding
        total += Number(slider.value);
    });

    // Return the total value
    return total;
}

// This function toggles the lock status of a slider
export function toggleLock(lockButton, index, allSliders, unlockedSliders, lockedSliders, totalBudgetInput, originalTotalBudget) {
    // Toggle the 'locked' class on the lock button
    lockButton.classList.toggle('locked');

    // Disable or enable the slider based on whether it's locked
    allSliders[index].disabled = lockButton.classList.contains('locked');

    // Get the lock icon element
    let icon = lockButton.querySelector('.lock-icon');   

    // Convert the total budget input value to a number
    let totalBudget = Number(totalBudgetInput.value);

    // Get the display amount element
    let displayAmount = allSliders[index].parentElement.querySelector('.displayAmount');

    // If the slider is locked
    if (lockButton.classList.contains('locked')) {
        // Change the icon to a lock
        icon.classList.remove('fa-unlock');
        icon.classList.add('fa-lock');

        // Store the current display amount in case the slider is unlocked later
        allSliders[index].lockedDisplayAmount = Number(displayAmount.value);

        // Find the index of the slider in the unlocked sliders array
        let sliderIndex = unlockedSliders.indexOf(allSliders[index]);

        // If the slider is in the unlocked sliders array
        if (sliderIndex > -1) {
            // Remove the slider from the unlocked sliders array
            unlockedSliders.splice(sliderIndex, 1);

            // Add the slider to the locked sliders array
            lockedSliders.push(allSliders[index]);

            // Store the current slider value in case the slider is unlocked later
            allSliders[index].lockedValue = Number(allSliders[index].value);

            // Calculate the remaining budget
            let remainingBudget = totalBudget - allSliders[index].lockedValue;

            // Calculate the percentage of the remaining budget that each unlocked slider should receive
            let remainingPercentage = (remainingBudget / totalBudget) * 100 / unlockedSliders.length;

            // Set the value of the unlocked sliders to this percentage
            unlockedSliders.forEach(slider => {
                slider.value = remainingPercentage;
            });

            // Calculate the amount to subtract from the total budget
            let subtractedAmount = allSliders[index].lockedValue / 100 * totalBudget;

            // Store the subtracted amount in case the slider is unlocked later
            allSliders[index].subtractedAmount = subtractedAmount;

            // Subtract the amount from the total budget
            totalBudget -= subtractedAmount;
        }

    // If the slider is unlocked
    } else {
        // Change the icon to an unlock
        icon.classList.remove('fa-lock');
        icon.classList.add('fa-unlock');

        // Find the index of the slider in the locked sliders array
        let sliderIndex = lockedSliders.indexOf(allSliders[index]);

        // If the slider is in the locked sliders array
        if (sliderIndex > -1) {
            // Remove the slider from the locked sliders array
            lockedSliders.splice(sliderIndex, 1);

            // Add the slider to the unlocked sliders array
            unlockedSliders.push(allSliders[index]);

            // Add the subtracted amount back to the total budget
            totalBudget += allSliders[index].subtractedAmount;
        }
    }

    // Update the total budget input value
    totalBudgetInput.value = totalBudget.toFixed(2);

    // Dispatch an input event on the slider to update any event listeners
    allSliders[index].dispatchEvent(new Event('input'));
}
// This function adjusts the values of all sliders when one slider's value is changed
export function adjustSliders(slider, unlockedSliders, totalBudgetInput, originalTotalBudget) {
    // Convert the total budget input value to a number
    let totalBudget = Number(totalBudgetInput.value);

    // Calculate the total value of all unlocked sliders
    let total = calculateTotal(unlockedSliders);

    // Calculate the excess value by subtracting 100 from the total
    let excess = total - 100;

    // If the total value of all sliders is more than 100
    if (excess > 0) {
        // Calculate the total value of all sliders except the one that was changed
        let totalOtherSliders = total - slider.value;

        // Loop through each slider in the unlockedSliders array
        unlockedSliders.forEach(otherSlider => {
            // If the slider is not the one that was changed
            if (otherSlider !== slider) {
                // Calculate the proportion of the total other sliders value that this slider represents
                let proportion = otherSlider.value / totalOtherSliders;

                // Subtract the excess value from this slider based on its proportion of the total
                otherSlider.value = (otherSlider.value - excess * proportion).toFixed(2);
            }
        });
    // If the total value of all sliders is less than 100
    } else if (excess < 0) {
        // Calculate the total value of all sliders except the one that was changed
        let totalOtherSliders = total - slider.value;

        // Loop through each slider in the unlockedSliders array
        unlockedSliders.forEach(otherSlider => {
            // If the slider is not the one that was changed
            if (otherSlider !== slider) {
                // Calculate the proportion of the total other sliders value that this slider represents
                let proportion = otherSlider.value / totalOtherSliders;

                // Add the absolute value of the excess to this slider based on its proportion of the total
                otherSlider.value = (otherSlider.value - excess * proportion).toFixed(2);
            }
        });
    }
}
// This function displays the values of all sliders and updates the pie chart
export function displaySliderValues(allSliders, totalBudgetInput, originalTotalBudget) {
    // Convert the total budget input value to a number
    let totalBudget = Number(totalBudgetInput.value);
     
    percentages = []
    // Initialize an array to hold the percentages of each slider


    // Loop through each slider in the allSliders array
    allSliders.forEach(slider => {
        // If slider.parentElement is undefined, skip this iteration
        if (!slider.parentElement) {
            return;
        }

        // Get the display amount element
        let displayAmount = slider.parentElement.querySelector('.displayAmount');
        let amount;

        // If the slider is not disabled
        if (!slider.disabled) {
            // Calculate the amount that this slider represents of the total budget
            amount = (slider.value / 100 * totalBudget).toFixed(2);

            // Update the display amount value
            displayAmount.value = amount;
        } else {
            // If the slider is disabled, use the locked display amount
            displayAmount.value = slider.lockedDisplayAmount;
        }

        // Calculate the percentage that this slider represents of the original total budget
        let percentage = (Number(displayAmount.value) / Number(originalTotalBudget.value) * 100);

        // Add the percentage to the percentages array
        percentages.push(percentage.toFixed(2));
    });

    // Calculate the actual budget amounts for each category
    budgetAmounts = percentages.map(percentage => parseFloat((percentage / 100 * originalTotalBudget.value).toFixed(2)));

    // Define the categories
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

    // If there are no budget amounts
    if (budgetAmounts.length === 0) {
        // Render an empty pie chart
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

        // Render the pie chart with the budget amounts and categories
        renderPieChart(budgetAmounts, categories);
    }

    // Return the percentages array with each percentage converted to a number
    return percentages.map(Number);
}

// This function renders a pie chart with the given budget amounts and categories
export function renderPieChart(budgetAmounts, categories) {
    // Define the colors for the pie chart slices
    let colors = ['#77AAAD', '#EE8866', '#EEDD88', '#FFAABB', '#99DDFF', 
    '#44BB99', '#BBCC33', '#AAAA00', '#DDDDDD', '#fde35a'];

    // Map the budget amounts to a series of objects for the pie chart
    let series = budgetAmounts.map((amount, index) => {
        return { 
            values: [amount],  // The value of this slice
            text: categories[index],  // The label for this slice
            backgroundColor: colors[index % colors.length],  // The color for this slice
            tooltip: {
                text: `${categories[index]}: $${amount}`  // The tooltip text for this slice
            }
        };
    });

    // Define the configuration for the pie chart
    let myConfig = {
        type: 'pie',  // The type of chart
        title: {
            text: 'Budget Distribution',  // The title of the chart
            fontFamily: 'Wire One',  // The font for the title
            fontSize: 60,  // The font size for the title
        },
        series: series,  // The series data for the chart
        plot: {
            sizeFactor: 100,  // The size of the chart
            tooltip: {
                text: "%t: %v (%npv%)",  // The format for the tooltip text
                decimals: 2,  // The number of decimal places to display in the tooltip
                thousandSeparator: ","  // The thousand separator for the tooltip
            },
            valueBox: {
                placement: 'out',  // The placement of the value box
                text: '%t\n%npv%',  // The format for the value box text
                fontSize: 20,  // The font size for the value box
            },
        },
    };

    // Render the chart with the given configuration
    zingchart.render({
        id: 'myChart',  // The id of the element to render the chart in
        data: myConfig  // The configuration for the chart
    });
}