/* =========================================================
   DOCUMENT 2
   IMAGE LIGHTBOX
   ======================================================== */


const flowchartImages =
    document.querySelectorAll(".flowchart-image");


const lightbox =
    document.createElement("div");

lightbox.className =
    "image-lightbox";


const lightboxImage =
    document.createElement("img");


lightbox.appendChild(lightboxImage);

document.body.appendChild(lightbox);


/* =========================
   OPEN IMAGE
   ========================= */

flowchartImages.forEach((image) => {

    image.addEventListener("click", () => {

        lightboxImage.src =
            image.src;

        lightboxImage.alt =
            image.alt;

        lightbox.classList.add("open");

        document.body.style.overflow =
            "hidden";

    });

});


/* =========================
   CLOSE IMAGE
   ========================= */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


/* =========================
   ESC KEY
   ========================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeLightbox();

    }

});


/* =========================
   CLOSE FUNCTION
   ========================= */

function closeLightbox() {

    lightbox.classList.remove("open");

    document.body.style.overflow =
        "";

}
