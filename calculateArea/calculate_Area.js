let length;
let width;

function calculateArea(){
    length = parseFloat(document.getElementById("length").value);
    width = parseFloat(document.getElementById("width").value);

    let area = length * width;

    document.getElementById("result").innerText = `The area of the rectangle is: ${area}`;
}

function groceryTracker(){
    let groceryTotal = parseFloat(document.getElementById("grocery1").value);
    groceryTotal += parseFloat(document.getElementById("grocery2").value);
    groceryTotal += parseFloat(document.getElementById("grocery3").value);

    document.getElementById("groceryResult").innerText = `The total amount is: ${groceryTotal}`;
}