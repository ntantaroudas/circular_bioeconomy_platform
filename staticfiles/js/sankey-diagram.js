// Global variable to store the chart instance
let sankeyChart;

// Sample data for Sankey diagrams based on the selected option
const sankeyData = {
  'option1': {
    labels: ['A', 'B', 'C'],
    data: [
      { from: 'A', to: 'B', flow: 10 },
      { from: 'A', to: 'C', flow: 5 },
      { from: 'B', to: 'C', flow: 15 },
    ]
  },
  'option2': {
    labels: ['X', 'Y', 'Z'],
    data: [
      { from: 'X', to: 'Y', flow: 20 },
      { from: 'X', to: 'Z', flow: 10 },
      { from: 'Y', to: 'Z', flow: 25 },
    ]
  },
  'option3': {
    labels: ['Source', 'Recycling', 'Landfill'],
    data: [
      { from: 'Source', to: 'Recycling', flow: 30 },
      { from: 'Source', to: 'Landfill', flow: 15 },
      { from: 'Recycling', to: 'Landfill', flow: 10 },
    ]
  }
};

// Function to show Sankey diagram based on selected option
function showSankeyDiagram() {
  // Get the selected value from the dropdown
  const selectedOption = document.getElementById('residueStream').value;

  // Get the corresponding Sankey data
  const sankeyInfo = sankeyData[selectedOption];

  // Display the Sankey chart container by setting display: block;
  document.querySelector('.chart-container').style.display = 'block';

  // Destroy the existing chart instance if it exists
  if (sankeyChart) {
    sankeyChart.destroy();
  }

  // Create the Sankey diagram
  const ctx = document.getElementById('sankeyChart').getContext('2d');
  sankeyChart = new Chart(ctx, {
    type: 'sankey',
    data: {
      labels: sankeyInfo.labels,
      datasets: [{
        label: 'Flow',
        data: sankeyInfo.data,
        colorFrom: '#c0dfe1',
        colorTo: '#70c5c7',
        borderWidth: 1,
        borderColor: '#000',
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.raw.from} → ${context.raw.to}: ${context.raw.flow}`;
            }
          }
        }
      }
    }
  });
}
