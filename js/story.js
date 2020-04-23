// Tracks if map is in story mode.  When in story mode,
// some features of the map will be toggled off, like
// the basemap selector, the rover selection buttons, etc.
var storymode = false;

function toggle_story_mode(map) {
    if (storymode) {
        console.log('returning to main map');
        // Code to return main map to normal

        //// Remove rover path


        //// Remove rover basemap


        //// Show basemap selector


        //// Remove details panel


        //// Reset map zoom bounds to default
        map.setMinZoom(2);
        map.setMaxZoom(5);

        storymode = false;

    } else {
        console.log('setting up storymode');
        // Code to transition to story mode

        //// Hide basemap selector

        //// Show details panel


        storymode = true;
    }
    console.log('storymode = ' + storymode);
}


