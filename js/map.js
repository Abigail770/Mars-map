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
    }).setView([0, 0], 3);
   

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
    basemaps[basemap].addTo(map);
}