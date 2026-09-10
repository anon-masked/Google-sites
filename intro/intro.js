/* =========================================================
   SCP FOUNDATION INTRO
   ========================================================= */


/* =========================================================
   CHECK IF INTRO WAS ALREADY COMPLETED
   ========================================================= */

if (localStorage.getItem("foundationIntroCompleted") !== "true") {

    createFoundationIntro();

}


/* =========================================================
   CREATE INTRO
   ========================================================= */

function createFoundationIntro() {

    const intro = document.createElement("div");
    intro.id = "foundationIntro";

    intro.innerHTML = `
        <div class="intro-content">

            <div class="loader-container">

                <svg
                    class="loader-ring"
                    viewBox="0 0 170 170"
                >
                    ${createLoaderSegments()}
                </svg>

                <div class="loader-center">

                    <div
                        class="loader-percentage"
                        id="loaderPercentage"
                    >
                        0%
                    </div>

                    <div
                        class="loader-status"
                        id="loaderStatus"
                    >
                        INITIALIZING
                    </div>

                </div>

            </div>


            <div
                class="intro-terminal"
                id="introTerminal"
            ></div>


            <button
                id="secureButton"
            >
                SECURE CONTAIN PROTECT
            </button>

        </div>
    `;

    document.body.appendChild(intro);


    /* Prevent scrolling while intro is active */

    document.body.style.overflow = "hidden";


    startLoadingSequence();
}


/* =========================================================
   CREATE 12 SEGMENTS
   ========================================================= */

function createLoaderSegments() {

    const segments = 12;

    let output = "";

    const radius = 68;
    const circumference = 2 * Math.PI * radius;

    const gap = 9;

    const segmentLength =
        (circumference / segments) - gap;


    for (let i = 0; i < segments; i++) {

        const offset =
            -(circumference / segments) * i;

        output += `
            <circle
                class="loader-segment"
                cx="85"
                cy="85"
                r="${radius}"
                stroke-dasharray="${segmentLength} ${circumference - segmentLength}"
                stroke-dashoffset="${offset}"
                data-segment="${i}"
            ></circle>
        `;
    }

    return output;
}


/* =========================================================
   LOADING SEQUENCE
   ========================================================= */

function startLoadingSequence() {

    const percentage =
        document.getElementById("loaderPercentage");

    const status =
        document.getElementById("loaderStatus");

    const segments =
        document.querySelectorAll(".loader-segment");


    const totalSegments = segments.length;

    let currentSegment = 0;


    const statuses = [
        "INITIALIZING",
        "VERIFYING",
        "ESTABLISHING CONNECTION",
        "AUTHENTICATING",
        "ACCESS PROTOCOL",
        "FOUNDATION NETWORK",
        "SECURE CHANNEL",
        "READY"
    ];


    const loadingInterval = setInterval(() => {

        currentSegment++;


        const progress =
            Math.round(
                (currentSegment / totalSegments) * 100
            );


        percentage.textContent =
            progress + "%";


        /* Light up completed segments */

        segments.forEach((segment, index) => {

            segment.classList.remove("current");

            if (index < currentSegment) {
                segment.classList.add("active");
            }

        });


        /* Highlight current segment */

        if (segments[currentSegment - 1]) {
            segments[currentSegment - 1]
                .classList.add("current");
        }


        /* Change terminal status */

        const statusIndex =
            Math.min(
                Math.floor(
                    currentSegment /
                    totalSegments *
                    statuses.length
                ),
                statuses.length - 1
            );


        status.textContent =
            statuses[statusIndex];


        /* Finished */

        if (currentSegment >= totalSegments) {

            clearInterval(loadingInterval);

            setTimeout(() => {

                beginTerminalText();

            }, 500);
        }

    }, 250);
}


/* =========================================================
   TERMINAL TEXT
   ========================================================= */

function beginTerminalText() {

    const terminal =
        document.getElementById("introTerminal");


    const lines = [

        {
            text: "> FOUNDATION ACCESS TERMINAL",
            className: ""
        },

        {
            text: "> CONNECTION ESTABLISHED.",
            className: ""
        },

        {
            text: "> ACCESS PROTOCOL VERIFIED.",
            className: ""
        },

        {
            text: "",
            className: ""
        },

        {
            text: "> BY OPENING THIS SITE YOU AGREE TO THE PROPER USE OF ANY INFORMATION INSIDE.",
            className: ""
        },

        {
            text: "",
            className: ""
        },

        {
            text: "> WE DIE IN THE DARK SO YOU LIVE IN THE LIGHT.",
            className: "warning"
        }

    ];


    let lineIndex = 0;


    function typeNextLine() {

        if (lineIndex >= lines.length) {

            showSecureButton();

            return;
        }


        const lineData =
            lines[lineIndex];


        const line =
            document.createElement("div");

        line.className =
            "intro-line " +
            lineData.className;


        terminal.appendChild(line);


        let characterIndex = 0;


        const typingSpeed =
            lineData.text === ""
                ? 0
                : 25;


        function typeCharacter() {

            if (
                characterIndex <
                lineData.text.length
            ) {

                line.textContent +=
                    lineData.text[characterIndex];

                characterIndex++;

                setTimeout(
                    typeCharacter,
                    typingSpeed
                );

            } else {

                lineIndex++;

                setTimeout(
                    typeNextLine,
                    350
                );
            }
        }


        typeCharacter();
    }


    typeNextLine();
}


/* =========================================================
   SECURE CONTAIN PROTECT BUTTON
   ========================================================= */

function showSecureButton() {
    const button = document.getElementById("secureButton");
    const terminal = document.getElementById("introTerminal");

    if (!button || !terminal) return;

    /*
       Put the button directly underneath the terminal.
       This automatically adapts to the terminal's height.
    */
    button.style.top =
        `${terminal.offsetTop + terminal.offsetHeight + 25}px`;

    button.classList.add("visible");

    button.addEventListener("click", () => {
        localStorage.setItem("foundationIntroCompleted", "true");

        const intro = document.getElementById("foundationIntro");
        intro.classList.add("intro-exit");

        setTimeout(() => {
            intro.remove();
            document.body.style.overflow = "";
        }, 850);
    });
}
