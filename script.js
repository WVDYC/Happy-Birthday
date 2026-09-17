// ==========================================================================
// YOUTUBE BACKGROUND AUDIO (DIRECT & MOBILE OPTIMIZED)
// ==========================================================================
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var playerReady = false;
var isMusicPlaying = false;
var pendingPlayOnReady = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtubePlayer', {
        events: {
            'onReady': function() {
                playerReady = true;
                if (pendingPlayOnReady) {
                    playAudio();
                }
            },
            'onStateChange': function(event) {
                var btn = document.getElementById('musicToggle');
                if (event.data === YT.PlayerState.PLAYING) {
                    isMusicPlaying = true;
                    if (btn) btn.classList.add('playing');
                } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
                    isMusicPlaying = false;
                    if (btn) btn.classList.remove('playing');
                }
            }
        }
    });
}

function playAudio() {
    var iframe = document.getElementById('youtubePlayer');
    if (player && typeof player.playVideo === 'function') {
        try {
            player.playVideo();
            isMusicPlaying = true;
        } catch (e) {
            console.log('player.playVideo failed:', e);
        }
    }
    if (iframe && iframe.contentWindow) {
        try {
            iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            isMusicPlaying = true;
        } catch (e) {}
    }
    var btn = document.getElementById('musicToggle');
    if (btn) btn.classList.add('playing');
}

function pauseAudio() {
    var iframe = document.getElementById('youtubePlayer');
    if (player && typeof player.pauseVideo === 'function') {
        try { player.pauseVideo(); } catch (e) {}
    }
    if (iframe && iframe.contentWindow) {
        try { iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*'); } catch (e) {}
    }
    isMusicPlaying = false;
    var btn = document.getElementById('musicToggle');
    if (btn) btn.classList.remove('playing');
}

function toggleAudioPlayback() {
    if (isMusicPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
}

// User toggle button listener (both click and touchend for instant touch responsiveness)
var musicBtn = document.getElementById('musicToggle');
if (musicBtn) {
    function handleMusicToggle(e) {
        e.stopPropagation();
        if (e.type === 'touchend' && e.cancelable) {
            e.preventDefault();
        }
        toggleAudioPlayback();
    }
    musicBtn.addEventListener('click', handleMusicToggle);
    musicBtn.addEventListener('touchend', handleMusicToggle, { passive: false });
}

// ==========================================================================
// AMBIENT GOLD SPARKLES (FLOATING IN BACKGROUND)
// ==========================================================================
function createSparkle() {
    var container = document.getElementById('effects');
    if (!container) return;
    
    var s = document.createElement('div');
    s.className = 'sparkle';
    s.style.left = (Math.random() * 100) + 'vw';
    
    var duration = (Math.random() * 5 + 7); // 7s to 12s
    s.style.animationDuration = duration + 's';
    
    var size = Math.random() * 2.5 + 2; // 2px to 4.5px
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    
    container.appendChild(s);
    setTimeout(function() {
        if (s.parentNode) s.parentNode.removeChild(s);
    }, duration * 1000);
}

setInterval(createSparkle, 400);

// ==========================================================================
// BURST PARTICLES (ZERO-LAG GPU ACCELERATED)
// ==========================================================================
function spawnBurstSparkles(container, x, y, count) {
    for (var i = 0; i < count; i++) {
        var p = document.createElement('div');
        p.className = 'gold-dust';
        var size = Math.random() * 4 + 2;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        
        var dist = Math.random() * 50 + 15;
        var rad = Math.random() * Math.PI * 2;
        var dx = Math.cos(rad) * dist;
        var dy = Math.sin(rad) * dist;
        
        container.appendChild(p);
        
        (function(el, targetDx, targetDy) {
            requestAnimationFrame(function() {
                el.style.transition = 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease-out';
                el.style.transform = 'translate3d(' + targetDx + 'px, ' + targetDy + 'px, 0) scale(0.2)';
                el.style.opacity = '0';
            });
            setTimeout(function() {
                if (el.parentNode) el.parentNode.removeChild(el);
            }, 950);
        })(p, dx, dy);
    }
}

// ==========================================================================
// CREATE SILKY SMOOTH BUTTERFLY (3-TIER ARCHITECTURE)
// Tier 1: .magic-butterfly (Global Flight Path)
// Tier 2: .butterfly-sway (Natural Aerodynamic Sway)
// Tier 3: .butterfly-inner (Gentle Wing Flapping)
// ==========================================================================
function createMagicButterfly(x, y, scale) {
    var b = document.createElement('div');
    b.className = 'magic-butterfly';
    
    var s = scale || 1;
    var baseW = 44 * s;
    var baseH = 33 * s;
    b.style.width = baseW + 'px';
    b.style.height = baseH + 'px';
    b.style.left = x + 'px';
    b.style.top = y + 'px';
    
    // Tier 2: Natural organic sway
    var sway = document.createElement('div');
    sway.className = 'butterfly-sway';
    var swayDuration = (Math.random() * 0.8 + 2.0).toFixed(2); // 2.0s to 2.8s
    var swayDelay = (Math.random() * -2.0).toFixed(2);
    sway.style.animationDuration = swayDuration + 's';
    sway.style.animationDelay = swayDelay + 's';
    
    // Tier 3: Silky languid wing flapping (0.32s - 0.40s)
    var inner = document.createElement('div');
    inner.className = 'butterfly-inner';
    var flapSpeed = (Math.random() * 0.08 + 0.32).toFixed(2);
    inner.style.animationDuration = flapSpeed + 's';
    
    var img = document.createElement('img');
    img.src = 'assets/butterfly.svg';
    img.alt = 'Көбелек';
    
    inner.appendChild(img);
    sway.appendChild(inner);
    b.appendChild(sway);
    
    return { el: b, width: baseW, height: baseH };
}

// ==========================================================================
// ELEGANT BUTTERFLY FLIGHT (SMOOTH FLOATING GLIDE)
// ==========================================================================
function animateButterflyFlight(butterflyObj, targetX, targetY, duration, delay) {
    var b = butterflyObj.el;
    
    setTimeout(function() {
        var startX = parseFloat(b.style.left);
        var startY = parseFloat(b.style.top);
        
        var dx = targetX - startX;
        var dy = targetY - startY;
        var angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        var tilt = angle + (Math.random() - 0.5) * 20; // Gentle tilt, not abrupt
        
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                // Silky luxury easing: soft lift off, long graceful floating glide
                b.style.transition = 'transform ' + duration + 'ms cubic-bezier(0.16, 1, 0.3, 1), opacity ' + (duration * 0.35) + 'ms ease-in ' + (duration * 0.65) + 'ms';
                b.style.transform = 'translate3d(' + dx + 'px, ' + dy + 'px, 0) rotate(' + tilt + 'deg) scale(1.15)';
                b.style.opacity = '0';
            });
        });
        
        setTimeout(function() {
            if (b.parentNode) b.parentNode.removeChild(b);
        }, duration + 200);
        
    }, delay);
}

// ==========================================================================
// MAIN TRANSITION CONTROLLER (36 SILKY SMOOTH BUTTERFLIES)
// ==========================================================================
var transitionTriggered = false;

function triggerInvitationOpen() {
    if (transitionTriggered) return;
    transitionTriggered = true;
    
    // 1. Play Background Music immediately on user touch gesture
    if (playerReady && player) {
        playAudio();
    } else {
        pendingPlayOnReady = true;
        playAudio(); // triggers postMessage fallback immediately as well
    }
    
    var cover = document.getElementById('cover');
    var coverFrame = document.getElementById('coverFrame');
    var invitation = document.getElementById('invitation');
    var invitationCard = document.getElementById('invitationCard');
    
    // Dedicated full-screen overlay for butterflies
    var butterflyContainer = document.createElement('div');
    butterflyContainer.className = 'butterfly-container';
    
    // Luminous golden light veil
    var veil = document.createElement('div');
    veil.className = 'golden-veil';
    butterflyContainer.appendChild(veil);
    
    document.body.appendChild(butterflyContainer);
    
    var viewW = window.innerWidth;
    var viewH = window.innerHeight;
    var isMobile = viewW <= 600;
    
    // 2. All 12 Roses Start Spinning and Morphing into Butterflies
    var roses = document.querySelectorAll('.rose-flower');
    var rosePositions = [];
    
    roses.forEach(function(rose) {
        rose.classList.add('rose-burst');
        var rect = rose.getBoundingClientRect();
        rosePositions.push({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        });
    });
    
    // 3. Erupt Butterflies in a Graceful, Smooth Stream!
    setTimeout(function() {
        var countPerRose = isMobile ? 1 : 2;
        
        rosePositions.forEach(function(pos, rIdx) {
            spawnBurstSparkles(butterflyContainer, pos.x, pos.y, isMobile ? 2 : 3);
            
            for (var j = 0; j < countPerRose; j++) {
                var scale = Math.random() * 0.3 + 0.85;
                var startX = pos.x + (Math.random() - 0.5) * 14;
                var startY = pos.y + (Math.random() - 0.5) * 14;
                
                var destX = (pos.x < viewW / 2) 
                    ? (Math.random() * -120 - 30) 
                    : (viewW + Math.random() * 120 + 30);
                
                if (Math.random() > 0.45) {
                    destX = (Math.random() - 0.5) * (viewW * 1.3) + (viewW / 2);
                }
                
                var destY = -viewH * 0.4 - Math.random() * 250;
                var duration = 3000 + Math.random() * 1200;
                var delay = j * 60 + rIdx * (isMobile ? 40 : 35);
                
                var bf = createMagicButterfly(startX, startY, scale);
                butterflyContainer.appendChild(bf.el);
                animateButterflyFlight(bf, destX, destY, duration, delay);
            }
        });
        
        // Central Hero Butterflies Swirling Majestically
        if (coverFrame) {
            var frameRect = coverFrame.getBoundingClientRect();
            var centerX = frameRect.left + frameRect.width / 2;
            var centerY = frameRect.top + frameRect.height / 2;
            var centralCount = isMobile ? 6 : 12;
            
            for (var k = 0; k < centralCount; k++) {
                var cScale = (k < 2) ? 1.25 : (Math.random() * 0.35 + 0.9);
                var cStartX = centerX + (Math.random() - 0.5) * 70;
                var cStartY = centerY + (Math.random() - 0.5) * 60;
                var cDestX = (Math.random() - 0.5) * (viewW * 1.4) + (viewW / 2);
                var cDestY = -viewH * 0.45 - Math.random() * 280;
                
                var cDuration = 3200 + Math.random() * 1000;
                var cDelay = 120 + k * 60;
                
                var cBf = createMagicButterfly(cStartX, cStartY, cScale);
                butterflyContainer.appendChild(cBf.el);
                animateButterflyFlight(cBf, cDestX, cDestY, cDuration, cDelay);
            }
        }
        
    }, 260);
    
    // 4. Smooth Dissolve of the Cover Screen in Light
    setTimeout(function() {
        if (cover) cover.classList.add('dissolving');
    }, 600);
    
    // 5. Unveil the Main Invitation Card & Unlock Smooth Document Scrolling
    setTimeout(function() {
        if (cover) cover.style.display = 'none';
        if (invitation) invitation.classList.add('visible');
        
        // Unlock document scrolling for mobile and desktop
        document.documentElement.classList.add('opened');
        document.body.classList.add('opened');
        
        setTimeout(function() {
            if (invitationCard) invitationCard.classList.add('revealed');
        }, 60);
        
    }, 950);
    
    // 6. Cleanup butterfly container after all flights finish
    setTimeout(function() {
        if (butterflyContainer.parentNode) {
            butterflyContainer.parentNode.removeChild(butterflyContainer);
        }
    }, 5000);
}

// User Open Button Event Listeners (both click and touchend for instant mobile activation)
var openBtn = document.getElementById('openBtn');
if (openBtn) {
    function handleOpenAction(e) {
        if (transitionTriggered) return;
        if (e && e.type === 'touchend' && e.cancelable) {
            e.preventDefault();
        }
        triggerInvitationOpen();
    }
    openBtn.addEventListener('click', handleOpenAction);
    openBtn.addEventListener('touchend', handleOpenAction, { passive: false });
}

// ==========================================================================
// COUNTDOWN TIMER TO THE EVENT (01.11.2026 17:00:00)
// ==========================================================================
function initCountdown() {
    var countDownDate = new Date("Nov 1, 2026 17:00:00").getTime();
    
    function updateTimer() {
        var now = new Date().getTime();
        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        var daysEl = document.getElementById("days");
        var hoursEl = document.getElementById("hours");
        var minutesEl = document.getElementById("minutes");
        var secondsEl = document.getElementById("seconds");

        if (daysEl) daysEl.innerText = days < 10 ? "0" + days : days;
        if (hoursEl) hoursEl.innerText = hours < 10 ? "0" + hours : hours;
        if (minutesEl) minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
        if (secondsEl) secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;

        if (distance < 0) {
            clearInterval(timerInterval);
            var countdownBox = document.getElementById("countdown");
            if (countdownBox) {
                countdownBox.innerHTML = "<h3 style='color: #8c6b1b; font-family: Montserrat; font-size: 1.2rem; text-transform: uppercase; letter-spacing: 2px;'>Той басталды!</h3>";
            }
            var ct = document.querySelector(".countdown-title");
            if (ct) ct.style.display = "none";
        }
    }
    
    updateTimer();
    var timerInterval = setInterval(updateTimer, 1000);
}

initCountdown();
