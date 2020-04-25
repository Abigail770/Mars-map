// Tracks if map is in story mode.  When in story mode,
// some features of the map will be toggled off, like
// the basemap selector, the rover selection buttons, etc.
var storymode = false;

function toggle_story_mode(map, obj) {
    if (storymode) {
        // Code to return main map to normal

        //// Remove rover path
        map.removeLayer(currentPath);


        //// Remove rover basemap

        //// Show Rover buttons
        $('#spirit').show()
        $('#opportunity').show()
        $('#curiosity').show()



        //// Show basemap selector
        $('.leaflet-control-layers-toggle').show()

        //// Remove details panel
        $('#panel').css({
            'display': 'none'
        });
        
        //// Remove story marker
        storyMarker.remove();


        //// Reset map zoom bounds to default
        map.setMinZoom(2);
        map.setMaxZoom(5);
        map.setView([-14.5684, 240.472636], 2.5);

        storymode = false;

    } else {
        // Code to transition to story mode
        $('#op-intro-btn').on('click', function () {
            $('#opportunity-intro').modal('hide');
        })

        $('#spirit-intro-btn').on('click', function () {
            $('#spirit-intro').modal('hide');
        })

        $('#curiosity-intro-btn').on('click', function () {
            $('#curiosity-intro').modal('hide');
        })

        //Hide Rover Selection Buttons
        $('#spirit').hide()
        $('#opportunity').hide()
        $('#curiosity').hide()

        //// Hide basemap selector
        $('.leaflet-control-layers-toggle').hide()


        //// Show details panel
        $('#panel').css({
            'display': 'block'
        });
        
        //// Show story marker
        storyMarker.addTo(map);


        //// Set up initial content
        $('.card-title').html(obj[0].Title);
        $('.card-text').html(obj[0].Content);
        $('#panel-media').html(obj[0].Embed);
        storyMarker.setLatLng(obj[0].latlng);
        //map.flyTo(obj[0].latlng, 16);

        var current = 0;

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

        //// Show details panel
        $('#panel').css({
            'display': 'block'
        });


        storymode = true;
    }
    console.log('storymode = ' + storymode);
}



// Marker that will be used to represent the current location in the
// story in the map.
/*
var storyMarkerIcon = L.divIcon({
    className: 'story-marker-icon',
    iconSize: [20, 20]
});
*/
var storyMarkerIcon = L.icon.pulse({iconSize:[20,20],color:'red'})
var storyMarker = L.marker([-1.230374, 255.058594], {
    icon: storyMarkerIcon
});