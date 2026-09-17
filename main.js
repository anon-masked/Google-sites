/* =========================
   BINARY GENERATOR
   ========================= */

function generateBinary(direction) {

    let output = "";

    const rows = 24;

    for (let i = 0; i < rows; i++) {

        let width;

        /*
         * TOP RIGHT
         * Wide at top
         * Narrow toward bottom
         */

        if (direction === "top") {

            width =
                Math.floor(32 - i * 1.25);

        }

        /*
         * BOTTOM LEFT
         * Narrow at top
         * Wide toward bottom
         */

        else {

            width =
                Math.floor(5 + i * 1.25);

        }

        width +=
            Math.floor(Math.random() * 6);

        width =
            Math.max(width, 1);

        let line = "";

        for (let j = 0; j < width; j++) {

            /*
             * Random gaps
             */

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

        output += line + "\n";

    }

    return output;
}


/* =========================
   BINARY ELEMENTS
   ========================= */

const topRight =
    document.querySelector(".binary-top-right");

const bottomLeft =
    document.querySelector(".binary-bottom-left");


/* =========================
   UPDATE BINARY
   ========================= */

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


/*
 * Refresh every 250ms
 */

setInterval(
    updateBinary,
    250
);


/* =========================================================
   SINGLE PAGE NAVIGATION
   ========================================================= */

const pageLinks =
    document.querySelectorAll("[data-page]");

const sitePages =
    document.querySelectorAll(".site-page");


/* =========================================================
   DATABASE ELEMENTS
   ========================================================= */

const databaseTabs =
    document.querySelectorAll(".database-tab");

const databaseSections =
    document.querySelectorAll(".database-section");

const redactedOverlay =
    document.getElementById("redactedOverlay");

const redactedButton =
    document.getElementById("redactedButton");


/* =========================================================
   RESET DATABASE
   ========================================================= */

function resetDatabase() {

    /*
     * Close every database section
     */

    databaseSections.forEach(section => {

        section.classList.remove("active");

    });


    /*
     * Remove active state from every tab
     */

    databaseTabs.forEach(tab => {

        tab.classList.remove("active");

    });


    /*
     * Reset the REDACTED overlay
     */

    if (redactedOverlay) {

        redactedOverlay.classList.remove("hidden");

    }

}


/* =========================================================
   PAGE SWITCHING
   ========================================================= */

function showPage(pageName) {

    /*
     * Remove active state from every page
     */

    sitePages.forEach(page => {

        page.classList.remove("active");

    });


    /*
     * Find requested page
     */

    const selectedPage =
        document.getElementById(pageName);


    /*
     * Show requested page
     */

    if (selectedPage) {

        selectedPage.classList.add("active");

    }


    /* =========================
       DATABASE BACKGROUND
       ========================= */

    if (pageName === "database") {

        /*
         * Make sure database always
         * starts CLOSED when entered.
         */

        resetDatabase();

        document.body.classList.add(
            "database-mode"
        );

    }

    else {

        /*
         * Remove database background
         */

        document.body.classList.remove(
            "database-mode"
        );


        /*
         * IMPORTANT:
         *
         * When leaving Database,
         * completely reset its state.
         *
         * So when we come back,
         * nothing is already open.
         */

        resetDatabase();

    }

}


/* =========================================================
   NAVIGATION CLICK EVENTS
   ========================================================= */

pageLinks.forEach(link => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        const pageName =
            link.dataset.page;

        showPage(pageName);

    });

});


/* =========================================================
   REDACTED OVERLAY
   ========================================================= */

if (redactedButton && redactedOverlay) {

    redactedButton.addEventListener("click", () => {

        redactedOverlay.classList.add("hidden");

    });

}


/* =========================================================
   OPEN / CLOSE DATABASE SECTION
   ========================================================= */

function openDatabaseSection(sectionId) {

    const selectedSection =
        document.getElementById(sectionId);

    const selectedTab =
        document.querySelector(
            `.database-tab[data-section="${sectionId}"]`
        );


    /*
     * Safety check
     */

    if (!selectedSection) {

        return;

    }


    /* =========================
       IF ALREADY OPEN
       CLOSE IT
       ========================= */

    if (
        selectedSection.classList.contains("active")
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


    /* =========================
       CLOSE ALL OTHER SECTIONS
       ========================= */

    databaseSections.forEach(section => {

        section.classList.remove(
            "active"
        );

    });


    /* =========================
       CLOSE ALL OTHER TABS
       ========================= */

    databaseTabs.forEach(tab => {

        tab.classList.remove(
            "active"
        );

    });


    /* =========================
       OPEN SELECTED SECTION
       ========================= */

    selectedSection.classList.add(
        "active"
    );


    /* =========================
       ACTIVATE SELECTED TAB
       ========================= */

    if (selectedTab) {

        selectedTab.classList.add(
            "active"
        );

    }

}


/* =========================================================
   DATABASE TAB CLICK EVENTS
   ========================================================= */

databaseTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        openDatabaseSection(
            tab.dataset.section
        );

    });

});


/* =========================================================
   INITIAL DATABASE STATE
   ========================================================= */

/*
 * Database starts completely closed.
 */

resetDatabase();
