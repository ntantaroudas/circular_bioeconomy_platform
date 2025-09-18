/* final-sankey-diagram.js - OPTION B: CLICK DETECTION FOR THIN FLOWS */
/* 
 * Since hover doesn't work on thin flows, this version focuses on:
 * 1. Click detection with visual feedback
 * 2. Info panel that shows clicked flow details
 * 3. Permanent labels for tiny flows
 * 4. Instructions for users
 */

// Global variable to store the Sankey Chart instance
let sankeyChart;
let processedFlows = {}; // Store globally for access in click handlers

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

  // Create unique target nodes for flows with same destination
  processedFlows = preprocessFlowsForEnhancedSeparation(scenarioDataForChart.flows);
  
  console.log('Original flows:', scenarioDataForChart.flows.length);
  console.log('Processed flows:', processedFlows.sankeyFlows.length);

  // ADD CLICK INSTRUCTION PANEL
  addClickInstructionPanel();

  // Create the Sankey diagram
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
        borderWidth: 8,
        borderColor: '#fff',
        nodeWidth: 35,
        nodePadding: 25,
        alpha: 0.7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      
      // Still try hover but don't rely on it
      interaction: {
        mode: 'nearest',
        intersect: false,
        axis: 'xy',
        distance: 50
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
        
        // Basic tooltip (works for large flows)
        tooltip: {
          enabled: true,
          mode: 'nearest',
          intersect: false,
          callbacks: {
            title: function(context) {
              if (!context || context.length === 0) return '';
              const dataIndex = context[0].dataIndex;
              const originalFlow = processedFlows.originalFlowsMap[dataIndex];
              return originalFlow ? `📊 ${originalFlow.label}` : '';
            },
            label: function(context) {
              const originalFlow = processedFlows.originalFlowsMap[context.dataIndex];
              if (!originalFlow) return [];
              
              const originalSource = scenarioData.nodeLabels[originalFlow.originalFrom] || originalFlow.originalFrom;
              const originalTarget = scenarioData.nodeLabels[originalFlow.originalTo] || originalFlow.originalTo;
              const flowValue = originalFlow.flow.toLocaleString();
              const unit = originalFlow.unit || 't TS';
              const totalFlow = scenarioDataForChart.flows.reduce((sum, f) => sum + f.flow, 0);
              const percentage = (originalFlow.flow / totalFlow * 100).toFixed(3);
              
              return [
                `${labels.fromText} ${originalSource}`,
                `${labels.toText} ${originalTarget}`,
                `${labels.quantityText} ${flowValue} ${unit}`,
                `📈 ${percentage}%`
              ];
            }
          }
        }
      },
      
      layout: {
        padding: {
          top: 60,
          bottom: 80,
          left: 60,
          right: 60
        }
      },
      
      nodeAlign: 'justify',
      nodeSort: true,
      nodePadding: 25,
      nodeWidth: 35,
      iterations: 64
    }
  });

  // OPTION B: PRIMARY CLICK DETECTION SYSTEM
  setupClickDetection(scenarioDataForChart, labels);
  
  // Create clickable flow details panel
  createFlowDetailsPanel(labels);
  
  // Create small flows reference table
  createSmallFlowsReferenceTable(scenarioDataForChart, labels);

  // Store chart instance globally
  window.sankeyChart = sankeyChart;
  console.log('✅ Sankey chart created with CLICK DETECTION system');
}

// MAIN FEATURE: Click Detection System
function setupClickDetection(scenarioDataForChart, labels) {
  const canvas = document.getElementById('sankeyChart');
  if (!canvas) return;
  
  // Change cursor to indicate clickable
  canvas.style.cursor = 'pointer';
  
  // Track clicks
  let clickCount = 0;
  
  canvas.addEventListener('click', function(e) {
    if (!window.sankeyChart) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Try to get element at click position with large radius
    const elements = window.sankeyChart.getElementsAtEventForMode(
      e, 
      'nearest', 
      { intersect: false, distance: 100 }, 
      false
    );
    
    if (elements.length > 0) {
      // Found a flow!
      const dataIndex = elements[0].dataIndex;
      const flow = processedFlows.originalFlowsMap[dataIndex];
      
      if (flow) {
        clickCount++;
        showFlowDetails(flow, labels);
        
        // Visual feedback - flash the canvas border
        canvas.style.border = '3px solid #70c5c7';
        setTimeout(() => {
          canvas.style.border = 'none';
        }, 300);
      }
    } else {
      // No flow found - show helper
      showClickHelper(x, y);
    }
  });
  
  // Add hover effect to change cursor
  canvas.addEventListener('mousemove', function(e) {
    const elements = window.sankeyChart.getElementsAtEventForMode(
      e,
      'nearest',
      { intersect: false, distance: 50 },
      false
    );
    
    canvas.style.cursor = elements.length > 0 ? 'pointer' : 'crosshair';
  });
}

// Show flow details in a panel
function showFlowDetails(flow, labels) {
  const panel = document.getElementById('flowDetailsPanel');
  if (!panel) return;
  
  const lang = getCurrentLanguage();
  const fromLabel = scenarioData.nodeLabels[flow.originalFrom] || flow.originalFrom;
  const toLabel = scenarioData.nodeLabels[flow.originalTo] || flow.originalTo;
  
  // Determine flow size category
  let sizeCategory = '';
  let sizeIcon = '';
  if (flow.flowPercentage < 0.5) {
    sizeCategory = lang === 'de' ? 'Mikrofluss' : 'Micro flow';
    sizeIcon = '🔬';
  } else if (flow.flowPercentage < 1) {
    sizeCategory = lang === 'de' ? 'Sehr kleiner Fluss' : 'Very small flow';
    sizeIcon = '💧';
  } else if (flow.flowPercentage < 5) {
    sizeCategory = lang === 'de' ? 'Kleiner Fluss' : 'Small flow';
    sizeIcon = '💦';
  } else if (flow.flowPercentage < 20) {
    sizeCategory = lang === 'de' ? 'Mittlerer Fluss' : 'Medium flow';
    sizeIcon = '🌊';
  } else {
    sizeCategory = lang === 'de' ? 'Hauptfluss' : 'Major flow';
    sizeIcon = '⭐';
  }
  
  panel.innerHTML = `
    <div style="padding: 15px; background: linear-gradient(135deg, #ffffff, #f0f8f8); border-radius: 8px; border: 2px solid #70c5c7;">
      <h4 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 16px;">
        ${sizeIcon} ${flow.label || 'Material'}
      </h4>
      <div style="display: grid; gap: 8px; font-size: 13px;">
        <div><strong>${labels.fromText}</strong> ${fromLabel}</div>
        <div><strong>${labels.toText}</strong> ${toLabel}</div>
        <div><strong>${labels.quantityText}</strong> ${flow.flow.toLocaleString()} ${flow.unit || 't TS'}</div>
        <div><strong>${lang === 'de' ? 'Anteil:' : 'Share:'}</strong> ${flow.flowPercentage.toFixed(3)}%</div>
        <div style="color: #6c757d; font-style: italic; margin-top: 5px;">
          ${sizeCategory}
        </div>
      </div>
    </div>
  `;
  
  // Show the panel
  panel.style.display = 'block';
  
  // Auto-hide after 10 seconds
  setTimeout(() => {
    panel.style.opacity = '0.7';
  }, 10000);
}

// Create flow details panel
function createFlowDetailsPanel(labels) {
  const lang = getCurrentLanguage();
  const chartContainer = document.querySelector('.chart-container');
  
  // Remove existing panel
  const existingPanel = document.getElementById('flowDetailsPanel');
  if (existingPanel) existingPanel.remove();
  
  const panel = document.createElement('div');
  panel.id = 'flowDetailsPanel';
  panel.style.cssText = `
    position: absolute;
    top: 80px;
    right: 20px;
    width: 250px;
    background: white;
    border: 2px solid #dee2e6;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    display: none;
    transition: opacity 0.3s;
  `;
  
  panel.innerHTML = `
    <div style="padding: 10px; background: #f8f9fa; border-bottom: 1px solid #dee2e6;">
      <strong>${lang === 'de' ? 'Angeklickter Fluss' : 'Clicked Flow'}</strong>
    </div>
    <div style="padding: 10px;">
      ${lang === 'de' ? 'Klicken Sie auf einen Fluss' : 'Click on a flow'}
    </div>
  `;
  
  chartContainer.appendChild(panel);
}

// Add instruction panel
function addClickInstructionPanel() {
  const lang = getCurrentLanguage();
  const chartContainer = document.querySelector('.chart-container');
  
  // Remove existing instruction
  const existingInstruction = document.getElementById('clickInstruction');
  if (existingInstruction) existingInstruction.remove();
  
  const instruction = document.createElement('div');
  instruction.id = 'clickInstruction';
  instruction.style.cssText = `
    background: linear-gradient(135deg, #ffd700, #ffed4e);
    color: #333;
    padding: 12px;
    margin: 15px 0;
    border-radius: 8px;
    border: 2px solid #ffc107;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    box-shadow: 0 2px 8px rgba(255,193,7,0.3);
  `;
  
  instruction.innerHTML = `
    👆 ${lang === 'de' ? 
      'KLICKEN Sie auf das Diagramm, um Details zu kleinen Flüssen zu sehen (Hover funktioniert nicht bei dünnen Linien)' : 
      'CLICK on the diagram to see details of small flows (hover does not work on thin lines)'}
  `;
  
  // Insert before the canvas
  const canvas = document.getElementById('sankeyChart');
  if (canvas && canvas.parentElement) {
    canvas.parentElement.insertBefore(instruction, canvas);
  }
}

// Show helper when clicking empty space
function showClickHelper(x, y) {
  const lang = getCurrentLanguage();
  
  // Create temporary helper tooltip
  const helper = document.createElement('div');
  helper.style.cssText = `
    position: absolute;
    left: ${x}px;
    top: ${y}px;
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    pointer-events: none;
    z-index: 2000;
    animation: fadeOut 2s forwards;
  `;
  
  helper.innerHTML = lang === 'de' ? 
    '↖ Versuchen Sie näher an einer Linie zu klicken' : 
    '↖ Try clicking closer to a flow line';
  
  const chartContainer = document.querySelector('.chart-container');
  chartContainer.appendChild(helper);
  
  // Remove after animation
  setTimeout(() => helper.remove(), 2000);
}

// Create reference table for small flows
function createSmallFlowsReferenceTable(scenarioDataForChart, labels) {
  const lang = getCurrentLanguage();
  const totalFlow = scenarioDataForChart.flows.reduce((sum, f) => sum + f.flow, 0);
  
  // Find all small flows
  const smallFlows = scenarioDataForChart.flows
    .filter(flow => (flow.flow / totalFlow * 100) < 2)
    .sort((a, b) => a.flow - b.flow)
    .map(flow => ({
      ...flow,
      percentage: (flow.flow / totalFlow * 100).toFixed(3),
      fromLabel: scenarioData.nodeLabels[flow.from] || flow.from,
      toLabel: scenarioData.nodeLabels[flow.to] || flow.to
    }));

  if (smallFlows.length > 0) {
    const tableHTML = `
      <div style="margin-top: 30px; padding: 20px; background: white; border-radius: 10px; border: 2px solid #70c5c7; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h4 style="color: #2c3e50; margin-bottom: 15px; font-size: 16px; border-bottom: 2px solid #70c5c7; padding-bottom: 8px;">
          📋 ${lang === 'de' ? 'Kleine Flüsse Referenztabelle' : 'Small Flows Reference Table'} 
          <span style="font-size: 12px; color: #6c757d;">(< 2%)</span>
        </h4>
        
        <div style="background: #f8f9fa; padding: 10px; border-radius: 6px; margin-bottom: 15px; font-size: 13px;">
          💡 ${lang === 'de' ? 
            'Diese Flüsse sind zu dünn zum Hovern. Klicken Sie auf das Diagramm in ihrer Nähe oder sehen Sie die Details hier:' : 
            'These flows are too thin to hover over. Click on the diagram near them or see details here:'}
        </div>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
          <thead>
            <tr style="background: #e3f2f3;">
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #70c5c7;">
                ${lang === 'de' ? 'Material' : 'Material'}
              </th>
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #70c5c7;">
                ${labels.fromText}
              </th>
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #70c5c7;">
                ${labels.toText}
              </th>
              <th style="padding: 10px; text-align: right; border-bottom: 2px solid #70c5c7;">
                ${labels.quantityText}
              </th>
              <th style="padding: 10px; text-align: right; border-bottom: 2px solid #70c5c7;">%</th>
            </tr>
          </thead>
          <tbody>
            ${smallFlows.map((flow, index) => `
              <tr style="background: ${index % 2 === 0 ? '#ffffff' : '#f8f9fa'}; transition: background 0.2s;" 
                  onmouseover="this.style.background='#e3f2f3'" 
                  onmouseout="this.style.background='${index % 2 === 0 ? '#ffffff' : '#f8f9fa'}'">
                <td style="padding: 10px; border-bottom: 1px solid #dee2e6; font-weight: bold; color: #2596be;">
                  ${flow.flowPercentage < 0.5 ? '🔬' : flow.flowPercentage < 1 ? '💧' : '💦'} 
                  ${flow.label}
                </td>
                <td style="padding: 10px; border-bottom: 1px solid #dee2e6;">
                  ${flow.fromLabel}
                </td>
                <td style="padding: 10px; border-bottom: 1px solid #dee2e6;">
                  ${flow.toLabel}
                </td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #dee2e6; font-weight: 500;">
                  ${flow.flow} ${flow.unit || 't TS'}
                </td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #dee2e6; font-weight: 500; color: #6c757d;">
                  ${flow.percentage}%
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div style="margin-top: 15px; padding: 10px; background: #e3f2f3; border-radius: 6px; font-size: 11px; color: #495057;">
          <strong>${lang === 'de' ? 'Hinweis:' : 'Note:'}</strong> 
          ${lang === 'de' ? 
            'Die Prozentsätze basieren auf dem Gesamtfluss. Sehr kleine Flüsse (<1%) sind im Diagramm kaum sichtbar.' : 
            'Percentages are based on total flow. Very small flows (<1%) are barely visible in the diagram.'}
        </div>
      </div>
    `;
    
    // Add table to container
    const chartContainer = document.querySelector('.chart-container');
    const existingTable = chartContainer.querySelector('[data-small-flows-table]');
    if (existingTable) existingTable.remove();
    
    const tableDiv = document.createElement('div');
    tableDiv.setAttribute('data-small-flows-table', 'true');
    tableDiv.innerHTML = tableHTML;
    chartContainer.appendChild(tableDiv);
  }
}

// Add CSS for animations
function addStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeOut {
      0% { opacity: 1; }
      70% { opacity: 1; }
      100% { opacity: 0; }
    }
    
    #sankeyChart {
      cursor: pointer !important;
      transition: border 0.3s;
    }
    
    #sankeyChart:active {
      transform: scale(0.99);
    }
    
    #flowDetailsPanel {
      animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(20px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize styles
addStyles();

// Material abbreviation helper
function getMaterialAbbreviation(label) {
  if (!label) return 'M';
  
  const abbreviations = {
    'nitrogen': 'N', 'Stickstoff': 'N',
    'potassium': 'K', 'Kalium': 'K',
    'phosphorus': 'P', 'Phosphor': 'P',
    'calcium': 'Ca', 'Kalzium': 'Ca',
    'magnesium': 'Mg', 'Magnesium': 'Mg',
    'sulfur': 'S', 'Schwefel': 'S',
    'sulphur': 'S',
    'humus': 'Hum', 'Humus': 'Hum',
    'sewage sludge': 'SS', 'Klärschlamm': 'KS',
    'ash': 'Ash', 'Asche': 'Asc',
    'emissions': 'Em', 'Emissionen': 'Em',
    'wastewater': 'WW', 'Abwasser': 'AW'
  };
  
  return abbreviations[label] || label.substring(0, 3).toUpperCase();
}

// Create unique nodes for better separation
function preprocessFlowsForEnhancedSeparation(originalFlows) {
  const sankeyFlows = [];
  const labels = new Set();
  const originalFlowsMap = {};
  
  const totalFlow = originalFlows.reduce((sum, flow) => sum + flow.flow, 0);
  
  const flowsByTarget = {};
  originalFlows.forEach((flow, index) => {
    const targetKey = flow.to;
    if (!flowsByTarget[targetKey]) {
      flowsByTarget[targetKey] = [];
    }
    flowsByTarget[targetKey].push({ ...flow, originalIndex: index });
  });
  
  let flowIndex = 0;
  
  Object.keys(flowsByTarget).forEach(targetKey => {
    const targetFlows = flowsByTarget[targetKey];
    const baseTargetLabel = scenarioData.nodeLabels[targetKey] || targetKey;
    
    if (targetFlows.length === 1) {
      const flow = targetFlows[0];
      const sourceLabel = scenarioData.nodeLabels[flow.from] || flow.from;
      
      sankeyFlows.push({
        from: sourceLabel,
        to: baseTargetLabel,
        flow: flow.flow
      });
      
      labels.add(sourceLabel);
      labels.add(baseTargetLabel);
      
      const flowPercentage = (flow.flow / totalFlow) * 100;
      
      originalFlowsMap[flowIndex] = {
        ...flow,
        originalFrom: flow.from,
        originalTo: flow.to,
        flowPercentage: flowPercentage
      };
      flowIndex++;
      
    } else {
      const sortedFlows = targetFlows.sort((a, b) => b.flow - a.flow);
      
      sortedFlows.forEach((flow, subIndex) => {
        const sourceLabel = scenarioData.nodeLabels[flow.from] || flow.from;
        const flowPercentage = (flow.flow / totalFlow) * 100;
        
        let uniqueTargetLabel;
        
        if (flowPercentage < 0.5) {
          const abbr = getMaterialAbbreviation(flow.label);
          uniqueTargetLabel = `${baseTargetLabel} • ${abbr}`;
        } else if (flowPercentage < 1) {
          const abbr = getMaterialAbbreviation(flow.label);
          uniqueTargetLabel = `${baseTargetLabel} [${abbr}]`;
        } else if (flowPercentage < 3) {
          const shortLabel = flow.label ? 
            (flow.label.length > 10 ? getMaterialAbbreviation(flow.label) : flow.label.split(' ')[0]) : 
            `Mat${subIndex + 1}`;
          uniqueTargetLabel = `${baseTargetLabel} (${shortLabel})`;
        } else if (flowPercentage < 10) {
          const materialName = flow.label || `Material ${subIndex + 1}`;
          uniqueTargetLabel = `${baseTargetLabel} - ${materialName}`;
        } else {
          uniqueTargetLabel = `${baseTargetLabel}\n[${flow.label || 'Primary Material'}]`;
        }
        
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

// Color brightness adjustment
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

// Hide Sankey chart
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

// Export functions
window.showSankeyDiagram = showSankeyDiagram;
window.hideSankeyChart = hideSankeyChart;