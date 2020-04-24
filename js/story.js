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



        //// Remove details panel


        //// Remove details panel
        $('#panel').css({
            'display': 'none'
        });


        //// Reset map zoom bounds to default
        map.setMinZoom(2);
        map.setMaxZoom(5);
        map.setView([-14.5684, 240.472636], 2.5);

        storymode = false;

    } else {
        // Code to transition to story mode


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


        $('.card-title').html(obj[0].Title);
        $('.card-text').html(obj[0].Content);
        $('#panel-media').html(obj[0].Embed);

        var current = 0;

        function loop() {
            var titleOutput = obj[current].Title;
            var contentOutput = obj[current].Content;
            var media = obj[current].Embed;
            $('.card-title').html(titleOutput);
            $('.card-text').html(contentOutput);
            $('#panel-media').html(media);
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
