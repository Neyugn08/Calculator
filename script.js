// Setting up the screen
const screen = document.querySelector(".screen");
let scrOriH = getComputedStyle(screen).height;
//screen.textContent = " ";

const container = document.querySelector(".container");
container.textContent = " ";

const base = document.querySelector(".base");
let operation;

// Setting up the keys
const keys = document.querySelector(".keys");
const operator = keys.children;
Array.from(operator).forEach(item => {
    // Modifying the size of the keys
    item.style.width = 75/4 + "px";
    item.style.height = "15.7px";
    // Making the keys function
    item.addEventListener("click", (e) => {
        // Populating the screen
        /*screen.textContent = screen.textContent + e.target.textContent;
        operation = screen.textContent;*/
        container.textContent = container.textContent + e.target.textContent;

        // Handling the overflow 
        if (parseFloat(getComputedStyle(container).width.replace("px", "")) >= 75) {
            container.textContent = container.textContent.slice(0, container.textContent.length - 1) + "\n";
            // Expanding the screen and the base
            expand16(base);
            expand16(screen);
            expand16(container);
            container.textContent = container.textContent + e.target.textContent;
        }
    });
});

// 4 basic operation 
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function mutiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// Expanding height by 16px function
function expand16(div) {
    div.style.height = parseInt(getComputedStyle(div).height.replace("px", "")) + 16 + "px";
}
