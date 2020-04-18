
function main() {
    // Load data
    //// Should the data be stored as a global variable? -DF


    // Setup main map
    map = setup_map();

    // Display splash screen
    $('#splashscreen').modal('show');

    // Set event listeners
    
    //// Close splash screen
    $('#splash-btn').on('click', function() {
        $('#splashscreen').modal('hide');
    })

}

// Run main function when dom is ready
$(document).ready(main());

