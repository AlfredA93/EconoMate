

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