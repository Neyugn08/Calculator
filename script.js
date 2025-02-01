// Setting up the screen
const screen = document.querySelector(".screen");
let scrOriH = getComputedStyle(screen).height;
const container = document.querySelector(".container");
container.textContent = "0";
const base = document.querySelector(".base");
let bsOriH = getComputedStyle(base).height;
let operation;
let counterSym = 0;

// Setting up the keys
const keys = document.querySelector(".keys");
const operator = keys.children;
Array.from(operator).forEach(item => {
    // Modifying the size of the keys
    item.style.width = 75/4 + "px";
    item.style.height = "15.7px";
    // Making the keys function
    item.addEventListener("click", (e) => {
        // Checking for invalid usage 
        if (Number.isNaN(parseFloat(e.target.textContent))) {
            if (container.textContent === " ") return;
            else {
                counterSym++;
            }
            if (counterSym == 2) {
                counterSym = 1;
                return;
            }
        }
        else {
            counterSym = 0;
        }

        // Populating the screen
        container.textContent = container.textContent + e.target.textContent;
        operation = container.textContent;

        // Handling the overflow 
        if (parseFloat(getComputedStyle(container).width.replace("px", "")) >= 75) {
            container.textContent = container.textContent.slice(0, container.textContent.length - 1) + "\n";
            // Expanding the screen and the base
            expand16(base);
            expand16(screen);
            expand16(container);
            container.textContent = container.textContent + e.target.textContent;
        }

        // Handling the operation 
        if (e.target.textContent == "=") {
            calculating();
        }
    });
});

// Adding delete feature 
const dlt = document.querySelector(".delete");
const clr = document.querySelector(".clear")
dlt.addEventListener("click", del);
clr.addEventListener("click", cle);


// 4 basic operation 
function add(a, b) {
    if (parseInt(a + b) == a + b) return parseInt(a + b);
    return (a + b).toFixed(4);
}

function subtract(a, b) {
    if (parseInt(a - b) == a - b) return parseInt(a - b);
    return (a - b).toFixed(4);
}

function mutiply(a, b) {
    if (parseInt(a * b) == a * b) return parseInt(a * b);
    return (a * b).toFixed(4);
}

function divide(a, b) {
    if (parseInt(a / b) == a / b) return parseInt(a / b);
    return (a / b).toFixed(4);
}

// Expanding height by 16px function
function expand16(div) {
    div.style.height = parseFloat(getComputedStyle(div).height.replace("px", "")) + 16 + "px";
}

let counterBug = 0;

function calculating() {
    // Handling negative cases
    let dau = 1;
    if (negav()) {
        dau = -1;
    }
    console.log(`operation in the first negav: ${operation}`);

    // Filtering the operation
    operation = operation.replace(/\n/g, "");
    if (operation[0] === " " && operation.length != 0) {
        // Filtering out the equal sign at the end
        operation = operation.slice(1, operation.length - 1);
        counterSym = 1;
    }
    else {
        counterSym = 1;
        operation = operation.slice(0, operation.length - 1);
    }

    // Checking for invalid usage
    if (`${parseFloat(operation).toFixed(4)}` == operation || `${parseFloat(operation)}` == operation) {
        container.textContent = container.textContent.slice(0, container.textContent.length - 1);
        counterSym--;
        return;
    }

    while (`${parseFloat(operation).toFixed(4)}` != operation && `${parseFloat(operation)}` != operation) {
        // Handling negative cases 
        if (negav()) {
            dau = -1;
        }
        else {
            console.log(operation);
        }
        // Handling the operation
        let var1, var2, var3;
        loop: for (i = 0; i < operation.length; i++) {
            if (!isNumber(parseFloat(operation[i])) && !isDot(operation[i])) {
                console.log(`The index is ${i}`);
                console.log(`operation at this stage is: ${operation}`);
                console.log(`Operation[0] is: ${operation[0]}`);
                console.log(`Dau is: ${dau}`);
                var1 = parseFloat(operation.slice(0, i));
                var2 = operation[i];
                counterSym--;
                for (j = i + 1; j < operation.length; j++) {
                    if (!isNumber(parseFloat(operation[j])) && !isDot(operation[j])) {
                        var3 = parseFloat(operation.slice(i + 1, j));
                        operation = operation.slice(j, operation.length);
                        break loop;
                    }
                    else if (j == operation.length - 1) {
                        var3 = parseFloat(operation.slice(i + 1, j + 1));
                        operation = "";
                        break loop;
                    }
                }
            }
        }
        // Handling separate case
        let ans;
        if (var2 == "+") ans = add(var1, var3);
        else if (var2 == "-") ans = subtract(var1, var3);
        else if (var2 == "×") ans = mutiply(var1, var3);
        else if (var2 == "/" ) ans = divide(var1, var3);
        // Handling errors 
        ans *= dau;
        console.log(`ans is: ${ans}`);
        if (Number.isNaN(ans)) {
            console.log(`ans: ${ans}`);
            console.log(`var1: ${var1}`);
            console.log(`var2: ${var2}`);
            console.log(`var3: ${var3}`);
        }
        console.log(`operation in calculating is before adding ans: ${operation}`)
        operation = ans + operation;
        console.log(`operation in calculating is after adding ans: ${operation}`)
        counterBug++;
        if (counterBug == 3) break;
    }
    container.textContent = operation;
}

function isNumber(value) {
    return !isNaN(value) && value !== "";
}

function isDot(char) {
    return char == ".";
}

// Delete function
function del() {
    let string = container.textContent;
    if (Number.isNaN(parseFloat(string[string.length - 1]))) {
        counterSym--;
        container.textContent = container.textContent.slice(0, container.textContent.length - 1);
        operation = container.textContent;
    }
    else {
        container.textContent = container.textContent.slice(0, container.textContent.length - 1);
        operation = container.textContent;
    }
}

// Clear function 
function cle() {
    operation = "";
    container.textContent = "";
    counterSym = 0;
    container.style.height = scrOriH;
    screen.style.height = scrOriH;
    base.style.height = bsOriH;
}

// Handling negative cases function 
function negav() {
    if (operation[0] === "-") {
        operation = operation.slice(1);
        let i1 = 0;
        let i2 = 0;
        for (i = 0; i < operation.length; i++) {
            if (operation[i] === "+") {
                i1 = i;
                break;
            }
        }
        for (i = 0; i < operation.length; i++) {
            if (operation[i] === "-") {
                i2 = i;
                break;
            }
        }
        if (i1 < i2 && i1 != 0) {
            operation = operation.replace("+", "-");
        }
        else if (i2 < i1 && i2 != 0) {
            operation = operation.replace("-", "+");
        }
        else if (i1 == 0 && i2 != 0) {
            operation = operation.replace("-", "+");
        }
        else if (i2 == 0 && i1 != 0) {
            operation = operation.replace("+", "-");
        }
        console.log(`operation in negav() in true case is: ${operation}`);
        return true;
    }
    else {
        console.log(`operation in negav() in false case is: ${operation}`); 
        return false;
    }
};