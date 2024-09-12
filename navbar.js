document.getElementById("hamburger-icon").onclick = function() {
    var navbar = document.getElementById("myNavbar");
    if (navbar.className === "navbar") {
        navbar.className += " responsive"; // Add responsive class
    } else {
        navbar.className = "navbar"; // Remove responsive class
    }
};