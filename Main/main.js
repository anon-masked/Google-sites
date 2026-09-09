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