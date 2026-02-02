let testText = "The quick brown fox jumps over the lazy dog.";
let startTime, endTime;

const userInput = document.getElementById("userInput");

//not required by the lab but clicking buttons manually skews the test timing
//besides the lab keeps using onclick in the HTML and I'd rather use event listeners, wanted some practice
userInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        if (userInput.value === ""){ //nothing input yet, start test
            event.preventDefault(); //shouldn't need this, field should be read only when test is not running
            startTest();
        }
        else{ //text input, end test
            event.preventDefault(); //prevent newline
            endTest();
        }
    }
});

//set the text text, reset user input and output variables, and start the timer(record current time)
function startTest() {
    document.getElementById("inputText").value = testText;

    //declared this as constant outside function
    //let userInput = document.getElementById("userInput");
    userInput.value = "";
    userInput.readOnly = false;
    userInput.focus();

    document.getElementById("output").innerHTML = "";

    startTime = new Date().getTime();
}

//this still has some problems, specifically no text accuracy validation
//you can get a high score just by pressing enter, typing one character, and pressing enter, which is not intended vehavior
function endTest() {
    endTime = new Date().getTime();

    //disable user input
    document.getElementById("userInput").readOnly = true;

    //calculate time elapsed and words per minute in seconds
    const timeElapsed = (endTime - startTime) / 1000;
    const userTypedText = document.getElementById("userInput").value;

    //split the text using regex, using space, newline, and tab as the delimiters, then count non-empty strings
    const typedWords = userTypedText.split(/\s+/).filter(function (word) {
        return word !== "";
    }).length;

    let wpm = 0; //default value

    //if test lasted longer than one second (edge case)
    if (timeElapsed > 0) {
        wpm = Math.round((typedWords / timeElapsed) * 60); //round to the nearest minute
    }
    else{
        //do nothing, test took longer than one second
        alert("Test must take longer than one second to be valid, please try again.");
        return; //break out of this function
    }

    //if you got to this point WPM is valid (i.e. nonzero time, zero words is valid), display results
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "<h2>Typing Test Results:</h2>" +
        "<p>Total Length: " + userTypedText.length + "</p>" +
        "<p>Words Typed: " + typedWords + "</p>" +
        "<p>Time Elapsed: " + timeElapsed.toFixed(2) + " seconds</p>" +
        "<p>Words Per Minute (WPM): " + wpm + "</p>";
}