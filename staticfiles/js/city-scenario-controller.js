/* city-scenario-controller.js */

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing City Scenario Controller...');
    
    // Clear any existing global variables to avoid conflicts
    if (window.currentCity) delete window.currentCity;
    if (window.currentScenario) delete window.currentScenario;
    
    initializeCityScenarioController();
});

// Local variables (not global to avoid conflicts)
let selectedCity = 'salzburg';
let selectedScenario = null;

function initializeCityScenarioController() {
    console.log('Setting up city scenario controller');
    
    // Check if scenarioData is available
    if (typeof scenarioData === 'undefined') {
        console.error('scenarioData is not defined. Make sure scenario-data.js is loaded first.');
        return;
    }
    
    setupCityButtons();
    
    // Set initial state
    selectedCity = 'salzburg';
    updateScenarioButtons(selectedCity);
    
    // Select first scenario by default and show Sankey
    const firstScenario = getScenariosByCity(selectedCity)[0];
    if (firstScenario) {
        selectedScenario = firstScenario.id;
        setActiveScenarioButton(selectedScenario);
        
        // Automatically show Sankey for the first scenario
        setTimeout(() => {
            if (typeof showSankeyDiagram === 'function') {
                showSankeyDiagram();
            }
        }, 500);
    }
    
    console.log('City Scenario Controller initialized successfully');
}

function setupCityButtons() {
    const cityButtons = document.querySelectorAll('.city-btn');
    console.log('Found city buttons:', cityButtons.length);
    
    cityButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedCityValue = this.dataset.city;
            console.log('City selected:', selectedCityValue);
            selectCity(selectedCityValue);
        });
    });
}

function selectCity(city) {
    console.log('Selecting city:', city);
    
    // Update current city
    selectedCity = city;
    
    // Update city button states
    document.querySelectorAll('.city-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const cityButton = document.querySelector(`[data-city="${city}"]`);
    if (cityButton) {
        cityButton.classList.add('active');
    }
    
    // Update scenario buttons
    updateScenarioButtons(city);
    
    // Auto-select first scenario and show Sankey
    const scenarios = getScenariosByCity(city);
    if (scenarios.length > 0) {
        selectScenario(scenarios[0].id);
    }
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
    
    // Create buttons for each scenario
    scenarios.forEach((scenario, index) => {
        const button = document.createElement('button');
        button.className = 'scenario-btn';
        button.dataset.scenario = scenario.id;
        button.textContent = scenario.name;
        button.title = scenario.subtitle;
        
        button.addEventListener('click', function() {
            console.log('Scenario selected:', scenario.id);
            selectScenario(scenario.id);
        });
        
        scenarioButtonsContainer.appendChild(button);
        
        // Set first button as active
        if (index === 0) {
            button.classList.add('active');
        }
    });
    
    console.log('Created', scenarios.length, 'scenario buttons');
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

// Export functions for use by other modules (use unique names)
window.getCurrentScenarioData = getCurrentScenarioData;
window.getScenarioById = getScenarioById;
window.getScenariosByCity = getScenariosByCity;