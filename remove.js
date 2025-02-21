// Adding delete feature 
const dlt = document.querySelector(".delete");
const clr = document.querySelector(".clear")
dlt.addEventListener("click", del);
clr.addEventListener("click", cle);

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
}