/* scenario-data.js - Complete data with all scenarios and descriptions */

// Complete scenario data extracted from the Excel file
const scenarioData = {
  salzburg: {
    scenarios: [
      {
        id: 'salzburg_0',
        name: 'SZENARIO 0 Salzburg: Status quo',
        subtitle: 'Status quo: Disposal and incineration',
        shortDescription: 'Wastewater treatment plants with mainly incineration of sewage sludge',
        description: 'In diesem Mengenflussdiagramm wird der IST-Status aller Kläranlagen des Bundeslandes Salzburg dargestellt. Die in den Salzburger Kläranlagen gesammelten 13.000 t TS Klärschlämme werden dem allgemeinen Trend und speziell (bedingt durch die Herausforderungen hinsichtlich schwer beseitigbaren Verunreinigungen der Klärschlämme) den gesetzlichen Vorgaben folgend hauptsächlich verbrannt und die 3.822 t TS Klärschlammasche wird deponiert. Der Großteil der Masse geht bei Verbrennung des Klärschlamms in 8.918 t TS Abgase über. Nur ein kleiner Teil, etwa 260 t TS wird ausgebracht. Bislang wird zwar eine weitere Verwertung der Asche angestrebt, doch noch ist konkret keine weitere Nutzung vorgesehen. These are annual quantities.',
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
        name: 'SZENARIO 1 Salzburg: Future',
        subtitle: 'Szenario 1: 100% incineration according to the amendment to the Waste Incineration Ordinance (AVV, BGBl. II Nr. 389/2002)',
        shortDescription: 'Sewage treatment plants with mainly incineration of sewage sludge + phosphorus recovery',
        description: 'This mass flow diagram shows a future scenario for all wastewater treatment plants in the province of Salzburg. The Salzburg wastewater treatment plants follow the general trend, but the requirements according to the amendment of the Waste Incineration Ordinance ((AVV, BGBl. II Nr. 389/2002) ). According to this, at least 80% of the phosphorus must be recovered when the sewage sludge is incinerated. However, recovery from the combustion residues (the ash) is currently still being researched and is not yet used, which is why most of it has been landfilled so far. It should also be borne in mind that previous research has shown that the subsequent extraction of phosphorus from sewage sludge ash and the associated separation of pollutants is associated with high costs. If, following the general trend, 100% of the 13,000 tonnes of sewage sludge collected in Salzburg\'s wastewater treatment plants were incinerated, 3,900 tonnes of sewage sludge ash would be produced and landfilled. When the sewage sludge is incinerated, the majority of the mass is converted into 9,100 tonnes of dry matter exhaust gases. Then nothing more would be spread. If the legal minimum of 80 % phosphorus recovery is adhered to, 286 tonnes of phosphorus dry matter would be recovered. (Note: The recovered nutrients refer to a theoretical estimate based on typical content proportions in sewage sludge). These are annual quantities.',
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
        name: 'SZENARIO 2 Salzburg: Future',
        subtitle: 'Scenario 2: INNOVATIVE with 100% material recovery in accordance with the amendment to the Waste Incineration Ordinance (AVV, BGBl. II Nr. 389/2002)',
        shortDescription: 'Innovative sludge treatment and humidification',
        description: 'This mass flow diagram shows a future scenario for all wastewater treatment plants in the province of Salzburg. The Salzburg wastewater treatment plants do not follow the general trend, but the requirements according to the amendment of the Waste Incineration Ordinance(AVV, BGBl. II Nr. 389/2002) where at least 60% of the phosphorus must be recovered under these circumstances. This recovery takes place via other utilisation by spreading on the field. If, in line with the general trend, 100% of the 13,000 tonnes of sewage sludge collected in Salzburg\'s sewage treatment plants were to be applied, a number of nutrients could be recovered. If the legal minimum of 60% phosphorus recovery is adhered to, 215 tonnes of phosphorus TS would be recovered. In addition, 455 tonnes TS nitrogen, 39 tonnes TS potassium, 845 tonnes TS calcium, 130 tonnes TS magnesium and 163 tonnes TS sulphur could be returned to the natural cycle. (Note: The recovered nutrients refer to a theoretical estimate based on typical content proportions in sewage sludge). These are annual quantities.',
        flows: [
          { from: 'A', to: 'B', flow: 13000, unit: 't TS', color: '#a9a4a2', label: 'wastewater' },
          { from: 'B', to: 'H', flow: 11010, unit: 't TS', color: '#b3caa2', label: 'reused' },
          { from: 'B', to: 'H', flow: 455, unit: 't TS', color: '#2596be', label: 'nitrogen' },
          { from: 'B', to: 'H', flow: 39, unit: 't TS', color: '#2596be', label: 'potassium' },
          { from: 'B', to: 'H', flow: 143.5, unit: 't TS', color: '#2596be', label: 'phosphor zusatz' },
          { from: 'B', to: 'H', flow: 214.5, unit: 't TS', color: '#2596be', label: 'phosphor min.' },
          { from: 'B', to: 'H', flow: 845, unit: 't TS', color: '#2596be', label: 'calcium' },
          { from: 'B', to: 'H', flow: 130, unit: 't TS', color: '#2596be', label: 'magnesium' },
          { from: 'B', to: 'H', flow: 163, unit: 't TS', color: '#2596be', label: 'sulphur' }
        ]
      }
    ]
  },
  pongau: {
    scenarios: [
      {
        id: 'pongau_0',
        name: 'SZENARIO 0 Pongau: Status quo',
        subtitle: 'Status quo: Disposal and incineration',
        shortDescription: 'Wastewater treatment plant Reinhalteverband Salzburger Ennstal + LKW Transport Lenzing',
        description: 'This mass flow diagram shows the current status of the wastewater treatment plant of the Reinhalteverband Salzburger Ennstal. To date, standard sewage sludge and other waste in the catchment area totalling 625 t TS has been collected, processed in the sewage treatment plant and finally transported by truck to Lenzing, where it is incinerated to produce 188 t TS sewage sludge ash and 438 t TS waste gas. All processes together require a total of 1,837 MWh of electricity and 2,212 MWh of heat. On the other hand, a total of 970 MWh of electricity and 970 MWh of heat are generated at the site itself. (Note: any energy for transport has been allocated to electricity for the sake of simplicity, even though in reality it is made up of diesel and electricity). These are annual quantities.',
        flows: [
          { from: 'A', to: 'B', flow: 625, unit: 't TS', color: '#a9a4a2', label: 'wastewater' },
          { from: 'B', to: 'J', flow: 625, unit: 't TS', color: '#c94225', label: 'sewage sludge' },
          { from: 'J', to: 'F', flow: 625, unit: 't TS', color: '#c94225', label: 'sewage sludge' },
          { from: 'F', to: 'P', flow: 438, unit: 't TS', color: '#ffe6a0', label: 'emissions' },
          { from: 'F', to: 'N', flow: 188, unit: 't TS', color: '#eeeee4', label: 'ash' }
        ]
      },
      {
        id: 'pongau_1',
        name: 'SZENARIO 1 Pongau: Future',
        subtitle: 'Szenario 1 Future: Expansion, drying and incineration',
        shortDescription: 'Wastewater treatment plant Reinhalteverband Salzburger Ennstal taking over additional waste (already in ongoing expansion) + cooperation with municipalities + drying on site + railway transport Simmering + incineration',
        description: 'This mass flow diagram shows a future scenario for the wastewater treatment plant of Reinhalteverband Salzburger Ennstal. It is very likely that the current collection in the existing catchment area of the Reinhalteverband Salzburger Ennstal with the usual sewage sludge and other waste that is further processed in the sewage treatment plant will be expanded to include additional sewage sludge areas of the municipalities of Gastein, Mühlbach, RHV Zentralraum Lungau, Filzmoos, RHV St. Michael, Ramingstein and from the RHV Salzachpongau and will also include the collection of kitchen and food waste as well as former animal foodstuffs in accordance with ÖWAV guidelines. The total amount of sewage sludge and other waste collected from this amounts to 2,575 tonnes dry matter. Furthermore, additional drying is carried out on site to reduce the transport weight from 10,300 tonnes with a 25% dry matter content to 3,605 tonnes with a 90% dry matter content. Instead of being transported by lorry to Lenzing, this greatly reduced quantity is shortened via Radstadt railway station and instead transported by rail to Vienna-Simmering, where it is incinerated to produce 773 tonnes of sewage sludge ash and 1,803 tonnes of waste gas. All processes together require a total of 7,343 MWh of electricity and 4,817 MWh of heat. On the other hand, a total of 3,011 MWh of electricity and 3,011 MWh of heat are generated at the site itself. (Note: any energy for transport has been allocated to electricity for the sake of simplicity, even though in reality it is made up of diesel and electricity). These are annual quantities.',
        flows: [
          { from: 'A', to: 'B', flow: 2575, unit: 't TS', color: '#a9a4a2', label: 'wastewater' },
          { from: 'B', to: 'D', flow: 2575, unit: 't TS', color: '#c94225', label: 'sewage sludge' },
          { from: 'D', to: 'K', flow: 2575, unit: 't TS', color: '#c94225', label: 'sewage sludge' },
          { from: 'K', to: 'F', flow: 2575, unit: 't TS', color: '#c94225', label: 'sewage sludge' },
          { from: 'F', to: 'P', flow: 1803, unit: 't TS', color: '#ffe6a0', label: 'emissions' },
          { from: 'F', to: 'N', flow: 773, unit: 't TS', color: '#eeeee4', label: 'ash' }
        ]
      },
      {
        id: 'pongau_2',
        name: 'SZENARIO 2 Pongau: Future',
        subtitle: 'Szenario 2: Expansion, drying and incineration + phosphorus recovery',
        shortDescription: 'Wastewater treatment plant Reinhalteverband Salzburger Ennstal taking over additional waste (already in ongoing expansion) + cooperation with municipalities + drying on site + railway transport Simmering + incineration + phosphorus recovery',
        description: 'This mass flow diagram shows a future scenario for the wastewater treatment plant of Reinhalteverband Salzburger Ennstal. It is very realistic that the current collection in the existing catchment area of the Reinhalteverband Salzburger Ennstal with the usual sewage sludge and other waste that is further processed in the sewage treatment plant will be expanded to include additional sewage sludge collection areas from the municipalities of Gastein, Mühlbach, RHV Zentralraum Lungau, Filzmoos, RHV St. Michael, Ramingstein and from the RHV Salzachpongau and will also include the collection of kitchen and catering waste as well as former foodstuffs of animal origin in accordance with ÖWAV guidelines. The total amount of sewage sludge and other waste collected from this amounts to 2,575 tonnes dry matter. Furthermore, additional drying is carried out on site to reduce the transport weight from 10,300 tonnes with a 25% dry matter content to 3,605 tonnes with a 90% dry matter content. Instead of being transported by truck to Lenzing, this greatly reduced quantity is shortened via Radstadt railway station and instead transported by rail to Vienna-Simmering, where it is incinerated to produce 773 tonnes of sewage sludge ash and 1,803 tonnes of waste gas. 76 tonnes of phosphorus are recovered from the sewage sludge ash, while 697 tonnes of sewage sludge ash still have to be landfilled. A total of 7,559 MWh of electricity and 4,817 MWh of heat are required for all processes combined. On the other hand, a total of 3,011 MWh of electricity and 3,011 MWh of heat are generated at the site itself. (Note: any energy for transport has been allocated to electricity for the sake of simplicity, even though in reality it is made up of diesel and electricity). These are annual quantities.',
        flows: [
          { from: 'A', to: 'B', flow: 2575, unit: 't TS', color: '#a9a4a2', label: 'wastewater' },
          { from: 'B', to: 'D', flow: 2575, unit: 't TS', color: '#c94225', label: 'sewage sludge' },
          { from: 'D', to: 'K', flow: 2575, unit: 't TS', color: '#c94225', label: 'sewage sludge' },
          { from: 'K', to: 'F', flow: 2575, unit: 't TS', color: '#c94225', label: 'sewage sludge' },
          { from: 'F', to: 'P', flow: 1803, unit: 't TS', color: '#ffe6a0', label: 'emissions' },
          { from: 'F', to: 'I', flow: 773, unit: 't TS', color: '#eeeee4', label: 'ash' },
          { from: 'I', to: 'H', flow: 76, unit: 't TS', color: '#2596be', label: 'phosphorus' },
          { from: 'I', to: 'N', flow: 697, unit: 't TS', color: '#a9a4a2', label: 'ash' }
        ]
      },
      {
        id: 'pongau_3',
        name: 'SZENARIO 3 Pongau: Future',
        subtitle: 'Szenario 3: innovative sludge treatment and humidification',
        shortDescription: 'Wastewater treatment plant Reinhalteverband Salzburger Ennstal taking over additional waste (already in ongoing expansion) + cooperation with municipalities + sewage sludge humification',
        description: 'This mass flow diagram shows a future scenario for the wastewater treatment plant of Reinhalteverband Salzburger Ennstal. It is very realistic that the current collection in the existing catchment area of the Reinhalteverband Salzburger Ennstal with the usual sewage sludge and other waste that is further processed in the sewage treatment plant will be expanded to include additional sewage sludge collection areas from the municipalities of Gastein, Mühlbach, RHV Zentralraum Lungau, Filzmoos, RHV St. Michael, Ramingstein and from the RHV Salzachpongau and will also include the collection of kitchen and catering waste as well as former foodstuffs of animal origin in accordance with ÖWAV guidelines. The total amount of sewage sludge and other waste collected from this amounts to 2,575 tonnes dry matter. The material is recovered through sewage sludge humification on corresponding humification areas. The resulting humus can then be further utilised accordingly. In this way, 26-64 tonnes DM of phosphorus can be recovered. In addition, 90 tonnes TS nitrogen, 8 tonnes TS potassium, 167 tonnes TS calcium, 26 tonnes TS magnesium and 32 tonnes TS sulphur could be returned to the natural cycle. (Note: The recovered nutrients refer to a theoretical estimate based on typical content proportions in sewage sludge). A total of 4,483 MWh of electricity and 1,807 MWh of heat are required for all processes combined. On the other hand, a total of 3,011 MWh of electricity and 3,011 MWh of heat are generated at the site itself. (Note: any energy for transport has been allocated to electricity for the sake of simplicity, even though in reality it is made up of diesel and electricity). These are annual quantities.',
        flows: [
          { from: 'A', to: 'B', flow: 2575, unit: 't TS', color: '#a9a4a2', label: 'wastewater' },
          { from: 'B', to: 'G', flow: 2575, unit: 't TS', color: '#c94225', label: 'sewage sludge' },
          { from: 'G', to: 'H', flow: 90, unit: 't TS', color: '#2596be', label: 'nitrogen' },
          { from: 'G', to: 'H', flow: 8, unit: 't TS', color: '#2596be', label: 'potassium' },
          { from: 'G', to: 'H', flow: 45, unit: 't TS', color: '#2596be', label: 'phosphorus' },
          { from: 'G', to: 'H', flow: 167, unit: 't TS', color: '#2596be', label: 'calcium' },
          { from: 'G', to: 'H', flow: 26, unit: 't TS', color: '#2596be', label: 'magnesium' },
          { from: 'G', to: 'H', flow: 32, unit: 't TS', color: '#2596be', label: 'sulfur' },
          { from: 'G', to: 'H', flow: 2202, unit: 't TS', color: '#b3caa2', label: 'humus' },
          { from: 'G', to: 'O', flow: 4483, unit: 'MWh', color: '#FF6347', label: 'electricity consumption' }
        ]
      },
      {
        id: 'pongau_4',
        name: 'SZENARIO 4 Pongau: Future',
        subtitle: 'Szenario 4: Pyrolysis',
        shortDescription: 'Wastewater treatment plant Reinhalteverband Salzburger Ennstal taking over additional waste (already in ongoing expansion) + cooperation with municipalities + sewage sludge pyrolysis',
        description: 'This mass flow diagram shows a future scenario for the wastewater treatment plant of Reinhalteverband Salzburger Ennstal. It is very realistic that the current collection in the existing catchment area of the Reinhalteverband Salzburger Ennstal with the usual sewage sludge and other waste that is further processed in the sewage treatment plant will be expanded to include additional sewage sludge collection areas of the municipalities of Gastein, Mühlbach, RHV Zentralraum Lungau, Filzmoos, RHV St. Michael, Ramingstein and from the RHV Salzachpongau and will also include the collection of kitchen and catering waste as well as former foodstuffs of animal origin in accordance with ÖWAV guidelines. The total amount of sewage sludge and other waste collected from this amounts to 2,575 tonnes dry matter. The material is recovered through sewage sludge pyrolysis to produce biochar and heat. This produces 975 tonnes TS of biochar, 609 tonnes TS of pyrolysis oil, 366 tonnes TS of waste gases and 487 tonnes TS of landfilled ash. The pyrolysis products contain a total of 124-207 tonnes of phosphorus. In addition, 30 tonnes of nitrogen, 30 tonnes of potassium, 244 tonnes of calcium, 49 tonnes of magnesium and 18 tonnes of sulphur could be returned to the natural cycle. The 6,375 MWh of heat generated during the pyrolysis process can also be utilised accordingly. A total of 5,035 MWh of electricity and 1,807 MWh of heat are required for all processes combined. On the other hand, a total of 3,011 MWh of electricity and 9,386 MWh of heat are generated at the site itself. (Note: any energy for transport has been allocated to electricity for the sake of simplicity, even though in reality it is made up of diesel and electricity).',
        flows: [
          { from: 'A', to: 'B', flow: 2575, unit: 't TS', color: '#a9a4a2', label: 'wastewater' },
          { from: 'B', to: 'L', flow: 2575, unit: 't TS', color: '#c94225', label: 'sewage sludge' },
          { from: 'L', to: 'M', flow: 975, unit: 't TS', color: '#2d5016', label: 'biochar' },
          { from: 'L', to: 'H', flow: 609, unit: 't TS', color: '#8B4513', label: 'pyrolysis oil' },
          { from: 'L', to: 'P', flow: 366, unit: 't TS', color: '#ffe6a0', label: 'waste gases' },
          { from: 'L', to: 'N', flow: 487, unit: 't TS', color: '#a9a4a2', label: 'ash' },
          { from: 'L', to: 'C', flow: 6375, unit: 'MWh', color: '#FF4500', label: 'heat generation' },
          { from: 'M', to: 'H', flow: 30, unit: 't TS', color: '#2596be', label: 'nitrogen' },
          { from: 'M', to: 'H', flow: 30, unit: 't TS', color: '#2596be', label: 'potassium' },
          { from: 'M', to: 'H', flow: 165, unit: 't TS', color: '#2596be', label: 'phosphorus' },
          { from: 'M', to: 'H', flow: 244, unit: 't TS', color: '#2596be', label: 'calcium' },
          { from: 'M', to: 'H', flow: 49, unit: 't TS', color: '#2596be', label: 'magnesium' },
          { from: 'M', to: 'H', flow: 18, unit: 't TS', color: '#2596be', label: 'sulfur' }
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
console.log('✅ Complete scenario data loaded successfully');
console.log('Available cities:', Object.keys(scenarioData).filter(k => k !== 'nodeLabels'));
console.log('Salzburg scenarios:', scenarioData.salzburg.scenarios.length);
console.log('Pongau scenarios:', scenarioData.pongau.scenarios.length);
console.log('Total scenarios:', 
  Object.keys(scenarioData)
    .filter(k => k !== 'nodeLabels')
    .reduce((total, city) => total + scenarioData[city].scenarios.length, 0)
);