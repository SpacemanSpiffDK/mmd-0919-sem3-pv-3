// JS by Dan Høegh
// UCN MMD 2020

// Setting options in a json object
let options = {
    "controls": true, 
    "autoplay": true, 
    "preload": "auto", 
    "muted": true
};

// try the different json-objects here
videojs('video1', options);
videojs('video2', options);
videojs('video3', options);
videojs('video4', options);

video.hotspots.init();