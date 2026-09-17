/* =========================================================
   BINARY GENERATOR
   ========================================================= */

function generateBinary(direction) {

    let output = "";

    const rows = 24;


    for (let i = 0; i < rows; i++) {

        let width;


        /* =========================
           TOP RIGHT
           Wide at top
           Narrow toward bottom
           ========================= */

        if (direction === "top") {

            width =
                Math.floor(32 - i * 1.25);

        }


        /* =========================
           BOTTOM LEFT
           Narrow at top
           Wide toward bottom
           ========================= */

        else {

            width =
                Math.floor(5 + i * 1.25);

        }


        width +=
            Math.floor(
                Math.random() * 6
            );


        width =
            Math.max(width, 1);


        let line = "";


        for (let j = 0; j < width; j++) {

            /* =========================
               RANDOM GAPS
               ========================= */

            if (Math.random() < 0.35) {

                line += " ";

            }

            else {

                line +=
                    Math.random() < 0.5
                        ? "0"
                        : "1";

            }

        }


        output +=
            line + "\n";

    }


    return output;

}


/* =========================================================
   BINARY ELEMENTS
   ========================================================= */

const topRight =
    document.querySelector(
        ".binary-top-right"
    );


const bottomLeft =
    document.querySelector(
        ".binary-bottom-left"
    );


/* =========================================================
   UPDATE BINARY
   ========================================================= */

function updateBinary() {


    if (topRight) {

        topRight.textContent =
            generateBinary("top");

    }


    if (bottomLeft) {

        bottomLeft.textContent =
            generateBinary("bottom");

    }

}


updateBinary();


/* =========================================================
   REFRESH BINARY
   ========================================================= */

setInterval(
    updateBinary,
    250
);


/* =========================================================
   SINGLE PAGE NAVIGATION
   ========================================================= */

const pageLinks =
    document.querySelectorAll(
        "[data-page]"
    );


const sitePages =
    document.querySelectorAll(
        ".site-page"
    );


/* =========================================================
   DATABASE ELEMENTS
   ========================================================= */

const databaseTabs =
    document.querySelectorAll(
        ".database-tab"
    );


const databaseSections =
    document.querySelectorAll(
        ".database-section"
    );


const redactedOverlay =
    document.getElementById(
        "redactedOverlay"
    );


const redactedButton =
    document.getElementById(
        "redactedButton"
    );


/* =========================================================
   RESET DATABASE
   ========================================================= */

function resetDatabase() {


    /* =========================
       CLOSE ALL SECTIONS
       ========================= */

    databaseSections.forEach(
        section => {

            section.classList.remove(
                "active"
            );

        }
    );


    /* =========================
       REMOVE ALL TAB STATES
       ========================= */

    databaseTabs.forEach(
        tab => {

            tab.classList.remove(
                "active"
            );

        }
    );


    /* =========================
       RESTORE REDACTED SCREEN
       ========================= */

    if (redactedOverlay) {

        redactedOverlay.classList.remove(
            "hidden"
        );

    }

}


/* =========================================================
   SHOW PAGE
   ========================================================= */

function showPage(pageName) {


    /* =========================
       CLOSE EVERY PAGE
       ========================= */

    sitePages.forEach(
        page => {

            page.classList.remove(
                "active"
            );

        }
    );


    /* =========================
       RESET DATABASE BEFORE
       ANY NEW PAGE IS SHOWN
       ========================= */

    resetDatabase();


    /* =========================
       FIND SELECTED PAGE
       ========================= */

    const selectedPage =
        document.getElementById(
            pageName
        );


    /* =========================
       SHOW SELECTED PAGE
       ========================= */

    if (selectedPage) {

        selectedPage.classList.add(
            "active"
        );

    }


    /* =========================
       DATABASE MODE
       ========================= */

    if (pageName === "database") {

        /*
         * Database is now active.
         *
         * IMPORTANT:
         *
         * resetDatabase() has already
         * closed everything.
         *
         * Therefore every visit to
         * DATABASE begins from zero.
         */

        document.body.classList.add(
            "database-mode"
        );

    }

    else {

        /*
         * Leaving database.
         *
         * Remove the database slab.
         */

        document.body.classList.remove(
            "database-mode"
        );

    }

}


/* =========================================================
   NAVIGATION EVENTS
   ========================================================= */

pageLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();


                const pageName =
                    link.dataset.page;


                showPage(
                    pageName
                );

            }
        );

    }
);


/* =========================================================
   REDACTED OVERLAY
   ========================================================= */

if (
    redactedButton &&
    redactedOverlay
) {

    redactedButton.addEventListener(
        "click",
        () => {

            redactedOverlay.classList.add(
                "hidden"
            );

        }
    );

}


/* =========================================================
   DATABASE SECTION CONTROL
   ========================================================= */

function openDatabaseSection(
    sectionId
) {


    /* =========================
       FIND SELECTED SECTION
       ========================= */

    const selectedSection =
        document.getElementById(
            sectionId
        );


    /* =========================
       FIND SELECTED TAB
       ========================= */

    const selectedTab =
        document.querySelector(
            `.database-tab[data-section="${sectionId}"]`
        );


    /* =========================
       SAFETY CHECK
       ========================= */

    if (!selectedSection) {

        return;

    }


    /* =====================================================
       IF THE CLICKED SECTION IS ALREADY OPEN
       CLOSE IT
       ===================================================== */

    if (
        selectedSection.classList.contains(
            "active"
        )
    ) {


        selectedSection.classList.remove(
            "active"
        );


        if (selectedTab) {

            selectedTab.classList.remove(
                "active"
            );

        }


        return;

    }


    /* =====================================================
       CLOSE EVERY OTHER SECTION
       ===================================================== */

    databaseSections.forEach(
        section => {

            section.classList.remove(
                "active"
            );

        }
    );


    /* =====================================================
       REMOVE EVERY OTHER TAB STATE
       ===================================================== */

    databaseTabs.forEach(
        tab => {

            tab.classList.remove(
                "active"
            );

        }
    );


    /* =====================================================
       OPEN SELECTED SECTION
       ===================================================== */

    selectedSection.classList.add(
        "active"
    );


    /* =====================================================
       ACTIVATE SELECTED TAB
       ===================================================== */

    if (selectedTab) {

        selectedTab.classList.add(
            "active"
        );

    }

}


/* =========================================================
   DATABASE TAB EVENTS
   ========================================================= */

databaseTabs.forEach(
    tab => {

        tab.addEventListener(
            "click",
            () => {

                openDatabaseSection(
                    tab.dataset.section
                );

            }
        );

    }
);


/* =========================================================
   INITIAL DATABASE STATE
   ========================================================= */

/*
 * Make absolutely sure that
 * the database starts closed.
 */

resetDatabase();


/*
 * Make sure the database slab
 * is not active on initial load.
 */

document.body.classList.remove(
    "database-mode"
);
