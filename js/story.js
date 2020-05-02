// Tracks if map is in story mode.  When in story mode,
// some features of the map will be toggled off, like
// the basemap selector, the rover selection buttons, etc.
var storymode = false;

var obj;
var current;

function toggle_story_mode(map, selectedObj) {
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
        
        //// Resize map for main map
        $('#map').removeClass('map-storymode');
        map.invalidateSize();
        
        //// Remove story marker
        storyMarker.remove();
        
        //// Hide home button in navbar
        $('#btn-home').addClass('disabled');


        //// Reset map zoom bounds to default
        map.setMinZoom(2);
        map.setMaxZoom(5);
        map.setView([-14.5684, 240.472636], 2.5);

        storymode = false;

    } else {
        // Code to transition to story mode
        obj = selectedObj

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
        $('#panel').scrollTop(0);
        
        //// Resize map for storymode
        $('#map').addClass('map-storymode');
        map.invalidateSize();
        
        //// Show story marker
        storyMarker.addTo(map);

        //// Show home button in navbar
        $('#btn-home').removeClass('disabled');

        //// Set up initial content
        $('.card-title').html(obj[0].Title);
        $('.card-date').html(obj[0].sol);
        $('.card-text').html(obj[0].Content);
        $('#panel-media').html(obj[0].Embed);
        storyMarker.setLatLng(obj[0].latlng);
        map.flyTo(obj[0].latlng, 16);

        current = 0;
        
         // Disable/enable next/back buttons
        $('#next-btn').removeClass('disabled');
        $('#back-btn').removeClass('disabled');

        if (current + 1 == obj.length) {
            $('#next-btn').addClass('disabled');
        };

        if (current == 0) {
            $('#back-btn').addClass('disabled');
        };        

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