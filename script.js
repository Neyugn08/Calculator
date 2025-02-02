// Setting up the screen
const screen = document.querySelector(".screen");
const container = document.querySelector(".container");
container.textContent = "0";
const base = document.querySelector(".base");
let operation;
let counterSym = 0;

// 4 basic operation 
let a = function add(a, b) {
    if (parseInt(a + b) == a + b) return parseInt(a + b);
    return (a + b).toFixed(4);
};

let s = function subtract(a, b) {
    if (parseInt(a - b) == a - b) return parseInt(a - b);
    return (a - b).toFixed(4);
};

let m = function mutiply(a, b) {
    if (parseInt(a * b) == a * b) return parseInt(a * b);
    return (a * b).toFixed(4);
};

let d = function divide(a, b) {
    if (parseInt(a / b) == a / b) return parseInt(a / b);
    if (b == 0) return "Error";
    return (a / b).toFixed(4);
};

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
            counterSym++;
            if (counterSym == 2) {
                counterSym = 1;
                return;
            }
        }
        else {
            counterSym = 0;
            if (container.textContent == "0") container.textContent = "";
        }

        // Populating the screen
        container.textContent = container.textContent + e.target.textContent;
        operation = container.textContent;

        // Handling the operation 
        if (e.target.textContent == "=") {
            // Filtering the operation
            counterSym = 0;
            if (operation[0] === " " && operation.length != 0) {
                // Filtering out the equal sign at the end
                operation = operation.slice(1, operation.length - 1);
            }
            else {
                operation = operation.slice(0, operation.length - 1);
            }
            preProcessingOperation();
            processingOperation();
            if (operation != "") container.textContent = operation;
        }
    });
});

// Adding delete feature 
const dlt = document.querySelector(".delete");
const clr = document.querySelector(".clear")
dlt.addEventListener("click", del);
clr.addEventListener("click", cle);

// Preprocessing mutiply and divide function
function preProcessingOperation() {
    // Checking for invalid usage
    if (isNumber(operation)) {
        return;
    }
    while (operation.includes("/") || operation.includes("×")) {
        let i1 = operation.indexOf("×");
        let i2 = operation.indexOf("/");
        let index;
        let string = "";
        let left; 
        let right;
        if (i1 > 0 && i2 > 0) {
            index = Math.min(i1, i2);
        } 
        else if (i1 * i2 < 0) {
            index = Math.max(i1, i2);
        }
        else return;

        for (i = index - 1; i >= 0; i--) {
            if (!isNumber(parseFloat(operation[i])) && !isDot(operation[i])) {
                string += operation.slice(i + 1, index + 1);
                left = i + 1;
                break;
            }
            else if (i == 0) {
                string += operation.slice(0, index + 1);
                left = 0;
            }
        }
        for (i = index + 1; i < operation.length; i++) {
            if (!isNumber(parseFloat(operation[i])) && !isDot(operation[i])) {
                string += operation.slice(index + 1, i);
                right = i;
                break;
            }
            else if (i == operation.length - 1) {
                string += operation.slice(index + 1, i + 1);
                right = i + 1;
            }
        }
        let tmp = calculating(string, m, d);
        if (tmp == "0") {
            cle();
            return;
        }
        if (right >= operation.length) {
            operation = operation.slice(0, left) + tmp;
        }
        else operation = operation.slice(0, left) + tmp + operation.slice(right, operation.length);
    }
}

function processingOperation() {
     // Checking for invalid usage
     if (isNumber(operation)) {
        if (counterSym > 0) counterSym = 0;
        return;
    }
    let tmp = calculating(operation, a, s);
    if (tmp == "0") {
        cle();
        return;
    }
    operation = tmp;
}

let cntBug = 0;

function calculating(operation, ope1, ope2) {
    // Checking for invalid usage
    if (isNumber(operation)) {
        //container.textContent = container.textContent.slice(0, container.textContent.length - 1);
        if (counterSym > 0) counterSym--;
        return operation;
    }
    // Handling negative cases
    let dau = 1;
    if (negav(operation)) {
        dau = -1;
        operation = negav(operation);
    }
    while (!isNumber(operation)) {
        // Handling negative cases 
        if (negav(operation)) {
            dau = -1;
            operation = negav(operation);
        }
        // Handling the operation
        let var1 = 0;
        let var2 = 0;
        let var3 = 0;
        loop: for (i = 0; i < operation.length; i++) {
            if (!isNumber(parseFloat(operation[i])) && !isDot(operation[i])) {
                var1 = parseFloat(operation.slice(0, i));
                var2 = operation[i];
                if (counterSym > 0) counterSym--;
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
        let ans = "iniVal";
        if (var2 == "+") ans = ope1(var1, var3);
        else if (var2 == "-") ans = ope2(var1, var3);
        else if (var2 == "×") ans = ope1(var1, var3);
        else if (var2 == "/" ) ans = ope2(var1, var3);
        if (ans == "Error") {
            return "0";
        }
        // Handling errors 
        if (ans != "iniVal" && isNumber(ans)) {
            ans *= dau;
            operation = ans + operation;
        }
        else {
            if (dau < 0) operation = "-" + operation;
        }
        cntBug++;
        if (cntBug == 30) {
            cntBug = 0;
            return "0";
        }
    }
    cntBug = 0;
    return operation;
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
    if (string.length == 1) {
        cle();
        return;
    } 
    if (string.length == 2 && !isNumber(parseFloat(operation[0]))) {
        cle();
        return;
    }
    if (Number.isNaN(parseFloat(string[string.length - 1]))) {
        if (counterSym > 0) counterSym--;
        container.textContent = string.slice(0, string.length - 1);
        operation = container.textContent;
    }
    else {
        container.textContent = string.slice(0, string.length - 1);
        operation = container.textContent;
    }
}

// Clear function 
function cle() {
    operation = "";
    container.textContent = "0";
    counterSym = 0;
}

// Handling negative cases function 
function negav(operation) {
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
        if (i1 < i2 && i1 != 0) operation = operation.replace("+", "-");
        else if (i2 < i1 && i2 != 0) operation = operation.replace("-", "+");
        else if (i1 == 0 && i2 != 0) operation = operation.replace("-", "+");
        else if (i2 == 0 && i1 != 0) operation = operation.replace("+", "-");
        return operation;
    }
    else return false;
};
