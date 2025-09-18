/* final-sankey-diagram.js - ENHANCED SEPARATION VERSION */
/* Bug fixes implemented:
 * 1. Smart label abbreviation for small flows
 * 2. Enhanced flow separation by creating truly unique nodes
 * 3. Added node positioning hints for better visual layout
 */

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

  // Get translated texts
  const scenarioName = getTranslation(currentScenarioData.name);
  const scenarioSubtitle = getTranslation(currentScenarioData.subtitle);
  const shortDescription = getTranslation(currentScenarioData.shortDescription);
  const description = getTranslation(currentScenarioData.description);
  
  // Get language-specific labels
  const lang = getCurrentLanguage();
  const labels = {
    shortDescriptionLabel: lang === 'de' ? 'Kurzbeschreibung:' : 'Short Description:',
    detailedDescriptionLabel: lang === 'de' ? 'Detaillierte Beschreibung:' : 'Detailed Description:',
    flowCountLabel: lang === 'de' ? 'Anzahl der Flüsse:' : 'Flow Count:',
    totalFlowVolumeLabel: lang === 'de' ? 'Gesamtflussvolumen:' : 'Total Flow Volume:',
    materialFlowsText: lang === 'de' ? 'Materialflüsse' : 'material flows',
    unitsText: lang === 'de' ? 'Einheiten' : 'units',
    materialFlowAnalysisText: lang === 'de' ? 'Materialflussanalyse:' : 'Material Flow Analysis:',
    materialFlowDetailsText: lang === 'de' ? 'Materialfluss-Details' : 'Material Flow Details',
    fromText: lang === 'de' ? 'Von:' : 'From:',
    toText: lang === 'de' ? 'Nach:' : 'To:',
    quantityText: lang === 'de' ? 'Menge:' : 'Quantity:',
    materialText: lang === 'de' ? 'Material:' : 'Material:',
    ofTotalFlowText: lang === 'de' ? 'des Gesamtflusses' : 'of total flow'
  };

  // Update the text description with all scenario information
  const textContainer = document.getElementById('sankey-text-container');
  textContainer.innerHTML = `
    <div style="margin-bottom: 20px; padding: 20px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 10px; border-left: 5px solid #70c5c7;">
      <div style="margin-bottom: 15px;">
        <h3 style="color: #2c3e50; margin-bottom: 8px; font-weight: bold;">${scenarioName}</h3>
        <h5 style="color: #495057; margin-bottom: 12px; font-style: italic; font-weight: 500;">${scenarioSubtitle}</h5>
      </div>
      
      <div style="margin-bottom: 15px;">
        <h6 style="color: #6c757d; margin-bottom: 8px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">${labels.shortDescriptionLabel}</h6>
        <p style="margin-bottom: 0; line-height: 1.6; color: #495057; font-size: 0.95rem;">${shortDescription}</p>
      </div>
      
      <div>
        <h6 style="color: #6c757d; margin-bottom: 8px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">${labels.detailedDescriptionLabel}</h6>
        <p style="margin-bottom: 0; line-height: 1.7; color: #495057; text-align: justify; font-size: 0.9rem;">${description}</p>
      </div>
      
      <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #dee2e6;">
        <small style="color: #6c757d; font-style: italic;">
          <strong>${labels.flowCountLabel}</strong> ${currentScenarioData.flows.length} ${labels.materialFlowsText} | 
          <strong>${labels.totalFlowVolumeLabel}</strong> ${currentScenarioData.flows.reduce((sum, flow) => sum + flow.flow, 0).toLocaleString()} ${labels.unitsText}
        </small>
      </div>
    </div>
  `;

  // Create the Sankey chart
  setTimeout(() => {
    createSankeyChart(currentScenarioData, labels);
  }, 200);
}

function createSankeyChart(scenarioDataForChart, labels) {
  console.log('Creating Sankey chart for:', getTranslation(scenarioDataForChart.name));
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

  // Create unique target nodes for flows with same destination - ENHANCED VERSION
  const processedFlows = preprocessFlowsForEnhancedSeparation(scenarioDataForChart.flows);
  
  console.log('Original flows:', scenarioDataForChart.flows.length);
  console.log('Processed flows:', processedFlows.sankeyFlows.length);
  console.log('Unique labels:', processedFlows.labels.length);

  // Create the new Sankey diagram with enhanced separation
  const ctx = document.getElementById('sankeyChart').getContext('2d');
  sankeyChart = new Chart(ctx, {
    type: 'sankey',
    data: {
      labels: processedFlows.labels,
      datasets: [{
        label: labels.materialText || 'Material Flow',
        data: processedFlows.sankeyFlows,
        colorFrom: function(context) {
          const originalFlow = processedFlows.originalFlowsMap[context.dataIndex];
          return originalFlow && originalFlow.color ? originalFlow.color : '#c0dfe1';
        },
        colorTo: function(context) {
          const originalFlow = processedFlows.originalFlowsMap[context.dataIndex];
          if (originalFlow && originalFlow.color) {
            return adjustColorBrightness(originalFlow.color, -15);
          }
          return '#70c5c7';
        },
        borderWidth: 8, // Increased significantly for better visual separation
        borderColor: '#fff', // White borders for cleaner separation
        nodeWidth: 30, // Wider nodes if supported by the library
        nodePadding: 20, // More space between nodes if supported
        alpha: 0.7, // Semi-transparent flows for better visibility when overlapping
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'point'
      },
      plugins: {
        title: {
          display: true,
          text: `${labels.materialFlowAnalysisText} ${getTranslation(scenarioDataForChart.name)}`,
          font: {
            size: 18,
            weight: 'bold'
          },
          color: '#2c3e50',
          padding: {
            top: 10,
            bottom: 25
          }
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            generateLabels: function(chart) {
              const uniqueLabels = [...new Set(scenarioDataForChart.flows.map(f => f.label))];
              return uniqueLabels.map((label, index) => {
                const flow = scenarioDataForChart.flows.find(f => f.label === label);
                return {
                  text: label,
                  fillStyle: flow ? flow.color : '#c0dfe1',
                  strokeStyle: '#000',
                  lineWidth: 2
                };
              });
            },
            boxWidth: 20,
            boxHeight: 15,
            padding: 15,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          enabled: true,
          mode: 'point',
          intersect: false,
          callbacks: {
            title: function(context) {
              return labels.materialFlowDetailsText;
            },
            label: function(context) {
              const originalFlow = processedFlows.originalFlowsMap[context.dataIndex];
              const originalSource = scenarioData.nodeLabels[originalFlow.originalFrom] || originalFlow.originalFrom;
              const originalTarget = scenarioData.nodeLabels[originalFlow.originalTo] || originalFlow.originalTo;
              
              return [
                `${labels.fromText} ${originalSource}`,
                `${labels.toText} ${originalTarget}`,
                `${labels.quantityText} ${originalFlow.flow.toLocaleString()} ${originalFlow.unit || 't TS'}`,
                `${labels.materialText} ${originalFlow.label || 'Material'}`
              ];
            },
            footer: function(tooltipItems) {
              const originalFlow = processedFlows.originalFlowsMap[tooltipItems[0].dataIndex];
              const totalFlow = scenarioDataForChart.flows.reduce((sum, f) => sum + f.flow, 0);
              const percentage = ((originalFlow.flow / totalFlow) * 100).toFixed(1);
              return `${percentage}% ${labels.ofTotalFlowText}`;
            }
          },
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          titleColor: '#fff',
          bodyColor: '#fff',
          footerColor: '#ffd700',
          borderColor: '#70c5c7',
          borderWidth: 3,
          cornerRadius: 10,
          displayColors: true,
          titleFont: {
            size: 14,
            weight: 'bold'
          },
          bodyFont: {
            size: 13
          },
          footerFont: {
            size: 12,
            style: 'italic'
          },
          padding: 15
        },
        // Try to add custom plugin for better layout if supported
        customLayout: {
          beforeLayout: function(chart) {
            // Attempt to influence node positioning
            if (chart.config && chart.config.options) {
              chart.config.options.nodeAlign = 'justify'; // Spread nodes evenly
              chart.config.options.iterations = 64; // More iterations for better layout
            }
          }
        }
      },
      layout: {
        padding: {
          top: 60, // Extra padding for labels
          bottom: 80,
          left: 60,
          right: 60
        }
      },
      // Additional Sankey-specific options if supported by chartjs-chart-sankey
      nodeAlign: 'justify', // Spread nodes to use full height
      nodeSort: true, // Sort nodes for better layout
      nodePadding: 25, // Space between nodes
      nodeWidth: 35, // Width of node rectangles
      iterations: 64, // Layout calculation iterations
      animation: {
        duration: 1500,
        easing: 'easeInOutQuart'
      },
      onHover: function(event, activeElements) {
        event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
      }
    }
  });

  // Make sankey chart responsive
  window.addEventListener('resize', function() {
    if (sankeyChart) {
      sankeyChart.resize();
    }
  });

  // Add cursor pointer on hover
  ctx.canvas.addEventListener('mousemove', function(e) {
    const activePoints = sankeyChart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false);
    ctx.canvas.style.cursor = activePoints.length > 0 ? 'pointer' : 'default';
  });

  // Store chart instance globally
  window.sankeyChart = sankeyChart;
  console.log('✅ Enhanced Sankey chart with improved separation created successfully');
}

// Helper function for material abbreviations
function getMaterialAbbreviation(label) {
  if (!label) return 'M';
  
  const abbreviations = {
    'nitrogen': 'N',
    'Stickstoff': 'N',
    'potassium': 'K',
    'Kalium': 'K',
    'phosphorus': 'P',
    'Phosphor': 'P',
    'calcium': 'Ca',
    'Kalzium': 'Ca',
    'magnesium': 'Mg',
    'Magnesium': 'Mg',
    'sulfur': 'S',
    'Schwefel': 'S',
    'humus': 'Hum',
    'Humus': 'Hum',
    'sewage sludge': 'SS',
    'Klärschlamm': 'KS',
    'ash': 'Ash',
    'Asche': 'Asc',
    'emissions': 'Em',
    'Emissionen': 'Em',
    'wastewater': 'WW',
    'Abwasser': 'AW',
    'reused': 'Reu',
    'wiederverwendet': 'Wdv'
  };
  
  if (abbreviations[label]) {
    return abbreviations[label];
  }
  
  const words = label.split(' ');
  if (words.length > 1) {
    return words.map(w => w[0].toUpperCase()).join('');
  }
  
  return label.substring(0, 3).toUpperCase();
}

// ENHANCED FUNCTION: Create truly unique nodes for better separation
function preprocessFlowsForEnhancedSeparation(originalFlows) {
  const sankeyFlows = [];
  const labels = new Set();
  const originalFlowsMap = {};
  
  // Calculate total flow for percentage calculations
  const totalFlow = originalFlows.reduce((sum, flow) => sum + flow.flow, 0);
  
  // Group flows by target to identify conflicts
  const flowsByTarget = {};
  originalFlows.forEach((flow, index) => {
    const targetKey = flow.to;
    if (!flowsByTarget[targetKey]) {
      flowsByTarget[targetKey] = [];
    }
    flowsByTarget[targetKey].push({ ...flow, originalIndex: index });
  });
  
  let flowIndex = 0;
  
  // Process each target group
  Object.keys(flowsByTarget).forEach(targetKey => {
    const targetFlows = flowsByTarget[targetKey];
    const baseTargetLabel = scenarioData.nodeLabels[targetKey] || targetKey;
    
    if (targetFlows.length === 1) {
      // Single flow to this target - use base label
      const flow = targetFlows[0];
      const sourceLabel = scenarioData.nodeLabels[flow.from] || flow.from;
      
      sankeyFlows.push({
        from: sourceLabel,
        to: baseTargetLabel,
        flow: flow.flow
      });
      
      labels.add(sourceLabel);
      labels.add(baseTargetLabel);
      
      originalFlowsMap[flowIndex] = {
        ...flow,
        originalFrom: flow.from,
        originalTo: flow.to
      };
      flowIndex++;
      
    } else {
      // Multiple flows to same target - create completely unique nodes
      // Sort by flow size for consistent ordering
      const sortedFlows = targetFlows.sort((a, b) => b.flow - a.flow);
      
      sortedFlows.forEach((flow, subIndex) => {
        const sourceLabel = scenarioData.nodeLabels[flow.from] || flow.from;
        const flowPercentage = (flow.flow / totalFlow) * 100;
        
        // Create unique target label with material identifier
        let uniqueTargetLabel;
        
        // Always create a unique node for each flow to ensure separation
        if (flowPercentage < 0.3) {
          // Very tiny flows: just use abbreviation
          const abbr = getMaterialAbbreviation(flow.label);
          uniqueTargetLabel = `${baseTargetLabel} • ${abbr}`;
          
        } else if (flowPercentage < 1) {
          // Small flows: abbreviation with brackets
          const abbr = getMaterialAbbreviation(flow.label);
          uniqueTargetLabel = `${baseTargetLabel} [${abbr}]`;
          
        } else if (flowPercentage < 3) {
          // Medium-small flows: short label
          const shortLabel = flow.label ? 
            (flow.label.length > 10 ? getMaterialAbbreviation(flow.label) : flow.label.split(' ')[0]) : 
            `Mat${subIndex + 1}`;
          uniqueTargetLabel = `${baseTargetLabel} (${shortLabel})`;
          
        } else if (flowPercentage < 10) {
          // Medium flows: material name on same line
          const materialName = flow.label || `Material ${subIndex + 1}`;
          uniqueTargetLabel = `${baseTargetLabel} - ${materialName}`;
          
        } else {
          // Large flows: full description with line break
          uniqueTargetLabel = `${baseTargetLabel}\n[${flow.label || 'Primary Material'}]`;
        }
        
        // Make absolutely sure each label is unique by adding index if needed
        let finalLabel = uniqueTargetLabel;
        let counter = 1;
        while (labels.has(finalLabel)) {
          finalLabel = `${uniqueTargetLabel} ${counter}`;
          counter++;
        }
        
        sankeyFlows.push({
          from: sourceLabel,
          to: finalLabel,
          flow: flow.flow
        });
        
        labels.add(sourceLabel);
        labels.add(finalLabel);
        
        originalFlowsMap[flowIndex] = {
          ...flow,
          originalFrom: flow.from,
          originalTo: flow.to,
          flowPercentage: flowPercentage,
          uniqueLabel: finalLabel
        };
        flowIndex++;
      });
    }
  });
  
  return {
    sankeyFlows,
    labels: Array.from(labels),
    originalFlowsMap,
    totalFlow
  };
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