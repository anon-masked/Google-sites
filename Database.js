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

    databaseTabs.forEach(tab => {

        if (tab.dataset.section === sectionId) {
            tab.classList.add("active");
        } else {
            tab.classList.remove("active");
        }

    });


    databaseSections.forEach(section => {

        if (section.id === sectionId) {
            section.classList.add("active");
        } else {
            section.classList.remove("active");
        }

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
