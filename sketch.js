// Create style elements for search functionality
let searchStyle = document.createElement('style');
searchStyle.innerHTML = `
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
        z-index: 1000;
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
`;
document.head.appendChild(searchStyle);

let style = document.createElement('style');
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", function () {
    let map = L.map('map').setView([48.3794, 31.1656], 6); // Centered on Ukraine

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    let universityLayer = L.layerGroup().addTo(map);
    let geojsonLayer;
    let universitiesData = []; // Store universities data globally

    // Create legend
    let legend = L.control({position: 'topleft'});
    legend.onAdd = function (map) {
        let div = L.DomUtil.create('div', 'legend');
        // Event icons legend
        div.innerHTML = '<h4 style="margin: 2px 0; font-weight: 600;">Event Types</h4>';
        div.innerHTML += '<img src="icons/drone.png" style="margin: 1px 8px 1px 0"> Air/drone strike<br>';
        div.innerHTML += '<img src="icons/missile.png" style="margin: 1px 8px 1px 0"> Shelling/artillery/missile attack<br>';
        div.innerHTML += '<img src="icons/explosive.png" style="margin: 1px 8px 1px 0"> Remote explosive/landmine/IED<br>';
        div.innerHTML += '<img src="icons/attack.png" style="margin: 1px 8px 1px 0"> Attack<br>';
        div.innerHTML += '<img src="icons/abduction.png" style="margin: 1px 8px 1px 0"> Abduction/forced disappearance<br>';
        // University markers legend
        div.innerHTML += '<h4 style="margin: 2px 0; font-weight: 600;">University Status</h4>';
        div.innerHTML += '<span class="circle" style="background: blue; margin: 1px 8px 1px 0"></span> Active<br>';
        div.innerHTML += '<span class="circle" style="background: red; margin: 1px 8px 1px 0"></span> Relocated<br>';
        div.innerHTML += '<span class="circle" style="background: grey; margin: 1px 8px 1px 0"></span> Occupied<br>';
        // Circle size legend
        div.innerHTML += '<h4 style="margin: 2px 0; font-weight: 600;">Circle Size</h4>';
        div.innerHTML += '<div style="margin: 1px 0">Circle size indicates student population</div>';
        div.innerHTML += '<span class="circle" style="background: blue; width: 5px; height: 5px; margin: 1px 8px 1px 0"></span> < 5,000<br>';
        div.innerHTML += '<span class="circle" style="background: blue; width: 10px; height: 10px; margin: 1px 8px 1px 0"></span> 5,000 - 15,000<br>';
        div.innerHTML += '<span class="circle" style="background: blue; width: 15px; height: 15px; margin: 1px 8px 1px 0"></span> > 15,000<br>';
        return div;
    };
    legend.addTo(map);

    // Load universities JSON
    fetch('ukrainian_universities.json')
        .then(response => response.json())
        .then(universities => {
            universitiesData = universities.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
            
            // Initialize search functionality
            initializeSearch(universities);
            
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

                let markerSize = Math.sqrt(numStudents) * 0.1;
                
                // Determine marker color based on university status
                let markerColor = "blue"; // default color
                if (university.relocated === "True") {
                    markerColor = "red";
                } else if (university.occupied === "True") {
                    markerColor = "grey";
                }

                let marker = L.circleMarker([lat, lng], {
                    radius: markerSize,
                    color: markerColor,
                    fillColor: markerColor,
                    fillOpacity: 0.6
                }).addTo(universityLayer);

                // Create popup content including additional info if available
                let popupContent = `<h3 style="font-family: 'Montserrat', sans-serif; font-weight: 600;">${university.name}</h3><p style="font-family: 'Montserrat', sans-serif;"><strong>Students:</strong> ${numStudents}</p>`;
                if (university.info) {
                    popupContent += `<p style="font-family: 'Montserrat', sans-serif;"><strong>Additional Info:</strong> ${university.info}</p>`;
                }
                if (university.relocated === "True") {
                    popupContent += `<p style="font-family: 'Montserrat', sans-serif;"><strong>Status:</strong> Relocated</p>`;
                }
                if (university.occupied === "True") {
                    popupContent += `<p style="font-family: 'Montserrat', sans-serif;"><strong>Status:</strong> Occupied</p>`;
                }

                marker.bindPopup(popupContent);
                university.marker = marker; // Store marker reference
            });

            universityLayer.eachLayer(function(layer) {
                layer.bringToFront();
            });
        });

    function initializeSearch(universities) {
        const searchInput = document.getElementById('search');
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        
        // Create search input
        const universitySearch = document.createElement('input');
        universitySearch.type = 'text';
        universitySearch.className = 'university-search';
        universitySearch.placeholder = 'Search or select university...';

        // Create results container
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';

        // Replace search input with new container
        searchInput.parentNode.replaceChild(searchContainer, searchInput);
        searchContainer.appendChild(universitySearch);
        searchContainer.appendChild(resultsContainer);

        universitySearch.addEventListener('input', function(e) {
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
                universitySearch.value = selectedName;
                resultsContainer.style.display = 'none';

                const selectedUni = universities.find(uni => uni.name === selectedName);
                if (selectedUni && selectedUni.marker) {
                    map.setView([selectedUni.latitude, selectedUni.longitude], 12);
                    selectedUni.marker.openPopup();
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

    // Load GeoJSON data
    fetch('ukraine.geojson')
        .then(response => response.json())
        .then(data => {
            geojsonLayer = L.geoJSON(data, {
                style: function () {
                    return {
                        color: "#6e7175",
                        weight: 1,
                        fillColor: "transparent",
                        fillOpacity: 0
                    };
                },
                interactive: false,
                onEachFeature: function (feature, layer) {
                    let popupContent = `<h3 style="font-family: 'Montserrat', sans-serif; font-weight: 600;">${feature.properties.shapeName}</h3>`;
                    layer.bindPopup(popupContent);
                }
            }).addTo(map);
        });

    // Load CSV Data
    let eventData = [];
    let markersLayer = L.layerGroup().addTo(map);

    let iconMap = {
        "Air/drone strike": L.icon({ iconUrl: 'icons/drone.png', iconSize: [32, 32] }),
        "Shelling/artillery/missile attack": L.icon({ iconUrl: 'icons/missile.png', iconSize: [32, 32] }),
        "Remote explosive/landmine/IED": L.icon({ iconUrl: 'icons/explosive.png', iconSize: [32, 32] }),
        "Attack": L.icon({ iconUrl: 'icons/attack.png', iconSize: [32, 32] }),
        "Abduction/forced disappearance": L.icon({ iconUrl: 'icons/abduction.png', iconSize: [32, 32] })
    };

    fetch('data.csv')
        .then(response => response.text())
        .then(csvText => {
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    eventData = results.data;
                }
            });
        });

    // Filter Events Function
    window.filterEvents = function () {
        let startDateElem = document.getElementById("start-date");
        let endDateElem = document.getElementById("end-date");
        
        if (!startDateElem || !endDateElem) {
            console.error("Date filter element missing in DOM.");
            return;
        }
        let startDate = startDateElem.value;
        let endDate = endDateElem.value;

        markersLayer.clearLayers(); // Clear old markers
    
        let filteredEvents = eventData.filter(event => {
            let eventDate = event.event_date?.trim();
            if (!eventDate) return false; 
    
            return eventDate >= startDate && eventDate <= endDate;
        });
    
        filteredEvents.forEach(event => {
            let lat = parseFloat(event.latitude);
            let lng = parseFloat(event.longitude);
    
            if (isNaN(lat) || isNaN(lng)) return; 
    
            let eventType = event.sub_event_type || "Other";
            let eventIcon = iconMap[eventType] || iconMap["Other"];
    
            let marker = L.marker([lat, lng], { icon: eventIcon }).addTo(markersLayer);
            
            // Format notes by inserting line breaks every 150 characters at word boundaries
            let formattedNotes = '';
            let currentLine = '';
            let words = event.notes.split(' ');
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

            let tooltipContent = `
                <h3 style="font-family: 'Montserrat', sans-serif; font-weight: 600;">${event.sub_event_type}</h3>
                <p style="font-family: 'Montserrat', sans-serif; white-space: pre-line; overflow-y: auto; margin: 10px 0;">${formattedNotes}</p>
                <p style="font-family: 'Montserrat', sans-serif;"><strong>Date:</strong> ${event.event_date}</p>
            `;
            
            marker.bindPopup(tooltipContent, {
                className: "event-tooltip",
                offset: [0, -10],
                opacity: 0.9,
                maxHeight: 300,
                autoPan: true
            });
        });
    
        if (filteredEvents.length === 0) alert("No events found for this date range.");
    }
    
    function formatDate(isoDate) {
        let [year, month, day] = isoDate.split("-");
        return `${year}-${month}-${day}`;
    }
});
