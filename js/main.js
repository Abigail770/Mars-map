function main() {
    // Load data and store as geojson objects    
    load_rover_path('Curiosity', '/data/Curiosity_Traverse.geojson');
    load_rover_path('Spirit', '/data/Spirit_Traverse.geojson');
    load_rover_path('Opportunity', '/data/Opportunity_Traverse.geojson');

    function load_rover_path(roverName, filePath) {
        $.ajax(filePath, {
            dataType: 'json',
            success: function (r) {
                let geojson = L.geoJSON(r, {
                    style: {
                        color: "red"
                    }
                });
                
                roverPaths[roverName] = geojson;
            },
            error: function () {
                console.log('Error loading ' + filePath);
                roverPaths[roverName] = null;
            }
        })
    }
    
    

    // Setup main map
    let map = setup_map();

    // Display splash screen
    $('#splashscreen').modal('show');

    
    // Set event listeners

    //// Close splash screen
    $('#splash-btn').on('click', function () {
        $('#splashscreen').modal('hide');
    })
    
    //// Click Spirit button
    $('#spirit').on('click', function () {
        roverBasemaps['Spirit'].addTo(map);
        map.setMaxZoom(18);
        map.setMinZoom(12);
        map.fitBounds(roverPaths["Spirit"].getBounds());
        roverPaths['Spirit'].addTo(map);
        // toggle_story_mode(map);
    })
    
    //// Click Opportunity button
    $('#opportunity').on('click', function () {
        roverBasemaps['Opportunity'].addTo(map);
        map.setMaxZoom(16);
        map.setMinZoom(9);
        map.fitBounds(roverPaths['Opportunity'].getBounds());
        roverPaths['Opportunity'].addTo(map);
        // toggle_story_mode(map);
    })
    
    //// Click Curiosity button
    $('#curiosity').on('click', function () {
        map.setMaxZoom(16);
        map.setMinZoom(10);
        roverBasemaps['Curiosity'].addTo(map);
        map.fitBounds(roverPaths['Curiosity'].getBounds());
        roverPaths['Curiosity'].addTo(map);
        // toggle_story_mode(map);
    })
}

// Run main function when dom is ready
$(document).ready(main());
