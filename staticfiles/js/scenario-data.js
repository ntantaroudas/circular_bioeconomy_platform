/* scenario-data.js - Complete data with all scenarios and descriptions */

// Function to get current language from URL
function getCurrentLanguage() {
  const path = window.location.pathname;
  if (path.startsWith('/de/')) {
    return 'de';
  }
  return 'en'; // Default to English
}

// Function to get translated text
function getTranslation(translations) {
  const lang = getCurrentLanguage();
  return translations[lang] || translations['en']; // Fallback to English if translation missing
}

// Complete scenario data extracted from the Excel file
const scenarioData = {
  salzburg: {
    scenarios: [
      {
        id: 'salzburg_0',
        name: {
          en: 'SCENARIO 0 Salzburg: Status quo',
          de: 'SZENARIO 0 Salzburg: Status quo'
        },
        subtitle: {
          en: 'Status quo: Disposal and incineration',
          de: 'Status quo: Entsorgung und Verbrennung'
        },
        shortDescription: {
          en: 'Wastewater treatment plants with mainly incineration of sewage sludge',
          de: 'Kläranlagen mit hauptsächlich Verbrennung von Klärschlamm'
        },
        description: {
          en: 'In this mass flow diagram, the current status of all wastewater treatment plants in the province of Salzburg is shown. The 13,000 t DS of sewage sludge collected in Salzburg\'s wastewater treatment plants is mainly incinerated following the general trend and particularly in accordance with legal requirements (due to the challenges regarding difficult-to-remove contamination of sewage sludge), and the 3,822 t DS of sewage sludge ash is landfilled. The majority of the mass is converted into 8,918 t DS of exhaust gases during the incineration of sewage sludge. Only a small part, about 260 t DS, is spread. So far, further utilization of the ash is being sought, but no further use has been specifically planned yet. These are annual quantities.',
          de: 'In diesem Mengenflussdiagramm wird der IST-Status aller Kläranlagen des Bundeslandes Salzburg dargestellt. Die in den Salzburger Kläranlagen gesammelten 13.000 t TS Klärschlämme werden dem allgemeinen Trend und speziell (bedingt durch die Herausforderungen hinsichtlich schwer beseitigbaren Verunreinigungen der Klärschlämme) den gesetzlichen Vorgaben folgend hauptsächlich verbrannt und die 3.822 t TS Klärschlammasche wird deponiert. Der Großteil der Masse geht bei Verbrennung des Klärschlamms in 8.918 t TS Abgase über. Nur ein kleiner Teil, etwa 260 t TS wird ausgebracht. Bislang wird zwar eine weitere Verwertung der Asche angestrebt, doch noch ist konkret keine weitere Nutzung vorgesehen. These are annual quantities.'
        },
        flows: [
          { from: 'A', to: 'B', flow: 13000, unit: 't TS', color: '#b56834', label: getTranslation({en: 'wastewater', de: 'Abwasser'}) },
          { from: 'B', to: 'F', flow: 12750, unit: 't TS', color: '#c94225', label: getTranslation({en: 'sewage sludge', de: 'Klärschlamm'}) },
          { from: 'F', to: 'P', flow: 8918, unit: 't TS', color: '#ffe6a0', label: getTranslation({en: 'emissions', de: 'Emissionen'}) },
          { from: 'F', to: 'N', flow: 3822, unit: 't TS', color: '#eeeee4', label: getTranslation({en: 'ash', de: 'Asche'}) },
          { from: 'B', to: 'H', flow: 260, unit: 't TS', color: '#b3caa2', label: getTranslation({en: 'reused', de: 'wiederverwendet'}) }
        ]
      },
      {
        id: 'salzburg_1',
        name: {
          en: 'SCENARIO 1 Salzburg: Future',
          de: 'SZENARIO 1 Salzburg: Zukunft'
        },
        subtitle: {
          en: 'Scenario 1: 100% incineration according to the amendment to the Waste Incineration Ordinance (AVV, BGBl. II Nr. 389/2002)',
          de: 'Szenario 1: 100% Verbrennung gemäß der Novelle der Abfallverbrennungsverordnung (AVV, BGBl. II Nr. 389/2002)'
        },
        shortDescription: {
          en: 'Sewage treatment plants with mainly incineration of sewage sludge + phosphorus recovery',
          de: 'Kläranlagen mit hauptsächlich Verbrennung von Klärschlamm + Phosphorrückgewinnung'
        },
        description: {
          en: 'This mass flow diagram shows a future scenario for all wastewater treatment plants in the province of Salzburg. The Salzburg wastewater treatment plants follow the general trend, but the requirements according to the amendment of the Waste Incineration Ordinance ((AVV, BGBl. II Nr. 389/2002) ). According to this, at least 80% of the phosphorus must be recovered when the sewage sludge is incinerated. However, recovery from the combustion residues (the ash) is currently still being researched and is not yet used, which is why most of it has been landfilled so far. It should also be borne in mind that previous research has shown that the subsequent extraction of phosphorus from sewage sludge ash and the associated separation of pollutants is associated with high costs. If, following the general trend, 100% of the 13,000 tonnes of sewage sludge collected in Salzburg\'s wastewater treatment plants were incinerated, 3,900 tonnes of sewage sludge ash would be produced and landfilled. When the sewage sludge is incinerated, the majority of the mass is converted into 9,100 tonnes of dry matter exhaust gases. Then nothing more would be spread. If the legal minimum of 80 % phosphorus recovery is adhered to, 286 tonnes of phosphorus dry matter would be recovered. (Note: The recovered nutrients refer to a theoretical estimate based on typical content proportions in sewage sludge). These are annual quantities.',
          de: 'Dieses Stoffflussdiagramm zeigt ein Zukunftsszenario für alle Kläranlagen des Bundeslandes Salzburg. Die Salzburger Kläranlagen folgen dem allgemeinen Trend, aber den Anforderungen gemäß der Novelle der Abfallverbrennungsverordnung (AVV, BGBl. II Nr. 389/2002). Demnach müssen bei der Verbrennung von Klärschlamm mindestens 80% des Phosphors zurückgewonnen werden. Die Rückgewinnung aus den Verbrennungsrückständen (der Asche) wird jedoch derzeit noch erforscht und noch nicht angewendet, weshalb der Großteil bisher deponiert wurde. Zu bedenken ist auch, dass bisherige Forschungen gezeigt haben, dass die nachträgliche Gewinnung von Phosphor aus Klärschlammasche und die damit verbundene Abtrennung von Schadstoffen mit hohen Kosten verbunden ist. Würden dem allgemeinen Trend folgend 100% der 13.000 Tonnen Klärschlamm, die in Salzburgs Kläranlagen gesammelt werden, verbrannt, würden 3.900 Tonnen Klärschlammasche anfallen und deponiert werden. Bei der Verbrennung des Klärschlamms wird der Großteil der Masse in 9.100 Tonnen Trockensubstanz-Abgase umgewandelt. Dann würde nichts mehr ausgebracht werden. Bei Einhaltung des gesetzlichen Minimums von 80% Phosphorrückgewinnung würden 286 Tonnen Phosphor-Trockensubstanz zurückgewonnen werden. (Hinweis: Die zurückgewonnenen Nährstoffe beziehen sich auf eine theoretische Schätzung basierend auf typischen Gehaltsanteilen im Klärschlamm). Dies sind Jahresmengen.'
        },
        flows: [
          { from: 'A', to: 'B', flow: 13000, unit: 't TS', color: '#b56834', label: getTranslation({en: 'wastewater', de: 'Abwasser'}) },
          { from: 'B', to: 'F', flow: 13000, unit: 't TS', color: '#c94225', label: getTranslation({en: 'sewage sludge', de: 'Klärschlamm'}) },
          { from: 'F', to: 'P', flow: 9100, unit: 't TS', color: '#ffe6a0', label: getTranslation({en: 'emissions', de: 'Emissionen'}) },
          { from: 'F', to: 'I', flow: 3900, unit: 't TS', color: '#eeeee4', label: getTranslation({en: 'ash', de: 'Asche'}) },
          { from: 'I', to: 'H', flow: 72, unit: 't TS', color: '#2596be', label: getTranslation({en: 'phosphorus', de: 'Phosphor'}) },
          { from: 'I', to: 'H', flow: 286, unit: 't TS', color: '#2596be', label: getTranslation({en: 'phosphor min.', de: 'Phosphor min.'}) },
          { from: 'I', to: 'N', flow: 3543, unit: 't TS', color: '#a9a4a2', label: getTranslation({en: 'ash', de: 'Asche'}) }
        ]
      },
      {
        id: 'salzburg_2',
        name: {
          en: 'SCENARIO 2 Salzburg: Future',
          de: 'SZENARIO 2 Salzburg: Zukunft'
        },
        subtitle: {
          en: 'Scenario 2: INNOVATIVE with 100% material recovery in accordance with the amendment to the Waste Incineration Ordinance (AVV, BGBl. II Nr. 389/2002)',
          de: 'Szenario 2: INNOVATIV mit 100% Stoffverwertung gemäß der Novelle der Abfallverbrennungsverordnung (AVV, BGBl. II Nr. 389/2002)'
        },
        shortDescription: {
          en: 'Innovative sludge treatment and humidification',
          de: 'Innovative Schlammbehandlung und Humifizierung'
        },
        description: {
          en: 'This mass flow diagram shows a future scenario for all wastewater treatment plants in the province of Salzburg. The Salzburg wastewater treatment plants do not follow the general trend, but the requirements according to the amendment of the Waste Incineration Ordinance(AVV, BGBl. II Nr. 389/2002) where at least 60% of the phosphorus must be recovered under these circumstances. This recovery takes place via other utilisation by spreading on the field. If, in line with the general trend, 100% of the 13,000 tonnes of sewage sludge collected in Salzburg\'s sewage treatment plants were to be applied, a number of nutrients could be recovered. If the legal minimum of 60% phosphorus recovery is adhered to, 215 tonnes of phosphorus TS would be recovered. In addition, 455 tonnes TS nitrogen, 39 tonnes TS potassium, 845 tonnes TS calcium, 130 tonnes TS magnesium and 163 tonnes TS sulphur could be returned to the natural cycle. (Note: The recovered nutrients refer to a theoretical estimate based on typical content proportions in sewage sludge). These are annual quantities.',
          de: 'Dieses Stoffflussdiagramm zeigt ein Zukunftsszenario für alle Kläranlagen des Bundeslandes Salzburg. Die Salzburger Kläranlagen folgen nicht dem allgemeinen Trend, sondern den Anforderungen gemäß der Novelle der Abfallverbrennungsverordnung (AVV, BGBl. II Nr. 389/2002), wo unter diesen Umständen mindestens 60% des Phosphors zurückgewonnen werden müssen. Diese Rückgewinnung erfolgt über andere Verwertung durch Ausbringung auf dem Feld. Würden entsprechend dem allgemeinen Trend 100% der 13.000 Tonnen Klärschlamm, die in Salzburgs Kläranlagen gesammelt werden, ausgebracht, könnten eine Reihe von Nährstoffen zurückgewonnen werden. Bei Einhaltung des gesetzlichen Minimums von 60% Phosphorrückgewinnung würden 215 Tonnen Phosphor TS zurückgewonnen werden. Zusätzlich könnten 455 Tonnen TS Stickstoff, 39 Tonnen TS Kalium, 845 Tonnen TS Calcium, 130 Tonnen TS Magnesium und 163 Tonnen TS Schwefel in den natürlichen Kreislauf zurückgeführt werden. (Hinweis: Die zurückgewonnenen Nährstoffe beziehen sich auf eine theoretische Schätzung basierend auf typischen Gehaltsanteilen im Klärschlamm). Dies sind Jahresmengen.'
        },
        flows: [
          { from: 'A', to: 'B', flow: 13000, unit: 't TS', color: '#a9a4a2', label: getTranslation({en: 'wastewater', de: 'Abwasser'}) },
          { from: 'B', to: 'H', flow: 11010, unit: 't TS', color: '#b3caa2', label: getTranslation({en: 'reused', de: 'wiederverwendet'}) },
          { from: 'B', to: 'H', flow: 455, unit: 't TS', color: '#2596be', label: getTranslation({en: 'nitrogen', de: 'Stickstoff'}) },
          { from: 'B', to: 'H', flow: 39, unit: 't TS', color: '#2596be', label: getTranslation({en: 'potassium', de: 'Kalium'}) },
          { from: 'B', to: 'H', flow: 143.5, unit: 't TS', color: '#2596be', label: getTranslation({en: 'phosphor zusatz', de: 'Phosphor zusatz'}) },
          { from: 'B', to: 'H', flow: 214.5, unit: 't TS', color: '#2596be', label: getTranslation({en: 'phosphor min.', de: 'Phosphor min.'}) },
          { from: 'B', to: 'H', flow: 845, unit: 't TS', color: '#2596be', label: getTranslation({en: 'calcium', de: 'Kalzium'}) },
          { from: 'B', to: 'H', flow: 130, unit: 't TS', color: '#2596be', label: getTranslation({en: 'magnesium', de: 'Magnesium'}) },
          { from: 'B', to: 'H', flow: 163, unit: 't TS', color: '#2596be', label: getTranslation({en: 'sulphur', de: 'Schwefel'}) }
        ]
      }
    ]
  },
  pongau: {
    scenarios: [
      {
        id: 'pongau_0',
        name: {
          en: 'SCENARIO 0 Pongau: Status quo',
          de: 'SZENARIO 0 Pongau: Status quo'
        },
        subtitle: {
          en: 'Status quo: Disposal and incineration',
          de: 'Status quo: Entsorgung und Verbrennung'
        },
        shortDescription: {
          en: 'Wastewater treatment plant Reinhalteverband Salzburger Ennstal + LKW Transport Lenzing',
          de: 'Kläranlage Reinhalteverband Salzburger Ennstal + LKW Transport Lenzing'
        },
        description: {
          en: 'This mass flow diagram shows the current status of the wastewater treatment plant of the Reinhalteverband Salzburger Ennstal. To date, standard sewage sludge and other waste in the catchment area totalling 625 t TS has been collected, processed in the sewage treatment plant and finally transported by truck to Lenzing, where it is incinerated to produce 188 t TS sewage sludge ash and 438 t TS waste gas. All processes together require a total of 1,837 MWh of electricity and 2,212 MWh of heat. On the other hand, a total of 970 MWh of electricity and 970 MWh of heat are generated at the site itself. (Note: any energy for transport has been allocated to electricity for the sake of simplicity, even though in reality it is made up of diesel and electricity). These are annual quantities.',
          de: 'Dieses Stoffflussdiagramm zeigt den aktuellen Status der Kläranlage des Reinhalteverbands Salzburger Ennstal. Bisher wurden Standard-Klärschlamm und andere Abfälle im Einzugsgebiet mit insgesamt 625 t TS gesammelt, in der Kläranlage verarbeitet und schließlich per LKW nach Lenzing transportiert, wo er zu 188 t TS Klärschlammasche und 438 t TS Abgas verbrannt wird. Alle Prozesse zusammen benötigen insgesamt 1.837 MWh Strom und 2.212 MWh Wärme. Andererseits werden am Standort selbst insgesamt 970 MWh Strom und 970 MWh Wärme erzeugt. (Hinweis: Energie für den Transport wurde der Einfachheit halber dem Strom zugeordnet, obwohl sie in Wirklichkeit aus Diesel und Strom besteht). Dies sind Jahresmengen.'
        },
        flows: [
          { from: 'A', to: 'B', flow: 625, unit: 't TS', color: '#a9a4a2', label: getTranslation({en: 'wastewater', de: 'Abwasser'}) },
          { from: 'B', to: 'J', flow: 625, unit: 't TS', color: '#c94225', label: getTranslation({en: 'sewage sludge', de: 'Klärschlamm'}) },
          { from: 'J', to: 'F', flow: 625, unit: 't TS', color: '#c94225', label: getTranslation({en: 'sewage sludge', de: 'Klärschlamm'}) },
          { from: 'F', to: 'P', flow: 438, unit: 't TS', color: '#ffe6a0', label: getTranslation({en: 'emissions', de: 'Emissionen'}) },
          { from: 'F', to: 'N', flow: 188, unit: 't TS', color: '#eeeee4', label: getTranslation({en: 'ash', de: 'Asche'}) }
        ]
      },
      {
        id: 'pongau_1',
        name: {
          en: 'SCENARIO 1 Pongau: Future',
          de: 'SZENARIO 1 Pongau: Zukunft'
        },
        subtitle: {
          en: 'Scenario 1 Future: Expansion, drying and incineration',
          de: 'Szenario 1 Zukunft: Erweiterung, Trocknung und Verbrennung'
        },
        shortDescription: {
          en: 'Wastewater treatment plant Reinhalteverband Salzburger Ennstal taking over additional waste (already in ongoing expansion) + cooperation with municipalities + drying on site + railway transport Simmering + incineration',
          de: 'Kläranlage Reinhalteverband Salzburger Ennstal übernimmt zusätzliche Abfälle (bereits in laufender Erweiterung) + Kooperation mit Gemeinden + Trocknung vor Ort + Bahntransport Simmering + Verbrennung'
        },
        description: {
          en: 'This mass flow diagram shows a future scenario for the wastewater treatment plant of Reinhalteverband Salzburger Ennstal. It is very likely that the current collection in the existing catchment area of the Reinhalteverband Salzburger Ennstal with the usual sewage sludge and other waste that is further processed in the sewage treatment plant will be expanded to include additional sewage sludge areas of the municipalities of Gastein, Mühlbach, RHV Zentralraum Lungau, Filzmoos, RHV St. Michael, Ramingstein and from the RHV Salzachpongau and will also include the collection of kitchen and food waste as well as former animal foodstuffs in accordance with ÖWAV guidelines. The total amount of sewage sludge and other waste collected from this amounts to 2,575 tonnes dry matter. Furthermore, additional drying is carried out on site to reduce the transport weight from 10,300 tonnes with a 25% dry matter content to 3,605 tonnes with a 90% dry matter content. Instead of being transported by lorry to Lenzing, this greatly reduced quantity is shortened via Radstadt railway station and instead transported by rail to Vienna-Simmering, where it is incinerated to produce 773 tonnes of sewage sludge ash and 1,803 tonnes of waste gas. All processes together require a total of 7,343 MWh of electricity and 4,817 MWh of heat. On the other hand, a total of 3,011 MWh of electricity and 3,011 MWh of heat are generated at the site itself. (Note: any energy for transport has been allocated to electricity for the sake of simplicity, even though in reality it is made up of diesel and electricity). These are annual quantities.',
          de: 'Dieses Stoffflussdiagramm zeigt ein Zukunftsszenario für die Kläranlage des Reinhalteverbands Salzburger Ennstal. Es ist sehr wahrscheinlich, dass die derzeitige Sammlung im bestehenden Einzugsgebiet des Reinhalteverbands Salzburger Ennstal mit dem üblichen Klärschlamm und anderen Abfällen, die in der Kläranlage weiterverarbeitet werden, um zusätzliche Klärschlammgebiete der Gemeinden Gastein, Mühlbach, RHV Zentralraum Lungau, Filzmoos, RHV St. Michael, Ramingstein und vom RHV Salzachpongau erweitert wird und auch die Sammlung von Küchen- und Speiseabfällen sowie ehemaligen tierischen Lebensmitteln gemäß ÖWAV-Richtlinien umfassen wird. Die Gesamtmenge des dabei gesammelten Klärschlamms und anderer Abfälle beträgt 2.575 Tonnen Trockensubstanz. Außerdem wird vor Ort eine zusätzliche Trocknung durchgeführt, um das Transportgewicht von 10.300 Tonnen mit 25% Trockensubstanzgehalt auf 3.605 Tonnen mit 90% Trockensubstanzgehalt zu reduzieren. Anstatt per LKW nach Lenzing transportiert zu werden, wird diese stark reduzierte Menge über den Bahnhof Radstadt verkürzt und stattdessen per Bahn nach Wien-Simmering transportiert, wo sie zu 773 Tonnen Klärschlammasche und 1.803 Tonnen Abgas verbrannt wird. Alle Prozesse zusammen benötigen insgesamt 7.343 MWh Strom und 4.817 MWh Wärme. Andererseits werden am Standort selbst insgesamt 3.011 MWh Strom und 3.011 MWh Wärme erzeugt. (Hinweis: Energie für den Transport wurde der Einfachheit halber dem Strom zugeordnet, obwohl sie in Wirklichkeit aus Diesel und Strom besteht). Dies sind Jahresmengen.'
        },
        flows: [
          { from: 'A', to: 'B', flow: 2575, unit: 't TS', color: '#a9a4a2', label: getTranslation({en: 'wastewater', de: 'Abwasser'}) },
          { from: 'B', to: 'D', flow: 2575, unit: 't TS', color: '#c94225', label: getTranslation({en: 'sewage sludge', de: 'Klärschlamm'}) },
          { from: 'D', to: 'K', flow: 2575, unit: 't TS', color: '#c94225', label: getTranslation({en: 'sewage sludge', de: 'Klärschlamm'}) },
          { from: 'K', to: 'F', flow: 2575, unit: 't TS', color: '#c94225', label: getTranslation({en: 'sewage sludge', de: 'Klärschlamm'}) },
          { from: 'F', to: 'P', flow: 1803, unit: 't TS', color: '#ffe6a0', label: getTranslation({en: 'emissions', de: 'Emissionen'}) },
          { from: 'F', to: 'N', flow: 773, unit: 't TS', color: '#eeeee4', label: getTranslation({en: 'ash', de: 'Asche'}) }
        ]
      },
      {
        id: 'pongau_2',
        name: {
          en: 'SCENARIO 2 Pongau: Future',
          de: 'SZENARIO 2 Pongau: Zukunft'
        },
        subtitle: {
          en: 'Scenario 2: Expansion, drying and incineration + phosphorus recovery',
          de: 'Szenario 2: Erweiterung, Trocknung und Verbrennung + Phosphorrückgewinnung'
        },
        shortDescription: {
          en: 'Wastewater treatment plant Reinhalteverband Salzburger Ennstal taking over additional waste (already in ongoing expansion) + cooperation with municipalities + drying on site + railway transport Simmering + incineration + phosphorus recovery',
          de: 'Kläranlage Reinhalteverband Salzburger Ennstal übernimmt zusätzliche Abfälle (bereits in laufender Erweiterung) + Kooperation mit Gemeinden + Trocknung vor Ort + Bahntransport Simmering + Verbrennung + Phosphorrückgewinnung'
        },
        description: {
          en: 'This mass flow diagram shows a future scenario for the wastewater treatment plant of Reinhalteverband Salzburger Ennstal. It is very realistic that the current collection in the existing catchment area of the Reinhalteverband Salzburger Ennstal with the usual sewage sludge and other waste that is further processed in the sewage treatment plant will be expanded to include additional sewage sludge collection areas from the municipalities of Gastein, Mühlbach, RHV Zentralraum Lungau, Filzmoos, RHV St. Michael, Ramingstein and from the RHV Salzachpongau and will also include the collection of kitchen and catering waste as well as former foodstuffs of animal origin in accordance with ÖWAV guidelines. The total amount of sewage sludge and other waste collected from this amounts to 2,575 tonnes dry matter. Furthermore, additional drying is carried out on site to reduce the transport weight from 10,300 tonnes with a 25% dry matter content to 3,605 tonnes with a 90% dry matter content. Instead of being transported by truck to Lenzing, this greatly reduced quantity is shortened via Radstadt railway station and instead transported by rail to Vienna-Simmering, where it is incinerated to produce 773 tonnes of sewage sludge ash and 1,803 tonnes of waste gas. 76 tonnes of phosphorus are recovered from the sewage sludge ash, while 697 tonnes of sewage sludge ash still have to be landfilled. A total of 7,559 MWh of electricity and 4,817 MWh of heat are required for all processes combined. On the other hand, a total of 3,011 MWh of electricity and 3,011 MWh of heat are generated at the site itself. (Note: any energy for transport has been allocated to electricity for the sake of simplicity, even though in reality it is made up of diesel and electricity). These are annual quantities.',
          de: 'Dieses Stoffflussdiagramm zeigt ein Zukunftsszenario für die Kläranlage des Reinhalteverbands Salzburger Ennstal. Es ist sehr realistisch, dass die derzeitige Sammlung im bestehenden Einzugsgebiet des Reinhalteverbands Salzburger Ennstal mit dem üblichen Klärschlamm und anderen Abfällen, die in der Kläranlage weiterverarbeitet werden, um zusätzliche Klärschlammsammelgebiete der Gemeinden Gastein, Mühlbach, RHV Zentralraum Lungau, Filzmoos, RHV St. Michael, Ramingstein und vom RHV Salzachpongau erweitert wird und auch die Sammlung von Küchen- und Gastronomieabfällen sowie ehemaligen Lebensmitteln tierischen Ursprungs gemäß ÖWAV-Richtlinien umfassen wird. Die Gesamtmenge des dabei gesammelten Klärschlamms und anderer Abfälle beträgt 2.575 Tonnen Trockensubstanz. Außerdem wird vor Ort eine zusätzliche Trocknung durchgeführt, um das Transportgewicht von 10.300 Tonnen mit 25% Trockensubstanzgehalt auf 3.605 Tonnen mit 90% Trockensubstanzgehalt zu reduzieren. Anstatt per LKW nach Lenzing transportiert zu werden, wird diese stark reduzierte Menge über den Bahnhof Radstadt verkürzt und stattdessen per Bahn nach Wien-Simmering transportiert, wo sie zu 773 Tonnen Klärschlammasche und 1.803 Tonnen Abgas verbrannt wird. Aus der Klärschlammasche werden 76 Tonnen Phosphor zurückgewonnen, während 697 Tonnen Klärschlammasche noch deponiert werden müssen. Für alle Prozesse zusammen werden insgesamt 7.559 MWh Strom und 4.817 MWh Wärme benötigt. Andererseits werden am Standort selbst insgesamt 3.011 MWh Strom und 3.011 MWh Wärme erzeugt. (Hinweis: Energie für den Transport wurde der Einfachheit halber dem Strom zugeordnet, obwohl sie in Wirklichkeit aus Diesel und Strom besteht). Dies sind Jahresmengen.'
        },
        flows: [
          { from: 'A', to: 'B', flow: 2575, unit: 't TS', color: '#a9a4a2', label: getTranslation({en: 'wastewater', de: 'Abwasser'}) },
          { from: 'B', to: 'D', flow: 2575, unit: 't TS', color: '#c94225', label: getTranslation({en: 'sewage sludge', de: 'Klärschlamm'}) },
          { from: 'D', to: 'K', flow: 2575, unit: 't TS', color: '#c94225', label: getTranslation({en: 'sewage sludge', de: 'Klärschlamm'}) },
          { from: 'K', to: 'F', flow: 2575, unit: 't TS', color: '#c94225', label: getTranslation({en: 'sewage sludge', de: 'Klärschlamm'}) },
          { from: 'F', to: 'P', flow: 1803, unit: 't TS', color: '#ffe6a0', label: getTranslation({en: 'emissions', de: 'Emissionen'}) },
          { from: 'F', to: 'I', flow: 773, unit: 't TS', color: '#eeeee4', label: getTranslation({en: 'ash', de: 'Asche'}) },
          { from: 'I', to: 'H', flow: 76, unit: 't TS', color: '#2596be', label: getTranslation({en: 'phosphorus', de: 'Phosphor'}) },
          { from: 'I', to: 'N', flow: 697, unit: 't TS', color: '#a9a4a2', label: getTranslation({en: 'ash', de: 'Asche'}) }
        ]
      },
      {
        id: 'pongau_3',
        name: {
          en: 'SCENARIO 3 Pongau: Future',
          de: 'SZENARIO 3 Pongau: Zukunft'
        },
        subtitle: {
          en: 'Scenario 3: innovative sludge treatment and humidification',
          de: 'Szenario 3: innovative Schlammbehandlung und Humifizierung'
        },
        shortDescription: {
          en: 'Wastewater treatment plant Reinhalteverband Salzburger Ennstal taking over additional waste (already in ongoing expansion) + cooperation with municipalities + sewage sludge humification',
          de: 'Kläranlage Reinhalteverband Salzburger Ennstal übernimmt zusätzliche Abfälle (bereits in laufender Erweiterung) + Kooperation mit Gemeinden + Klärschlammhumifizierung'
        },
        description: {
          en: 'This mass flow diagram shows a future scenario for the wastewater treatment plant of Reinhalteverband Salzburger Ennstal. It is very realistic that the current collection in the existing catchment area of the Reinhalteverband Salzburger Ennstal with the usual sewage sludge and other waste that is further processed in the sewage treatment plant will be expanded to include additional sewage sludge collection areas from the municipalities of Gastein, Mühlbach, RHV Zentralraum Lungau, Filzmoos, RHV St. Michael, Ramingstein and from the RHV Salzachpongau and will also include the collection of kitchen and catering waste as well as former foodstuffs of animal origin in accordance with ÖWAV guidelines. The total amount of sewage sludge and other waste collected from this amounts to 2,575 tonnes dry matter. The material is recovered through sewage sludge humification on corresponding humification areas. The resulting humus can then be further utilised accordingly. In this way, 26-64 tonnes DM of phosphorus can be recovered. In addition, 90 tonnes TS nitrogen, 8 tonnes TS potassium, 167 tonnes TS calcium, 26 tonnes TS magnesium and 32 tonnes TS sulphur could be returned to the natural cycle. (Note: The recovered nutrients refer to a theoretical estimate based on typical content proportions in sewage sludge). A total of 4,483 MWh of electricity and 1,807 MWh of heat are required for all processes combined. On the other hand, a total of 3,011 MWh of electricity and 3,011 MWh of heat are generated at the site itself. (Note: any energy for transport has been allocated to electricity for the sake of simplicity, even though in reality it is made up of diesel and electricity). These are annual quantities.',
          de: 'Dieses Stoffflussdiagramm zeigt ein Zukunftsszenario für die Kläranlage des Reinhalteverbands Salzburger Ennstal. Es ist sehr realistisch, dass die derzeitige Sammlung im bestehenden Einzugsgebiet des Reinhalteverbands Salzburger Ennstal mit dem üblichen Klärschlamm und anderen Abfällen, die in der Kläranlage weiterverarbeitet werden, um zusätzliche Klärschlammsammelgebiete der Gemeinden Gastein, Mühlbach, RHV Zentralraum Lungau, Filzmoos, RHV St. Michael, Ramingstein und vom RHV Salzachpongau erweitert wird und auch die Sammlung von Küchen- und Gastronomieabfällen sowie ehemaligen Lebensmitteln tierischen Ursprungs gemäß ÖWAV-Richtlinien umfassen wird. Die Gesamtmenge des dabei gesammelten Klärschlamms und anderer Abfälle beträgt 2.575 Tonnen Trockensubstanz. Die Stoffverwertung erfolgt durch Klärschlammhumifizierung auf entsprechenden Humifizierungsflächen. Der entstehende Humus kann dann entsprechend weiterverwertet werden. Auf diese Weise können 26-64 Tonnen TM Phosphor zurückgewonnen werden. Zusätzlich könnten 90 Tonnen TS Stickstoff, 8 Tonnen TS Kalium, 167 Tonnen TS Calcium, 26 Tonnen TS Magnesium und 32 Tonnen TS Schwefel in den natürlichen Kreislauf zurückgeführt werden. (Hinweis: Die zurückgewonnenen Nährstoffe beziehen sich auf eine theoretische Schätzung basierend auf typischen Gehaltsanteilen im Klärschlamm). Für alle Prozesse zusammen werden insgesamt 4.483 MWh Strom und 1.807 MWh Wärme benötigt. Andererseits werden am Standort selbst insgesamt 3.011 MWh Strom und 3.011 MWh Wärme erzeugt. (Hinweis: Energie für den Transport wurde der Einfachheit halber dem Strom zugeordnet, obwohl sie in Wirklichkeit aus Diesel und Strom besteht). Dies sind Jahresmengen.'
        },
        flows: [
          { from: 'A', to: 'B', flow: 2575, unit: 't TS', color: '#a9a4a2', label: getTranslation({en: 'wastewater', de: 'Abwasser'}) },
          { from: 'B', to: 'G', flow: 2575, unit: 't TS', color: '#c94225', label: getTranslation({en: 'sewage sludge', de: 'Klärschlamm'}) },
          { from: 'G', to: 'H', flow: 90, unit: 't TS', color: '#2596be', label: getTranslation({en: 'nitrogen', de: 'Stickstoff'}) },
          { from: 'G', to: 'H', flow: 8, unit: 't TS', color: '#2596be', label: getTranslation({en: 'potassium', de: 'Kalium'}) },
          { from: 'G', to: 'H', flow: 45, unit: 't TS', color: '#2596be', label: getTranslation({en: 'phosphorus', de: 'Phosphor'}) },
          { from: 'G', to: 'H', flow: 167, unit: 't TS', color: '#2596be', label: getTranslation({en: 'calcium', de: 'Kalzium'}) },
          { from: 'G', to: 'H', flow: 26, unit: 't TS', color: '#2596be', label: getTranslation({en: 'magnesium', de: 'Magnesium'}) },
          { from: 'G', to: 'H', flow: 32, unit: 't TS', color: '#2596be', label: getTranslation({en: 'sulfur', de: 'Schwefel'}) },
          { from: 'G', to: 'H', flow: 2202, unit: 't TS', color: '#b3caa2', label: getTranslation({en: 'humus', de: 'Humus'}) },
          { from: 'G', to: 'O', flow: 4483, unit: 'MWh', color: '#FF6347', label: getTranslation({en: 'electricity consumption', de: 'Stromverbrauch'}) }
        ]
      },
      {
        id: 'pongau_4',
        name: {
          en: 'SCENARIO 4 Pongau: Future',
          de: 'SZENARIO 4 Pongau: Zukunft'
        },
        subtitle: {
          en: 'Scenario 4: Pyrolysis',
          de: 'Szenario 4: Pyrolyse'
        },
        shortDescription: {
          en: 'Wastewater treatment plant Reinhalteverband Salzburger Ennstal taking over additional waste (already in ongoing expansion) + cooperation with municipalities + sewage sludge pyrolysis',
          de: 'Kläranlage Reinhalteverband Salzburger Ennstal übernimmt zusätzliche Abfälle (bereits in laufender Erweiterung) + Kooperation mit Gemeinden + Klärschlammpyrolyse'
        },
        description: {
          en: 'This mass flow diagram shows a future scenario for the wastewater treatment plant of Reinhalteverband Salzburger Ennstal. It is very realistic that the current collection in the existing catchment area of the Reinhalteverband Salzburger Ennstal with the usual sewage sludge and other waste that is further processed in the sewage treatment plant will be expanded to include additional sewage sludge collection areas of the municipalities of Gastein, Mühlbach, RHV Zentralraum Lungau, Filzmoos, RHV St. Michael, Ramingstein and from the RHV Salzachpongau and will also include the collection of kitchen and catering waste as well as former foodstuffs of animal origin in accordance with ÖWAV guidelines. The total amount of sewage sludge and other waste collected from this amounts to 2,575 tonnes dry matter. The material is recovered through sewage sludge pyrolysis to produce biochar and heat. This produces 975 tonnes TS of biochar, 609 tonnes TS of pyrolysis oil, 366 tonnes TS of waste gases and 487 tonnes TS of landfilled ash. The pyrolysis products contain a total of 124-207 tonnes of phosphorus. In addition, 30 tonnes of nitrogen, 30 tonnes of potassium, 244 tonnes of calcium, 49 tonnes of magnesium and 18 tonnes of sulphur could be returned to the natural cycle. The 6,375 MWh of heat generated during the pyrolysis process can also be utilised accordingly. A total of 5,035 MWh of electricity and 1,807 MWh of heat are required for all processes combined. On the other hand, a total of 3,011 MWh of electricity and 9,386 MWh of heat are generated at the site itself. (Note: any energy for transport has been allocated to electricity for the sake of simplicity, even though in reality it is made up of diesel and electricity).',
          de: 'Dieses Stoffflussdiagramm zeigt ein Zukunftsszenario für die Kläranlage des Reinhalteverbands Salzburger Ennstal. Es ist sehr realistisch, dass die derzeitige Sammlung im bestehenden Einzugsgebiet des Reinhalteverbands Salzburger Ennstal mit dem üblichen Klärschlamm und anderen Abfällen, die in der Kläranlage weiterverarbeitet werden, um zusätzliche Klärschlammsammelgebiete der Gemeinden Gastein, Mühlbach, RHV Zentralraum Lungau, Filzmoos, RHV St. Michael, Ramingstein und vom RHV Salzachpongau erweitert wird und auch die Sammlung von Küchen- und Gastronomieabfällen sowie ehemaligen Lebensmitteln tierischen Ursprungs gemäß ÖWAV-Richtlinien umfassen wird. Die Gesamtmenge des dabei gesammelten Klärschlamms und anderer Abfälle beträgt 2.575 Tonnen Trockensubstanz. Die Stoffverwertung erfolgt durch Klärschlammpyrolyse zur Erzeugung von Biokohle und Wärme. Dabei entstehen 975 Tonnen TS Biokohle, 609 Tonnen TS Pyrolyseöl, 366 Tonnen TS Abgase und 487 Tonnen TS deponierte Asche. Die Pyrolyseprodukte enthalten insgesamt 124-207 Tonnen Phosphor. Zusätzlich könnten 30 Tonnen Stickstoff, 30 Tonnen Kalium, 244 Tonnen Calcium, 49 Tonnen Magnesium und 18 Tonnen Schwefel in den natürlichen Kreislauf zurückgeführt werden. Die bei der Pyrolyse entstehenden 6.375 MWh Wärme können ebenfalls entsprechend genutzt werden. Für alle Prozesse zusammen werden insgesamt 5.035 MWh Strom und 1.807 MWh Wärme benötigt. Andererseits werden am Standort selbst insgesamt 3.011 MWh Strom und 9.386 MWh Wärme erzeugt. (Hinweis: Energie für den Transport wurde der Einfachheit halber dem Strom zugeordnet, obwohl sie in Wirklichkeit aus Diesel und Strom besteht).'
        },
        flows: [
          { from: 'A', to: 'B', flow: 2575, unit: 't TS', color: '#a9a4a2', label: getTranslation({en: 'wastewater', de: 'Abwasser'}) },
          { from: 'B', to: 'L', flow: 2575, unit: 't TS', color: '#c94225', label: getTranslation({en: 'sewage sludge', de: 'Klärschlamm'}) },
          { from: 'L', to: 'M', flow: 975, unit: 't TS', color: '#2d5016', label: getTranslation({en: 'biochar', de: 'Biokohle'}) },
          { from: 'L', to: 'H', flow: 609, unit: 't TS', color: '#8B4513', label: getTranslation({en: 'pyrolysis oil', de: 'Pyrolyseöl'}) },
          { from: 'L', to: 'P', flow: 366, unit: 't TS', color: '#ffe6a0', label: getTranslation({en: 'waste gases', de: 'Abgase'}) },
          { from: 'L', to: 'N', flow: 487, unit: 't TS', color: '#a9a4a2', label: getTranslation({en: 'ash', de: 'Asche'}) },
          { from: 'L', to: 'C', flow: 6375, unit: 'MWh', color: '#FF4500', label: getTranslation({en: 'heat generation', de: 'Wärmeerzeugung'}) },
          { from: 'M', to: 'H', flow: 30, unit: 't TS', color: '#2596be', label: getTranslation({en: 'nitrogen', de: 'Stickstoff'}) },
          { from: 'M', to: 'H', flow: 30, unit: 't TS', color: '#2596be', label: getTranslation({en: 'potassium', de: 'Kalium'}) },
          { from: 'M', to: 'H', flow: 165, unit: 't TS', color: '#2596be', label: getTranslation({en: 'phosphorus', de: 'Phosphor'}) },
          { from: 'M', to: 'H', flow: 244, unit: 't TS', color: '#2596be', label: getTranslation({en: 'calcium', de: 'Kalzium'}) },
          { from: 'M', to: 'H', flow: 49, unit: 't TS', color: '#2596be', label: getTranslation({en: 'magnesium', de: 'Magnesium'}) },
          { from: 'M', to: 'H', flow: 18, unit: 't TS', color: '#2596be', label: getTranslation({en: 'sulfur', de: 'Schwefel'}) }
        ]
      }
    ]
  },
  
  // Node labels mapping with translations
  nodeLabels: {
    'A': getTranslation({en: 'Wastewater', de: 'Abwasser'}),
    'B': getTranslation({en: 'Treatment Plant', de: 'Kläranlage'}),
    'C': getTranslation({en: 'Energy Generation', de: 'Energieerzeugung'}),
    'D': getTranslation({en: 'Drying', de: 'Trocknung'}),
    'F': getTranslation({en: 'Incineration', de: 'Verbrennung'}),
    'G': getTranslation({en: 'Humidification', de: 'Humifizierung'}),
    'H': getTranslation({en: 'Reuse', de: 'Wiederverwendung'}),
    'I': getTranslation({en: 'Nutrient Recovery', de: 'Nährstoffrückgewinnung'}),
    'J': getTranslation({en: 'Transport LKW', de: 'Transport LKW'}),
    'K': getTranslation({en: 'Transport Train', de: 'Transport Bahn'}),
    'L': getTranslation({en: 'Pyrolysis', de: 'Pyrolyse'}),
    'M': getTranslation({en: 'Biochar', de: 'Biokohle'}),
    'N': getTranslation({en: 'Ash Landfill', de: 'Aschedeponie'}),
    'O': getTranslation({en: 'Electricity/Heat Consumption', de: 'Strom-/Wärmeverbrauch'}),
    'P': getTranslation({en: 'Emissions (Residual)', de: 'Emissionen (Rest)'}),
    'Q': getTranslation({en: 'Utilization (Other)', de: 'Verwertung (Sonstiges)'})
  }
};

// Log when data is loaded
console.log('✅ Complete scenario data loaded successfully with language support');
console.log('Current language:', getCurrentLanguage());
console.log('Available cities:', Object.keys(scenarioData).filter(k => k !== 'nodeLabels'));
console.log('Salzburg scenarios:', scenarioData.salzburg.scenarios.length);
console.log('Pongau scenarios:', scenarioData.pongau.scenarios.length);
console.log('Total scenarios:', 
  Object.keys(scenarioData)
    .filter(k => k !== 'nodeLabels')
    .reduce((total, city) => total + scenarioData[city].scenarios.length, 0)
);