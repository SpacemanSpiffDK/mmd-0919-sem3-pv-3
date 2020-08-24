// this script assumes video.js for finding HTML DOM elements (parent DIVs to VIDEO tags)

let engine;

let video = {
    hotspots: {
        running: false,
        init: function(){
            console.log('init');
            const elmsVideo = document.querySelectorAll('video');   // grab all videos on the page
            elmsVideo.forEach((elmVideo) => {                       // loop through the parents of the video elements
                elmVideo.parentElement.classList.add('hotspot-video-parent'); // add css class to the parent divs
                elmVideo.addEventListener('play', (event) => {      // add eventlistener play on videos
                    if (!video.hotspots.running){                   // start engine, if it is not running already
                        video.hotspots.onPlay();
                    }
                });

                // add eventlistener stop/pause on videos
                elmVideo.addEventListener('pause', (event) => {
                    if (video.hotspots.running){        // if engine is running
                        let videoPlaying = false;       // check if all videos are stopped/paused
                        elmsVideo.forEach((elmVideo) => {
                            if (!elmVideo.paused){
                                videoPlaying = true;
                            }
                        });
                        if (!videoPlaying){
                            video.hotspots.onPause();   // if all videos are NOT playing we can turn off the loop engine
                        }
                    }
                });
            });
        },
        onPlay: function(){
            video.hotspots.on();    // start the engine
        },
        onPause: function(){
            video.hotspots.off();   // stop the engine
        },
        on: function(){
            // start the interval loop
            console.log('engine on');
            if (!video.hotspots.running){       // only start it if it isn't already running
                video.hotspots.running = true;  // make sure to tell our boolean that we are turning on the engine
            }
            engine = setInterval(() => {        // start the interval engine
                console.log('engine loop');
            }, 100);
        },
        off: function(){
            // kill the interval var
            console.log('engine off');
            video.hotspots.running = false;     // make sure to tell our boolean that the engine is being stopped
            clearInterval(engine);              // stop the engine
        },
        remove: function(){
            // kill all hotspot related functions
        }

    }
}

// data for hotspots

let hotspots = [
    {
        active: true,
        videoId: "video1",
        markIn: 10.5,
        markOut: 15.0,
        posX: 25,
        posY: 25,
        sizeX: 10,
        sizeY: 10,
        ui: {
            type: "box",
            image: "",
            boxBorder: "2px solid blue",
            boxBackgroundColor: "rgba(0,0,255,.5)"
        },
        hotspot: {
            type: "link",
            url: "http://dr.dk",
            target: "_blank",
            func: function(){
                console.log('indvidual hotspot function triggered')
            }
        }
    },
    {
        active: true,
        videoId: "video1",
        markIn: 5.5,
        markOut: 12.0,
        posX: 50,
        posY: 25,
        sizeX: 10,
        sizeY: 10,
        ui: {
            type: "box",
            image: "",
            boxBorder: "2px solid blue",
            boxBackgroundColor: "rgba(0,0,255,.5)"
        },
        hotspot: {
            type: "link",
            url: "http://tv2.dk",
            target: "_blank",
            func: function(){
                console.log('indvidual hotspot function triggered')
            }
        }
    }
];