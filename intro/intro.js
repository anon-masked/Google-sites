/* =========================================================
   SCP FOUNDATION INTRO
   ========================================================= */


/* =========================================================
   CHECK IF INTRO WAS ALREADY COMPLETED
   ========================================================= */

if (
    localStorage.getItem(
        "foundationIntroCompleted"
    ) !== "true"
) {

    createFoundationIntro();

}


/* =========================================================
   CREATE INTRO
   ========================================================= */

function createFoundationIntro() {

    const intro =
        document.createElement("div");

    intro.id = "foundationIntro";


    intro.innerHTML = `

        <div class="intro-content">


            <!-- LOADING CIRCLE -->

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


            <!-- TERMINAL -->

            <div
                class="intro-terminal"
                id="introTerminal"
            ></div>


            <!-- SECURE CONTAIN PROTECT -->

            <button
                id="secureButton"
            >
                SECURE CONTAIN PROTECT
            </button>


            <!-- AUTHENTICATION CONSOLE -->

            <div
                class="auth-console"
                id="authConsole"
            >

                <div class="auth-prompt">
                > SELECT AUTHENTICATION PROTOCOL
                
                </div>

                <!-- MAIN OPTIONS -->

                <div
                    class="auth-selection"
                    id="authSelection"
                >



                    <div class="auth-prompt">
                    
                    > FOUNDATION AUTHENTICATION TERMINAL
                    <br>
                    > SELECT AUTHENTICATION PROTOCOL:
                    
                    </div>


                    <div class="auth-options">

                        <button
                            class="auth-option"
                            id="loginOption"
                        >
                            LOGIN
                        </button>


                        <button
                            class="auth-option"
                            id="signupOption"
                        >
                            SIGN UP
                        </button>

                    </div>

                </div>


                <!-- LOGIN FORM -->

                <div
                    class="auth-form"
                    id="loginForm"
                >

                    <div class="auth-prompt">
                        > PERSONNEL AUTHENTICATION
                    </div>


                    <label for="loginId">
                        PERSONNEL ID
                    </label>

                    <input
                        type="text"
                        id="loginId"
                        placeholder="D-001"
                        autocomplete="off"
                    >


                    <label for="loginPassword">
                        PASSWORD
                    </label>

                    <input
                        type="password"
                        id="loginPassword"
                        placeholder="PASSWORD"
                    >


                    <button
                        class="auth-submit"
                        id="loginSubmit"
                    >
                        AUTHENTICATE
                    </button>


                    <button
                        class="auth-back"
                        id="loginBack"
                    >
                        ← RETURN
                    </button>

                </div>


                <!-- SIGN UP FORM -->

                <div
                    class="auth-form"
                    id="signupForm"
                >

                    <div class="auth-prompt">
                        > NEW PERSONNEL REGISTRATION
                    </div>


                    <label for="signupId">
                        REQUESTED PERSONNEL ID
                    </label>

                    <input
                        type="text"
                        id="signupId"
                        placeholder="D-005"
                        autocomplete="off"
                    >


                    <label for="signupPassword">
                        PASSWORD
                    </label>

                    <input
                        type="password"
                        id="signupPassword"
                        placeholder="PASSWORD"
                    >


                    <label for="signupConfirm">
                        CONFIRM PASSWORD
                    </label>

                    <input
                        type="password"
                        id="signupConfirm"
                        placeholder="CONFIRM PASSWORD"
                    >


                    <button
                        class="auth-submit"
                        id="signupSubmit"
                    >
                        REGISTER PERSONNEL
                    </button>


                    <button
                        class="auth-back"
                        id="signupBack"
                    >
                        ← RETURN
                    </button>

                </div>

            </div>

        </div>
    `;


    document.body.appendChild(intro);


    /* Prevent scrolling */

    document.body.style.overflow =
        "hidden";


    startLoadingSequence();
}


/* =========================================================
   CREATE 12 SEGMENTS
   ========================================================= */

function createLoaderSegments() {

    const segments = 12;

    let output = "";


    const radius = 68;

    const circumference =
        2 * Math.PI * radius;


    const gap = 9;


    const segmentLength =
        (circumference / segments) - gap;


    for (
        let i = 0;
        i < segments;
        i++
    ) {

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
        document.getElementById(
            "loaderPercentage"
        );


    const status =
        document.getElementById(
            "loaderStatus"
        );


    const segments =
        document.querySelectorAll(
            ".loader-segment"
        );


    const totalSegments =
        segments.length;


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


    const loadingInterval =
        setInterval(() => {

            currentSegment++;


            const progress =
                Math.round(
                    (
                        currentSegment /
                        totalSegments
                    ) * 100
                );


            percentage.textContent =
                progress + "%";


            /* Light up completed segments */

            segments.forEach(
                (segment, index) => {

                    segment.classList.remove(
                        "current"
                    );


                    if (
                        index <
                        currentSegment
                    ) {

                        segment.classList.add(
                            "active"
                        );

                    }

                }
            );


            /* Highlight current segment */

            if (
                segments[
                    currentSegment - 1
                ]
            ) {

                segments[
                    currentSegment - 1
                ].classList.add(
                    "current"
                );

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

            if (
                currentSegment >=
                totalSegments
            ) {

                clearInterval(
                    loadingInterval
                );


                setTimeout(() => {

                    beginTerminalText();

                }, 1000);

            }

        }, 500);
}


/* =========================================================
   TERMINAL TEXT
   ========================================================= */

function beginTerminalText() {

    const terminal =
        document.getElementById(
            "introTerminal"
        );


    const lines = [

        {
            text:
                "> FOUNDATION ACCESS TERMINAL",

            className: ""
        },


        {
            text:
                "> CONNECTION ESTABLISHED.",

            className: ""
        },


        {
            text:
                "> ACCESS PROTOCOL VERIFIED.",

            className: ""
        },


        {
            text: "",

            className: ""
        },


        {
            text:
                "> BY OPENING THIS SITE YOU AGREE TO THE PROPER USE OF ANY INFORMATION INSIDE.",

            className: ""
        },


        {
            text: "",

            className: ""
        },


        {
            text:
                "> WE DIE IN THE DARK SO YOU LIVE IN THE LIGHT.",

            className: "warning"
        }

    ];


    let lineIndex = 0;


    function typeNextLine() {

        if (
            lineIndex >=
            lines.length
        ) {

            showSecureButton();

            return;
        }


        const lineData =
            lines[lineIndex];


        const line =
            document.createElement(
                "div"
            );


        line.className =
            "intro-line " +
            lineData.className;


        terminal.appendChild(line);


        let characterIndex = 0;


        /* Typing speed */

        const typingSpeed =
            lineData.text === ""
                ? 0
                : 45;


        function typeCharacter() {

            if (
                characterIndex <
                lineData.text.length
            ) {

                line.textContent +=
                    lineData.text[
                        characterIndex
                    ];


                characterIndex++;


                setTimeout(
                    typeCharacter,
                    typingSpeed
                );


            } else {

                /*
                   The warning line is NOT
                   modified here.

                   CSS handles the color
                   transition automatically.
                */


                lineIndex++;


                setTimeout(
                    typeNextLine,
                    600
                );

            }

        }


        typeCharacter();
    }


    typeNextLine();
}


/* =========================================================
   SECURE CONTAIN PROTECT
   ========================================================= */

function showSecureButton() {

    const button =
        document.getElementById(
            "secureButton"
        );

    const terminal =
        document.getElementById(
            "introTerminal"
        );

    if (
        !button ||
        !terminal
    ) {
        return;
    }

    /*
       Position the button directly
       underneath the terminal.
    */

   button.style.top =
    `${
        terminal.offsetTop +
        terminal.offsetHeight +
        345
    }px`;

    button.classList.add(
        "visible"
    );

    button.addEventListener(
        "click",
        () => {

            /*
               Hide the boot terminal.

               The loading circle remains
               visible as the system indicator.
            */

            terminal.style.display =
                "none";

            /*
               Keep the SECURE CONTAIN PROTECT
               button visible in its position.
            */

            button.style.display =
                "block";

            /*
               Show authentication console.
            */

            const authConsole =
                document.getElementById(
                    "authConsole"
                );

            if (authConsole) {

                authConsole.classList.add(
                    "visible"
                );

            }

            /*
               Initialize login/sign-up.
            */

            initializeAuthentication();

        }
    );
}



/* =========================================================
   AUTHENTICATION FRONTEND
   ========================================================= */

function initializeAuthentication() {

    const authSelection =
        document.getElementById(
            "authSelection"
        );


    const loginForm =
        document.getElementById(
            "loginForm"
        );


    const signupForm =
        document.getElementById(
            "signupForm"
        );


    const loginOption =
        document.getElementById(
            "loginOption"
        );


    const signupOption =
        document.getElementById(
            "signupOption"
        );


    const loginBack =
        document.getElementById(
            "loginBack"
        );


    const signupBack =
        document.getElementById(
            "signupBack"
        );


    if (
        !authSelection ||
        !loginForm ||
        !signupForm
    ) {

        return;
    }


    /* LOGIN */

    loginOption.addEventListener(
        "click",
        () => {

            authSelection.style.display =
                "none";


            signupForm.classList.remove(
                "visible"
            );


            loginForm.classList.add(
                "visible"
            );

        }
    );


    /* SIGN UP */

    signupOption.addEventListener(
        "click",
        () => {

            authSelection.style.display =
                "none";


            loginForm.classList.remove(
                "visible"
            );


            signupForm.classList.add(
                "visible"
            );

        }
    );


    /* RETURN FROM LOGIN */

    loginBack.addEventListener(
        "click",
        () => {

            loginForm.classList.remove(
                "visible"
            );


            authSelection.style.display =
                "block";

        }
    );


    /* RETURN FROM SIGN UP */

    signupBack.addEventListener(
        "click",
        () => {

            signupForm.classList.remove(
                "visible"
            );


            authSelection.style.display =
                "block";

        }
    );


    /*
       These are intentionally frontend-only
       for now.

       Backend authentication will be
       connected later.
    */

    document
        .getElementById("loginSubmit")
        .addEventListener(
            "click",
            () => {

                console.log(
                    "LOGIN REQUEST"
                );

            }
        );


    document
        .getElementById("signupSubmit")
        .addEventListener(
            "click",
            () => {

                console.log(
                    "SIGN UP REQUEST"
                );

            }
        );
}
