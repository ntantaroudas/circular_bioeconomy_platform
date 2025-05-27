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

  // Update the text description with all scenario information
  const textContainer = document.getElementById('sankey-text-container');
  textContainer.innerHTML = `
    <div style="margin-bottom: 20px; padding: 20px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 10px; border-left: 5px solid #70c5c7;">
      <div style="margin-bottom: 15px;">
        <h3 style="color: #2c3e50; margin-bottom: 8px; font-weight: bold;">${currentScenarioData.name}</h3>
        <h5 style="color: #495057; margin-bottom: 12px; font-style: italic; font-weight: 500;">${currentScenarioData.subtitle}</h5>
      </div>
      
      <div style="margin-bottom: 15px;">
        <h6 style="color: #6c757d; margin-bottom: 8px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">Short Description:</h6>
        <p style="margin-bottom: 0; line-height: 1.6; color: #495057; font-size: 0.95rem;">${currentScenarioData.shortDescription}</p>
      </div>
      
      <div>
        <h6 style="color: #6c757d; margin-bottom: 8px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">Detailed Description:</h6>
        <p style="margin-bottom: 0; line-height: 1.7; color: #495057; text-align: justify; font-size: 0.9rem;">${currentScenarioData.description}</p>
      </div>
      
      <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #dee2e6;">
        <small style="color: #6c757d; font-style: italic;">
          <strong>Flow Count:</strong> ${currentScenarioData.flows.length} material flows | 
          <strong>Total Flow Volume:</strong> ${currentScenarioData.flows.reduce((sum, flow) => sum + flow.flow, 0).toLocaleString()} units
        </small>
      </div>
    </div>
  `;

  // Create the Sankey chart
  setTimeout(() => {
    createSankeyChart(currentScenarioData);
  }, 200);
}

function createSankeyChart(scenarioDataForChart) {
  console.log('Creating Sankey chart for:', scenarioDataForChart.name);
  console.log('Number of flows:', scenarioDataForChart.flows.length);
  
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

  console.log('Unique nodes found:', Array.from(nodes));

  // Create labels array with proper names
  const labels = Array.from(nodes).map(nodeId => {
    const nodeLabel = scenarioData.nodeLabels[nodeId];
    return nodeLabel || nodeId;
  });

  // Transform flows to match Chart.js sankey format
  const sankeyFlows = scenarioDataForChart.flows.map(flow => ({
    from: scenarioData.nodeLabels[flow.from] || flow.from,
    to: scenarioData.nodeLabels[flow.to] || flow.to,
    flow: flow.flow
  }));

  console.log('Chart data prepared:', { 
    labels: labels.length, 
    flows: sankeyFlows.length,
    sampleFlow: sankeyFlows[0]
  });

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
          text: `Material Flow Analysis: ${scenarioDataForChart.name}`,
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
          display: true,
          position: 'bottom',
          labels: {
            generateLabels: function(chart) {
              // Create legend items based on unique flow types
              const uniqueLabels = [...new Set(scenarioDataForChart.flows.map(f => f.label))];
              return uniqueLabels.slice(0, 8).map((label, index) => {
                const flow = scenarioDataForChart.flows.find(f => f.label === label);
                return {
                  text: label,
                  fillStyle: flow ? flow.color : '#c0dfe1',
                  strokeStyle: '#333',
                  lineWidth: 1
                };
              });
            },
            boxWidth: 15,
            boxHeight: 15,
            padding: 10,
            font: {
              size: 11
            }
          }
        },
        tooltip: {
          callbacks: {
            title: function(context) {
              return 'Material Flow Details';
            },
            label: function(context) {
              const flow = scenarioDataForChart.flows[context.dataIndex];
              return [
                `Source: ${context.raw.from}`,
                `Target: ${context.raw.to}`,
                `Quantity: ${context.raw.flow.toLocaleString()} ${flow ? flow.unit : 't TS'}`,
                `Material Type: ${flow ? flow.label : 'Material'}`
              ];
            }
          },
          backgroundColor: 'rgba(44, 62, 80, 0.95)',
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
            size: 12
          },
          padding: 12
        }
      },
      layout: {
        padding: {
          top: 20,
          bottom: 30,
          left: 20,
          right: 20
        }
      },
      animation: {
        duration: 1200,
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