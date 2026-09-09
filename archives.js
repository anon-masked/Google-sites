/* =========================
   CORNER BINARY
   ========================= */

function generateBinary() {

    let output = "";

    const rows = 24;

    for (let i = 0; i < rows; i++) {

        let width = Math.floor(32 - i * 1.25);

        width += Math.floor(Math.random() * 6);

        width = Math.max(width, 1);

        let line = "";

        for (let j = 0; j < width; j++) {

            if (Math.random() < 0.35) {
                line += " ";
            } else {
                line += Math.random() < 0.5
                    ? "0"
                    : "1";
            }
        }

        output += line + "\n";
    }

    return output;
}


/* Find corner elements */

const topLeft =
    document.querySelector(".binary-top-left");

const topRight =
    document.querySelector(".binary-top-right");


/* Update binary */

function updateBinary() {

    if (topLeft) {
        topLeft.textContent =
            generateBinary();
    }

    if (topRight) {
        topRight.textContent =
            generateBinary();
    }
}


updateBinary();


/* Refresh binary every 250ms */

setInterval(updateBinary, 250);