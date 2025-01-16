function registered(){
//vards
    if (!document.getElementById("vards").value) {
        document.getElementById("vardserror").innerHTML = "Vārds nav ievadīts!"
        document.getElementById("vards").style.borderColor = 'red';
        document.getElementById("vardsyes").style.display = 'none';
        document.getElementById("vardsno").style.display = 'unset';
    }
    else {
        document.getElementById("vardserror").innerHTML = null;
        document.getElementById("vards").style.borderColor = 'lightgreen';
        document.getElementById("vardsno").style.display = 'none';
        document.getElementById("vardsyes").style.display = 'unset';
    }
// epasts
    if (!document.getElementById("epasts").value) {
        document.getElementById("epastserror").innerHTML = "E-pasts nav ievadīts!"
        document.getElementById("epasts").style.borderColor = 'red';
        document.getElementById("epastsyes").style.display = 'none';
        document.getElementById("epastsno").style.display = 'unset';
    }
    else if (!isEmail(document.getElementById("epasts").value)) {
        document.getElementById("epastserror").innerHTML = "E-pasts nav korekts!"
        document.getElementById("epasts").style.borderColor = 'red';
        document.getElementById("epastsyes").style.display = 'none';
        document.getElementById("epastsno").style.display = 'unset';
    }
    else {
        document.getElementById("epastserror").innerHTML = null
        document.getElementById("epasts").style.borderColor = 'lightgreen';
        document.getElementById("epastsno").style.display = 'none';
        document.getElementById("epastsyes").style.display = 'unset';
    }
// parole
    let parbaude = /^(?=.*\d).{6,}$/;
    if (!document.getElementById("parole").value) {
        document.getElementById("paroleerror").innerHTML = "Parole nav ievadīta!"
        document.getElementById("parole").style.borderColor = 'red';
        document.getElementById("paroleyes").style.display = 'none';
        document.getElementById("paroleno").style.display = 'unset';
    }
    else if (!parbaude.test(document.getElementById("parole").value)) {
        document.getElementById("paroleerror").innerHTML = "Parolei jābūt 6+ simbolu garai un ar 1+ ciparu!"
        document.getElementById("parole").style.borderColor = 'red';
        document.getElementById("paroleyes").style.display = 'none';
        document.getElementById("paroleno").style.display = 'unset';
    }
    else {
        document.getElementById("paroleerror").innerHTML = null
        document.getElementById("parole").style.borderColor = 'lightgreen';
        document.getElementById("paroleno").style.display = 'none';
        document.getElementById("paroleyes").style.display = 'unset';
    }
// atkartota parole
    if (!document.getElementById("aparole").value) {
        document.getElementById("aparoleerror").innerHTML = "Aizpildiet lauku!"
        document.getElementById("aparole").style.borderColor = 'red';
        document.getElementById("aparoleyes").style.display = 'none';
        document.getElementById("aparoleno").style.display = 'unset';
    }
    else if (document.getElementById("aparole").value != document.getElementById("parole").value) {
        document.getElementById("aparoleerror").innerHTML = "Paroles nesakrīt!"
        document.getElementById("aparole").style.borderColor = 'red';
        document.getElementById("aparoleyes").style.display = 'none';
        document.getElementById("aparoleno").style.display = 'unset';
    }
    else {
        document.getElementById("aparoleerror").innerHTML = null
        document.getElementById("aparole").style.borderColor = 'lightgreen';
        document.getElementById("aparoleno").style.display = 'none';
        document.getElementById("aparoleyes").style.display = 'unset';
    }
// dzimums
    if (!document.getElementById("male").checked && !document.getElementById("female").checked) {
        document.getElementById("gender").innerHTML = "Bez gendera?"
    }
    else {
        document.getElementById("gender").innerHTML = null
    }
// valsts
    if (document.getElementById("country").value == "null") {
        document.getElementById("valsts").innerHTML = "Izvēlieties valsti!"
        document.getElementById("country").style.borderColor = 'red';
    }
    else {
        document.getElementById("valsts").innerHTML = null
        document.getElementById("country").style.borderColor = 'lightgreen';
    }
// noteikumi
    if (!document.getElementById("noteikumi").checked) {
        document.getElementById("japiekrit").innerHTML = "Jums vajag piekrist!"
        document.getElementById("noteikumi").style.Color = 'red';
    }
    else {
        document.getElementById("japiekrit").innerHTML = null
    }
// ja viss labi
    let labi = false
    if (document.getElementById("vards").value && isEmail(document.getElementById("epasts").value) && parbaude.test(document.getElementById("parole").value) && document.getElementById("aparole").value == document.getElementById("parole").value && document.getElementById("country").value != "null" && document.getElementById("noteikumi").checked && document.getElementById("male").checked) {
        labi = true
    }
    else  if (document.getElementById("vards").value && isEmail(document.getElementById("epasts").value) && parbaude.test(document.getElementById("parole").value) && document.getElementById("aparole").value == document.getElementById("parole").value && document.getElementById("country").value != "null" && document.getElementById("noteikumi").checked && document.getElementById("female").checked){
        labi = true
    }
    if (labi){
        document.getElementById("beigas").style.justifyContent = "center"
        document.getElementById("success").innerHTML = "Reģistrācija veiksmīga!"
        document.getElementById("success").style.color = 'lightgreen'
    }
    else {
        document.getElementById("beigas").style.justifyContent = "space-between"
        document.getElementById("success").innerHTML = null
    }
    
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
