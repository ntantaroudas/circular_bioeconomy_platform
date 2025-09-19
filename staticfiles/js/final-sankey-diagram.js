/* final-sankey-diagram.js - SIMPLIFIED MINIMAL VERSION */
/* 
 * Clean version with:
 * - Normal tooltips for large flows
 * - Click detection for thin flows only
 * - No extra buttons or panels
 * - Minimal interface
 */

// Global variables
let sankeyChart;
let globalFlowData = {};
let processedFlows = {};

// Function to automatically show Sankey diagram when scenario is selected
function showSankeyDiagram() {
  console.log('Showing Sankey diagram...');
  
  // Get current scenario data
  const currentScenarioData = getCurrentScenarioData();
  if (!currentScenarioData) {
    console.error('No scenario selected');
    return;
  }

  // Store flow data globally
  globalFlowData = currentScenarioData;

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

  // Store labels globally
  globalFlowData.labels = labels;

  // Update the text description
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
        nodeWidth: 30,
        nodePadding: 20,
        alpha: 0.7,
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
        // Standard tooltip - works for large flows
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
              if (!originalFlow) return [];
              
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
              if (!tooltipItems || tooltipItems.length === 0) return '';
              const originalFlow = processedFlows.originalFlowsMap[tooltipItems[0].dataIndex];
              if (!originalFlow) return '';
              
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
      animation: {
        duration: 1500,
        easing: 'easeInOutQuart'
      },
      onHover: function(event, activeElements) {
        event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
      }
    }
  });

  // Add MINIMAL click handler for thin flows only
  setupMinimalClickHandler();

  // Store chart instance globally
  window.sankeyChart = sankeyChart;
  console.log('✅ Sankey chart created successfully');
}

// MINIMAL click handler - only shows menu for thin flows
function setupMinimalClickHandler() {
  const canvas = document.getElementById('sankeyChart');
  
  canvas.addEventListener('click', function(e) {
    // Try to detect if we clicked on a detectable flow
    const elements = sankeyChart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false);
    
    if (!elements || elements.length === 0) {
      // Nothing detected - might be a thin flow
      // Show ONLY small flows menu
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      showSmallFlowsMenu(x, y);
    }
    // If a flow is detected, the normal tooltip handles it
  });
}

// Show menu ONLY for small flows
function showSmallFlowsMenu(x, y) {
  const lang = getCurrentLanguage();
  const totalFlow = globalFlowData.flows.reduce((sum, f) => sum + f.flow, 0);
  
  // Filter ONLY small flows (< 2%)
  const smallFlows = globalFlowData.flows
    .map((flow, index) => ({
      ...flow,
      index,
      percentage: (flow.flow / totalFlow * 100)
    }))
    .filter(flow => flow.percentage < 2)
    .sort((a, b) => a.flow - b.flow);
  
  if (smallFlows.length === 0) return;
  
  // Remove existing menu
  const existingMenu = document.getElementById('smallFlowMenu');
  if (existingMenu) existingMenu.remove();
  
  const menu = document.createElement('div');
  menu.id = 'smallFlowMenu';
  menu.style.cssText = `
    position: absolute;
    left: ${Math.min(x, window.innerWidth - 280)}px;
    top: ${Math.min(y, window.innerHeight - 300)}px;
    background: white;
    border: 2px solid #70c5c7;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    width: 260px;
    max-height: 300px;
    overflow-y: auto;
  `;
  
  const menuHTML = `
    <div style="background: #70c5c7; color: white; padding: 8px; font-size: 13px; display: flex; justify-content: space-between; align-items: center;">
      <strong>${lang === 'de' ? 'Kleine Flüsse' : 'Small Flows'}</strong>
      <button onclick="document.getElementById('smallFlowMenu').remove()" 
              style="background: white; color: #70c5c7; border: none; 
                     border-radius: 50%; width: 20px; height: 20px; cursor: pointer; font-size: 12px;">✕</button>
    </div>
    <div style="padding: 5px;">
      ${smallFlows.map(flow => {
        const fromLabel = scenarioData.nodeLabels[flow.from] || flow.from;
        const toLabel = scenarioData.nodeLabels[flow.to] || flow.to;
        const icon = flow.percentage < 0.5 ? '🔬' : flow.percentage < 1 ? '💧' : '💦';
        
        return `
          <div onclick="showSimpleFlowInfo(${flow.index}); document.getElementById('smallFlowMenu').remove()" 
               style="padding: 6px; margin: 2px 0; background: #f8f9fa; 
                      border-radius: 4px; cursor: pointer; font-size: 11px;"
               onmouseover="this.style.background='#e3f2f3'"
               onmouseout="this.style.background='#f8f9fa'">
            <div style="display: flex; align-items: center;">
              <span style="margin-right: 6px;">${icon}</span>
              <div style="flex-grow: 1;">
                <strong style="color: ${flow.color || '#2596be'};">${flow.label}</strong>
                <div style="font-size: 10px; color: #6c757d;">
                  ${fromLabel} → ${toLabel}
                </div>
              </div>
              <div style="text-align: right;">
                <div style="font-weight: bold;">${flow.flow}</div>
                <div style="font-size: 10px; color: #6c757d;">${flow.percentage.toFixed(2)}%</div>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
  
  menu.innerHTML = menuHTML;
  
  // Add menu to chart container
  const chartContainer = document.querySelector('.chart-container');
  chartContainer.style.position = 'relative';
  chartContainer.appendChild(menu);
}

// Simple flow info popup
window.showSimpleFlowInfo = function(flowIndex) {
  const flow = globalFlowData.flows[flowIndex];
  if (!flow) return;
  
  const lang = getCurrentLanguage();
  const labels = globalFlowData.labels;
  const totalFlow = globalFlowData.flows.reduce((sum, f) => sum + f.flow, 0);
  const percentage = (flow.flow / totalFlow * 100).toFixed(3);
  
  const fromLabel = scenarioData.nodeLabels[flow.from] || flow.from;
  const toLabel = scenarioData.nodeLabels[flow.to] || flow.to;
  
  // Remove existing popup
  const existingPopup = document.getElementById('flowPopup');
  if (existingPopup) existingPopup.remove();
  
  const popup = document.createElement('div');
  popup.id = 'flowPopup';
  popup.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border: 2px solid #70c5c7;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    z-index: 10000;
    padding: 20px;
    max-width: 350px;
  `;
  
  popup.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
      <h4 style="margin: 0; color: #2596be;">${flow.label}</h4>
      <button onclick="document.getElementById('flowPopup').remove()" 
              style="background: #70c5c7; color: white; border: none; 
                     border-radius: 50%; width: 25px; height: 25px; cursor: pointer;">✕</button>
    </div>
    
    <table style="width: 100%; font-size: 13px;">
      <tr>
        <td style="padding: 5px; color: #6c757d;">${labels.fromText}</td>
        <td style="padding: 5px; font-weight: bold;">${fromLabel}</td>
      </tr>
      <tr>
        <td style="padding: 5px; color: #6c757d;">${labels.toText}</td>
        <td style="padding: 5px; font-weight: bold;">${toLabel}</td>
      </tr>
      <tr>
        <td style="padding: 5px; color: #6c757d;">${labels.quantityText}</td>
        <td style="padding: 5px; font-weight: bold;">${flow.flow} ${flow.unit || 't TS'}</td>
      </tr>
      <tr>
        <td style="padding: 5px; color: #6c757d;">${lang === 'de' ? 'Anteil:' : 'Share:'}</td>
        <td style="padding: 5px; font-weight: bold; color: ${percentage < 1 ? '#dc3545' : '#28a745'};">${percentage}%</td>
      </tr>
    </table>
  `;
  
  document.body.appendChild(popup);
  
  // Auto-close after 5 seconds
  setTimeout(() => {
    if (document.getElementById('flowPopup')) {
      document.getElementById('flowPopup').remove();
    }
  }, 5000);
};

// Helper functions (same as before but keeping them)
function getMaterialAbbreviation(label) {
  if (!label) return 'M';
  
  const abbreviations = {
    'nitrogen': 'N', 'Stickstoff': 'N',
    'potassium': 'K', 'Kalium': 'K',
    'phosphorus': 'P', 'Phosphor': 'P',
    'calcium': 'Ca', 'Kalzium': 'Ca',
    'magnesium': 'Mg', 'Magnesium': 'Mg',
    'sulfur': 'S', 'Schwefel': 'S',
    'humus': 'Hum', 'Humus': 'Hum',
    'sewage sludge': 'SS', 'Klärschlamm': 'KS',
    'ash': 'Ash', 'Asche': 'Asc',
    'emissions': 'Em', 'Emissionen': 'Em',
    'wastewater': 'WW', 'Abwasser': 'AW'
  };
  
  return abbreviations[label] || label.substring(0, 3).toUpperCase();
}

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
      
      originalFlowsMap[flowIndex] = {
        ...flow,
        originalFrom: flow.from,
        originalTo: flow.to
      };
      flowIndex++;
      
    } else {
      const sortedFlows = targetFlows.sort((a, b) => b.flow - a.flow);
      
      sortedFlows.forEach((flow, subIndex) => {
        const sourceLabel = scenarioData.nodeLabels[flow.from] || flow.from;
        const flowPercentage = (flow.flow / totalFlow) * 100;
        
        let uniqueTargetLabel;
        
        if (flowPercentage < 0.3) {
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

function hideSankeyChart() {
  const chartContainer = document.querySelector('.chart-container');
  if (chartContainer) {
    chartContainer.style.display = 'none';
  }
  if (sankeyChart) {
    sankeyChart.destroy();
    sankeyChart = null;
  }
  
  // Clean up any menus or popups
  const menu = document.getElementById('smallFlowMenu');
  if (menu) menu.remove();
  
  const popup = document.getElementById('flowPopup');
  if (popup) popup.remove();
}

// Export functions
window.showSankeyDiagram = showSankeyDiagram;
window.hideSankeyChart = hideSankeyChart;