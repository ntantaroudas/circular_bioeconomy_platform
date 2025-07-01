/* dropdown-scenario-controller.js */

// Local variables
let selectedCity = '';
let selectedScenario = null;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Dropdown Scenario Controller...');
    initializeDropdownController();
});

function initializeDropdownController() {
    console.log('Setting up dropdown scenario controller');
    
    // Check if scenarioData is available
    if (typeof scenarioData === 'undefined') {
        console.error('scenarioData is not defined. Make sure scenario-data.js is loaded first.');
        return;
    }
    
    setupCityDropdown();
    
    // Clear scenario buttons initially
    clearScenarioButtons();
    
    console.log('Dropdown Scenario Controller initialized successfully');
}

function setupCityDropdown() {
    const cityDropdown = document.getElementById('cityDropdown');
    if (!cityDropdown) {
        console.error('City dropdown not found');
        return;
    }
    
    cityDropdown.addEventListener('change', function() {
        const selectedCityValue = this.value;
        console.log('City selected from dropdown:', selectedCityValue);
        
        if (selectedCityValue) {
            selectCity(selectedCityValue);
        } else {
            clearScenarioButtons();
            hideChart();
        }
    });
    
    console.log('City dropdown setup complete');
}

function selectCity(city) {
    console.log('Selecting city:', city);
    
    // Update current city
    selectedCity = city;
    
    // Update scenario buttons
    updateScenarioButtons(city);
    
    // Hide chart until a scenario is selected
    hideChart();
    
    // Reset selected scenario
    selectedScenario = null;
}

function updateScenarioButtons(city) {
    console.log('Updating scenario buttons for city:', city);
    
    const scenarioButtonsContainer = document.getElementById('scenarioButtons');
    if (!scenarioButtonsContainer) {
        console.error('Scenario buttons container not found');
        return;
    }
    
    const scenarios = getScenariosByCity(city);
    console.log('Found scenarios for', city, ':', scenarios.length);
    
    // Clear existing buttons
    scenarioButtonsContainer.innerHTML = '';
    
    if (scenarios.length === 0) {
        const lang = getCurrentLanguage();
        const noScenariosText = lang === 'de' 
            ? 'Keine Szenarien für diese Stadt verfügbar.' 
            : 'No scenarios available for this city.';
        scenarioButtonsContainer.innerHTML = `<p style="text-align: center; color: #6c757d;">${noScenariosText}</p>`;
        return;
    }
    
    // Create buttons for each scenario
    scenarios.forEach((scenario, index) => {
        const button = document.createElement('button');
        button.className = 'scenario-btn';
        button.dataset.scenario = scenario.id;
        
        // Get translated name
        const scenarioName = getTranslation(scenario.name);
        
        // Use shorter name for button text to fit better
        let buttonText = scenarioName;
        if (buttonText.length > 30) {
            // Extract just the scenario number and type for cleaner display
            if (buttonText.includes('SZENARIO') || buttonText.includes('SCENARIO')) {
                const parts = buttonText.split(':');
                if (parts.length > 1) {
                    buttonText = parts[0].trim() + ': ' + parts[1].trim().substring(0, 15) + '...';
                }
            }
        }
        
        button.textContent = buttonText;
        button.title = getTranslation(scenario.subtitle); // Full subtitle on hover
        
        button.addEventListener('click', function() {
            console.log('Scenario selected:', scenario.id);
            selectScenario(scenario.id);
        });
        
        scenarioButtonsContainer.appendChild(button);
    });
    
    console.log('Created', scenarios.length, 'scenario buttons');
}

function clearScenarioButtons() {
    const scenarioButtonsContainer = document.getElementById('scenarioButtons');
    if (scenarioButtonsContainer) {
        const lang = getCurrentLanguage();
        const selectCityText = lang === 'de' 
            ? 'Bitte wählen Sie eine Stadt aus, um verfügbare Szenarien zu sehen.' 
            : 'Please select a city to view available scenarios.';
        scenarioButtonsContainer.innerHTML = `<p style="text-align: center; color: #6c757d; margin: 20px 0;">${selectCityText}</p>`;
    }
}

function selectScenario(scenarioId) {
    console.log('Selecting scenario:', scenarioId);
    
    // Update current scenario
    selectedScenario = scenarioId;
    
    // Update scenario button states
    setActiveScenarioButton(scenarioId);
    
    // Automatically show Sankey diagram
    setTimeout(() => {
        if (typeof showSankeyDiagram === 'function') {
            showSankeyDiagram();
        } else {
            console.error('showSankeyDiagram function not found');
        }
    }, 100);
}

function setActiveScenarioButton(scenarioId) {
    document.querySelectorAll('.scenario-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeButton = document.querySelector(`[data-scenario="${scenarioId}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

function hideChart() {
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) {
        chartContainer.style.display = 'none';
    }
    
    // Safely destroy existing chart
    try {
        if (window.sankeyChart && typeof window.sankeyChart.destroy === 'function') {
            window.sankeyChart.destroy();
            window.sankeyChart = null;
        }
    } catch (error) {
        console.warn('Error destroying chart:', error);
        // Clear the reference anyway
        window.sankeyChart = null;
    }
}

// Utility function to get current scenario data
function getCurrentScenarioData() {
    if (!selectedScenario) {
        console.warn('No scenario currently selected');
        return null;
    }
    
    const scenario = getScenarioById(selectedScenario);
    if (!scenario) {
        console.error('Scenario not found:', selectedScenario);
    }
    
    return scenario;
}

// Helper function to get scenario by ID
function getScenarioById(scenarioId) {
    if (typeof scenarioData === 'undefined') {
        console.error('scenarioData is not available');
        return null;
    }
    
    for (const city in scenarioData) {
        if (city !== 'nodeLabels') {
            const scenario = scenarioData[city].scenarios.find(s => s.id === scenarioId);
            if (scenario) return scenario;
        }
    }
    return null;
}

// Helper function to get scenarios by city
function getScenariosByCity(city) {
    if (typeof scenarioData === 'undefined') {
        console.error('scenarioData is not available');
        return [];
    }
    
    return scenarioData[city] ? scenarioData[city].scenarios : [];
}

// Export functions for use by other modules
window.getCurrentScenarioData = getCurrentScenarioData;
window.getScenarioById = getScenarioById;
window.getScenariosByCity = getScenariosByCity;