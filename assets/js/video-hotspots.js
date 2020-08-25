// this script assumes video.js for finding HTML DOM elements (parent DIVs to VIDEO tags)

let engine;

let video = {
    hotspots: {
        running: false,
        init: function () {
            console.log('video hotspot engine: init');
            const elmsVideo = document.querySelectorAll('video');   // grab all videos on the page
            elmsVideo.forEach((elmVideo) => {                       // loop through the parents of the video elements
                elmVideo.addEventListener('play', (event) => {      // add eventlistener play on videos
                    if (!video.hotspots.running) {                   // start engine, if it is not running already
                        video.hotspots.on();
                    }
                });
                elmVideo.addEventListener('seeked', (event) => {      // add eventlistener play on videos
                    if (!video.hotspots.running) {                   // start engine, if it is not running already
                        video.hotspots.on(true);
                    }
                });
                elmVideo.addEventListener('pause', (event) => {         // add eventlistener stop/pause on videos
                    if (video.hotspots.running) {        // if engine is running
                        let videoPlaying = false;       // check if all videos are stopped/paused
                        elmsVideo.forEach((elmVideo) => {
                            if (!elmVideo.paused) {
                                videoPlaying = true;
                                console.log(elmVideo.id + ' this video is not paused videoPlaying is now ' + videoPlaying);
                            }
                        });
                        if (!videoPlaying) {
                            video.hotspots.on();   // if all videos are NOT playing we can turn off the loop engine
                        } else {
                            video.hotspots.off()
                        }
                    }
                });
            });
        },
        on: function (isSeeked = false) {
            // start the interval loop
            console.log('video hotspot engine: on');
            if (!video.hotspots.running) {       // only start it if it isn't already running
                video.hotspots.running = true;  // make sure to tell our boolean that we are turning on the engine
            }
            engine = setInterval(() => {        // start the interval engine
                console.log('engine loop');
                video.hotspots.update(isSeeked);
            }, 100);
        },
        off: function () {
            // kill the interval var
            console.log('video hotspot engine: off');
            video.hotspots.running = false;     // make sure to tell our boolean that the engine is being stopped
            clearInterval(engine);              // stop the engine
        },
        update: function(isSeeked){
            hotspots.forEach((hotspot) => {
                if (hotspot.active) {
                    // get video element for hotspot
                    const video = document.querySelector(`#${hotspot.videoId}>video`);
                    if (video){
                        const now = video.currentTime;
                        const elmHotspotCheck = document.querySelector(`#hotspotId${hotspot.id}`);
    
                        if (hotspot.markIn > now || hotspot.markOut <= now) {
                            // check to see if element with the current hotspot id exists
                            const currentHotspotId = `#hotspotId${hotspot.id}`;
                            if (elmHotspotCheck){
                                // remove hotspot element
                                const elmHotspot = document.querySelector(`#hotspotId${hotspot.id}`);
                                elmHotspot.parentElement.removeChild(elmHotspot);
                                hotspot.onscreen = false; // clear on-screen flag for the current hotspot
                            }
                        } else if (hotspot.markIn <= now && hotspot.markOut > now) {
                            if (!elmHotspotCheck) { // only draw new hotspot if it isn't already drawn
                                let elmHotspot = document.createElement('a');
                                elmHotspot.id = `hotspotId${hotspot.id}`;
                                elmHotspot.className = 'hotspot';
                                let css = "";
                                css += `width: ${hotspot.sizeX}%;`;
                                css += `height: ${hotspot.sizeY}%;`;
                                css += `left: ${hotspot.posX}%;`;
                                css += `top: ${hotspot.posY}%;`;
                                css += `border: ${hotspot.ui.boxBorder};`;
                                if (hotspot.ui.type == 'box'){
                                    // write and attach box-css to the elmHotspot
                                    css += `background-color: ${hotspot.ui.boxBackgroundColor};`;
                                } else {
                                    // insert image css
                                    css += `background-image: url(${hotspot.ui.image})`;
                                    css += ``;
                                    elmHotspot.classList.add('image');
                                }
                                elmHotspot.style = css;
                                if (hotspot.hotspot.type == 'link'){
                                    // it's a link
                                    elmHotspot.href = hotspot.hotspot.url;
                                    elmHotspot.target = hotspot.hotspot.target;
                                } else {
                                    // it's a function
                                    elmHotspot.addEventListener('click', (event) => {
                                        event.preventDefault();
                                        hotspot.hotspot.func();
                                    });
                                }
                                video.parentElement.appendChild(elmHotspot);
                            }
                        } 
                    }
                }
            });
            if (isSeeked){
                video.hotspots.off();
            }
        },
        remove: function () {
            // kill all hotspot related functions
            console.log('video hotspot engine: cleanup');
        }

    }
}

// data for hotspots

const hotspots = [
    {
        active: true,
        id: 1,
        videoId: "video1",
        markIn: 0,
        markOut: 2,
        posX: 75,
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
            target: "_blank"
        }
    },
    {
        active: true,
        id: 2,
        videoId: "video1",
        markIn: 1,
        markOut: 3,
        posX: 25,
        posY: 25,
        sizeX: 40,
        sizeY: 40,
        ui: {
            type: "image",
            image: "assets/images/kitten.jpg",
            boxBorder: "2px solid blue"
        },
        hotspot: {
            type: "function",
            url: "http://dr.dk",
            target: "_blank",
            func: function () {
                // run any javascript you want done when clicking on the hotspot
                console.log('KITTEN!!!');
            }
        }
    },
    {
        active: true,
        id: 3,
        videoId: "video2",
        markIn: 2,
        markOut: 4,
        posX: 50,
        posY: 25,
        sizeX: 10,
        sizeY: 10,
        ui: {
            type: "box",
            image: "",
            boxBorder: "2px solid green",
            boxBackgroundColor: "rgba(0,255,0,.5)"
        },
        hotspot: {
            type: "link",
            url: "http://tv2.dk",
            target: "_blank"
        }
    },
    {
        active: true,
        id: 4,
        videoId: "video3",
        markIn: 3,
        markOut: 5,
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
            target: "_blank"
        }
    },
    {
        active: true,
        id: 5,
        videoId: "video3",
        markIn: 4,
        markOut: 6,
        posX: 70,
        posY: 50,
        sizeX: 20,
        sizeY: 20,
        ui: {
            type: "box",
            image: "",
            boxBorder: "2px solid red",
            boxBackgroundColor: "rgba(255,0,0,.5)"
        },
        hotspot: {
            type: "link",
            url: "http://tv2.dk",
            target: "_blank"
        }
    },
    {
        active: true,
        id: 6,
        videoId: "video4",
        markIn: 2,
        markOut: 3,
        posX: 0,
        posY: 0,
        sizeX: 50,
        sizeY: 50,
        ui: {
            type: "box",
            image: "",
            boxBorder: "none",
            boxBackgroundColor: "rgba(255,0,0,.5)"
        },
        hotspot: {
            type: "link",
            url: "http://tv2.dk",
            target: "_blank"
        }
    },
    {
        active: true,
        id: 7,
        videoId: "video4",
        markIn: 3,
        markOut: 4,
        posX: 50,
        posY: 0,
        sizeX: 50,
        sizeY: 50,
        ui: {
            type: "box",
            image: "",
            boxBorder: "none",
            boxBackgroundColor: "rgba(0,0,255,.5)"
        },
        hotspot: {
            type: "link",
            url: "http://tv2.dk",
            target: "_blank"
        }
    },
    {
        active: true,
        id: 8,
        videoId: "video4",
        markIn: 4,
        markOut: 5,
        posX: 50,
        posY: 50,
        sizeX: 50,
        sizeY: 50,
        ui: {
            type: "box",
            image: "",
            boxBorder: "none",
            boxBackgroundColor: "rgba(255,0,255,.5)"
        },
        hotspot: {
            type: "link",
            url: "http://tv2.dk",
            target: "_blank"
        }
    },
    {
        active: true,
        id: 9,
        videoId: "video4",
        markIn: 5,
        markOut: 6,
        posX: 0,
        posY: 50,
        sizeX: 50,
        sizeY: 50,
        ui: {
            type: "box",
            image: "",
            boxBorder: "none",
            boxBackgroundColor: "rgba(0,255,0,.5)"
        },
        hotspot: {
            type: "link",
            url: "http://tv2.dk",
            target: "_blank"
        }
    }
];