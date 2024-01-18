

let myConfig = { // This is
    type: 'pie',
    title: {
      text: 'Budget Breakdown',
      fontSize: 24,
    },
    legend: {
      draggable: true,
    },
    plot: {
      // Animation docs here:
      // https://www.zingchart.com/docs/tutorials/styling/animation#effect
      animation: {
        effect: 'ANIMATION_EXPAND_BOTTOM',
        method: 'ANIMATION_STRONG_EASE_OUT',
        sequence: 'ANIMATION_BY_NODE',
        speed: 275,
      }
    },
    series: [ // Category data to be shown
      {
        values: [23],
        text: 'Food',
      },
      {
        values: [35],
        text: 'Groceries'
      },
      {
        values: [65],
        text: 'Rent'
      }
    ]
  };

zingchart.render({
    id: 'myChart',
    data: myConfig,
  });

// Add and calculate the values
document.addEventListener("DOMContentLoaded", function() {
  const calculateButton = document.getElementById("calculate");
  const monthlyRevenueInput = document.getElementById("monthlyRevenue");
  const housingInput = document.getElementById("housing");
  const housingPercentage = document.getElementById("housingPercentage");
  const transportationInput = document.getElementById("transportation");
  const transportationPercentage = document.getElementById("transportationPercentage");
  const loanInput = document.getElementById("loan");
  const loanPercentage = document.getElementById("loanPercentage");
  const livingExpensesInput = document.getElementById("livingExpenses");
  const livingExpensesPercentage = document.getElementById("livingExpensesPercentage");
  const healthcareInput = document.getElementById("healthcare");
  const healthcarePercentage = document.getElementById("healthcarePercentage");
  const childrenInput = document.getElementById("children");
  const childrenPercentage = document.getElementById("childrenPercentage");
  const savingsInput = document.getElementById("savings");
  const savingsPercentage = document.getElementById("savingsPercentage");
  const hobbiesSportsInput = document.getElementById("hobbiesSports");
  const hobbiesSportsPercentage = document.getElementById("hobbiesSportsPercentage");
  const holidaysInput = document.getElementById("holidays");
  const holidaysPercentage = document.getElementById("holidaysPercentage");
  const remainderInput = document.getElementById("remainder");

  calculateButton.addEventListener("click", function() {
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

      const totalExpenses = housing + transportation + loan + livingExpenses + healthcare + children + savings + hobbiesSports + holidays;
      const remainder = monthlyRevenue - totalExpenses;

      remainderInput.value = remainder.toFixed(2);

      // Show percentage fields after calculation
      housingPercentage.style.display = "block";
      transportationPercentage.style.display = "block";
      loanPercentage.style.display = "block";
      livingExpensesPercentage.style.display = "block";
      healthcarePercentage.style.display = "block";
      childrenPercentage.style.display = "block";
      savingsPercentage.style.display = "block";
      hobbiesSportsPercentage.style.display = "block";
      holidaysPercentage.style.display = "block";

      if (monthlyRevenue !== 0) {
          housingPercentage.value = ((housing / monthlyRevenue) * 100).toFixed(2) + "%";
          transportationPercentage.value = ((transportation / monthlyRevenue) * 100).toFixed(2) + "%";
          loanPercentage.value = ((loan / monthlyRevenue) * 100).toFixed(2) + "%";
          livingExpensesPercentage.value = ((livingExpenses / monthlyRevenue) * 100).toFixed(2) + "%";
          healthcarePercentage.value = ((healthcare / monthlyRevenue) * 100).toFixed(2) + "%";
          childrenPercentage.value = ((children / monthlyRevenue) * 100).toFixed(2) + "%";
          savingsPercentage.value = ((savings / monthlyRevenue) * 100).toFixed(2) + "%";
          hobbiesSportsPercentage.value = ((hobbiesSports / monthlyRevenue) * 100).toFixed(2) + "%";
          holidaysPercentage.value = ((holidays / monthlyRevenue) * 100).toFixed(2) + "%";
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
  });
});

