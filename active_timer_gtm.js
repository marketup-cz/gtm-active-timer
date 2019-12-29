// Nastavení času v sekundách
var timeLimit = 7;

function isPageHidden() {
    return document.hidden || document.msHidden || document.webkitHidden || document.mozHidden;
}

var isPageHidden = isPageHidden();

// Set the name of the hidden property and the change event for visibility
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
    hidden = "hidden";
    visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}

var headline = document.getElementById("headline");

if (document[hidden]) {
    var isPaused = true;
} else {
    var isPaused = false;
}

var time = 0;
var t = window.setInterval(function() {
    if (!isPaused) {
        time++;
        if (time == timeLimit) {
            dataLayer.push({
                'event': 'timeIsUp',
                'timerVersion': 'Active window timer'
            });
        }

    }
}, 1000);

function handleVisibilityChange() {
    if (document[hidden]) {
        isPaused = true;
    } else {
        isPaused = false;
    }
}

// Send event if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === "undefined" || hidden === undefined) {
    dataLayer.push({
        'event': 'pageVisibilityNotSupported',
        'timerVersion': 'Default GTM timer'
    });
} else {
    // Handle page visibility change   
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
}