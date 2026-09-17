// Load the YouTube IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var playerReady = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtubePlayer', {
        events: {
            'onReady': function() { playerReady = true; }
        }
    });
}

// Gold Sparkles Generator
function createSparkle() {
    const effectsContainer = document.getElementById('effects');
    if (!effectsContainer) return;
    
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    // Randomize horizontal position
    sparkle.style.left = Math.random() * 100 + 'vw';
    
    // Randomize duration between 6s and 12s for slow elegant floating
    sparkle.style.animationDuration = (Math.random() * 6 + 6) + 's'; 
    
    // Slight size variations
    const scale = Math.random() * 0.8 + 0.5;
    sparkle.style.width = (3 * scale) + 'px';
    sparkle.style.height = (3 * scale) + 'px';
    
    effectsContainer.appendChild(sparkle);
    
    // Remove after animation completes
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 12000);
}

// Start falling gold sparkles immediately (shows over the cover too)
setInterval(createSparkle, 250); // spawn a new sparkle every 250ms

// Cover Button Click Logic
document.getElementById('openBtn').addEventListener('click', function() {
    // 1. Play Music
    if (playerReady && typeof player.playVideo === 'function') {
        player.playVideo();
    }
    
    var cover = document.getElementById('cover');
    var invitation = document.getElementById('invitation');
    
    // 2. Elegant transition: fade text first, then slide screen up
    cover.classList.add('fade-out-content');
    
    setTimeout(function() {
        cover.classList.add('slide-up');
        
        // Show Invitation underneath
        invitation.classList.add('visible');
        
        // Add opened class to trigger text fadeUp staggered animations
        setTimeout(function() {
            document.body.classList.add('opened');
            
            // Clean up cover from DOM
            setTimeout(() => {
                cover.style.display = 'none';
            }, 1000);
            
        }, 300); // slight delay before internal text starts animating
        
    }, 600); // wait for cover content to fade
});

// Countdown Timer Logic
function initCountdown() {
    // Set the date we're counting down to: November 1, 2026, 17:00:00
    const countDownDate = new Date("Nov 1, 2026 17:00:00").getTime();

    // Update the count down every 1 second
    const x = setInterval(function() {

        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the elements
        document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "<h3 style='color: #ab8537; font-family: Montserrat; font-size: 1.2rem; text-transform: uppercase;'>Той басталды!</h3>";
            document.querySelector(".countdown-title").style.display = "none";
        }
    }, 1000);
}

// Start countdown
initCountdown();
