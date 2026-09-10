/* =========================================================
   DATABASE
   PAGE JAVASCRIPT
   ========================================================= */


/* =========================
   DATABASE TABS
   ========================= */

const databaseTabs =
    document.querySelectorAll(".database-tab");

const databaseSections =
    document.querySelectorAll(".database-section");

const databasePanel =
    document.querySelector(".database-panel");


/* =========================
   OPEN SECTION
   ========================= */

function openDatabaseSection(sectionId) {

    const targetSection =
        document.getElementById(sectionId);

    if (!targetSection) {
        return;
    }


    /* =========================
       REMOVE ACTIVE TAB
       ========================= */

    databaseTabs.forEach(tab => {

        tab.classList.remove("active");

    });


    /* =========================
       HIDE ALL SECTIONS
       ========================= */

    databaseSections.forEach(section => {

        section.classList.remove("active");

        section.style.display = "none";

    });


    /* =========================
       FIND SELECTED TAB
       ========================= */

    const selectedTab =
        document.querySelector(
            `.database-tab[data-section="${sectionId}"]`
        );


    if (selectedTab) {

        selectedTab.classList.add("active");

    }


    /* =========================
       OPEN SELECTED SECTION
       ========================= */

    targetSection.style.display = "block";

    targetSection.classList.add("active");


    /* =========================
       UPDATE PANEL HEIGHT
       ========================= */

    databasePanel.style.height =
        targetSection.scrollHeight + "px";


    /* =========================
       WAIT FOR CONTENT TO SETTLE
       ========================= */

    requestAnimationFrame(() => {

        databasePanel.style.height =
            targetSection.scrollHeight + "px";

    });

}


/* =========================
   TAB CLICK EVENTS
   ========================= */

databaseTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const sectionId =
            tab.dataset.section;


        /* Don't do anything
           if already open */

        if (tab.classList.contains("active")) {
            return;
        }


        openDatabaseSection(sectionId);

    });

});


/* =========================
   INITIAL SECTION
   ========================= */

const initialSection =
    document.querySelector(
        ".database-section.active"
    );


if (initialSection) {

    databasePanel.style.height =
        initialSection.scrollHeight + "px";

}
