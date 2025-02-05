/* sankey-diagram.js */

// Global variable to store the Sankey Chart instance
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

// Text descriptions for each option
const sankeyText = {
  'option1': "This Sankey diagram represents the energy flow for Option 1. It shows the distribution from source A to targets B and C with specified flows.",
  'option2': "Option 2 focuses on material flow, highlighting the flow of materials from X to Y and Z with the respective values of flow between these entities.",
  'option3': "This Sankey diagram for Option 3 illustrates waste management, including the flows between recycling and landfill systems."
};

// Function to hide the Sankey chart container and destroy the chart instance
function hideSankeyChart() {
  const chartContainer = document.querySelector('.chart-container');
  if (chartContainer) {
    chartContainer.style.display = 'none';
  }
  if (sankeyChart) {
    sankeyChart.destroy();
    sankeyChart = null;
  }
}

// Function to hide the Scenarios section
function hideScenarios() {
  const scenariosContainer = document.querySelector('.scenarios-container');
  if (scenariosContainer) {
    scenariosContainer.style.display = 'none';
  }
}

// Function to hide the MCA section (container and table)
function hideMCA() {
  const mcaContainer = document.querySelector('.mca-container');
  if (mcaContainer) {
    mcaContainer.style.display = 'none';
  }
}

// Function to show the Sankey diagram based on the selected option
function showSankeyDiagram() {
  // Hide other sections (MCA and Scenarios)
  hideMCA();
  hideScenarios();

  // Get the selected option from the dropdown
  const selectedOption = document.getElementById('residueStream').value;
  const sankeyInfo = sankeyData[selectedOption];
  const sankeyDescription = sankeyText[selectedOption];

  // Display the Sankey chart container
  const chartContainer = document.querySelector('.chart-container');
  chartContainer.style.display = 'block';

  // Update the text description in the sankey-text-container
  document.getElementById('sankey-text-container').innerText = sankeyDescription;

  // Delay chart creation slightly (to ensure proper canvas sizing)
  setTimeout(() => {
    // Destroy the existing chart instance if it exists
    if (sankeyChart) {
      sankeyChart.destroy();
    }
    // Create the new Sankey diagram
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
  }, 200); // Small delay to ensure canvas visibility
}
