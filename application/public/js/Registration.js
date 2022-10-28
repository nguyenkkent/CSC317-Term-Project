const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

form.addEventListener("submit", e => {
     e.preventDefault();
     validateInputs();
});

const setError = (element, message) => {
    const formControl = element.parentElement;
    const errorDisplay = formControl.querySelector(".error");
    errorDisplay.innerText = message;
    formControl.classList.add("error");
    formControl.classList.remove("success");
};

const setSuccess = (element) => {
    const formControl = element.parentElement;
    const errorDisplay = formControl.querySelector(".error");
    errorDisplay.innerText = "";
    formControl.classList.add("success");
    formControl.classList.remove("error");
}; 

const isValidPassword = (password1, password2) => {
    hasUpper = false;
    hasLower = false;
    hasSpecial = false;
    hasPasswordMatch = true;
    
    if (password1 != password2){
        return false;
    }
    //Assertion: passwords match
    for (let i in password1){
        if (password1[i] === password1[i].toUpperCase() && isNaN(password1[i]) ){
            hasUpper = true;
        }
        if (password1[i] === password1[i].toLowerCase() && isNaN(password1[i]) ){
            hasLower= true;
        }
        if ( (password1[i]=="/") || (password1[i]=="*") || (password1[i]=="-") ||(password1[i]=="+") ||
             (password1[i]=="!") || (password1[i]=="@") || (password1[i]=="#") || (password1[i]=="&") ||
             (password1[i]=="^") || (password1[i]=="&") || (password1[i]=="~") || (password1[i]=="[") || (password1[i]=="]")){
            hasSpecial  = true;
        }
    }
    return (hasUpper && hasLower && hasSpecial && hasPasswordMatch);
}

const isValidEmail = (emailStr) => {
    if (emailStr.length === 0 || isNaN(emailStr[0]) ){
        setError(email, "Must contain atleast 1 character")
    }
    for (let i in emailStr){
        if (/@/.test(emailStr)){
            return true;
        }
    }
    setError(email,"Must contain '@' symbol" )
    return false;
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if (usernameValue === ""){
        setError(username, "Username cannot be blank");
    }
    else if(usernameValue.length <3 ){
        setError(username, "Username requires 3 or more characters");
    }
    else{ //has more than 3 char
        {
            if (!(/^[a-zA-Z]+$/.test(usernameValue))){ //first char not a letter
                setError(username, "First character must be a letter");
            }
            else{
                setSuccess(username);
            }
        }      
    }

    if (isValidEmail(emailValue)) {
        setSuccess(email);
    }

    if (passwordValue.length < 8 || password2Value.length < 8){
        setError(password, "Password must be at least 8 characters")
    }

    if (isValidPassword(passwordValue, password2Value)){
        setSuccess(password);
        setSuccess(password2);
    }
    else{
        setError(password, "Password must contain at least 1 upper case letter, 1 lower case letter, and 1 special character");
    }
    
    if (isValidEmail(emailValue) && isValidPassword(passwordValue, password2Value)){
        location.reload();
    }

};