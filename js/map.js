// Basemaps for main map
var basemaps = {
    "MarsTexture": L.tileLayer('http://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/celestia_mars-shaded-16k_global/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openplanetary.org/opm-basemaps/shaded-mars-surface-texture">Open Planetary</a>',
        tms: true
    }),
    "MarsElevation": L.tileLayer('http://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/mola-color/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openplanetary.org/opm-basemaps/shaded-mars-surface-texture">Open Planetary</a>',
        tms: true
    })
}

// Basemaps for rover maps
var roverBasemaps = {
    "Curiosity": L.tileLayer('http://www.danielfourquet.com/basemaps/Curiosity_Basemap/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openplanetary.org/opm-basemaps/shaded-mars-surface-texture">Open Planetary</a>',
        tms: true
        }),
    "Spirit": L.tileLayer('http://www.danielfourquet.com/basemaps/Spirit_Basemap/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openplanetary.org/opm-basemaps/shaded-mars-surface-texture">Open Planetary</a>',
        tms: true
        }),
    "Opportunity":L.tileLayer('http://www.danielfourquet.com/basemaps/Opportunity_Basemap/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openplanetary.org/opm-basemaps/shaded-mars-surface-texture">Open Planetary</a>',
        tms: true
        }),
}

// Rover paths are loaded in the main.js and stored here as geojson objects
var roverPaths = {
    "Curiosity": null,
    "Spirit": null,
    "Opportunity": null
}

// The current path object that is being displayed.
var currentPath = null;

// Rover landing coordinates
var rovers = [
    ["Opportunity",-1.9462,354.4734],
    ["Spirit",-14.5684,175.472636],
    ["Curiosity",-4.5895,137.4417]
];



function setup_map() {
    var map = L.map('map', {
        zoomControl: false,
        minZoom: 2,
        maxZoom: 5,
        // Max bounds are set to allow user to scroll east and west and restricts scrolling at the poles 
        maxBounds: [
        [-90, -Infinity],
        [90, Infinity]
        ]
    }).setView([-14.5684,240.472636], 2.5);
    
    
   // Add Rover Markers
    var curiosityMarker = L.icon({
        iconUrl: 'img/curiosityMarker.png',
        iconSize: [75,75],
        iconAnchor: [37,37]
    });
    
    var spiritMarker = L.icon({
        iconUrl: 'img/spiritMarker.png',
        iconSize: [75,75],
        iconAnchor: [37,37]
    });
    
   //var marker = L.marker([-1.9462,354.4734]).addTo(map);
   for (var i = 0; i < rovers.length; i++) {
       let icon;
       let roverName = rovers[i][0];
       rovers[i][0] == 'Curiosity' ? icon = curiosityMarker : icon = spiritMarker;
        circle = new L.Marker([rovers[i][1],rovers[i][2]],{
            icon: icon
        })
            .bindPopup(rovers[i][0])
            .addTo(map);
            
            // Toggle story mode on rover icon click
            circle.on('click', function() {
                console.log(roverName);
                if (roverName == 'Spirit'){
                    $('#spirit-intro').modal('show');
                    roverBasemaps['Spirit'].addTo(map);
                    map.setMaxZoom(18);
                    map.setMinZoom(12);
                    map.fitBounds(roverPaths["Spirit"].getBounds());
                    currentPath = roverPaths['Spirit'].addTo(map);

                    // Load json data
                    $.ajax("data/spirit.json", {
                        dataType: "json",
                        success: function (response) {
                            var spirObj = response;
                            toggle_story_mode(map, spirObj);
                        }
                    });
                }
                if (roverName == 'Opportunity'){
                    $('#opportunity-intro').modal('show');
                    roverBasemaps['Opportunity'].addTo(map);
                    map.setMaxZoom(16);
                    map.setMinZoom(9);
                    map.fitBounds(roverPaths['Opportunity'].getBounds());
                    currentPath = roverPaths['Opportunity'].addTo(map);

                    // Load json data
                    $.ajax("data/opportunity.json", {
                        dataType: "json",
                        success: function (response) {
                            var opObj = response;
                            toggle_story_mode(map, opObj);
                        }
                    });
                }
                if (roverName == 'Curiosity'){
                    $('#curiosity-intro').modal('show');
                    map.setMaxZoom(16);
                    map.setMinZoom(10);
                    roverBasemaps['Curiosity'].addTo(map);
                    map.fitBounds(roverPaths['Curiosity'].getBounds());
                    currentPath = roverPaths['Curiosity'].addTo(map);

                    // Load json data
                    $.ajax("data/curiosity.json", {
                        dataType: "json",
                        success: function (response) {
                            var curObj = response;
                            toggle_story_mode(map, curObj);
                        }
                    });
                }
            })
   };

    // Add main map markers
    let markerIcon = L.icon({
        iconUrl: 'img/Marker.png',
        iconSize: [25,25],
        iconAnchor: [13,22],
    });
    
    for (var i = 0; i < mainMapLandmarks.length; i++ ) {
        let m = mainMapLandmarks[i];
        marker = new L.Marker(m.latlng, {
            title: m.title,
            icon: markerIcon
        })
        .addTo(map);
        
        marker.on('click', function() {
            $('#marker-title').html(m.title);
            $('#marker-caption').html(m.caption);
            $('#marker-img').html('<img src="img/landmarks/' + m.image + '" class="marker-img" />');
            $('#marker-modal').modal('show');
        })
    }
    
    // Add Leaflet zoom home control
    var zoomHome = L.Control.zoomHome();
    zoomHome.addTo(map);

    set_basemap(map, 'MarsTexture');
    
    // Set map top == navbar height so the navbar will not hide the top of it
    $('#map').css('top', $('#navbar').outerHeight());
    
    // Add basemap toggler
    L.control.layers(basemaps).addTo(map);
    
    return map
}


// Change the basemap of the main map
//// Need to fix this so that it removes the current basemap before adding new one
function set_basemap(map, basemap) {
    // Remove current basemap
    map.eachLayer(function(l) {
        if (l instanceof L.TileLayer) {
            map.remove(l);
        }
    })
    // Set new basemap
    if (basemaps[basemap]){
        // If main map
        basemaps[basemap].addTo(map);
    } else {
        // If rover basemap
        roverBasemaps[basemap].addTo(map);
    }
    
    
}