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
         *
         * Wide at the top
         * Narrow toward the bottom
         */

        if (direction === "top") {

            width =
                Math.floor(32 - i * 1.25);

        }


        /*
         * BOTTOM LEFT
         *
         * Narrow at the top
         * Wide toward the bottom
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
    document.querySelector(
        ".binary-top-right"
    );


const bottomLeft =
    document.querySelector(
        ".binary-bottom-left"
    );


/* =========================
   UPDATE BINARY
   ========================= */

function updateBinary() {

    topRight.textContent =
        generateBinary("top");

    bottomLeft.textContent =
        generateBinary("bottom");

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

const pageLinks = document.querySelectorAll("[data-page]");
const sitePages = document.querySelectorAll(".site-page");


function showPage(pageName) {

    sitePages.forEach(page => {

        page.classList.remove("active");

    });


    const selectedPage =
        document.getElementById(pageName);


    if (selectedPage) {

        selectedPage.classList.add("active");

    }


    /* =========================
       DATABASE BACKGROUND
       ========================= */

    if (pageName === "database") {

        document.body.classList.add("database-mode");

    }

    else {

        document.body.classList.remove("database-mode");

    }

}


pageLinks.forEach(link => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        const pageName = link.dataset.page;

        showPage(pageName);

    });

});

/* =========================================================
   DATABASE
   ========================================================= */


/* =========================
   DATABASE ELEMENTS
   ========================= */

const databaseTabs =
    document.querySelectorAll(".database-tab");

const databaseSections =
    document.querySelectorAll(".database-section");

const redactedOverlay =
    document.getElementById("redactedOverlay");

const redactedButton =
    document.getElementById("redactedButton");


/* =========================
   REDACTED OVERLAY
   ========================= */

if (redactedButton && redactedOverlay) {

    redactedButton.addEventListener("click", () => {

        redactedOverlay.classList.add("hidden");

    });

}


/* =========================
   OPEN / CLOSE SECTION
   ========================= */

function openDatabaseSection(sectionId) {

    const selectedSection =
        document.getElementById(sectionId);

    const selectedTab =
        document.querySelector(
            `.database-tab[data-section="${sectionId}"]`
        );


    /* =========================
       IF ALREADY OPEN
       CLOSE IT
       ========================= */

    if (
        selectedSection &&
        selectedSection.classList.contains("active")
    ) {

        selectedSection.classList.remove("active");

        if (selectedTab) {

            selectedTab.classList.remove("active");

        }

        return;
    }


    /* =========================
       CLOSE ALL SECTIONS
       ========================= */

    databaseSections.forEach(section => {

        section.classList.remove("active");

    });


    databaseTabs.forEach(tab => {

        tab.classList.remove("active");

    });


    /* =========================
       OPEN SELECTED SECTION
       ========================= */

    if (selectedSection) {

        selectedSection.classList.add("active");

    }


    if (selectedTab) {

        selectedTab.classList.add("active");

    }

}


/* =========================
   TAB CLICK EVENTS
   ========================= */

databaseTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        openDatabaseSection(
            tab.dataset.section
        );

    });

});
