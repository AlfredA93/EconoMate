// Import utility functions from sliderUtils.js
import { calculateTotal, toggleLock, adjustSliders, displaySliderValues, renderPieChart } from './sliderUtils.js';

// Get all lock buttons, sliders, and the total budget input from the DOM
const lockButtons = document.querySelectorAll('.lockButton');
const allSliders = Array.from(document.querySelectorAll('.slider'));
const totalBudgetInput = document.querySelector('#totalBudget');
const originalBudget = document.querySelector('#originalBudget');

// Initialize the original total budget and the unlocked and locked sliders
let originalTotalBudget = { value: Number(totalBudgetInput.value) };
let percentagesParagraph = document.querySelector('.percentages');
let unlockedSliders = [...allSliders];
let lockedSliders = [];

// When the DOM is fully loaded, render the pie chart with fake values
document.addEventListener('DOMContentLoaded', (event) => {
    // Define the categories and fake values
    let categories = ["Housing", "Transportation", "Loan", "Groceries", "Healthcare", "Children", "Savings", "Bills", "Hobbies", "Holidays"];
    let fakeValues = [20, 60, 5, 5, 1, 3, 2, 1, 2, 1]; // Adjust these values as needed

    // Render the pie chart with fake values
    renderPieChart(fakeValues, categories);
    
    // Event listeners for advice buttons
    const bunnyButton = document.getElementById("bunnyButton");
    const friendButton = document.getElementById("friendButton");
    const sociopathButton = document.getElementById("sociopathButton");
    const adviceDiv = document.getElementById("adviceDiv");
    const roundedPercentages = {};
    

    // Define the advice functions
    function generateHousingAdvice(level) {
        let advice = "";
        if (level === "bunny") {
            advice = "<strong><i class='fa-solid fa-carrot'></i> Bunny housing advice:</strong> <br>Consider finding a more affordable place or sharing expenses.";
        } else if (level === "friend") {
            advice = "<strong><i class='fa-regular fa-face-smile'></i> Friend housing advice:</strong> <br>Your housing expenses are rather high. You're going to need to look into ways to reduce these.<br>Maybe consider renting some of your un-used space?";
        } else if (level === "sociopath") {
            advice = "<strong><i class='fa-solid fa-cloud-bolt'></i> Sociopath housing advice:</strong> <br>Converting a van or moving in a whole load of lodgers are looking like strong options for you right now.";
        }
        return advice; 
    }

    function generateTransportationAdvice(level) {
        let advice = "";
        if (level === "bunny") {
            advice = "<strong><i class='fa-solid fa-carrot'></i> Bunny transportation advice:</strong> <br>Your transportation expenses are higher than recommended. <br>Consider using public transportation or carpooling to save money.";
        } else if (level === "friend") {
            advice = "<strong><i class='fa-regular fa-face-smile'></i> Friend transportation advice:</strong> <br>Your transportation costs are a bit high. <br>Look for ways to reduce these expenses, like using a more fuel-efficient vehicle or biking for short trips.";
        } else if (level === "sociopath") {
            advice = "<strong><i class='fa-solid fa-cloud-bolt'></i> Sociopath transportation advice:</strong> <br>Your transportation spending is off the charts. <br>It's time to sell that luxury car and start taking the bus. <br>And if you can't afford the bus, it's time to start cycling or skateboarding!";
        }
        return advice;
    }

    function generateLoanAdvice(level) {
        let advice = "";
        if (level === "bunny") {
            advice = "<strong><i class='fa-solid fa-carrot'></i> Bunny loan advice:</strong> <br>Consider applying for a loan with lower interest rates to reduce your overall debt burden. <br>It's always hard when you're trying to clear debt, but help is available.";
        } else if (level === "friend") {
            advice = "<strong><i class='fa-regular fa-face-smile'></i> Friend loan advice:</strong> <br>Your current loans may have high interest rates. <br>Look into refinancing options to lower your monthly payments.";
        } else if (level === "sociopath") {
            advice = "<strong><i class='fa-solid fa-cloud-bolt'></i> Sociopath loan advice:</strong> <br>What on earth did you need all those loans for?! <br>You're on the brink potential financial catastrophe. <br>Consider selling a kidney, or at very least any of your un-used junk to reduce the debts as fast as possible!";
        }
        return advice;
    }

    function generateGroceriesAdvice(level) {
        let advice = "";
        if (level === "bunny") {
            advice = "<strong><i class='fa-solid fa-carrot'></i> Bunny groceries advice:</strong> <br>Carrots are delicious, and fairly inexpensive. Eat more carrots.";
        } else if (level === "friend") {
            advice = "<strong><i class='fa-regular fa-face-smile'></i> Friend groceries advice: </strong> <br>You're currently spending a larger than advised proportion of your income on groceries. <br>You need to develop strategies to save money here.";
        } else if (level === "sociopath") {
            advice = "<strong><i class='fa-solid fa-cloud-bolt'></i> Sociopath groceries advice:</strong> <br>Step-aside from the avocado and toast. <br>Your spending on food is out-right ridiculous and needs to be reigned in.";
        }
        return advice;
    }

    function generateHealthcareAdvice(level) {
        let advice = "";
        if (level === "bunny") {
            advice = "<strong><i class='fa-solid fa-carrot'></i> Bunny healthcare spending advice:</strong> <br>Set up regular payments and insurance and spread the costs of these outgoings.";
        } else if (level === "friend") {
            advice = "<strong><i class='fa-regular fa-face-smile'></i> Friend healthcare spending advice:</strong> <br>You should look for ways to reduce the spending here. <br>Shop around for insurance, consider changing suppliers and maybe reduce spending on anything cosmetic for the time-being at least.";
        } else if (level === "sociopath") {
            advice = "<strong><i class='fa-solid fa-cloud-bolt'></i> Sociopath healthcare spending advice:</strong> <br>Judging by your spending you are ridiculously accident prone or vain. <br>Staying at home means you'll avoid accidents and seeing people.";
        }
        return advice;
    }

    function generateBillsAdvice(level) {
        let advice = "";
        if (level === "bunny") {
            advice = "<strong><i class='fa-solid fa-carrot'></i> Bunny bills advice: </strong> <br>By reducing your consumption of water, gas and electricity, you will save money and save the planet! <br>Hooray!";
        } else if (level === "friend") {
            advice = "<strong><i class='fa-regular fa-face-smile'></i> Friend bills advice:</strong> <br>Use less water, electricity and gas through trying some tips. <br>Also shop around for the cheapest suppliers.";
        } else if (level === "sociopath") {
            advice = "<strong><i class='fa-solid fa-cloud-bolt'></i> Sociopath bills advice:</strong> <br>Is it time to consider whether you actually need the electricity/gas/water turned on?<br>Get some candles, use a shower timer, or run a long extension lead from your neighbour??";
        }
        return advice;
    }

    function generateChildrenAdvice(level) {
        let advice = "";
        if (level === "bunny") {
            advice = "<strong><i class='fa-solid fa-carrot'></i> Bunny children spending advice:</strong> <br>Offer to set up a form of childcare pool with your other parent friends, or ask relatives if they'll help more for free. <br>Entertaining children can be wonderfully cheap (and often quite fun) if you use your imagination.";
        } else if (level === "friend") {
            advice = "<strong><i class='fa-regular fa-face-smile'></i> Friend children spending advice:</strong> <br>Shop around for cheaper options for childcare and activities. <br>There are a number of websites to help you with this.";
        } else if (level === "sociopath") {
            advice = "<strong><i class='fa-solid fa-cloud-bolt'></i> Sociopath children spending advice:</strong> <br>Is your child still small enough to fit up a chimney? You could put them to use.<br>Alternatively, to avoid financial ruin, you may need to consider adoption?!?";
        }
        return advice;
    }

    function generateSavingsAdvice(level) {
        let advice = "";
        if (level === "bunny") {
            advice = "<strong><i class='fa-solid fa-carrot'></i> Bunny savings advice: </strong><br>More savings now = more carrots in the future!";
        } else if (level === "friend") {
            advice = "<strong><i class='fa-regular fa-face-smile'></i> Friend savings advice:</strong> <br>Do some research and find some good regular savers, so you don't have to remember to move your money each month. <br>It is recommended that around 20% of your monthly income should be put into savings/pensions to secure future financial security. <br>Good luck!";
        } else if (level === "sociopath") {
            advice = "<strong><i class='fa-solid fa-cloud-bolt'></i> Sociopath savings advice:</strong> <br>You are not going to win the lottery or be mentioned in a long-lost-relative's will.<br>You need to actually save some money for the future!";
        }
        return advice;
    }

    function generateHobbiesAdvice(level) {
        let advice = "";
        if (level === "bunny") {
            advice = "<strong><i class='fa-solid fa-carrot'></i> Bunny hobbies advice: </strong><br>You're spending a lot of carrot money on hobbies at the moment. <br>Reduce, reuse and recycle with your crafting hobbies, which is wonderfully eco-friendly too. <br>Physical activities can be cheap or free if you search around. <br>Good luck!";
        } else if (level === "friend") {
            advice = "<strong><i class='fa-regular fa-face-smile'></i> Friend hobbies advice:</strong> <br>There will be ways to reduce this figure if you want to. <br>Shop around for things like gym memberships or consider free meet-ups like ParkRun.<br>Craft and hobby supplies can often be sourced pre-loved, which is a great way to save pennies.";
        } else if (level === "sociopath") {
            advice = "<strong><i class='fa-solid fa-cloud-bolt'></i> Sociopath hobbies advice:</strong> <br>Unless you can figure out how to do these things more inexpensively, you should probably stop.<br>I doubt you were very good at them anyway if your budgeting is anything to go by.";
        }
        return advice;
    }
    
    function generateHolidaysAdvice(level) {
        let advice = "";
        if (level === "bunny") {
            advice = "<strong><i class='fa-solid fa-carrot'></i> Bunny holiday spending advice: </strong><br>So long as this is a one-off, I wouldn't worry your bunny brain too much about this.";
        } else if (level === "friend") {
            advice = "<strong><i class='fa-regular fa-face-smile'></i> Friend holiday spending advice:</strong> <br>Use price comparison websites to ensure you're getting the best deals and spend time choosing destinations wisely. <br>To spread holiday spending, consider having a dedicated account all year round, where you can put money each month.";
        } else if (level === "sociopath") {
            advice = "<strong><i class='fa-solid fa-cloud-bolt'></i> Sociopath holiday spending advice:</strong> <br>STAY. AT. HOME.";
        }
        return advice;
    }

    // Function to determine advice type based on user input percentages and thresholds
    function determineAdviceType(level, roundedPercentages) {
    // Define thresholds for different categories
    const housingThreshold = 40;
    const transportationThreshold = 15;
    const loanThreshold = 15;
    const groceriesThreshold = 15;
    const healthcareThreshold = 10;
    const billsThreshold = 10;
    const childrenTheshold = 50;
    const savingsThreshold = 10; // This one is a minimum target to reach and the advice will need to be different
    const hobbiesThreshold = 20;
    const holidaysThreshold = 50;

    console.log(roundedPercentages)

    // Create an array to store triggered advice
    const triggeredAdvice = [];

    // Check if the Housing percentage exceeds the threshold
    if (roundedPercentages["Housing"] > housingThreshold) {
        // If it exceeds, call the housing advice function
        const housingAdvice = generateHousingAdvice(level, roundedPercentages["Housing"]);
        triggeredAdvice.push(housingAdvice); // Append to triggeredAdvice
    }

    // Check if the Transportation percentage exceeds the threshold
    if (roundedPercentages["Transportation"] > transportationThreshold) {
        // If it exceeds, call the transportation advice function
        const transportationAdvice = generateTransportationAdvice(level, roundedPercentages["Transportation"]);
        triggeredAdvice.push(transportationAdvice); // Append to triggeredAdvice
    }

    // Check if the Loan percentage exceeds the threshold
    if (roundedPercentages["Loan"] > loanThreshold) {
        // If it exceeds, call the loan advice function
        const loanAdvice = generateLoanAdvice(level, roundedPercentages["Loan"]);
        triggeredAdvice.push(loanAdvice); // Append to triggeredAdvice
    }

    // Check if the Groceries percentage exceeds the threshold
    if (roundedPercentages["Groceries"] > groceriesThreshold) {
        // If it exceeds, call the groceries advice function
        const groceriesAdvice = generateGroceriesAdvice(level, roundedPercentages["Groceries"]);
        triggeredAdvice.push(groceriesAdvice); // Append to triggeredAdvice
    }

    // Check if the Healthcare percentage exceeds the threshold
    if (roundedPercentages["Healthcare"] > healthcareThreshold) {
        // If it exceeds, call the healthcare advice function
        const healthcareAdvice = generateHealthcareAdvice(level, roundedPercentages["Healthcare"]);
        triggeredAdvice.push(healthcareAdvice); // Append to triggeredAdvice
    }

    // Check if the Bills percentage exceeds the threshold
    if (roundedPercentages["Bills"] > billsThreshold) {
        // If it exceeds, call the bills advice function
        const billsAdvice = generateBillsAdvice(level, roundedPercentages["Bills"]);
        triggeredAdvice.push(billsAdvice); // Append to triggeredAdvice
    }

    // Check if the Children spending percentage exceeds the threshold
    if (roundedPercentages["Children"] > childrenTheshold) {
        // If it exceeds, call the children spending advice function
        const childrenAdvice = generateChildrenAdvice(level, roundedPercentages["Children"]);
        triggeredAdvice.push(childrenAdvice); // Append to triggeredAdvice
    }

    // Check if the Savings percentage is lower than the threshold
    if (roundedPercentages["Savings"] < savingsThreshold) {
        // If it's lower, call the savings advice function
        const savingsAdvice = generateSavingsAdvice(level, roundedPercentages["Savings"]);
        triggeredAdvice.push(savingsAdvice); // Append to triggeredAdvice
    }

    // Check if the Hobbies percentage exceeds the threshold
    if (roundedPercentages["Hobbies"] > hobbiesThreshold) {
        // If it exceeds, call the hobbies advice function
        const hobbiesAdvice = generateHobbiesAdvice(level, roundedPercentages["Hobbies"]);
        triggeredAdvice.push(hobbiesAdvice); // Append to triggeredAdvice
    }

    // Check if the Holidays percentage exceeds the threshold
    if (roundedPercentages["Holidays"] > holidaysThreshold) {
        // If it exceeds, call the holidays advice function
        const holidaysAdvice = generateHolidaysAdvice(level, roundedPercentages["Holidays"]);
        triggeredAdvice.push(holidaysAdvice); // Append to triggeredAdvice
    }

    // Combine all triggered advice into one string
    const combinedAdvice = triggeredAdvice.join('<br>');

    // If any advice was triggered, return the combined advice
    if (combinedAdvice) {
        return combinedAdvice;
    } else {
        // If no thresholds are triggered, return generic advice based on the level
        if (level === "bunny") {
            return "Bunny advice: Everything is looking great, keep being your awesome self!";
        } else if (level === "friend") {
            return "Friend advice: You're not triggering any warnings. You are considered financially healthy. Well done!";
        } else if (level === "sociopath") {
            return "Sociopath advice: Let's be honest, you knew this was ok already. You're just looking for praise and affirmation, aren't you? Here you go then.... (*slow claps*)";
        }
    }
}


    let level = ""; // Initialize the level variable

    bunnyButton.addEventListener("click", function () {
        level = "bunny";
        if (!originalTotalBudget.value) {
            // Display a message to input the Total Budget first
            adviceDiv.textContent = "You seem to have forgotten to fill in important details.";
        } else {
            allSliders.forEach((slider, index) => {
                const displayAmount = slider.parentElement.querySelector('.displayAmount');
                const category = categories[index];
                const percentage = (Number(displayAmount.value) / totalBudgetInput.value) * 100;
                roundedPercentages[category] = Math.round(percentage);
            });
            console.log("User input percentages:", roundedPercentages);
            // Determine advice type based on level and user input percentages
            const advice = determineAdviceType(level, roundedPercentages);
            // Display the determined advice
            adviceDiv.innerHTML = advice;
        }
    });

    friendButton.addEventListener("click", function () {
        level = "friend";
        if (!originalTotalBudget.value) {
            // Display a message to input the Total Budget first
            adviceDiv.textContent = "Please input the Total Budget before getting advice.";
        } else {
            allSliders.forEach((slider, index) => {
                const displayAmount = slider.parentElement.querySelector('.displayAmount');
                const category = categories[index];
                const percentage = (Number(displayAmount.value) / totalBudgetInput.value) * 100;
                roundedPercentages[category] = Math.round(percentage);
            });
            console.log("User input percentages:", roundedPercentages);
            // Determine advice type based on level and user input percentages
            const advice = determineAdviceType(level, roundedPercentages);
            // Display the determined advice
            adviceDiv.innerHTML = advice;
        }
    });

    sociopathButton.addEventListener("click", function () {
        level = "sociopath";
        if (!originalTotalBudget.value) {
            // Display a message to input the Total Budget first
            adviceDiv.textContent = "Stop pretending you don't know how forms work and put some values in. Don't be an impatient little weirdo!";
        } else {
            allSliders.forEach((slider, index) => {
                const displayAmount = slider.parentElement.querySelector('.displayAmount');
                const category = categories[index];
                const percentage = (Number(displayAmount.value) / totalBudgetInput.value) * 100;
                roundedPercentages[category] = Math.round(percentage);
            });
            console.log("User input percentages:", roundedPercentages);
            // Determine advice type based on level and user input percentages
            const advice = determineAdviceType(level, roundedPercentages);
            // Display the determined advice
            adviceDiv.innerHTML = advice;
        }
    });
});

// When the total budget input value changes, update the original total budget and display it

totalBudgetInput.addEventListener('change', function() {
    originalTotalBudget.value = Number(this.value);
    originalBudget.value = this.value;
});

// When the original budget input value changes, update the total budget
originalBudget.addEventListener('change', function() {
    totalBudgetInput.value = this.value;
    originalTotalBudget.value = Number(this.value);
});
// Add a click event listener to each lock button to toggle the lock
lockButtons.forEach((lockButton, index) => {
    lockButton.addEventListener('click', function() {
        toggleLock(this, index, allSliders, unlockedSliders, lockedSliders, totalBudgetInput,originalTotalBudget);
    });
});

// Add an input event listener to each slider to adjust the sliders and display their values
allSliders.forEach((slider, index) => {
    slider.addEventListener('input', function() {
        adjustSliders(this, unlockedSliders, totalBudgetInput, originalTotalBudget);
        displaySliderValues(allSliders, totalBudgetInput, originalTotalBudget, percentagesParagraph);
    });

    // Add a change event listener to each display amount input to update the corresponding slider and the other sliders
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
        // Update the total budget input value
        totalBudgetInput.value = remainingBudget;
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