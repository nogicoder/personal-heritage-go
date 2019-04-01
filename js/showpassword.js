function show() {
    var x = document.getElementById("form-group__password");
    y = document.getElementById("form-group__lock");
    if (x.type === "password") {
        x.type = "text";
        y.className = "fas fa-lock-open";
    } else {
        x.type = "password";
        y.className = "fas fa-lock";
    }
}