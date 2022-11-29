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

const isValidUsername = (usernameStr) => {
    if (usernameStr.length < 1){
        setError(username, "Username cannot be blank");
        return false;
    }
    else if(usernameStr.length <3 ){
        setError(username, "Username requires 3 or more characters");
        return false;
    }
    else{ //has more than 3 char
        {
            if (!(/^[a-zA-Z]+$/.test(usernameStr))){ //first char not a letter
                setError(username, "First character must be a letter");
                return false;
            }
            else{
                setSuccess(username);
                return true;
            }
        }      
    }

};

const isValidPassword = (pass1, pass2) => {
    hasUpper = false;
    hasLower = false;
    hasSpecial = false;
    hasPasswordMatch = true;

    if ((pass1.length < 8 || pass2.length < 8) ||  (pass1 != pass2)){
        setError(password, "Password must be at least 8 characters and match")
        setError(password2, "Password must be at least 8 characters and match")
        return false;
     
    }

    //Assertion: passwords match, hasPasswordMatch = true;
    for (let i in pass1){//sets boolean for hasUpper, hasLower, hasSpecial
        if (pass1[i] === pass1[i].toUpperCase() && isNaN(pass1[i]) ){
                hasUpper = true;
        }
        if (pass1[i] === pass1[i].toLowerCase() && isNaN(pass1[i]) ){
            hasLower= true;
        }
        if ((pass1[i]=="/") || (pass1[i]=="*") || (pass1[i]=="-") ||(pass1[i]=="+") ||
            (pass1[i]=="!") || (pass1[i]=="@") || (pass1[i]=="#") || (pass1[i]=="&") ||
            (pass1[i]=="^") || (pass1[i]=="&") || (pass1[i]=="~") || (pass1[i]=="[") || (pass1[i]=="]")){
            hasSpecial  = true;
            }
    }
    if ( (!hasUpper) && (!hasLower) && (!hasSpecial)  ){
        setError(password, "Password needs 1 upper case letter, 1 lower case letter, and 1 special character");
        setError(password2, "Password needs 1 upper case letter, 1 lower case letter, and 1 special character");
        return false;
    }

    //Assertion, above is true
    setSuccess(password);
    setSuccess(password2);
    return (hasUpper && hasLower && hasSpecial && hasPasswordMatch);            
   
    }


const isValidEmail = (emailStr) => {
    if (emailStr.length ===  0){
        setError(email, "Must contain atleast 1 character")
        return false;
    }
    for (let i in emailStr){
        if (/@/.test(emailStr)){
            setSuccess(email)
            return true;
        }
    }
    setError(email,"Must contain '@' symbol" )
    return false;
};

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
  
    if (isValidUsername(usernameValue) && isValidEmail(emailValue) && isValidPassword(passwordValue, password2Value)){
        location.reload();
    }
};