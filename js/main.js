// LIVE DATE AND TIME

const clockElement = document.getElementById("clock");  //const creates a variable called clockElement, document gets the live model fot the page
// and javascript reads and changes the page, getElementById searches the page with the id 'clock', thats why id must have a unique name

function updateClock(){     /* a function is a reusable bundle of instructions with a name, writing it doesnt run it only when we call it,
    we need it because we will be running the same steps every secong */
    if(!clockElement) return;   /* the '!' symbol means not it is a safe guard for if clockElement did not find an id, the page would not 
    crash nor cause an error, and just stops there */
    const now = new Date();     /*creates a date object that takes a snapshot of the date and time from the visitor's device, so no time zone
    is needed. Every call to updateClock takes a snapshot of the time*/
    const dateText = now.toLocaleDateString("en-GB", {  /*turns the snapshot to a readable text, en-GB is british english that is
        16 october, 2026. Can be changed to en-US which would give october 16, 2026.*/
        day: "numeric",     /*these three lines are options object, a list of name:value sttings, day: numeric means no leading zeros, 
        9 october not 09 october, month: long means the full month name and year: numeric  means the full year in numerical value*/
        month: "long",
        year: "numeric",
    });  
    const timeText = now.toLocaleTimeString("en-GB", {  /*does the same as discussed above for time*/
        hour: "2-digit",    // 2 digit makes the numbers like 09 and not 9, opposite of the day setting
        minute: "2-digit",
        second: "2-digit",
        hour12: false,  // uses the 24 hour time, to set it to 12 hour time change the value to true
    });
    clockElement.textContent = dateText + ", " + timeText;  /*textContent is the text inside an element its job is to join all these values
    together, it used instead of innerHTML because it treats it like an html code which is risky and unnecessary */
}
updateClock();  // calls the function immediately and creates no delay
setInterval(updateClock, 1000);     //tells the browser to call updateClock every 1000 milliseconds, without this it would only update once 

//THEME SWITCHER

const themeButton = document.getElementById("theme-toggle");

function applyTheme(theme){     //takes theme name as an imput(a parameter), so one function serves both
    document.documentElement.setAttribute("data-theme", theme);     /*document.documentElement is <html> itself, the one that carries the data theme
    document.body would be <body>, setAttribute adds or changes an attribute of an element*/
    if(themeButton){    //same pattern as above, a safeguard to not let the website crash
        const nextTheme = theme === "dark" ? "light" : "dark";      /*this is ternary operator, a compact if/else statement. If theme is dark
        use light or else use dark, '===' means 'is exactly equal to' '=' just assigns value */
        themeButton.textContent = theme === "dark" ? "Dark" : "Light";  //sets a viable label, the css already converts 'Light' to Light
        themeButton.setAttribute(
            "aria-label",       /*gives screen readers a clear description of the nutton's function*/
            "Theme: " + theme + ".Switch to" + nextTheme + "mode."
        );
    }
}

function getSavedTheme() {
    try{    /*means atempt this and if it fails run the catch part instead of crashing */
        return localStorage.getItem("theme");   /* localStorage stores the text under a name, setItem saves it, getItem reads it back or 
        null if nothing was saved, it only stores text and each website address has a localStorage */
    }   catch (error) {
        return null;
    }
}
function saveTheme(theme) {
    try{
        return localStorage.setItem("theme", theme);
    }   catch (error){}
}

applyTheme (getSavedTheme () === "dark" ? "dark" : "light" );   /* runs once when the page loads, it uses the saved theme */
if (themeButton) {
    themeButton.addEventListener("click", function () {     /* addEventListener tells the browser that when this button is clicked, run this function*/
        const current = document.documentElement.getAttribute("data-theme");    /* browser reads the current theme, works out the opposite
        , applies it and saves it */
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        saveTheme(next);
    });
}
//NAVIGATION PANEL

const menuButton = document.getElementById("menu-button");
const closeButton = document.getElementById("menu-close");
const navPanel = document.getElementById("nav-panel");
const navBackdrop = document.getElementById("nav-backdrop");
function openMenu() {
    navPanel.classList.add("is-open");
    navBackdrop.classList.add("is-open");
    menuButton.setAttribute("aria-expanded", "true");
    closeButton.focus();
}
function closeMenu() {
    navPanel.classList.remove("is-open");
    navBackdrop.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.focus();
}
console.log(menuButton, closeButton, navPanel, navBackdrop);
if(menuButton && closeButton && navPanel && navBackdrop) {
    menuButton.addEventListener("click", openMenu);
    closeButton.addEventListener("click", closeMenu);
    navBackdrop.addEventListener("click", closeMenu);

    document.addEventListener("keydown", function (event) {
        if(event.key === "Escape" && navPanel.classList.contains("is-open")) {
            closeMenu();
        }   
    });
}
//MARK THE CURRENT PAGE

const currentFile = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-lisy a").forEach(function (link) {
    if(link.getAttribute("href") === currentFile) {
        link.setAttribute("aria-current", "page");
    }
});