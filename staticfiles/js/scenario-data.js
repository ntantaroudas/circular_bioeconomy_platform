/* scenario-data.js */

// Complete scenario data extracted from the Excel file
const scenarioData = {
  salzburg: {
    scenarios: [
      {
        id: 'salzburg_0',
        name: 'Scenario 0: Status Quo',
        subtitle: 'Status quo: Disposal and incineration',
        description: 'Current status of wastewater treatment plants in Salzburg with mainly incineration of sewage sludge. The 13,000 t TS sewage sludge collected in Salzburg treatment plants is mainly incinerated following general trends and legal requirements, producing 3,822 t TS sewage sludge ash for disposal and 8,918 t TS waste gases. Only about 260 t TS is applied.',
        flows: [
          { from: 'A', to: 'B', flow: 13000, unit: 't TS', color: '#b56834', label: 'wastewater' },
          { from: 'B', to: 'F', flow: 12750, unit: 't TS', color: '#c94225', label: 'sewage sludge' },
          { from: 'F', to: 'P', flow: 8918, unit: 't TS', color: '#ffe6a0', label: 'emissions' },
          { from: 'F', to: 'N', flow: 3822, unit: 't TS', color: '#eeeee4', label: 'ash' },
          { from: 'B', to: 'H', flow: 260, unit: 't TS', color: '#b3caa2', label: 'reused' }
        ]
      },
      {
        id: 'salzburg_1',
        name: 'Scenario 1: Future Incineration',
        subtitle: '100% incineration with phosphorus recovery',
        description: 'Future scenario following the amendment to the Waste Incineration Ordinance requiring at least 80% phosphorus recovery. If 100% of the 13,000 tonnes sewage sludge were incinerated, 3,900 tonnes of ash would be produced with phosphorus recovery of 286 tonnes.',
        flows: [
          { from: 'A', to: 'B', flow: 13000, unit: 't TS', color: '#b56834', label: 'wastewater' },
          { from: 'B', to: 'F', flow: 13000, unit: 't TS', color: '#c94225', label: 'sewage sludge' },
          { from: 'F', to: 'P', flow: 9100, unit: 't TS', color: '#ffe6a0', label: 'emissions' },
          { from: 'F', to: 'I', flow: 3900, unit: 't TS', color: '#eeeee4', label: 'ash' },
          { from: 'I', to: 'H', flow: 72, unit: 't TS', color: '#2596be', label: 'phosphorus' },
          { from: 'I', to: 'H', flow: 286, unit: 't TS', color: '#2596be', label: 'phosphor min.' },
          { from: 'I', to: 'N', flow: 3543, unit: 't TS', color: '#a9a4a2', label: 'ash' }
        ]
      },
      {
        id: 'salzburg_2',
        name: 'Scenario 2: Material Recovery',
        subtitle: 'Innovative treatment with 100% material recovery',
        description: 'Innovative scenario with 100% material recovery through field application. Following legal requirements for 60% phosphorus recovery, 215 tonnes phosphorus TS would be recovered along with significant amounts of nitrogen, potassium, calcium, magnesium and sulfur.',
        flows: [
          { from: 'A', to: 'B', flow: 13000, unit: 't TS', color: '#a9a4a2', label: 'wastewater' },
          { from: 'B', to: 'H', flow: 11010, unit: 't TS', color: '#b3caa2', label: 'reused' },
          { from: 'B', to: 'H', flow: 455, unit: 't TS', color: '#2596be', label: 'nitrogen' },
          { from: 'B', to: 'H', flow: 39, unit: 't TS', color: '#2596be', label: 'potassium' },
          { from: 'B', to: 'H', flow: 143.5, unit: 't TS', color: '#2596be', label: 'phosphor zusatz' },
          { from: 'B', to: 'H', flow: 214.5, unit: 't TS', color: '#2596be', label: 'phosphor min.' },
          { from: 'B', to: 'H', flow: 845, unit: 't TS', color: '#2596be', label: 'calcium' }
        ]
      }
    ]
  },
  pongau: {
    scenarios: [
      {
        id: 'pongau_0',
        name: 'Scenario 0: Status Quo',
        subtitle: 'Status quo: Disposal and incineration',
        description: 'Current status of the wastewater treatment plant of Reinhalteverband Salzburger Ennstal. Currently 625 t TS of sewage sludge and other waste is collected, processed and transported by truck to Lenzing for incineration, producing 188 t TS ash and 438 t TS waste gas.',
        flows: [
          { from: 'A', to: 'B', flow: 625, unit: 't TS', color: '#a9a4a2', label: 'wastewater' },
          { from: 'B', to: 'J', flow: 625, unit: 't TS', color: '#c94225', label: 'sewage sludge' },
          { from: 'J', to: 'F', flow: 625, unit: 't TS', color: '#c94225', label: 'transport' },
          { from: 'F', to: 'P', flow: 438, unit: 't TS', color: '#ffe6a0', label: 'emissions' },
          { from: 'F', to: 'N', flow: 188, unit: 't TS', color: '#eeeee4', label: 'ash' }
        ]
      },
      {
        id: 'pongau_1',
        name: 'Scenario 1: Expansion & Drying',
        subtitle: 'Expansion, drying and incineration',
        description: 'Future expansion scenario with additional waste collection from municipalities (total 2,575 t TS), on-site drying to reduce transport weight, and rail transport to Vienna-Simmering for incineration.',
        flows: [
          { from: 'A', to: 'B', flow: 2575, unit: 't TS', color: '#a9a4a2', label: 'wastewater' },
          { from: 'B', to: 'D', flow: 2575, unit: 't TS', color: '#c94225', label: 'sewage sludge' },
          { from: 'D', to: 'K', flow: 2575, unit: 't TS', color: '#8B4513', label: 'dried sludge' },
          { from: 'K', to: 'F', flow: 2575, unit: 't TS', color: '#c94225', label: 'transport' },
          { from: 'F', to: 'P', flow: 1803, unit: 't TS', color: '#ffe6a0', label: 'emissions' },
          { from: 'F', to: 'N', flow: 773, unit: 't TS', color: '#eeeee4', label: 'ash' }
        ]
      },
      {
        id: 'pongau_2',
        name: 'Scenario 2: Phosphorus Recovery',
        subtitle: 'Expansion, drying, incineration + phosphorus recovery',
        description: 'Enhanced scenario with phosphorus recovery from sewage sludge ash. Same expansion and drying as Scenario 1, but with recovery of 76 tonnes phosphorus while 697 tonnes ash still requires landfilling.',
        flows: [
          { from: 'A', to: 'B', flow: 2575, unit: 't TS', color: '#a9a4a2', label: 'wastewater' },
          { from: 'B', to: 'D', flow: 2575, unit: 't TS', color: '#c94225', label: 'sewage sludge' },
          { from: 'D', to: 'K', flow: 2575, unit: 't TS', color: '#8B4513', label: 'dried sludge' },
          { from: 'K', to: 'F', flow: 2575, unit: 't TS', color: '#c94225', label: 'transport' },
          { from: 'F', to: 'P', flow: 1803, unit: 't TS', color: '#ffe6a0', label: 'emissions' },
          { from: 'F', to: 'I', flow: 773, unit: 't TS', color: '#eeeee4', label: 'ash' },
          { from: 'I', to: 'H', flow: 76, unit: 't TS', color: '#2596be', label: 'phosphorus' },
          { from: 'I', to: 'N', flow: 697, unit: 't TS', color: '#a9a4a2', label: 'ash' }
        ]
      },
      {
        id: 'pongau_3',
        name: 'Scenario 3: Humidification',
        subtitle: 'Innovative sludge treatment and humidification',
        description: 'Innovative scenario using sewage sludge humidification for material recovery. Recovery of phosphorus, nitrogen, potassium, calcium, magnesium and sulfur through sustainable humidification processes.',
        flows: [
          { from: 'A', to: 'B', flow: 2575, unit: 't TS', color: '#a9a4a2', label: 'wastewater' },
          { from: 'B', to: 'G', flow: 2575, unit: 't TS', color: '#c94225', label: 'sewage sludge' },
          { from: 'G', to: 'H', flow: 90, unit: 't TS', color: '#2596be', label: 'nitrogen' },
          { from: 'G', to: 'H', flow: 8, unit: 't TS', color: '#2596be', label: 'potassium' },
          { from: 'G', to: 'H', flow: 45, unit: 't TS', color: '#2596be', label: 'phosphorus' },
          { from: 'G', to: 'H', flow: 167, unit: 't TS', color: '#2596be', label: 'calcium' },
          { from: 'G', to: 'H', flow: 26, unit: 't TS', color: '#2596be', label: 'magnesium' },
          { from: 'G', to: 'H', flow: 32, unit: 't TS', color: '#2596be', label: 'sulfur' },
          { from: 'G', to: 'H', flow: 2202, unit: 't TS', color: '#b3caa2', label: 'humus' }
        ]
      },
      {
        id: 'pongau_4',
        name: 'Scenario 4: Pyrolysis',
        subtitle: 'Pyrolysis treatment',
        description: 'Advanced pyrolysis scenario producing biochar and heat. Produces biochar, pyrolysis oil, and recovers multiple nutrients while generating useful heat energy from the pyrolysis process.',
        flows: [
          { from: 'A', to: 'B', flow: 2575, unit: 't TS', color: '#a9a4a2', label: 'wastewater' },
          { from: 'B', to: 'L', flow: 2575, unit: 't TS', color: '#c94225', label: 'sewage sludge' },
          { from: 'L', to: 'M', flow: 975, unit: 't TS', color: '#2d5016', label: 'biochar' },
          { from: 'L', to: 'H', flow: 609, unit: 't TS', color: '#8B4513', label: 'pyrolysis oil' },
          { from: 'L', to: 'P', flow: 366, unit: 't TS', color: '#ffe6a0', label: 'waste gases' },
          { from: 'L', to: 'N', flow: 487, unit: 't TS', color: '#a9a4a2', label: 'ash' },
          { from: 'L', to: 'C', flow: 6375, unit: 'MWh', color: '#FF4500', label: 'heat generation' },
          { from: 'M', to: 'H', flow: 165, unit: 't TS', color: '#2596be', label: 'nutrients' }
        ]
      }
    ]
  },
  
  // Node labels mapping
  nodeLabels: {
    'A': 'Wastewater',
    'B': 'Treatment Plant',
    'C': 'Energy Generation',
    'D': 'Drying',
    'F': 'Incineration',
    'G': 'Humidification',
    'H': 'Reuse',
    'I': 'Nutrient Recovery',
    'J': 'Transport LKW',
    'K': 'Transport Train',
    'L': 'Pyrolysis',
    'M': 'Biochar',
    'N': 'Ash Landfill',
    'O': 'Electricity/Heat Consumption',
    'P': 'Emissions (Residual)',
    'Q': 'Utilization (Other)'
  }
};

// Log when data is loaded
console.log('✅ Scenario data loaded successfully');
console.log('Available cities:', Object.keys(scenarioData).filter(k => k !== 'nodeLabels'));
console.log('Total scenarios:', 
  Object.keys(scenarioData)
    .filter(k => k !== 'nodeLabels')
    .reduce((total, city) => total + scenarioData[city].scenarios.length, 0)
);