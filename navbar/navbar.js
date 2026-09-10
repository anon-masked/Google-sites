/* =========================
   LOGO TRANSFORMATION
   ========================= */

const logoButton = document.getElementById("logoButton");
const logoImage1 = document.getElementById("logoImage1");
const logoImage2 = document.getElementById("logoImage2");
const refreshIntroButton =
    document.getElementById("refreshIntroButton");


if (logoButton && logoImage1 && logoImage2) {

    let showingSecondLogo = false;
    let transforming = false;

    logoButton.addEventListener("mouseenter", () => {

        // Don't restart the animation while one is already happening
        if (transforming) {
            return;
        }

        transforming = true;

        if (!showingSecondLogo) {

            // MTF → RRH

            logoButton.classList.remove("transforming-back");
            logoButton.classList.add("transforming-forward");

        } else {

            // RRH → MTF

            logoButton.classList.remove("transforming-forward");
            logoButton.classList.add("transforming-back");

        }

        setTimeout(() => {

            showingSecondLogo = !showingSecondLogo;
            transforming = false;

            logoButton.classList.remove("transforming-forward");
            logoButton.classList.remove("transforming-back");

            if (showingSecondLogo) {

                logoImage1.classList.remove("logo-active");
                logoImage2.classList.add("logo-active");

            } else {

                logoImage2.classList.remove("logo-active");
                logoImage1.classList.add("logo-active");

            }

        }, 1800);

    });

}


/* =========================
   BINARY TRICKLE
   ========================= */

const navLinks = document.querySelectorAll(".nav-links a");


function createBinaryDrop(link) {

    const drop = document.createElement("span");

    drop.classList.add("binary-stream");

    // Random 0 or 1
    drop.textContent = Math.random() < 0.5 ? "0" : "1";


    // Random starting position
    drop.style.left = `${Math.random() * link.offsetWidth}px`;
    drop.style.top = "100%";


    // Random movement
    const movementX =
        Math.floor(Math.random() * 21) - 10;

    const movementY =
        Math.floor(Math.random() * 60) + 40;


    drop.style.setProperty(
        "--stream-x",
        `${movementX}px`
    );

    drop.style.setProperty(
        "--stream-y",
        `${movementY}px`
    );


    link.appendChild(drop);


    // Remove after animation
    setTimeout(() => {
        drop.remove();
    }, 2000);

}


/* =========================
   NAV LINK HOVER
   ========================= */

navLinks.forEach(link => {

    let dropInterval = null;


    link.addEventListener("mouseenter", () => {

        createBinaryDrop(link);

        dropInterval = setInterval(() => {

            createBinaryDrop(link);

        }, 120);

    });


    link.addEventListener("mouseleave", () => {

        clearInterval(dropInterval);

        dropInterval = null;

    });

});

setInterval(() => {
    createBinaryDrop(
        navLinks[Math.floor(Math.random() * navLinks.length)]
    );
}, 400);

/* =========================
   HELP / MUSIC SYSTEM
   ========================= */

const helpButton =
    document.getElementById("helpButton");

const helpContainer =
    document.querySelector(".help-container");

const music =
    document.getElementById("backgroundMusic");

const musicToggle =
    document.getElementById("musicToggle");

const musicStatus =
    document.getElementById("musicStatus");

const volumeSlider =
    document.getElementById("volumeSlider");


let musicPlaying = false;
let fadeTimer = null;


/* =========================
   HELP DROPDOWN
   ========================= */

if (helpButton && helpContainer) {

    helpButton.addEventListener("click", (event) => {

        event.preventDefault();

        helpContainer.classList.toggle("open");

    });

}


/* =========================
   MUSIC VOLUME
   ========================= */

if (music && volumeSlider) {

    music.volume =
        Number(volumeSlider.value);

    volumeSlider.addEventListener("input", () => {

        music.volume =
            Number(volumeSlider.value);

    });

}


/* =========================
   FADE IN
   ========================= */

function fadeInMusic() {

    if (!music) return;

    clearInterval(fadeTimer);

    music.volume = 0;

    const targetVolume =
        Number(volumeSlider.value);

    fadeTimer = setInterval(() => {

        music.volume += 0.01;

        if (music.volume >= targetVolume) {

            music.volume = targetVolume;

            clearInterval(fadeTimer);

        }

    }, 100);

}


/* =========================
   PLAY
   ========================= */

function startMusic() {

    if (!music || musicPlaying) return;

    music.play()
        .then(() => {

            musicPlaying = true;

            musicToggle.textContent = "Ⅱ";
            musicStatus.textContent = "PLAYING";

            fadeInMusic();

        })
        .catch(() => {

            /*
             * Browser blocked autoplay.
             * It will try again on user interaction.
             */

        });

}


/* =========================
   PAUSE
   ========================= */

function pauseMusic() {

    if (!music) return;

    music.pause();

    musicPlaying = false;

    musicToggle.textContent = "▶";
    musicStatus.textContent = "PAUSED";

}


/* =========================
   PLAY / PAUSE BUTTON
   ========================= */

if (musicToggle) {

    musicToggle.addEventListener("click", () => {

        if (musicPlaying) {

            pauseMusic();

        } else {

            startMusic();

        }

    });

}


/* =========================
   AUTOMATIC START
   ========================= */

if (music) {

    music.volume = 0;

    startMusic();

}


/* =========================
   AUTOPLAY FALLBACK
   ========================= */

document.addEventListener(
    "click",
    () => {

        if (!musicPlaying) {
            startMusic();
        }

    },
    { once: true }
);

/* =========================
   RANDOM CLICK SOUNDS
   ========================= */

const clickSounds = [
    "../Sound effects/Sound effects_adriantnt_u_click.mp3",
    "../Sound effects/adriantnt_u_click.mp3",
    "../Sound effects/freesound_community-mech-keyboard-02-102918.mp3",
    "../Sound effects/justsomesounds-click-sound-432501.mp3",
    "../Sound effects/u_u4pf5h7zip-click-345983.mp3.mp3"
];

let lastClickSound = -1;

function playRandomClickSound() {

    let randomIndex;

    do {
        randomIndex =
            Math.floor(
                Math.random() * clickSounds.length
            );
    } while (
        clickSounds.length > 1 &&
        randomIndex === lastClickSound
    );

    lastClickSound = randomIndex;

    const clickSound =
        new Audio(clickSounds[randomIndex]);

    clickSound.volume = 0.4;

    clickSound.play().catch(() => {});
}


/* =========================
   CLICK DETECTION
   ========================= */

document.addEventListener("click", (event) => {

    const interactiveElement =
        event.target.closest(
            "button, a, input, select, textarea, .database-tab"
        );

    if (!interactiveElement) return;

    playRandomClickSound();

});

if (refreshIntroButton) {

    refreshIntroButton.addEventListener("click", () => {

        localStorage.removeItem(
            "foundationIntroCompleted"
        );

        window.location.reload();

    });

}
