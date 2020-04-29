function main() {
    // Load data and store as geojson objects    
    load_rover_path('Curiosity', 'data/Curiosity_Traverse.geojson');
    load_rover_path('Spirit', 'data/Spirit_Traverse_Sm.geojson');
    load_rover_path('Opportunity', 'data/Opportunity_Traverse_Sm.geojson');

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
            error: function (a, b, c) {
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
    map.on('click', function (e) {
        alert(e.latlng)
    });
    
    //// Close splash screen
    $('#splash-btn').on('click', function () {
        $('#splashscreen').modal('hide');
    })
    
    //// Home button
    $('#btn-home').on('click', function() {
        if (storymode) {
            toggle_story_mode(map, null);
        };
    })
    
    $('.leaflet-control-zoomhome-home').on('click', function () {
        if (storymode) {
            toggle_story_mode(map, null);
        };
    })
    
    //// Stop youtube videos in intro modals
    $('.btn-intromodal').on('click', function () {
        $('.yvideo').each(function () {
            this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
        });
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
            success: function (response) {
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
            success: function (response) {
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
            success: function (response) {
                var curObj = response;
                toggle_story_mode(map, curObj);
            }
        });
    })


    // Intro modals

    $('#op-intro-btn').on('click', function () {
        $('#opportunity-intro').modal('hide');
    })

    $('#spirit-intro-btn').on('click', function () {
        $('#spirit-intro').modal('hide');
    })

    $('#curiosity-intro-btn').on('click', function () {
        $('#curiosity-intro').modal('hide');
    })

    
    // Marker modal
    $('#marker-btn-close').on('click', function () {
        $('#marker-modal').modal('hide');
    })

    // Details panel buttons

    // Button to return to main map from detail panel
    $('#main-btn').on('click', function () {
        toggle_story_mode(map, null);
    });

    // Button to cancel starting story mode in rover intro modals
    $('.btn-back').on('click', function () {
        toggle_story_mode(map, null);
        $(this).parents().eq(3).modal('hide');
    })


    function loop() {
        var titleOutput = obj[current].Title;
        var contentOutput = obj[current].Content;
        var media = obj[current].Embed;
        $('.card-title').html(titleOutput);
        $('.card-text').html(contentOutput);
        $('#panel-media').html(media);

        // Set location marker
        storyMarker.setLatLng(obj[current].latlng);
        map.flyTo(obj[current].latlng, 16);

        // Disable/enable next/back buttons
        $('#next-btn').removeClass('disabled');
        $('#back-btn').removeClass('disabled');

        if (current + 1 == obj.length) {
            $('#next-btn').addClass('disabled');
        };

        if (current == 0) {
            $('#back-btn').addClass('disabled');
        };
    }

    function next() {
        current++;
        loop();
    }

    function prev() {
        current--;
        loop();
    }

    $('#next-btn').on('click', function () {
        next();
    });

    $('#back-btn').on('click', function () {
        prev();
    });


}

// Run main function when dom is ready
$(document).ready(main());
