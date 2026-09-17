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

// Sparkles logic
function createSparkle() {
    const effectsContainer = document.getElementById('effects');
    if (!effectsContainer) return;
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.animationDuration = (Math.random() * 6 + 6) + 's'; 
    const scale = Math.random() * 0.8 + 0.5;
    sparkle.style.width = (3 * scale) + 'px';
    sparkle.style.height = (3 * scale) + 'px';
    effectsContainer.appendChild(sparkle);
    setTimeout(() => { if (sparkle.parentNode) sparkle.parentNode.removeChild(sparkle); }, 12000);
}
setInterval(createSparkle, 300); 

// Open Button and Butterfly Transition
document.getElementById('openBtn').addEventListener('click', function() {
    
    // Play music
    if (playerReady && typeof player.playVideo === 'function') {
        player.playVideo();
    }
    
    var cover = document.getElementById('cover');
    var coverContent = document.querySelector('.cover-content');
    var invitation = document.getElementById('invitation');
    
    // 1. Twirl the roses away and fade text
    coverContent.classList.add('closing');
    
    // 2. Start Butterfly Wipe Transition
    setTimeout(function() {
        const wipe = document.createElement('div');
        wipe.className = 'butterfly-wipe wipe-active';
        
        // Spawn butterflies on the wipe
        for (let i = 0; i < 20; i++) {
            let b = document.createElement('div');
            b.className = 'flying-butterfly';
            b.style.top = Math.random() * 100 + 'vh';
            b.style.left = (Math.random() * 50) + '%'; 
            b.style.animationDelay = (Math.random() * 0.2) + 's';
            wipe.appendChild(b);
        }
        document.body.appendChild(wipe);
        
        // 3. Swap the views when the wipe is fully covering the screen (around 800ms)
        setTimeout(function() {
            cover.style.display = 'none';
            invitation.classList.add('visible');
            
            // Trigger internal staggered animations
            setTimeout(function() {
                document.body.classList.add('opened');
            }, 100);
            
        }, 800);
        
        // 4. Remove wipe after it finishes crossing
        setTimeout(function() {
            wipe.remove();
        }, 2000);
        
    }, 400); // Wait briefly for the roses to twirl out before wiping
});

// Countdown Timer Logic
function initCountdown() {
    const countDownDate = new Date("Nov 1, 2026 17:00:00").getTime();
    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "<h3 style='color: #ab8537; font-family: Montserrat; font-size: 1.2rem; text-transform: uppercase;'>Той басталды!</h3>";
            document.querySelector(".countdown-title").style.display = "none";
        }
    }, 1000);
}
initCountdown();
