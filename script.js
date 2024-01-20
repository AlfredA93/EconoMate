// Add and calculate the values
document.addEventListener("DOMContentLoaded", function () {
  const calculateButton = document.getElementById("calculate");
  const monthlyRevenueInput = document.getElementById("monthlyRevenue");
  const housingInput = document.getElementById("housing");
  const housingPercentage = document.getElementById("housingPercentage");
  const transportationInput = document.getElementById("transportation");
  const transportationPercentage = document.getElementById(
    "transportationPercentage"
  );
  const loanInput = document.getElementById("loan");
  const loanPercentage = document.getElementById("loanPercentage");
  const livingExpensesInput = document.getElementById("livingExpenses");
  const livingExpensesPercentage = document.getElementById(
    "livingExpensesPercentage"
  );
  const healthcareInput = document.getElementById("healthcare");
  const healthcarePercentage = document.getElementById("healthcarePercentage");
  const childrenInput = document.getElementById("children");
  const childrenPercentage = document.getElementById("childrenPercentage");
  const savingsInput = document.getElementById("savings");
  const savingsPercentage = document.getElementById("savingsPercentage");
  const hobbiesSportsInput = document.getElementById("hobbiesSports");
  const hobbiesSportsPercentage = document.getElementById(
    "hobbiesSportsPercentage"
  );
  const holidaysInput = document.getElementById("holidays");
  const holidaysPercentage = document.getElementById("holidaysPercentage");
  const remainderInput = document.getElementById("remainder");

  const bunnyButton = document.getElementById("bunnyButton");
  const friendButton = document.getElementById("friendButton");
  const sociopathButton = document.getElementById("sociopathButton");
  const adviceDiv = document.getElementById("adviceDiv");

  let level = "none";
  // Event listeners for advice buttons
  bunnyButton.addEventListener("click", function () {
    level = "bunny";
    determineAdviceType();
  });

  friendButton.addEventListener("click", function () {
    level = "friend";
    determineAdviceType();
  });

  sociopathButton.addEventListener("click", function () {
    level = "sociopath";
    determineAdviceType();
  });

  calculateButton.addEventListener("click", function () {
    const monthlyRevenue = parseFloat(monthlyRevenueInput.value);
    const housing = parseFloat(housingInput.value) || 0;
    const transportation = parseFloat(transportationInput.value) || 0;
    const loan = parseFloat(loanInput.value) || 0;
    const livingExpenses = parseFloat(livingExpensesInput.value) || 0;
    const healthcare = parseFloat(healthcareInput.value) || 0;
    const children = parseFloat(childrenInput.value) || 0;
    const savings = parseFloat(savingsInput.value) || 0;
    const hobbiesSports = parseFloat(hobbiesSportsInput.value) || 0;
    const holidays = parseFloat(holidaysInput.value) || 0;

    const totalExpenses =
      housing +
      transportation +
      loan +
      livingExpenses +
      healthcare +
      children +
      savings +
      hobbiesSports +
      holidays;
    const remainder = monthlyRevenue - totalExpenses;

    remainderInput.value = remainder.toFixed(2);

    // Show percentage fields after calculation
    // housingPercentage.style.display = "block";
    // transportationPercentage.style.display = "block";
    // loanPercentage.style.display = "block";
    // livingExpensesPercentage.style.display = "block";
    // healthcarePercentage.style.display = "block";
    // childrenPercentage.style.display = "block";
    // savingsPercentage.style.display = "block";
    // hobbiesSportsPercentage.style.display = "block";
    // holidaysPercentage.style.display = "block";

    if (monthlyRevenue !== 0) {
      housingPercentage.value =
        ((housing / monthlyRevenue) * 100).toFixed(2) + "%";
      transportationPercentage.value =
        ((transportation / monthlyRevenue) * 100).toFixed(2) + "%";
      loanPercentage.value = ((loan / monthlyRevenue) * 100).toFixed(2) + "%";
      livingExpensesPercentage.value =
        ((livingExpenses / monthlyRevenue) * 100).toFixed(2) + "%";
      healthcarePercentage.value =
        ((healthcare / monthlyRevenue) * 100).toFixed(2) + "%";
      childrenPercentage.value =
        ((children / monthlyRevenue) * 100).toFixed(2) + "%";
      savingsPercentage.value =
        ((savings / monthlyRevenue) * 100).toFixed(2) + "%";
      hobbiesSportsPercentage.value =
        ((hobbiesSports / monthlyRevenue) * 100).toFixed(2) + "%";
      holidaysPercentage.value =
        ((holidays / monthlyRevenue) * 100).toFixed(2) + "%";
    } else {
      housingPercentage.value = "0%";
      transportationPercentage.value = "0%";
      loanPercentage.value = "0%";
      livingExpensesPercentage.value = "0%";
      healthcarePercentage.value = "0%";
      childrenPercentage.value = "0%";
      savingsPercentage.value = "0%";
      hobbiesSportsPercentage.value = "0%";
      holidaysPercentage.value = "0%";
    }

    // Add a warning if expenses exceed income
    if (remainder < 0) {
      const overBudgetAmount = Math.abs(remainder).toFixed(2);
      alert(`Warning: You are $${overBudgetAmount} over budget!`);
    }

    const housingPercentageValue = parseFloat(housingPercentage.value);

    if (housingPercentageValue > housingThreshold) {
      // If housing expenses are more than the threshold
      housingPercentage.value = housingPercentageValue + "%";
      // Show housing advice based on the selected level
      generateHousingAdvice(level);
    } else {
      // If housing expenses are at or below the threshold, show the default advice
      housingPercentage.value = housingPercentageValue + "%";
      determineAdviceType();
    }
  });

  function determineAdviceType() {
    if (housingPercentageValue > housingThreshold && level !== "none") {
      // If housing expenses are more than the threshold and level is not "none"
      generateHousingAdvice(level);
    } else {
      // Otherwise, show the default advice based on the selected level
      generateAdvice(level);
    }
  }
  
    function generateAdvice(level) {
      let advice = "";
      if (level === "bunny") {
        advice = "Bunny advice: Everything is looking great, keep being your awesome self!";
      } else if (level === "friend") {
        advice = "Friend advice: You're not triggering any warnings. You are considered financially healthy. Well done!";
      } else if (level === "sociopath") {
        advice = "Sociopath advice: Let's be honest, you knew this was ok already. You're just looking for praise and affirmation, aren't you? Here you go then.... (*slow claps*)";
      } else {
        advice = `${level} advice test (representing the 'else' statement): ...`;
      }
      // Display advice in the adviceDiv
      adviceDiv.textContent = advice;
    }

    function generateHousingAdvice(level) {
      let advice = "";
      if (level === "bunny") {
        advice = "Bunny housing advice: Consider finding a more affordable place or sharing expenses.";
      } else if (level === "friend") {
        advice = "Friend housing advice: Your housing expenses are rather high. You're going to need to look into ways to reduce these.<br>Maybe consider renting some of your un-used space?";
      } else if (level === "sociopath") {
        advice = "Sociopath housing advice: Converting a van or moving in a whole load of lodgers are looking like strong options for you right now.";
      }
      adviceDiv.innerHTML = advice;
    }

    // Pie Chart Configuration

    let myConfig = {
      type: "pie",
      title: {
        text: "Budget Breakdown",
        fontSize: 24,
      },
      legend: {
        draggable: true,
      },
      plot: {
        // Animation docs here:
        // https://www.zingchart.com/docs/tutorials/styling/animation#effect
        animation: {
          effect: "ANIMATION_EXPAND_BOTTOM",
          method: "ANIMATION_STRONG_EASE_OUT",
          sequence: "ANIMATION_BY_NODE",
          speed: 275,
        },
      },
      series: [
        // Category data to be shown
        {
          values: [healthcare],
          text: "Healthcare",
        },
        {
          values: [livingExpenses],
          text: "Living Costs",
        },
        {
          values: [transportation],
          text: "Transport",
        },
        {
            values: [holidays],
            text: "Holidays",
          },
          {
            values: [hobbiesSports],
            text: "Hobbies",
          },
          {
            values: [savings],
            text: "Savings",
          },
          {
            values: [children],
            text: "Children",
          },
          {
            values: [housing],
            text: "Housing",
          },
          {
            values: [loan],
            text: "Loan",
          },
          {
            values: [remainder],
            text: "Remainder",
          },
      ],
    };

    zingchart.render({
      id: "myChart",
      data: myConfig,
    });
  });
