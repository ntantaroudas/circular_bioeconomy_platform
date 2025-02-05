/* mca-diagram.js */

// Global variable to store the MCA Sankey chart instance
let mcaSankeyChart;

// Sample data for MCA Analysis based on the selected option
const mcaData = {
  'option1': {
    labels: ['A', 'B', 'C'],
    data: [
      { from: 'A', to: 'B', flow: 10 },
      { from: 'A', to: 'C', flow: 5 },
      { from: 'B', to: 'C', flow: 15 },
    ],
    table: [
      { source: 'A', target: 'B', unit: 'Mt/a', value: 10, timeStep: 2, label: 'Chipping' },
      { source: 'A', target: 'C', unit: 'Mt/a', value: 5, timeStep: 2, label: 'Wood Manufacturing' },
    ]
  },
  'option2': {
    labels: ['X', 'Y', 'Z'],
    data: [
      { from: 'X', to: 'Y', flow: 20 },
      { from: 'X', to: 'Z', flow: 10 },
      { from: 'Y', to: 'Z', flow: 25 },
    ],
    table: [
      { source: 'X', target: 'Y', unit: 'Mt/a', value: 20, timeStep: 2, label: 'Pulp Production' },
      { source: 'X', target: 'Z', unit: 'Mt/a', value: 10, timeStep: 2, label: 'Digestion & Separation' },
    ]
  },
  'option3': {
    labels: ['Source', 'Recycling', 'Landfill'],
    data: [
      { from: 'Source', to: 'Recycling', flow: 30 },
      { from: 'Source', to: 'Landfill', flow: 15 },
      { from: 'Recycling', to: 'Landfill', flow: 10 },
    ],
    table: [
      { source: 'Source', target: 'Recycling', unit: 'Mt/a', value: 30, timeStep: 2, label: 'Recycling Process' },
      { source: 'Source', target: 'Landfill', unit: 'Mt/a', value: 15, timeStep: 2, label: 'Landfill Disposal' },
    ]
  }
};

// Text descriptions for each option
const mcaText = {
  'option1': "MCA Analysis for Option 1 focuses on energy conversion processes from sources A to B and C.",
  'option2': "In Option 2, the MCA Analysis highlights the material flow between points X, Y, and Z, emphasizing the flow rates.",
  'option3': "Option 3 MCA Analysis delves into waste management processes, with key flows between recycling and landfill."
};

// Function to show the MCA Sankey diagram and data table
function showMCADiagram() {
  // *** NEW: Reposition the MCA container to load immediately below the buttons ***
  const buttonsContainer = document.querySelector('.container.text-center.mt-0.p-0');
  const mcaContainer = document.querySelector('.mca-container');
  if (buttonsContainer && mcaContainer) {
    buttonsContainer.insertAdjacentElement('afterend', mcaContainer);
  }
  
  // Hide other sections (Sankey and Scenarios)
  hideSankeyChart();
  hideScenarios();

  // Get the selected option from the dropdown
  const selectedOption = document.getElementById('residueStream').value;
  const mcaInfo = mcaData[selectedOption];

  // Show the MCA container and ensure the table header is visible
  mcaContainer.style.display = 'block';
  const tableHead = document.querySelector('.data-table thead');
  if (tableHead) {
    tableHead.style.display = 'table-header-group';
  }

  // Update the text description in the mca-text-container
  document.getElementById('mca-text-container').innerText = mcaText[selectedOption];

  // Destroy existing MCA chart if it exists
  if (mcaSankeyChart) {
    mcaSankeyChart.destroy();
    mcaSankeyChart = null;
  }

  // Create the MCA Sankey diagram
  const ctx = document.getElementById('mcaSankeyChart').getContext('2d');
  mcaSankeyChart = new Chart(ctx, {
    type: 'sankey',
    data: {
      labels: mcaInfo.labels,
      datasets: [{
        label: 'Flow',
        data: mcaInfo.data,
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

  // Populate the data table (matrix) with the relevant MCA data
  const tableBody = document.getElementById('mcaTableBody');
  tableBody.innerHTML = ''; // Clear any existing rows
  mcaInfo.table.forEach(row => {
    const tableRow = `
      <tr>
        <td>${row.source}</td>
        <td>${row.target}</td>
        <td>${row.unit}</td>
        <td>${row.value}</td>
        <td>${row.timeStep}</td>
        <td>${row.label}</td>
      </tr>
    `;
    tableBody.insertAdjacentHTML('beforeend', tableRow);
  });
}
