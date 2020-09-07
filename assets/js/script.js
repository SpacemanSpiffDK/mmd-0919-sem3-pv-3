// JS by Dan Høegh
// UCN MMD 2020

// Setting options in a json object
let options = {
    "controls": true, 
    "autoplay": true, 
    "preload": "auto", 
    "muted": true
};

videojs('video1', options);

video.hotspots.init();