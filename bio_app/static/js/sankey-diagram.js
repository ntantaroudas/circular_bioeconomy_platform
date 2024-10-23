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


// Text descriptions for each option
const sankeyText = {
  'option1': "This Sankey diagram represents the energy flow for Option 1. It shows the distribution from source A to targets B and C with specified flows.",
  'option2': "Option 2 focuses on material flow, highlighting the flow of materials from X to Y and Z with the respective values of flow between these entities.",
  'option3': "This Sankey diagram for Option 3 illustrates waste management, including the flows between recycling and landfill systems."
};

// Function to hide the Sankey chart
function hideSankeyChart() {
  // Hide the Sankey chart container
  document.querySelector('.chart-container').style.display = 'none';

  // Destroy the existing chart instance if it exists
  if (sankeyChart) {
    sankeyChart.destroy();
  }
}

// Function to hide the Scenarios section
function hideScenarios() {
  const scenariosSection = document.querySelector('.scenarios-container');
  if (scenariosSection) {
    scenariosSection.style.display = 'none';
  } else {
    console.warn('Scenarios section not found.');
  }
}

// Function to hide MCA section
function hideMCA() {
  document.querySelector('.mca-container').style.display = 'none';
}

// Function to show Sankey diagram based on selected option
function showSankeyDiagram() {
  // Hide other sections (MCA and Scenarios)
  hideMCA();  // Hides MCA section
  hideScenarios();  // Hides Scenarios section

  // Get the selected value from the dropdown
  const selectedOption = document.getElementById('residueStream').value;

  // Get the corresponding Sankey data
  const sankeyInfo = sankeyData[selectedOption];

  // Get the corresponding text for the selected option
  const sankeyDescription = sankeyText[selectedOption];

  // Display the Sankey chart container by setting display: block;
  const chartContainer = document.querySelector('.chart-container');
  chartContainer.style.display = 'block';  // Make container visible

  // Update the text description in the sankey-text-container
  document.getElementById('sankey-text-container').innerText = sankeyDescription;


  // Delay the chart creation slightly to ensure it can properly calculate the canvas size
  setTimeout(() => {
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
  }, 200); // Set a small delay (200ms) to ensure visibility before rendering
}

// Function to show the MCA diagram and hide others
function showMCADiagram() {
  // Hide the Sankey chart
  hideSankeyChart();
  
  // Hide Scenarios section if needed
  hideScenarios();

  // Show the MCA diagram here
  document.querySelector('.mca-container').style.display = 'block';

  // Add your MCA chart generation logic here
}

// Function to show Scenarios section and hide others
function showScenarios() {
  // Hide the Sankey chart
  hideSankeyChart();

  // Hide MCA section
  hideMCA();

  // Show the Scenarios section (add your logic here)
  document.querySelector('.scenarios-container').style.display = 'block';
}
