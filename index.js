const form = document.querySelector("form");
const email = document.querySelector("#email");
const country = document.querySelector("#country");
const zip = document.querySelector("#zip");
const password = document.querySelector("#password");
const confPassword = document.querySelector("#conf-password");

const error = {
    email: email.nextElementSibling,
  country: country.nextElementSibling,
  zip: zip.nextElementSibling,
  password: password.nextElementSibling,
  confPassword: confPassword.nextElementSibling,
};

const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const nameRegExp = /^[a-zA-Z\s]*$/;
const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

function validateInput(input, regex) {
  const isValid = input.value.length === 0 || regex.test(input.value);
  input.className = isValid ? "valid" : "invalid";
  return isValid;
}

function resetErrorField(field){
    field.textContent = "";
    field.classList = "error";
}

window.addEventListener("load", () => {
  validateInput(email, emailRegExp);
  validateInput(country, nameRegExp);
  validateInput(password, passwordRegExp);
});

email.addEventListener("input", () => {
  validateInput(email, emailRegExp);
  resetErrorField(error.email);
});

country.addEventListener("input", () => {
  validateInput(country, nameRegExp);
  resetErrorField(error.country);
});

zip.addEventListener("input", () => {
  validateInput(zip, nameRegExp);
  resetErrorField(error.zip);
});

password.addEventListener("input", () => {
  validateInput(password, passwordRegExp);
  resetErrorField(error.password);
});

confPassword.addEventListener("input", () => {
  validateInput(confPassword, passwordRegExp);
  resetErrorField(error.confPassword);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

  const isValidEmail = validateInput(email, emailRegExp);
  const isValidZip = validateInput(zip, nameRegExp);
  const isValidCountry = validateInput(country, nameRegExp);
  const isValidPassword = validateInput(password, passwordRegExp);
  const isValidConfPassword = validateInput(confPassword, passwordRegExp);

  if (!isValidEmail) {
    error.email.textContent = "Please enter a valid email address";
    error.email.classList = "error active";
  }

  if (!isValidCountry) {
    error.country.textContent = "Please enter a valid country name";
    error.country.classList = "error active";
  }

  if (!isValidZip) {
    error.zip.textContent = "Please enter a valid ZIP Code";
    error.zip.classList = "error active";
  }
  if (!isValidPassword) {
    error.password.textContent =
      "Password must be 6-20 characters long, contain at least one digit, one uppercase letter, and one lowercase letter.";
    error.password.classList = "error active";  
  }

  if(!isValidConfPassword && password.value != confPassword.value){
    error.confPassword.textContent = "Passwords don't match";
    error.confPassword.classList = "error active";
  }
});
