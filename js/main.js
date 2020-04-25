function main() {
    // Load data and store as geojson objects    
    load_rover_path('Curiosity', '../data/Curiosity_Traverse.geojson');
    load_rover_path('Spirit', '../data/Spirit_Traverse_Sm.geojson');
    load_rover_path('Opportunity', '../data/Opportunity_Traverse_Sm.geojson');

    function load_rover_path(roverName, filePath) {
        $.ajax(filePath, {
            dataType: 'json',
            success: function (r) {
                let geojson = L.geoJSON(r, {
                    style: {
                        color: "red"
                    },
                    rover: true
                });
                
                roverPaths[roverName] = geojson;
            },
            error: function (a,b,c) {
                console.log('Error loading ' + filePath);
                console.log(a, b, c);
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
        $('#spirit-intro').modal('show');
        roverBasemaps['Spirit'].addTo(map);
        map.setMaxZoom(18);
        map.setMinZoom(12);
        map.fitBounds(roverPaths["Spirit"].getBounds());
        currentPath = roverPaths['Spirit'].addTo(map);

        // Load json data
        $.ajax("data/spirit.json", {
            dataType: "json",
            success: function(response){
                var spirObj = response;
                toggle_story_mode(map, spirObj);
            }
        });
    })
    
    //// Click Opportunity button
    $('#opportunity').on('click', function () {
        $('#opportunity-intro').modal('show');
        roverBasemaps['Opportunity'].addTo(map);
        map.setMaxZoom(16);
        map.setMinZoom(9);
        map.fitBounds(roverPaths['Opportunity'].getBounds());
        currentPath = roverPaths['Opportunity'].addTo(map);

        // Load json data
        $.ajax("data/opportunity.json", {
            dataType: "json",
            success: function(response){
                var opObj = response;
                toggle_story_mode(map, opObj);
            }
        });
    })
    
    //// Click Curiosity button
    $('#curiosity').on('click', function () {
        $('#curiosity-intro').modal('show');
        map.setMaxZoom(16);
        map.setMinZoom(10);
        roverBasemaps['Curiosity'].addTo(map);
        map.fitBounds(roverPaths['Curiosity'].getBounds());
        currentPath = roverPaths['Curiosity'].addTo(map);

        // Load json data
        $.ajax("data/curiosity.json", {
            dataType: "json",
            success: function(response){
                var curObj = response;
                toggle_story_mode(map, curObj);
            }
        });
    })
    
    // Details panel buttons
    
        // Button to return to main map from detail panel
        $('#main-btn').on('click', function () {
            toggle_story_mode(map, null);
        });
    
        // Button to cancel starting story mode in rover intro modals
        $('.btn-back').on('click', function() {
            toggle_story_mode(map, null);
            $(this).parents().eq(3).modal('hide');
        })
}

// Run main function when dom is ready
$(document).ready(main());
