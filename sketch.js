// Create style elements for search functionality
let searchStyle = document.createElement('style');
searchStyle.innerHTML = `
    #map {
        height: 85vh !important; /* Increase map height to 85% of viewport height */
        margin-bottom: 20px;
    }
    
    /* Adjust legend position to ensure it's fully visible */
    .legend {
        max-height: 80vh;
        overflow-y: auto;
    }
    .description {
        display: grid;
        grid-template-areas: "what who why";
        gap: 20px;
        max-width: 1000px;
        margin: 0 auto 2rem;
        padding: 0 20px;
    }
    .what-section {
        grid-area: what;
    }
    .who-section {
        grid-area: who;
    }
    .why-section {
        grid-area: why;
    }
    .description-section {
        margin: 1.5rem 0;
        text-align: left;
        background: #1E1E1E;
        padding: 25px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
    .description-section h2 {
        color: #E0E0E0;
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
        font-weight: 600;
    }
    .description-section p {
        color: #CCCCCC;
        font-size: 0.95rem;
        font-weight: 300;
        margin: 0;
    }
    .search-container {
        position: relative;
        display: inline-block;
    }
    .search-results {
        position: absolute;
        max-height: 200px;
        width: 100%;
        overflow-y: auto;
        background: #2D2D2D;
        border: 1px solid #404040;
        border-top: none;
        z-index: 2000;
        display: none;
    }
    .search-item {
        padding: 8px;
        cursor: pointer;
        color: #FFFFFF;
        font-family: 'Montserrat', sans-serif;
    }
    .search-item:hover {
        background-color: #404040;
    }
    .event-tooltip {
        max-width: 300px !important;
        min-width: 300px !important;
        white-space: normal !important;
        word-wrap: break-word !important;
        overflow-wrap: break-word !important;
        text-align: left;
        padding: 10px;
        font-size: 14px;
        font-family: 'Montserrat', sans-serif;
        background-color: #1E1E1E;
        color: #FFFFFF;
        border: 1px solid #404040;
        border-radius: 8px;
    }
    .university-search {
        padding: 8px;
        margin: 5px;
        min-width: 200px;
        background-color: #2D2D2D;
        color: #FFFFFF;
        border: 1px solid #404040;
        border-radius: 4px;
        font-family: 'Montserrat', sans-serif;
    }
    .legend {
        padding: 6px 8px;
        font-family: 'Montserrat', sans-serif;
        font-size: 12px;
        background: rgba(30, 30, 30, 0.95);
        color: #FFFFFF;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        border-radius: 8px;
        line-height: 20px;
        text-align: left;
    }
    .legend i {
        width: 18px;
        height: 18px;
        float: left;
        margin-right: 8px;
        opacity: 0.7;
    }
    .legend img {
        width: 24px;
        height: 24px;
        vertical-align: middle;
        margin-right: 8px;
    }
    .legend .circle {
        border-radius: 50%;
        width: 10px;
        height: 10px;
        margin-right: 8px;
        display: inline-block;
    }
    .legend-checkbox {
        margin-right: 5px;
        cursor: pointer;
        width: 16px;
        height: 16px;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        border: 2px solid #FFFFFF;
        border-radius: 2px;
        background: transparent;
        position: relative;
        outline: none;
        box-sizing: border-box;
    }
    .legend-checkbox:checked {
        background: #FFFFFF;
    }
    .legend-checkbox:checked:after {
        content: '';
        position: absolute;
        left: 50%;
        top: 45%;
        width: 6px;
        height: 10px;
        border: solid #1E1E1E;
        border-width: 0 2px 2px 0;
        transform: translate(-50%, -50%) rotate(45deg);
    }
    .legend-item {
        display: flex;
        align-items: center;
        margin: 2px 0;
        cursor: pointer;
    }
    .date-range-container {
        position: relative;
        background: rgba(30, 30, 30, 0.95);
        padding: 15px;
        border-radius: 8px;
        width: 80%;
        max-width: 800px;
        margin: 20px auto;
        z-index: 1000;
    }
    .histogram {
        width: 100%;
        height: 60px;
        margin-bottom: 10px;
        position: relative;
    }
    .histogram-bar {
        position: absolute;
        bottom: 0;
        background: rgba(255, 255, 255, 0.3);
        width: 2px;
    }
    .noUi-connect {
        background: #0091ff;
    }
    .noUi-handle {
        background: #FFFFFF;
        border-radius: 50%;
        box-shadow: none;
        cursor: pointer;
    }
    .date-labels {
        display: flex;
        justify-content: space-between;
        color: #FFFFFF;
        font-family: 'Montserrat', sans-serif;
        margin-top: 5px;
    }
    #date-range-slider {
        height: 10px;
        margin: 15px 0;
    }
    .noUi-target {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        border-radius: 5px;
        box-shadow: none;
    }
    .noUi-handle {
        width: 18px !important;
        height: 18px !important;
        border-radius: 50%;
        background: #FFFFFF;
        box-shadow: none;
        border: none;
        cursor: pointer;
        top: -5px !important;
    }
    .noUi-handle:before,
    .noUi-handle:after {
        display: none;
    }
    .timeline-controls {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 10px;
    }
    .timeline-button {
        padding: 8px 16px;
        background: #0091ff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-family: 'Montserrat', sans-serif;
    }
    .timeline-button:hover {
        background: #007acc;
    }
    .timeline-button:disabled {
        background: #666;
        cursor: not-allowed;
    }
    .progress-bar {
        width: 100%;
        height: 4px;
        background: rgba(255, 255, 255, 0.2);
        margin-top: 10px;
        border-radius: 2px;
        overflow: hidden;
    }
    .progress-fill {
        width: 0%;
        height: 100%;
        background: #0091ff;
        transition: width 0.3s ease;
    }
    .ui-datepicker {
        background-color: #1E1E1E !important;
        color: #FFFFFF !important;
        border: 1px solid #404040 !important;
        border-radius: 8px !important;
        padding: 10px !important;
        font-family: 'Montserrat', sans-serif !important;
        width: 280px !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5) !important;
        z-index: 1000 !important;
        opacity: 1 !important;
    }

    .ui-datepicker-header {
        background-color: #2D2D2D !important;
        color: #FFFFFF !important;
        border: none !important;
        border-radius: 4px !important;
        padding: 8px !important;
        margin-bottom: 8px !important;
    }

    .ui-datepicker-title {
        color: #FFFFFF !important;
        font-weight: 600 !important;
    }

    .ui-datepicker-calendar {
        width: 100% !important;
        border-collapse: collapse !important;
    }

    .ui-datepicker-calendar th {
        color: #CCCCCC !important;
        padding: 5px !important;
        text-align: center !important;
    }

    .ui-datepicker-calendar td {
        padding: 2px !important;
        text-align: center !important;
    }

    .ui-datepicker-calendar td a {
        color: #FFFFFF !important;
        text-align: center !important;
        padding: 5px !important;
        border-radius: 4px !important;
        display: block !important;
        text-decoration: none !important;
        background-color: transparent !important;
        border: 1px solid transparent !important;
    }

    .ui-datepicker-calendar td a.ui-state-active {
        background-color: #0091ff !important;
        border-color: #0091ff !important;
        color: white !important;
    }

    .ui-datepicker-calendar td a.ui-state-hover {
        background-color: #404040 !important;
        border-color: #404040 !important;
    }

    .ui-datepicker-calendar td a.ui-state-default {
        background-color: transparent !important;
        border: 1px solid transparent !important;
    }

    .ui-datepicker-prev, .ui-datepicker-next {
        background-color: #2D2D2D !important;
        border: none !important;
        cursor: pointer !important;
        top: 8px !important;
    }

    .ui-datepicker-prev {
        left: 5px !important;
    }

    .ui-datepicker-next {
        right: 5px !important;
    }

    .ui-datepicker-prev span, .ui-datepicker-next span {
        filter: invert(1) !important;
        opacity: 0.8 !important;
    }

    .ui-datepicker-month, .ui-datepicker-year {
        background-color: #2D2D2D !important;
        color: #FFFFFF !important;
        border: 1px solid #404040 !important;
        border-radius: 4px !important;
        padding: 2px 5px !important;
        margin: 0 2px !important;
    }
    /* Style for the date display inputs */
    #start-date-display, #end-date-display {
        background-color: #2D2D2D;
        color: #FFFFFF;
        border: 1px solid #404040;
        border-radius: 4px;
        padding: 8px 12px;
        font-family: 'Montserrat', sans-serif;
        cursor: pointer;
        width: 120px;
        text-align: center;
    }

    #start-date-display:focus, #end-date-display:focus {
        outline: none;
        border-color: #0091ff;
        box-shadow: 0 0 5px rgba(0, 145, 255, 0.5);
    }
`;
document.head.appendChild(searchStyle);

let histogramStyle = document.createElement('style');
histogramStyle.innerHTML = `
    .histogram {
        position: relative;
        height: 80px;
        margin-bottom: 10px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        overflow: hidden;
    }
    
    .histogram-title {
        text-align: center;
        color: #FFFFFF;
        font-family: 'Montserrat', sans-serif;
        font-size: 12px;
        padding: 3px 0;
        background: rgba(0, 0, 0, 0.3);
    }
    
    .histogram-bars {
        position: relative;
        width: 100%;
        height: calc(100% - 18px);
    }
    
    .histogram-bar {
        position: absolute;
        bottom: 0;
        background-color: #8B0000; /* Dark red */
        opacity: 0.7;
        cursor: pointer;
        transition: opacity 0.2s;
    }
    
    .histogram-bar:hover, .histogram-bar.hover {
        opacity: 1;
        background-color: #A00000;
    }
    
    .histogram-bar.max-fatalities {
        background-color: #FF0000; /* Brighter red for max */
        opacity: 1;
        box-shadow: 0 0 0 1px #000000; /* Black outline */
        z-index: 2;
    }
    
    .histogram-tooltip {
        position: fixed; /* Changed to fixed for better positioning */
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 5px 8px;
        border-radius: 4px;
        font-size: 11px;
        pointer-events: none;
        z-index: 1000;
        font-family: 'Montserrat', sans-serif;
        text-align: center;
        min-width: 80px;
    }
    
    .fatality-count {
        position: absolute;
        top: -20px;
        transform: translateX(-50%);
        background-color: rgba(139, 0, 0, 0.8);
        color: white;
        padding: 2px 6px;
        border-radius: 3px;
        font-size: 10px;
        white-space: nowrap;
        font-family: 'Montserrat', sans-serif;
        z-index: 5;
    }
    
    .peak-date-label {
        position: absolute;
        bottom: -20px;
        transform: translateX(-50%);
        background-color: rgba(139, 0, 0, 0.8);
        color: white;
        padding: 2px 6px;
        border-radius: 3px;
        font-size: 10px;
        white-space: nowrap;
        font-family: 'Montserrat', sans-serif;
        z-index: 5;
    }
    
    .date-labels-outside {
        display: flex;
        justify-content: space-between;
        width: 100%;
        color: #FFFFFF;
        font-family: 'Montserrat', sans-serif;
        font-size: 11px;
        margin-top: 5px;
        padding: 0 5px;
    }
    
    .date-label-start {
        text-align: left;
    }
    
    .date-label-end {
        text-align: right;
    }
`;
document.head.appendChild(histogramStyle);

let markerAnimationStyle = document.createElement('style');
markerAnimationStyle.innerHTML = `
    @keyframes markerFadeIn {
        0% {
            opacity: 0;
            transform: scale(0.5) translateY(10px);
        }
        70% {
            opacity: 0.9;
            transform: scale(1.1) translateY(0);
        }
        100% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
    
    .animated-marker {
        animation: markerFadeIn 0.5s ease-out forwards;
    }
    
    .animated-marker img {
        transform-origin: bottom center;
    }
`;
document.head.appendChild(markerAnimationStyle);

let style = document.createElement('style');
document.head.appendChild(style);

let universityMarkersMap;

function formatNotes(notes) {
    if (!notes) return '';
    let formattedNotes = '';
    let currentLine = '';
    let words = notes.split(' ');
    const MAX_LINE_LENGTH = 150;
    const MIN_REMAINING_LENGTH = 5;
    
    words.forEach(word => {
        if ((currentLine + ' ' + word).length > MAX_LINE_LENGTH) {
            if (word.length < 5 && (currentLine + ' ' + word).length < MAX_LINE_LENGTH + MIN_REMAINING_LENGTH) {
                currentLine += (currentLine ? ' ' : '') + word;
            } else {
                formattedNotes += currentLine + '<br>';
                currentLine = word;
            }
        } else {
            currentLine += (currentLine ? ' ' : '') + word;
        }
    });
    formattedNotes += currentLine;
    return formattedNotes;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
}

function formatDateForDisplay(dateString) {
    // Convert from any format to DD/MM/YYYY for display
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

function formatDateForComparison(dateString) {
    // Convert any date format to YYYY-MM-DD for comparison
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

document.addEventListener("DOMContentLoaded", function () {
    let map = L.map('map').setView([48.3794, 31.1656], 6); // Centered on Ukraine

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    let universityLayer = L.layerGroup().addTo(map);
    let geojsonLayer;
    let universitiesData = []; // Store universities data globally
    let eventData = []; // Store event data globally
    let markersLayer = L.layerGroup().addTo(map);
    let slider;
    let isPlaying = false;
    let currentBatch = 0;
    let playButton;
    let progressBar;
    let progressFill;

    // Create legend
    let legend = L.control({position: 'topleft'});
    legend.onAdd = function (map) {
        let div = L.DomUtil.create('div', 'legend');
        // Event icons legend
        div.innerHTML = '<h4 style="margin: 2px 0; font-weight: 600;">Event Types</h4>';
        div.innerHTML += `
        <div class="legend-item">
            <input type="checkbox" class="legend-checkbox" id="missile-attack" checked>
            <img src="icons/missile.png" style="margin: 1px 8px 1px 0"> Shelling/artillery/missile attack
        </div>`;
        div.innerHTML += `
            <div class="legend-item">
                <input type="checkbox" class="legend-checkbox" id="drone-strike" checked>
                <img src="icons/drone.png" style="margin: 1px 8px 1px 0"> Air/drone strike
            </div>`;
        div.innerHTML += `
            <div class="legend-item">
                <input type="checkbox" class="legend-checkbox" id="grenade" checked>
                <img src="icons/grenade.png" style="margin: 1px 8px 1px 0"> Grenade
            </div>`;
            div.innerHTML += `
            <div class="legend-item">
                <input type="checkbox" class="legend-checkbox" id="abduction" checked>
                <img src="icons/abduction.png" style="margin: 1px 8px 1px 0"> Abduction/forced disappearance
            </div>`;
        div.innerHTML += `
            <div class="legend-item">
                <input type="checkbox" class="legend-checkbox" id="mines" checked>
                <img src="icons/mines.png" style="margin: 1px 8px 1px 0"> Remote explosive/landmine/IED
            </div>`;
        div.innerHTML += `
            <div class="legend-item">
                <input type="checkbox" class="legend-checkbox" id="attack" checked>
                <img src="icons/attack.png" style="margin: 1px 8px 1px 0"> Attack
            </div>`;
            div.innerHTML += `
            <div class="legend-item">
                <input type="checkbox" class="legend-checkbox" id="other" checked>
                <img src="icons/other.png" style="margin: 1px 8px 1px 0"> Other
            </div>`;
        // University markers legend
        div.innerHTML += '<h4 style="margin: 2px 0; font-weight: 600;">University Status</h4>';
        div.innerHTML += '<span class="circle" style="background: #0091ff; width: 18px; height: 18px; margin: 1px 8px 1px 0"></span> Active<br>';
        div.innerHTML += '<img src="icons/relocated.png" style="width: 18px; height: 18px; margin: 1px 8px 1px 0"> Relocated<br>';
        div.innerHTML += '<span class="circle" style="background: grey; width: 18px; height: 18px; margin: 1px 8px 1px 0"></span> Occupied<br>';
        div.innerHTML += '<img src="icons/damaged.png" style="width: 18px; height: 18px; margin: 1px 8px 1px 0"> Damaged<br>';
        // Circle size legend
        div.innerHTML += '<h4 style="margin: 2px 0; font-weight: 600;">Circle Size</h4>';
        div.innerHTML += '<div style="margin: 1px 0">Circle size indicates student population</div>';
        div.innerHTML += '<span class="circle" style="background: #0091ff; width: 5px; height: 5px; margin: 1px 8px 1px 0"></span> < 5,000<br>';
        div.innerHTML += '<span class="circle" style="background: #0091ff; width: 10px; height: 10px; margin: 1px 8px 1px 0"></span> 5,000 - 15,000<br>';
        div.innerHTML += '<span class="circle" style="background: #0091ff; width: 15px; height: 15px; margin: 1px 8px 1px 0"></span> > 15,000<br>';

        // Add event listeners for checkboxes
        setTimeout(() => {
            const checkboxes = div.querySelectorAll('.legend-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    filterEvents();
                });
            });
        }, 0);

        return div;
    };
    legend.addTo(map);

    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const startDateDisplay = document.getElementById('start-date-display');
    const endDateDisplay = document.getElementById('end-date-display');
    
    // Function to format date as DD/MM/YYYY
    function formatDateDDMMYYYY(date) {
        if (!date) return '';
        const d = new Date(date);
        return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
    }
    
    // Initialize date pickers
    $(startDateDisplay).datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        showAnim: 'fadeIn',
        yearRange: '2018:2025',
        beforeShow: function(input, inst) {
            // Position the datepicker properly
            inst.dpDiv.css({
                backgroundColor: '#1E1E1E',
                color: '#FFFFFF',
                border: '1px solid #404040',
                borderRadius: '8px',
                zIndex: 1000
            });
            // Ensure the datepicker appears above other elements
            setTimeout(function() {
                inst.dpDiv.css('z-index', 1000);
            }, 0);
        },
        onSelect: function(dateText) {
            // Convert DD/MM/YYYY to YYYY-MM-DD for the hidden input
            const parts = dateText.split('/');
            startDateInput.value = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
    });
    
    $(endDateDisplay).datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        showAnim: 'fadeIn',
        yearRange: '2018:2025',
        beforeShow: function(input, inst) {
            // Position the datepicker properly
            inst.dpDiv.css({
                backgroundColor: '#1E1E1E',
                color: '#FFFFFF',
                border: '1px solid #404040',
                borderRadius: '8px',
                zIndex: 1000
            });
            // Ensure the datepicker appears above other elements
            setTimeout(function() {
                inst.dpDiv.css('z-index', 1000);
            }, 0);
        },
        onSelect: function(dateText) {
            // Convert DD/MM/YYYY to YYYY-MM-DD for the hidden input
            const parts = dateText.split('/');
            endDateInput.value = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
    });
    
    // Update display inputs when hidden inputs change
    startDateInput.addEventListener('change', function() {
        startDateDisplay.value = formatDateDDMMYYYY(this.value);
    });
    
    endDateInput.addEventListener('change', function() {
        endDateDisplay.value = formatDateDDMMYYYY(this.value);
    });

    // Create date range slider container and add it to the page before the map
    const dateRangeContainer = document.createElement('div');
    dateRangeContainer.className = 'date-range-container';
    const mapContainer = document.getElementById('map');
    mapContainer.parentNode.insertBefore(dateRangeContainer, mapContainer);

    const histogram = document.createElement('div');
    histogram.className = 'histogram';
    dateRangeContainer.appendChild(histogram);

    let dateInputStyle = document.createElement('style');
    dateInputStyle.innerHTML = `
        .date-input {
            padding: 5px;
            margin: 0 5px;
            background: #2D2D2D;
            color: #FFFFFF;
            border: 1px solid #404040;
            border-radius: 4px;
            font-family: 'Montserrat', sans-serif;
        }
    `;
    document.head.appendChild(dateInputStyle); 

    // Create slider
    slider = document.createElement('div');
    slider.id = 'date-range-slider';
    dateRangeContainer.appendChild(slider);

    // Create date labels
    const dateLabels = document.createElement('div');
    dateLabels.className = 'date-labels';
    dateRangeContainer.appendChild(dateLabels);

    // Create timeline controls
    const timelineControls = document.createElement('div');
    timelineControls.className = 'timeline-controls';
    dateRangeContainer.appendChild(timelineControls);

    // Create play button
    playButton = document.createElement('button');
    playButton.className = 'timeline-button';
    playButton.textContent = 'Play Timeline';
    timelineControls.appendChild(playButton);

        // Style the Play Timeline button
    playButton.style.backgroundColor = "#8B0000"; // Dark red background
    playButton.style.color = "white";
    playButton.style.border = "none";
    playButton.style.padding = "8px 15px";
    playButton.style.borderRadius = "4px";
    playButton.style.cursor = "pointer";
    playButton.style.fontFamily = "'Montserrat', sans-serif";
    playButton.style.fontSize = "12px";
    playButton.style.transition = "background-color 0.2s";
    playButton.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.3)";

    // Add hover effect for the button
    playButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = "#A00000"; // Lighter red on hover
    });
    playButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = "#8B0000"; // Back to dark red
    });

    // Create progress bar
    progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressFill = document.createElement('div');
    progressFill.className = 'progress-fill';
    progressBar.appendChild(progressFill);
    dateRangeContainer.appendChild(progressBar);

        // Style the progress bar
    progressBar.style.height = "5px";
    progressBar.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    progressBar.style.borderRadius = "2px";
    progressBar.style.overflow = "hidden";

    // Style the progress fill
    progressFill.style.height = "100%";
    progressFill.style.width = "0%";
    progressFill.style.backgroundColor = "#8B0000"; // Dark red
    progressFill.style.transition = "width 0.3s";

    window.filterEvents = function() {
        let startDateElem = document.getElementById("start-date");
        let endDateElem = document.getElementById("end-date");
        
        if (!startDateElem || !endDateElem) {
            console.error("Date filter element missing in DOM.");
            return;
        }
    
        if (!startDateElem.value || !endDateElem.value) {
            alert('Please select both start and end dates');
            return;
        }
    
        markersLayer.clearLayers(); // Clear existing markers
        
        // Batch process markers
        const BATCH_SIZE = 100;

        // Convert input dates to YYYY-MM-DD format for comparison
        const startDate = formatDateForComparison(startDateElem.value);
        const endDate = formatDateForComparison(endDateElem.value);
            
        let filteredEvents = eventData.filter(event => {
            let eventDate = event.event_date?.trim();
            if (!eventDate) return false;

            eventDate = formatDateForComparison(eventDate);
            return eventDate >= startDate && eventDate <= endDate;
        });

    
    // Only show events within the current map bounds
    let bounds = map.getBounds();
    filteredEvents = filteredEvents.filter(event => {
        let lat = parseFloat(event.latitude);
        let lng = parseFloat(event.longitude);
        return bounds.contains([lat, lng]);
    });

    // Also check event type checkboxes
    filteredEvents = filteredEvents.filter(event => {
        if (event.sub_event_type && event.sub_event_type.toLowerCase().includes('attack')) {
            return false;
        }
        
        let eventTypeId = getCheckboxId(event.sub_event_type);
        let checkbox = document.getElementById(eventTypeId);
        return checkbox && checkbox.checked;
    });

       // Process events in batches
       function processBatch(startIndex) {
        let endIndex = Math.min(startIndex + BATCH_SIZE, filteredEvents.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            let event = filteredEvents[i];
            let lat = parseFloat(event.latitude);
            let lng = parseFloat(event.longitude);
            if (isNaN(lat) || isNaN(lng)) continue;
            
            let eventType = event.sub_event_type || "Other";
            let eventIcon = iconMap[eventType] || iconMap["Other"];
            
            let marker = L.marker([lat, lng], { icon: eventIcon });
            
            // Create popup content in the same style as university popups
            let popupContent = `<h3 style="font-family: 'Montserrat', sans-serif; font-weight: 600;">${event.sub_event_type}</h3>
                            <p style="font-family: 'Montserrat', sans-serif;"><strong>Date:</strong> ${formatDateForDisplay(event.event_date)}</p>`;
            
            // Add notes if available
            if (event.notes) {
                let formattedNotes = formatNotes(event.notes);
                popupContent += `<p style="font-family: 'Montserrat', sans-serif;"><strong>Additional Info:</strong> ${formattedNotes}</p>`;
            }
            
            // Add fatalities if available
            if (event.fatalities && event.fatalities !== "0") {
                popupContent += `<p style="font-family: 'Montserrat', sans-serif;"><strong>Fatalities:</strong> ${event.fatalities}</p>`;
            }
            
            marker.bindPopup(popupContent);
            markersLayer.addLayer(marker);
        }
       // Process next batch if there are more events
       if (endIndex < filteredEvents.length) {
        setTimeout(() => processBatch(endIndex), 0);
    }
}

// Start processing the first batch
processBatch(0);

// Update the slider to match the selected dates
slider.noUiSlider.set([
    new Date(startDateElem.value).getTime(),
    new Date(endDateElem.value).getTime()
]);
}

    // Load CSV data and initialize slider
    fetch('data.csv')
        .then(response => response.text())
        .then(csvText => {
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: function(results) {
                    eventData = results.data;
                    
                    // Process data for histogram
                    const dates = eventData.map(event => new Date(event.event_date));
                    const minDate = new Date(Math.min(...dates));
                    const maxDate = new Date(Math.max(...dates));

                    // Initialize date inputs with min/max dates
                    const startDateInput = document.getElementById('start-date');
                    const endDateInput = document.getElementById('end-date');
                    startDateInput.min = minDate.toISOString().split('T')[0];
                    startDateInput.max = maxDate.toISOString().split('T')[0];
                    endDateInput.min = minDate.toISOString().split('T')[0];
                    endDateInput.max = maxDate.toISOString().split('T')[0];
                    
                    // Set initial values
                    startDateInput.value = minDate.toISOString().split('T')[0];
                    endDateInput.value = maxDate.toISOString().split('T')[0];

                                    // Update display inputs
                    if (startDateDisplay && endDateDisplay) {
                        startDateDisplay.value = formatDateForDisplay(minDate);
                        endDateDisplay.value = formatDateForDisplay(maxDate);
                    }
                    
                    // Add event listeners for date inputs
                    startDateInput.addEventListener('change', function() {
                        slider.noUiSlider.set([new Date(this.value).getTime(), null]);
                        filterEvents();
                    });
                    
                    endDateInput.addEventListener('change', function() {
                        slider.noUiSlider.set([null, new Date(this.value).getTime()]);
                        filterEvents();
                    });
                    
                    // Create histogram data
                    const histogramData = createHistogramData(eventData, minDate, maxDate);
                    
                    // Draw histogram
                    drawHistogram(histogram, histogramData, maxDate);
                    
                    // Initialize noUiSlider
                    noUiSlider.create(slider, {
                        start: [minDate.getTime(), maxDate.getTime()],
                        connect: true,
                        range: {
                            'min': minDate.getTime(),
                            'max': maxDate.getTime()
                        }
                    });

                    // This needs to be added after the slider is initialized with noUiSlider.create()
function customizeSlider() {
        // Find all slider elements and style them
        const sliderHandles = document.querySelectorAll('.noUi-handle');
        const sliderConnect = document.querySelector('.noUi-connect');
        const sliderBase = document.querySelector('.noUi-base');
        
        // Style the slider connection (the colored part between handles)
        if (sliderConnect) {
            sliderConnect.style.backgroundColor = "#8B0000"; // Dark red
            sliderConnect.style.boxShadow = "none";
        }
        
        // Style the slider handles
        sliderHandles.forEach(handle => {
            handle.style.backgroundColor = "#8B0000"; // Dark red
            handle.style.border = "2px solid #8B0000";
            handle.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.3)";
            handle.style.cursor = "pointer";
            handle.style.borderRadius = "50%"; // Make it circular
            handle.style.width = "16px";
            handle.style.height = "16px";
            handle.style.top = "-7px"; // Adjust position
            handle.style.right = "-8px"; // Adjust position
            
            // Remove the default lines inside the handle
            handle.style.outline = "none";
            handle.innerHTML = "";
        });
        
        // Style the slider base (the track)
        if (sliderBase) {
            sliderBase.style.height = "4px";
            sliderBase.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        }
    }

                    // Update date labels when slider changes
                    const startLabel = document.createElement('span');
                    const endLabel = document.createElement('span');
                    dateLabels.appendChild(startLabel);
                    dateLabels.appendChild(endLabel);

                    slider.noUiSlider.on('update', function(values) {
                        const [start, end] = values.map(val => new Date(parseInt(val)));
                        const startDateInput = document.getElementById('start-date');
                        const endDateInput = document.getElementById('end-date');
                        
                        // Keep the input values in YYYY-MM-DD format for the HTML date inputs
                        startDateInput.value = formatDateForComparison(start);
                        endDateInput.value = formatDateForComparison(end);
                        
                        // Display dates in DD/MM/YYYY format for the labels
                        startLabel.textContent = formatDateForDisplay(start);
                        endLabel.textContent = formatDateForDisplay(end);

                        customizeSlider();
                    });

                    // Initialize play button functionality
                    playButton.addEventListener('click', function() {
                        if (isPlaying) {
                            stopTimeline();
                        } else {
                            startTimeline();
                        }
                    });
                }
            });
        });

    function startTimeline() {
        isPlaying = true;
        playButton.textContent = 'Stop';
        markersLayer.clearLayers();
        currentBatch = 0;
        playTimelineBatch();
    }

    function stopTimeline() {
        isPlaying = false;
        playButton.textContent = 'Play Timeline';
        progressFill.style.width = '0%';
    }

    function playTimelineBatch() {
        if (!isPlaying) return;
    
        let [startTime, endTime] = slider.noUiSlider.get();
        let startDate = new Date(parseInt(startTime)).toISOString().split('T')[0];
        let endDate = new Date(parseInt(endTime)).toISOString().split('T')[0];
    
        let filteredEvents = eventData.filter(event => {
            let eventDate = event.event_date?.trim();
            if (!eventDate) return false;
            
            if (!(eventDate >= startDate && eventDate <= endDate)) return false;
            
            let eventTypeId = getCheckboxId(event.sub_event_type);
            let checkbox = document.getElementById(eventTypeId);
            return checkbox && checkbox.checked;
        });
    
        const BATCH_SIZE = 50;
        const BATCH_DELAY = 100;
        const startIndex = currentBatch * BATCH_SIZE;
        const endIndex = Math.min(startIndex + BATCH_SIZE, filteredEvents.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            let event = filteredEvents[i];
            // Pass the relative index within the batch for staggered animation
            addEventMarker(event, i - startIndex);
        }
    
        // Update progress
        const progress = (endIndex / filteredEvents.length) * 100;
        progressFill.style.width = `${progress}%`;
    
        currentBatch++;
    
        if (endIndex < filteredEvents.length && isPlaying) {
            setTimeout(() => playTimelineBatch(), BATCH_DELAY);
        } else {
            stopTimeline();
        }
    }
    function addEventMarker(event, index = 0) {
        let lat = parseFloat(event.latitude);
        let lng = parseFloat(event.longitude);
        if (isNaN(lat) || isNaN(lng)) return;
        
        let eventType = event.sub_event_type || "Other";
        let eventIcon = iconMap[eventType] || iconMap["Other"];
        
        // Create a custom icon with animation class
        let animatedIcon = L.divIcon({
            html: `<div class="animated-marker" style="animation-delay: ${index * 20}ms;">
                    <img src="${eventIcon.options.iconUrl}" style="width: 32px; height: 32px;">
                  </div>`,
            className: 'custom-div-icon',
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        });
        
        let marker = L.marker([lat, lng], { icon: animatedIcon });
        
        // Create popup content in the same style as university popups
        let popupContent = `<h3 style="font-family: 'Montserrat', sans-serif; font-weight: 600;">${event.sub_event_type}</h3>
                           <p style="font-family: 'Montserrat', sans-serif;"><strong>Date:</strong> ${formatDateForDisplay(event.event_date)}</p>`;
    
        // Add notes if available
        if (event.notes) {
            let formattedNotes = formatNotes(event.notes);
            popupContent += `<p style="font-family: 'Montserrat', sans-serif;"><strong>Additional Info:</strong> ${formattedNotes}</p>`;
        }
    
        // Add fatalities if available
        if (event.fatalities && event.fatalities !== "0") {
            popupContent += `<p style="font-family: 'Montserrat', sans-serif;"><strong>Fatalities:</strong> ${event.fatalities}</p>`;
        }
    
        marker.bindPopup(popupContent);
        markersLayer.addLayer(marker);
    }

    function createHistogramData(data, minDate, maxDate) {
        const bins = 100;
        const histogram = new Array(bins).fill(0);
        const timeRange = maxDate - minDate;
        const binSize = timeRange / bins;
        let maxFatalities = 0;
        let maxFatalitiesDate = null;
        let maxFatalitiesBin = 0;

        data.forEach(event => {
            const date = new Date(event.event_date);
            const binIndex = Math.floor((date - minDate) / binSize);
            if (binIndex >= 0 && binIndex < bins) {
                // Count fatalities instead of just events
                const fatalities = parseInt(event.fatalities) || 0;
                histogram[binIndex] += fatalities;
                
                // Track the date with maximum fatalities
                if (histogram[binIndex] > maxFatalities) {
                    maxFatalities = histogram[binIndex];
                    maxFatalitiesDate = new Date(minDate.getTime() + (binIndex * binSize) + (binSize / 2));
                    maxFatalitiesBin = binIndex;
                }
            }
        });

        return { 
            data: histogram, 
            maxFatalities: maxFatalities,
            maxFatalitiesDate: maxFatalitiesDate,
            maxFatalitiesBin: maxFatalitiesBin
        };
    }

    function drawHistogram(container, histogramData, maxDate) {
        container.innerHTML = ''; // Clear existing bars
        
        // Add title to the histogram
        const title = document.createElement('div');
        title.className = 'histogram-title';
        title.textContent = 'Civilian Fatalities';
        container.appendChild(title);
        
        // Add tooltip element for hover information
        const tooltip = document.createElement('div');
        tooltip.className = 'histogram-tooltip';
        tooltip.style.display = 'none';
        document.body.appendChild(tooltip); // Append to body for better positioning
        
        const data = histogramData.data;
        const maxValue = histogramData.maxFatalities;
        const width = container.offsetWidth;
        const height = container.offsetHeight - 25; // Adjust for title
        const barWidth = width / data.length;
        
        // Create histogram container
        const histogramBars = document.createElement('div');
        histogramBars.className = 'histogram-bars';
        histogramBars.style.height = `${height}px`;
        container.appendChild(histogramBars);
    
        // Calculate date for each bin
        const minDate = new Date('2018-01-01'); // Set to Jan 1, 2018
        const timeRange = maxDate - minDate;
        const binSize = timeRange / data.length;
    
        // Add the bars with logarithmic transformation
        data.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'histogram-bar';
            
            // Apply logarithmic transformation to make smaller values more visible
            // Use Math.max to ensure we don't get negative values
            const logValue = value === 0 ? 0 : Math.log(value + 1);
            const logMax = Math.log(maxValue + 1);
            const barHeight = Math.max(1, (logValue / logMax) * height); // Ensure minimum height of 1px
            
            bar.style.height = `${barHeight}px`;
            bar.style.left = `${index * barWidth}px`;
            bar.style.width = `${barWidth}px`;
            
            // Calculate the date for this bin
            const binDate = new Date(minDate.getTime() + (index * binSize));
            
            // Store fatalities count and date as data attributes
            bar.setAttribute('data-fatalities', value);
            bar.setAttribute('data-date', formatDateForDisplay(binDate));
            
            // Highlight the bar with max fatalities
            if (index === histogramData.maxFatalitiesBin) {
                bar.classList.add('max-fatalities');
                
                // Add fatality count above the highest bar
                const fatalityCount = document.createElement('div');
                fatalityCount.className = 'fatality-count';
                fatalityCount.textContent = histogramData.maxFatalities;
                fatalityCount.style.left = `${index * barWidth + (barWidth/2)}px`;
                histogramBars.appendChild(fatalityCount);
                
                // Add date label below the highest bar
                const dateLabel = document.createElement('div');
                dateLabel.className = 'peak-date-label';
                dateLabel.textContent = formatDateForDisplay(histogramData.maxFatalitiesDate);
                dateLabel.style.left = `${index * barWidth + (barWidth/2)}px`;
                histogramBars.appendChild(dateLabel);
            }
            
            // Add hover event listeners
            bar.addEventListener('mouseover', function(e) {
                const fatalities = this.getAttribute('data-fatalities');
                const date = this.getAttribute('data-date');
                
                // Show tooltip with fatalities count and date
                tooltip.innerHTML = `<strong>${date}</strong><br>${fatalities} fatalities`;
                tooltip.style.display = 'block';
                
                // Position tooltip relative to the cursor
                const rect = container.getBoundingClientRect();
                tooltip.style.left = `${e.clientX}px`;
                tooltip.style.top = `${e.clientY - 40}px`;
                
                // Highlight the bar
                this.classList.add('hover');
            });
            
            bar.addEventListener('mousemove', function(e) {
                // Move tooltip with cursor
                tooltip.style.left = `${e.clientX}px`;
                tooltip.style.top = `${e.clientY - 40}px`;
            });
            
            bar.addEventListener('mouseout', function() {
                // Hide tooltip
                tooltip.style.display = 'none';
                
                // Remove highlight
                this.classList.remove('hover');
            });
            
            histogramBars.appendChild(bar);
        });
        
        // Add date labels outside the histogram
        const dateLabelsOutside = document.createElement('div');
        dateLabelsOutside.className = 'date-labels-outside';
        
        const startLabel = document.createElement('div');
        startLabel.className = 'date-label-start';
        startLabel.textContent = '01/01/2018';
        
        const endLabel = document.createElement('div');
        endLabel.className = 'date-label-end';
        endLabel.textContent = formatDateForDisplay(maxDate);
        
        dateLabelsOutside.appendChild(startLabel);
        dateLabelsOutside.appendChild(endLabel);
        
        container.parentNode.insertBefore(dateLabelsOutside, container.nextSibling);
        
        // Clean up any existing tooltips when creating a new histogram
        const oldTooltips = document.querySelectorAll('.histogram-tooltip');
        if (oldTooltips.length > 1) {
            for (let i = 0; i < oldTooltips.length - 1; i++) {
                oldTooltips[i].remove();
            }
        }
    }

    // Load universities JSON
    fetch('ukrainian_universities.json')
        .then(response => response.json())
        .then(universities => {
            universitiesData = universities.sort((a, b) => a.name.localeCompare(b.name));
            initializeSearch(universities);
            displayUniversities(universities);
        });
        function initializeSearch(universities) {
            const searchInput = document.getElementById('search');
            const searchContainer = document.createElement('div');
            searchContainer.className = 'search-container';
            
            // Keep the original input instead of creating a new one
            searchInput.className = 'university-search';
            searchInput.placeholder = 'Search university...';
        
            const resultsContainer = document.createElement('div');
            resultsContainer.className = 'search-results';
        
            // Wrap the existing input in the container
            searchInput.parentNode.replaceChild(searchContainer, searchInput);
            searchContainer.appendChild(searchInput);
            searchContainer.appendChild(resultsContainer);
        
            searchInput.addEventListener('input', function(e) {
                const searchText = e.target.value.toLowerCase();
                if (searchText.length < 2) {
                    resultsContainer.style.display = 'none';
                    return;
                }
        
                const matches = universities.filter(uni => 
                    uni.name.toLowerCase().includes(searchText)
                );
        
                if (matches.length > 0) {
                    resultsContainer.innerHTML = matches
                        .map(uni => `<div class="search-item">${uni.name}</div>`)
                        .join('');
                    resultsContainer.style.display = 'block';
                } else {
                    resultsContainer.style.display = 'none';
                }
            });
        
            resultsContainer.addEventListener('click', function(e) {
                if (e.target.classList.contains('search-item')) {
                    const selectedName = e.target.textContent;
                    searchInput.value = selectedName;
                    resultsContainer.style.display = 'none';
        
                    // Use universityMarkersMap instead of window.universityMarkersMap
                    const coords = universityMarkersMap.get(selectedName);
                    if (coords) {
                        // Center the map on the selected university
                        map.setView([coords.lat, coords.lng], 12);
                        
                        // Find and open the popup
                        let foundMarker = false;
                        universityLayer.eachLayer(function(layer) {
                            // Check if this layer has a popup
                            if (layer instanceof L.LayerGroup) {
                                // If it's a LayerGroup, search through its child layers
                                layer.eachLayer(function(childLayer) {
                                    if (childLayer.getPopup() && childLayer.getPopup().getContent().includes(selectedName)) {
                                        childLayer.openPopup();
                                        foundMarker = true;
                                    }
                                });
                            } else if (layer.getPopup() && layer.getPopup().getContent().includes(selectedName)) {
                                layer.openPopup();
                                foundMarker = true;
                            }
                        });
                        
                        if (!foundMarker) {
                            console.log('Could not find marker for:', selectedName);
                        }
                    }
                }
            });
        
            // Close results when clicking outside
            document.addEventListener('click', function(e) {
                if (!searchContainer.contains(e.target)) {
                    resultsContainer.style.display = 'none';
                }
            });
        }

    function displayUniversities(universities) {
        // Create a feature group for better performance management
        universityLayer = L.featureGroup().addTo(map);
        
        universityMarkersMap = new Map();
        // Prepare data for batch processing
        const circleMarkers = [];
        const iconMarkers = [];
        
        universities.forEach(university => {
            if (!university.latitude || !university.longitude || !university.students) {
                console.warn("Skipping invalid university entry:", university);
                return;
            }
    
            let lat = parseFloat(university.latitude);
            let lng = parseFloat(university.longitude);
            let numStudents = parseInt(university.students);
    
            if (isNaN(lat) || isNaN(lng) || isNaN(numStudents)) {
                console.warn("Skipping invalid university data:", university);
                return;
            }
            universityMarkersMap.set(university.name, { lat, lng });
            // Calculate size based on student population
            let markerSize = Math.sqrt(numStudents) * 0.1;
            let markerColor = "#0091ff";
            
            // Prepare popup content
            let popupContent = `<h3 style="font-family: 'Montserrat', sans-serif; font-weight: 600;">${university.name}</h3>
                              <p style="font-family: 'Montserrat', sans-serif;"><strong>Students:</strong> ${numStudents}</p>`;
            if (university.info) {
                popupContent += `<p style="font-family: 'Montserrat', sans-serif;"><strong>Additional Info:</strong> ${university.info}</p>`;
            }
            if (university.relocated === "True") {
                popupContent += `<p style="font-family: 'Montserrat', sans-serif;"><strong>Status:</strong> Relocated</p>`;
            }
            if (university.occupied === "True") {
                popupContent += `<p style="font-family: 'Montserrat', sans-serif;"><strong>Status:</strong> Occupied</p>`;
            }
            if (university.damaged === "True") {
                popupContent += `<p style="font-family: 'Montserrat', sans-serif;"><strong>Status:</strong> Damaged</p>`;
            }
            
            // Create marker based on university type
            if (university.damaged === "True") {
                const baseSize = Math.sqrt(numStudents) * 0.15;
                const damagedIcon = L.divIcon({
                    html: `<img src="icons/damaged.png" style="width: 100%; height: 100%; opacity: 0.85;">`,
                    className: 'damaged-icon',
                    iconSize: [baseSize, baseSize]
                });
                
                const marker = {
                    latlng: [lat, lng],
                    icon: damagedIcon,
                    popup: popupContent,
                    type: 'damaged',
                    baseSize: baseSize
                };
                
                iconMarkers.push(marker);
            } 
            else if (university.relocated === "True") {
                const baseSize = Math.sqrt(numStudents) * 0.15;
                const relocatedIcon = L.divIcon({
                    html: `<img src="icons/relocated.png" style="width: 100%; height: 100%; opacity: 0.85;">`,
                    className: 'relocated-icon',
                    iconSize: [baseSize, baseSize]
                });
                
                const marker = {
                    latlng: [lat, lng],
                    icon: relocatedIcon,
                    popup: popupContent,
                    type: 'relocated',
                    baseSize: baseSize
                };
                
                iconMarkers.push(marker);
            } 
            else if (university.occupied === "True") {
                markerColor = "grey";
                
                const marker = {
                    latlng: [lat, lng],
                    radius: markerSize,
                    color: markerColor,
                    fillColor: markerColor,
                    fillOpacity: 0.6,
                    popup: popupContent,
                    type: 'circle'
                };
                
                circleMarkers.push(marker);
            } 
            else {
                const marker = {
                    latlng: [lat, lng],
                    radius: markerSize,
                    color: markerColor,
                    fillColor: markerColor,
                    fillOpacity: 0.6,
                    popup: popupContent,
                    type: 'circle'
                };
                
                circleMarkers.push(marker);
            }
        });
        
        // Add markers in batches for better performance
        // First add circle markers (they're simpler)
        const circleLayer = L.layerGroup().addTo(universityLayer);
        addMarkersInBatches(circleMarkers, circleLayer, 'circle');
        
        // Then add icon markers
        const iconLayer = L.layerGroup().addTo(universityLayer);
        addMarkersInBatches(iconMarkers, iconLayer, 'icon');
        
        // Handle zoom events more efficiently
        map.on('zoomend', function() {
            const currentZoom = map.getZoom();
            const initialZoom = map.getMinZoom();
            
            // Only update icon sizes, circle markers scale automatically
            iconLayer.eachLayer(function(marker) {
                if (marker.options && marker.options.baseSize) {
                    const scaleFactor = Math.min(Math.pow(1.1, currentZoom - initialZoom), 2);
                    const newSize = marker.options.baseSize * scaleFactor;
                    
                    marker.setIcon(L.divIcon({
                        html: `<img src="${marker.options.iconUrl}" style="width: 100%; height: 100%; opacity: 0.85;">`,
                        className: marker.options.className,
                        iconSize: [newSize, newSize]
                    }));
                }
            });
        });
    }

    function addMarkersInBatches(markers, layer, type, batchSize = 100) {
        let i = 0;
        
        function addBatch() {
            const end = Math.min(i + batchSize, markers.length);
            
            for (; i < end; i++) {
                const markerData = markers[i];
                let marker;
                
                if (type === 'circle') {
                    marker = L.circleMarker(markerData.latlng, {
                        radius: markerData.radius,
                        color: markerData.color,
                        fillColor: markerData.fillColor,
                        fillOpacity: markerData.fillOpacity,
                        weight: 1,
                        opacity: 0.8,
                        interactive: true,
                        bubblingMouseEvents: false
                    });
                } else {
                    marker = L.marker(markerData.latlng, { 
                        icon: markerData.icon,
                        // Store additional data for zoom updates
                        baseSize: markerData.baseSize,
                        iconUrl: markerData.type === 'damaged' ? 'icons/damaged.png' : 'icons/relocated.png',
                        className: markerData.type === 'damaged' ? 'damaged-icon' : 'relocated-icon'
                    });
                }
                
                marker.bindPopup(markerData.popup);
                layer.addLayer(marker);
            }
            
            if (i < markers.length) {
                // Schedule next batch
                setTimeout(addBatch, 0);
            }
        }
        
        // Start adding batches
        addBatch();
    }  

    // Load GeoJSON data
    fetch('ukraine.geojson')
    .then(response => response.json())
    .then(data => {
        // Simplify the GeoJSON to reduce complexity
        const simplifiedData = simplifyGeoJSON(data, 0.0001); // Adjust tolerance as needed
        
        geojsonLayer = L.geoJSON(simplifiedData, {
            style: function () {
                return {
                    color: "#6e7175",
                    weight: 1,
                    fillColor: "transparent",
                    fillOpacity: 0,
                    // Add these properties for better performance
                    smoothFactor: 1.5,      // Simplifies paths for better performance
                    interactive: false,     // Disable interactivity if not needed
                    renderer: L.canvas()    // Use canvas renderer instead of SVG for better performance
                };
            },
            onEachFeature: function (feature, layer) {
                // Only add popups if really needed
                if (feature.properties && feature.properties.shapeName) {
                    let popupContent = `<h3 style="font-family: 'Montserrat', sans-serif; font-weight: 600;">${feature.properties.shapeName}</h3>`;
                    layer.bindPopup(popupContent);
                }
            }
        }).addTo(map);
    });

// Add this function to simplify GeoJSON
function simplifyGeoJSON(geoJSON, tolerance) {
    // If simplify library is not available, return the original
    if (typeof simplify !== 'function') {
        console.warn('Simplify library not available. Using original GeoJSON.');
        return geoJSON;
    }
    
    // Deep clone the GeoJSON to avoid modifying the original
    const simplified = JSON.parse(JSON.stringify(geoJSON));
    
    // Process each feature
    simplified.features.forEach(feature => {
        if (!feature.geometry) return;
        
        if (feature.geometry.type === 'Polygon') {
            feature.geometry.coordinates = feature.geometry.coordinates.map(ring => 
                simplify(ring, tolerance, true)
            );
        } 
        else if (feature.geometry.type === 'MultiPolygon') {
            feature.geometry.coordinates = feature.geometry.coordinates.map(polygon => 
                polygon.map(ring => simplify(ring, tolerance, true))
            );
        }
    });
    
    return simplified;
}

let iconMap = {
    "Air/drone strike": L.icon({ iconUrl: 'icons/drone.png', iconSize: [32, 32] }),
    "Shelling/artillery/missile attack": L.icon({ iconUrl: 'icons/missile.png', iconSize: [32, 32] }),
    "Remote explosive/landmine/IED": L.icon({ iconUrl: 'icons/mines.png', iconSize: [32, 32] }),
    "Attack": L.icon({ iconUrl: 'icons/attack.png', iconSize: [32, 32] }),
    "Abduction/forced disappearance": L.icon({ iconUrl: 'icons/abduction.png', iconSize: [32, 32] }),
    "Grenade": L.icon({ iconUrl: 'icons/grenade.png', iconSize: [32, 32] }),
    "Other": L.icon({ iconUrl: 'icons/other.png', iconSize: [32, 32] }) // Default icon for other types
};

    function getCheckboxId(eventType) {
        switch(eventType) {
            case "Air/drone strike": return "drone-strike";
            case "Shelling/artillery/missile attack": return "missile-attack";
            case "Remote explosive/landmine/IED": return "mines";
            case "Attack": return "attack";
            case "Abduction/forced disappearance": return "abduction";
            case "Grenade": return "grenade";
            default: return "other"; 
        }
    }
    // Add this new function for marker clustering
function initializeMarkerCluster() {
    return L.markerClusterGroup({
        chunkedLoading: true,
        maxClusterRadius: 50,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true
    });
}

// Add this event listener after map initialization
map.on('moveend', function() {
});

    
});
