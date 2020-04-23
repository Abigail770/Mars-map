// This will hold the data necessary for each rover's story,
// including the map settings and the "script" for each
// slide in the story.
var story = {
    curiosity: {
        mapSettings: {
            minZoom: 10, // minimum map zoom
            maxZoom: 16, // maximum map zoom
            pathShp: roverPaths['Curiosity'], // name of the geojson file for the path
            mapTitle: "Exploring Curiosity's Path" // title that will be displayed on the top
        },
        slides: [
            {
                header: "The header for the first slide", // The header for the slide
                content: "This area will have information about the beginning of Curiosity's mission.  The user will be able to see the pictures by clicking on markers in the map above." // The content that appears below the header
            },
            {
                header: "The second slide's header",
                content: "We can put in more information here, maybe with some basic information about the kinds of discoveries that were made in the first quarter or so of the mission."
            },
            {
                header: "Another slide",
                content: "Maybe we can have one slide for every year of the mission and include the year in the header? Each slide can zoom to the section of the path that was explored in that year. We can also split the line and put in a field holding the slide number so that it can be filtered when the slides progress.  That way it will help to reinforce the story progression for the user."
            },
            {
                header: "2017",
                content: "Like this."
            }
        ]
    },
    opportunity: {
        mapSettings: {
            minZoom: 9, // minimum map zoom
            maxZoom: 16, // maximum map zoom
            pathShp: roverPaths['Opportunity'], // name of the geojson file for the path
            mapTitle: "Exploring Opportunity's Path" // title that will be displayed on the top
        },
        slides: [
            {
                header: "", // The header for the slide
                content: "" // The content that appears below the header
            },
            {
                header: "",
                content: ""
            },
            {
                header: "",
                content: ""
            },
            {
                header: "",
                content: ""
            }
        ]
    },
    spirit: {
        mapSettings: {
            minZoom: 12, // minimum map zoom
            maxZoom: 18, // maximum map zoom
            pathShp: roverPaths['Spirit'], // name of the geojson file for the path
            mapTitle: "Exploring Spirit's Path" // title that will be displayed on the top
        },
        slides: [
            {
                header: "", // The header for the slide
                content: "" // The content that appears below the header
            },
            {
                header: "",
                content: ""
            },
            {
                header: "",
                content: ""
            },
            {
                header: "",
                content: ""
            }
        ]
    }
}
