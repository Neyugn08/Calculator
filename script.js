// Modifying the size of the keys 
let keys = document.querySelector(".keys");
let operator = keys.children;
Array.from(operator).forEach(item => {
    item.style.width = 75/4 + "px";
    item.style.height = "15.7px";
});
