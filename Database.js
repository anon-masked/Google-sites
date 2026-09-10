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


/* =========================
   OPEN SECTION
   ========================= */

function openDatabaseSection(sectionId) {

    /* =========================
       UPDATE TABS
       ========================= */

    databaseTabs.forEach(tab => {

        tab.classList.toggle(
            "active",
            tab.dataset.section === sectionId
        );

    });


    /* =========================
       UPDATE SECTIONS
       ========================= */

    databaseSections.forEach(section => {

        section.classList.toggle(
            "active",
            section.id === sectionId
        );

    });

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


/* =========================
   INITIAL SECTION
   ========================= */

openDatabaseSection("personnel");
