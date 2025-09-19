/* final-sankey-diagram.js - FIXED VERSION WITH PROPER FLOW MAPPING */
/* 
 * Fixed issues:
 * 1. Proper mapping between processed and original flows
 * 2. Error handling for undefined flows
 * 3. Always show flow selector as fallback
 * 4. Direct button access for all flows
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

  // Store flow data globally for manual access
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
  
  // Store processed flows globally
  globalFlowData.processedFlows = processedFlows;

  console.log('Original flows:', scenarioDataForChart.flows.length);
  console.log('Processed flows:', processedFlows.sankeyFlows.length);

  // Create manual info panel FIRST
  createManualInfoPanel();

  // Create ALL flows button panel
  createAllFlowsButtonPanel();

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
              if (!originalFlow) return ['Flow data not available'];
              
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
      }
    }
  });

  // Add SIMPLE click handler that ALWAYS shows the flow menu
  setupSimpleClickHandler();

  // Store chart instance globally
  window.sankeyChart = sankeyChart;
  console.log('✅ Sankey chart created with manual flow selection system');
}

// Create info panel
function createManualInfoPanel() {
  const lang = getCurrentLanguage();
  
  // Remove existing panel
  const existingPanel = document.getElementById('manualInfoPanel');
  if (existingPanel) existingPanel.remove();
  
  const panel = document.createElement('div');
  panel.id = 'manualInfoPanel';
  panel.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    max-width: 90%;
    background: white;
    border: 3px solid #70c5c7;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    z-index: 10000;
    display: none;
  `;
  
  panel.innerHTML = `
    <div style="background: linear-gradient(135deg, #70c5c7, #5eb3b5); color: white; padding: 15px; border-radius: 8px 8px 0 0; position: relative;">
      <h3 style="margin: 0; font-size: 18px;">
        📊 ${lang === 'de' ? 'Flussdetails' : 'Flow Details'}
      </h3>
      <button onclick="closeManualPanel()" style="position: absolute; top: 15px; right: 15px; background: white; color: #70c5c7; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-weight: bold;">✕</button>
    </div>
    <div id="manualInfoContent" style="padding: 20px; max-height: 400px; overflow-y: auto;">
      <!-- Content will be inserted here -->
    </div>
  `;
  
  document.body.appendChild(panel);
}

// Close panel
window.closeManualPanel = function() {
  const panel = document.getElementById('manualInfoPanel');
  if (panel) panel.style.display = 'none';
};

// Show flow information
window.showFlowInfo = function(flowIndex) {
  const lang = getCurrentLanguage();
  const labels = globalFlowData.labels;
  const flow = globalFlowData.flows[flowIndex];
  
  if (!flow) {
    console.error('Flow not found at index:', flowIndex);
    return;
  }
  
  const totalFlow = globalFlowData.flows.reduce((sum, f) => sum + f.flow, 0);
  const percentage = (flow.flow / totalFlow * 100).toFixed(3);
  
  const fromLabel = scenarioData.nodeLabels[flow.from] || flow.from;
  const toLabel = scenarioData.nodeLabels[flow.to] || flow.to;
  
  // Determine icon
  let icon = '📊';
  let sizeCategory = '';
  if (percentage < 0.5) {
    icon = '🔬';
    sizeCategory = lang === 'de' ? 'Mikrofluss' : 'Micro flow';
  } else if (percentage < 1) {
    icon = '💧';
    sizeCategory = lang === 'de' ? 'Sehr kleiner Fluss' : 'Very small flow';
  } else if (percentage < 5) {
    icon = '💦';
    sizeCategory = lang === 'de' ? 'Kleiner Fluss' : 'Small flow';
  } else if (percentage < 20) {
    icon = '🌊';
    sizeCategory = lang === 'de' ? 'Mittlerer Fluss' : 'Medium flow';
  } else {
    icon = '⭐';
    sizeCategory = lang === 'de' ? 'Hauptfluss' : 'Major flow';
  }
  
  const content = `
    <div style="text-align: center; margin-bottom: 20px;">
      <span style="font-size: 48px;">${icon}</span>
      <h4 style="color: #2596be; margin: 10px 0;">${flow.label || 'Material'}</h4>
    </div>
    
    <table style="width: 100%; font-size: 14px;">
      <tr style="background: #f8f9fa;">
        <td style="padding: 10px; font-weight: bold; width: 40%;">${labels.fromText}</td>
        <td style="padding: 10px;">${fromLabel}</td>
      </tr>
      <tr>
        <td style="padding: 10px; font-weight: bold;">${labels.toText}</td>
        <td style="padding: 10px;">${toLabel}</td>
      </tr>
      <tr style="background: #f8f9fa;">
        <td style="padding: 10px; font-weight: bold;">${labels.quantityText}</td>
        <td style="padding: 10px;">${flow.flow} ${flow.unit || 't TS'}</td>
      </tr>
      <tr>
        <td style="padding: 10px; font-weight: bold;">${lang === 'de' ? 'Anteil:' : 'Share:'}</td>
        <td style="padding: 10px; color: ${percentage < 1 ? '#dc3545' : percentage < 5 ? '#ffc107' : '#28a745'}; font-weight: bold;">
          ${percentage}%
        </td>
      </tr>
      <tr style="background: #f8f9fa;">
        <td style="padding: 10px; font-weight: bold;">${lang === 'de' ? 'Kategorie:' : 'Category:'}</td>
        <td style="padding: 10px;">${sizeCategory}</td>
      </tr>
    </table>
    
    <div style="margin-top: 20px; padding: 15px; background: #e3f2f3; border-radius: 8px; text-align: center;">
      <button onclick="closeManualPanel()" style="background: #70c5c7; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: bold;">
        ${lang === 'de' ? 'Schließen' : 'Close'}
      </button>
    </div>
  `;
  
  document.getElementById('manualInfoContent').innerHTML = content;
  document.getElementById('manualInfoPanel').style.display = 'block';
};

// Create button panel for ALL flows
function createAllFlowsButtonPanel() {
  const chartContainer = document.querySelector('.chart-container');
  const lang = getCurrentLanguage();
  const totalFlow = globalFlowData.flows.reduce((sum, f) => sum + f.flow, 0);
  
  // Remove existing panel
  const existingPanel = document.getElementById('allFlowsPanel');
  if (existingPanel) existingPanel.remove();
  
  // Group flows by size
  const microFlows = [];
  const smallFlows = [];
  const mediumFlows = [];
  const largeFlows = [];
  
  globalFlowData.flows.forEach((flow, index) => {
    const percentage = (flow.flow / totalFlow * 100);
    const enrichedFlow = { ...flow, index, percentage };
    
    if (percentage < 1) microFlows.push(enrichedFlow);
    else if (percentage < 5) smallFlows.push(enrichedFlow);
    else if (percentage < 20) mediumFlows.push(enrichedFlow);
    else largeFlows.push(enrichedFlow);
  });
  
  const panelHTML = `
    <div id="allFlowsPanel" style="margin-top: 30px;">
      <!-- Instruction Banner -->
      <div style="background: linear-gradient(135deg, #ffd700, #ffed4e); color: #333; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center; font-weight: bold; border: 2px solid #ffc107;">
        🎯 ${lang === 'de' ? 
          'Klicken Sie auf eine Schaltfläche unten oder klicken Sie auf das Diagramm, um ein Menü mit allen Flüssen zu sehen' : 
          'Click a button below or click on the diagram to see a menu of all flows'}
      </div>
      
      ${microFlows.length > 0 ? createFlowSection('🔬 💧', lang === 'de' ? 'Sehr kleine Flüsse' : 'Very Small Flows', microFlows, '< 1%') : ''}
      ${smallFlows.length > 0 ? createFlowSection('💦', lang === 'de' ? 'Kleine Flüsse' : 'Small Flows', smallFlows, '1-5%') : ''}
      ${mediumFlows.length > 0 ? createFlowSection('🌊', lang === 'de' ? 'Mittlere Flüsse' : 'Medium Flows', mediumFlows, '5-20%') : ''}
      ${largeFlows.length > 0 ? createFlowSection('⭐', lang === 'de' ? 'Hauptflüsse' : 'Major Flows', largeFlows, '> 20%') : ''}
    </div>
  `;
  
  const panelDiv = document.createElement('div');
  panelDiv.innerHTML = panelHTML;
  chartContainer.appendChild(panelDiv);
}

// Helper to create flow section
function createFlowSection(icon, title, flows, range) {
  const lang = getCurrentLanguage();
  
  return `
    <div style="margin-bottom: 20px; background: white; border: 2px solid #70c5c7; border-radius: 10px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #70c5c7, #5eb3b5); color: white; padding: 12px;">
        <span style="font-size: 20px; margin-right: 10px;">${icon}</span>
        <strong>${title}</strong>
        <span style="font-size: 12px; opacity: 0.9; margin-left: 10px;">${range}</span>
      </div>
      <div style="padding: 15px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 10px;">
          ${flows.map(flow => {
            const fromLabel = scenarioData.nodeLabels[flow.from] || flow.from;
            const toLabel = scenarioData.nodeLabels[flow.to] || flow.to;
            const flowIcon = flow.percentage < 0.5 ? '🔬' : flow.percentage < 1 ? '💧' : flow.percentage < 5 ? '💦' : flow.percentage < 20 ? '🌊' : '⭐';
            
            return `
              <button onclick="showFlowInfo(${flow.index})" 
                      style="background: white; border: 2px solid ${flow.color || '#70c5c7'}; 
                             border-radius: 8px; padding: 12px; cursor: pointer; 
                             transition: all 0.3s; text-align: left;"
                      onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)'; this.style.background='#f0fffe'"
                      onmouseout="this.style.transform=''; this.style.boxShadow=''; this.style.background='white'">
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 20px; margin-right: 8px;">${flowIcon}</span>
                  <strong style="color: ${flow.color || '#2596be'}; font-size: 13px;">
                    ${flow.label}
                  </strong>
                </div>
                <div style="font-size: 11px; color: #6c757d;">
                  <div>${fromLabel} → ${toLabel}</div>
                  <div style="margin-top: 4px;">
                    <strong>${flow.flow} ${flow.unit || 't TS'}</strong> 
                    <span style="color: ${flow.percentage < 1 ? '#dc3545' : flow.percentage < 5 ? '#ffc107' : '#28a745'};">
                      (${flow.percentage.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </button>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

// SIMPLE click handler - ALWAYS show flow menu
function setupSimpleClickHandler() {
  const canvas = document.getElementById('sankeyChart');
  
  canvas.addEventListener('click', function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // ALWAYS show the flow selector menu
    showFlowSelectorMenu(x, y);
  });
  
  // Visual feedback
  canvas.style.cursor = 'pointer';
}

// Show flow selector menu
function showFlowSelectorMenu(x, y) {
  const lang = getCurrentLanguage();
  const totalFlow = globalFlowData.flows.reduce((sum, f) => sum + f.flow, 0);
  
  // Remove existing menu
  const existingMenu = document.getElementById('flowSelectorMenu');
  if (existingMenu) existingMenu.remove();
  
  const menu = document.createElement('div');
  menu.id = 'flowSelectorMenu';
  menu.style.cssText = `
    position: absolute;
    left: ${Math.min(x, window.innerWidth - 320)}px;
    top: ${Math.min(y, window.innerHeight - 400)}px;
    background: white;
    border: 2px solid #70c5c7;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    z-index: 1000;
    width: 300px;
    max-height: 400px;
    overflow-y: auto;
  `;
  
  const menuHTML = `
    <div style="background: linear-gradient(135deg, #70c5c7, #5eb3b5); color: white; padding: 10px; position: sticky; top: 0; z-index: 10;">
      <strong>${lang === 'de' ? 'Wählen Sie einen Fluss:' : 'Select a Flow:'}</strong>
      <button onclick="document.getElementById('flowSelectorMenu').remove()" 
              style="float: right; background: white; color: #70c5c7; border: none; 
                     border-radius: 50%; width: 24px; height: 24px; cursor: pointer;">✕</button>
    </div>
    <div style="padding: 10px;">
      ${globalFlowData.flows.map((flow, index) => {
        const percentage = (flow.flow / totalFlow * 100);
        const icon = percentage < 0.5 ? '🔬' : percentage < 1 ? '💧' : percentage < 5 ? '💦' : percentage < 20 ? '🌊' : '⭐';
        const fromLabel = scenarioData.nodeLabels[flow.from] || flow.from;
        const toLabel = scenarioData.nodeLabels[flow.to] || flow.to;
        
        return `
          <div onclick="showFlowInfo(${index}); document.getElementById('flowSelectorMenu').remove()" 
               style="padding: 8px; margin: 4px 0; background: #f8f9fa; border-left: 3px solid ${flow.color || '#70c5c7'}; 
                      border-radius: 4px; cursor: pointer; transition: all 0.2s;"
               onmouseover="this.style.background='#e3f2f3'; this.style.transform='translateX(5px)'"
               onmouseout="this.style.background='#f8f9fa'; this.style.transform=''">
            <div style="display: flex; align-items: center;">
              <span style="margin-right: 8px; font-size: 16px;">${icon}</span>
              <div style="flex-grow: 1;">
                <strong style="color: ${flow.color || '#2596be'};">${flow.label}</strong>
                <div style="font-size: 11px; color: #6c757d;">
                  ${fromLabel} → ${toLabel}
                </div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 12px; font-weight: bold;">${flow.flow} ${flow.unit || 't TS'}</div>
                <div style="font-size: 11px; color: ${percentage < 1 ? '#dc3545' : percentage < 5 ? '#ffc107' : '#28a745'};">
                  ${percentage.toFixed(2)}%
                </div>
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

// Helper functions (same as before)
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
  
  // Clean up manual elements
  const panel = document.getElementById('manualInfoPanel');
  if (panel) panel.remove();
  
  const menu = document.getElementById('flowSelectorMenu');
  if (menu) menu.remove();
}

// Export functions
window.showSankeyDiagram = showSankeyDiagram;
window.hideSankeyChart = hideSankeyChart;