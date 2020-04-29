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
   //var marker = L.marker([-1.9462,354.4734]).addTo(map);
   for (var i = 0; i < rovers.length; i++) {
        circle = new L.circleMarker([rovers[i][1],rovers[i][2]],{
            color: 'red',
            fillColor: '#192f41',
            fillOpacity: 0.25,
            radius: 25
        })
            .bindPopup(rovers[i][0])
            .addTo(map);
   };

    // Add main map markers
    for (var i = 0; i < mainMapLandmarks.length; i++ ) {
        let m = mainMapLandmarks[i];
        marker = new L.Marker(m.latlng, {
            title: m.title
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