/* =========================================================
   DATABASE
   PAGE JAVASCRIPT
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
