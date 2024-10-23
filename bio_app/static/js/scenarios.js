// Scenarios data: mapping options to corresponding image paths
const scenariosData = {
    'option1': [
      '{% static "images/scenario1_option1.jpg" %}',
      '{% static "images/scenario2_option1.jpg" %}',
      '{% static "images/scenario3_option1.jpg" %}'
    ],
    'option2': [
      '{% static "images/scenario1_option2.jpg" %}',
      '{% static "images/scenario2_option2.jpg" %}',
      '{% static "images/scenario3_option2.jpg" %}'
    ],
    'option3': [
      '{% static "images/scenario1_option3.jpg" %}',
      '{% static "images/scenario2_option3.jpg" %}',
      '{% static "images/scenario3_option3.jpg" %}'
    ]
  };
  
  // Function to hide all other sections (Sankey, MCA)
  function hideSankeyChart() {
    document.querySelector('.chart-container').style.display = 'none';
    if (sankeyChart) {
      sankeyChart.destroy();
    }
  }
  
  function hideMCA() {
    document.querySelector('.mca-container').style.display = 'none';
  }
  
  // Function to show the Scenarios section and load the appropriate images
  function showScenarios() {
    hideSankeyChart(); // Hide Sankey chart
    hideMCA(); // Hide MCA section
  
    // Get the selected value from the dropdown
    const selectedOption = document.getElementById('residueStream').value;
  
    // Get the corresponding images for the selected option
    const scenarioImages = scenariosData[selectedOption];
  
    // Update the image sources dynamically
    const scenariosContainer = document.querySelector('.scenarios-container');
    const imgElements = scenariosContainer.querySelectorAll('img');
  
    // Loop through images and set the corresponding source based on selected option
    imgElements.forEach((img, index) => {
      img.src = scenarioImages[index];
    });
  
    // Show the Scenarios container
    scenariosContainer.style.display = 'block';
  }
  