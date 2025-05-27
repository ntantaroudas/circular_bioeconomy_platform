/* final-sankey-diagram.js */

// Global variable to store the Sankey Chart instance
let sankeyChart;

// Function to automatically show Sankey diagram when scenario is selected
function showSankeyDiagram() {
  console.log('Showing Sankey diagram...');
  
  // Get current scenario data
  const currentScenarioData = getCurrentScenarioData();
  if (!currentScenarioData) {
    console.error('No scenario selected');
    return;
  }

  // Display the Sankey chart container
  const chartContainer = document.querySelector('.chart-container');
  chartContainer.style.display = 'block';

  // Update the text description
  const textContainer = document.getElementById('sankey-text-container');
  textContainer.innerHTML = `
    <div style="margin-bottom: 15px;">
      <h4 style="color: #2c3e50; margin-bottom: 8px;">${currentScenarioData.name}</h4>
      <h6 style="color: #6c757d; margin-bottom: 10px; font-style: italic;">${currentScenarioData.subtitle}</h6>
      <p style="margin-bottom: 0; line-height: 1.6;">${currentScenarioData.description}</p>
    </div>
  `;

  // Create the Sankey chart
  setTimeout(() => {
    createSankeyChart(currentScenarioData);
  }, 200);
}

function createSankeyChart(scenarioDataForChart) {
  console.log('Creating Sankey chart for:', scenarioDataForChart.name);
  
  // Destroy the existing chart instance if it exists
  if (sankeyChart) {
    sankeyChart.destroy();
  }

  // Check if scenarioData is available
  if (typeof scenarioData === 'undefined') {
    console.error('scenarioData is not available');
    return;
  }

  // Get unique nodes from the flows
  const nodes = new Set();
  scenarioDataForChart.flows.forEach(flow => {
    nodes.add(flow.from);
    nodes.add(flow.to);
  });

  // Create labels array with proper names (FIX: Access scenarioData directly, not window.scenarioData)
  const labels = Array.from(nodes).map(nodeId => {
    const nodeLabel = scenarioData.nodeLabels[nodeId]; // FIXED: removed window.
    return nodeLabel || nodeId;
  });

  // Transform flows to match Chart.js sankey format (FIX: Access scenarioData directly)
  const sankeyFlows = scenarioDataForChart.flows.map(flow => ({
    from: scenarioData.nodeLabels[flow.from] || flow.from, // FIXED: removed window.
    to: scenarioData.nodeLabels[flow.to] || flow.to, // FIXED: removed window.
    flow: flow.flow
  }));

  console.log('Chart data prepared:', { labels: labels.length, flows: sankeyFlows.length });

  // Create the new Sankey diagram
  const ctx = document.getElementById('sankeyChart').getContext('2d');
  sankeyChart = new Chart(ctx, {
    type: 'sankey',
    data: {
      labels: labels,
      datasets: [{
        label: 'Material Flow',
        data: sankeyFlows,
        colorFrom: function(context) {
          // Find the original flow data to get the color
          const flow = scenarioDataForChart.flows[context.dataIndex];
          return flow && flow.color ? flow.color : '#c0dfe1';
        },
        colorTo: function(context) {
          // Use a slightly different shade for the target
          const flow = scenarioDataForChart.flows[context.dataIndex];
          if (flow && flow.color) {
            return adjustColorBrightness(flow.color, -20);
          }
          return '#70c5c7';
        },
        borderWidth: 1,
        borderColor: '#333',
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: `${scenarioDataForChart.name} - Material Flow Analysis`,
          font: {
            size: 18,
            weight: 'bold'
          },
          color: '#2c3e50',
          padding: {
            top: 10,
            bottom: 20
          }
        },
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            title: function(context) {
              return 'Material Flow Details';
            },
            label: function(context) {
              const flow = scenarioDataForChart.flows[context.dataIndex];
              return [
                `${context.raw.from} → ${context.raw.to}`,
                `Quantity: ${context.raw.flow.toLocaleString()} ${flow ? flow.unit : 't TS'}`,
                `Material: ${flow ? flow.label : 'Material'}`
              ];
            }
          },
          backgroundColor: 'rgba(44, 62, 80, 0.9)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#70c5c7',
          borderWidth: 2,
          cornerRadius: 8,
          displayColors: true,
          titleFont: {
            size: 14,
            weight: 'bold'
          },
          bodyFont: {
            size: 13
          }
        }
      },
      layout: {
        padding: {
          top: 20,
          bottom: 20,
          left: 20,
          right: 20
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart'
      }
    }
  });

  // Store chart instance globally
  window.sankeyChart = sankeyChart;
  console.log('✅ Sankey chart created successfully');
}

// Utility function to adjust color brightness
function adjustColorBrightness(hex, amount) {
  const usePound = hex.charAt(0) === '#';
  const col = usePound ? hex.slice(1) : hex;
  
  const num = parseInt(col, 16);
  let r = (num >> 16) + amount;
  let g = (num >> 8 & 0x00FF) + amount;
  let b = (num & 0x0000FF) + amount;
  
  r = r > 255 ? 255 : r < 0 ? 0 : r;
  g = g > 255 ? 255 : g < 0 ? 0 : g;
  b = b > 255 ? 255 : b < 0 ? 0 : b;
  
  return (usePound ? '#' : '') + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
}

// Function to hide the Sankey chart
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

// Auto-show Sankey when scenario changes (called from controller)
window.showSankeyDiagram = showSankeyDiagram;
window.hideSankeyChart = hideSankeyChart;