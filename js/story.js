// Tracks if map is in story mode.  When in story mode,
// some features of the map will be toggled off, like
// the basemap selector, the rover selection buttons, etc.
var storymode = false;

function toggle_story_mode(map, obj) {
    if (storymode) {
        console.log('returning to main map');
        // Code to return main map to normal

        //// Remove rover path


        //// Remove rover basemap


        //// Show basemap selector
<<<<<<< HEAD


        //// Remove details panel


=======
        
        //// Remove details panel
        
        //// Remove details panel
        $('#panel').css({'display':'none'});
        
>>>>>>> 7ff42c356f1639b14ce18107f843588bf305036f
        //// Reset map zoom bounds to default
        map.setMinZoom(2);
        map.setMaxZoom(5);

        storymode = false;

    } else {
        console.log('setting up storymode');

        // Code to transition to story mode
<<<<<<< HEAD

        //// Hide basemap selector

        //// Show details panel


=======
        $('.card-title').html(obj[0].Title);
        $('.card-text').html(obj[0].Content);

        var current = 0;

        function loop(){
            var titleOutput = obj[current].Title
            var contentOutput = obj[current].Content
            $('.card-title').html(titleOutput);
            $('.card-text').html(contentOutput);
        }
        function next(){
            current++;
            loop();
        }
        function prev(){
           current--;
           loop();
        }

        $('#next-btn').on('click', function () {
             next();
        })

        $('#back-btn').on('click', function () {
            prev();
        })
        //// Hide basemap selector

        //// Show details panel
        $('#panel').css({'display':'block'});

        
        $('.card-title').html(obj[0].Title);
        $('.card-text').html(obj[0].Content);

        var current = 0;

        function loop(){
            var titleOutput = obj[current].Title
            var contentOutput = obj[current].Content
            $('.card-title').html(titleOutput);
            $('.card-text').html(contentOutput);
        }
        function next(){
            current++;
            loop();
        }
        function prev(){
           current--;
           loop();
        }

        $('#next-btn').on('click', function () {
             next();
        })

        $('#back-btn').on('click', function () {
            prev();
        })
        //// Hide basemap selector

        //// Show details panel
        $('#panel').css({'display':'block'});

        
>>>>>>> 7ff42c356f1639b14ce18107f843588bf305036f
        storymode = true;
    }
    console.log('storymode = ' + storymode);
}


