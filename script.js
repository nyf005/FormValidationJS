// Get the fom elements
const form = document.getElementById("form");

const email = document.getElementById("email");
const country = document.getElementById("country");
const zipCode = document.getElementById("zip-code");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const passwordCriterias = document.querySelectorAll(".form-element li");

const result = document.getElementById("result");

function setError(input, message) {
  const feedback = input.parentElement.querySelector(".feedback");
  feedback.textContent = "";
  feedback.textContent = message;
}

function removeFeedback(input) {
  const feedback = input.parentElement.querySelector(".feedback");
  feedback.textContent = "";
}

function testPasswordOnInput(input) {
  if (!/(?=.*\d)/.test(input.value)) {
    passwordCriterias[0].classList.remove("correct");
  } else {
    passwordCriterias[0].classList.add("correct");
  }

  if (!/(?=.*[a-z])/.test(input.value)) {
    passwordCriterias[1].classList.remove("correct");
  } else {
    passwordCriterias[1].classList.add("correct");
  }

  if (!/(?=.*[A-Z])/.test(input.value)) {
    passwordCriterias[2].classList.remove("correct");
  } else {
    passwordCriterias[2].classList.add("correct");
  }

  if (!/(?=.*[\W])/.test(input.value)) {
    passwordCriterias[3].classList.remove("correct");
  } else {
    passwordCriterias[3].classList.add("correct");
  }

  if (!/.{8,}/.test(input.value)) {
    passwordCriterias[4].classList.remove("correct");
  } else {
    passwordCriterias[4].classList.add("correct");
  }
}

function testInput(input) {
  input.setCustomValidity("");
  switch (input.id) {
    case "email":
      if (input.validity.typeMismatch) {
        input.setCustomValidity("Enter a valid email address");
        setError(input, "Please enter a valid email address");
      }
      if (input.validity.valueMissing) {
        input.setCustomValidity("The email is required");
        setError(input, "* required");
      }
      break;

    case "country":
      if (input.validity.valueMissing) {
        input.setCustomValidity("The country is required");
        setError(input, "* required");
      }
      break;

    case "zip-code":
      if (input.validity.valueMissing) {
        input.setCustomValidity("The Zip Code is required");
        setError(input, "* required");
      }

      if (input.validity.patternMismatch) {
        input.setCustomValidity("The Zip Code is not valid");
        setError(input, "Should be at least 5 digits long");
      }
      break;

    case "password":
      if (!/(?=.*\d)/.test(input.value)) {
        input.setCustomValidity("Your password is not secure enough");
        setError(input, "Should contain at least one digit");
      }

      if (!/(?=.*[a-z])/.test(input.value)) {
        input.setCustomValidity("Your password is not secure enough");
        setError(input, "Should contain at least one lower case");
      }

      if (!/(?=.*[A-Z])/.test(input.value)) {
        input.setCustomValidity("Your password is not secure enough");
        setError(input, "Should contain least one upper case");
      }

      if (!/(?=.*[\W])/.test(input.value)) {
        input.setCustomValidity("Your password is not secure enough");
        setError(input, "Should contain least one special character");
      }

      if (!/.{8,}/.test(input.value)) {
        input.setCustomValidity("Your password is not secure enough");
        setError(input, "Should be at least 8 characters long");
      }

      if (input.validity.valueMissing) {
        input.setCustomValidity("The password is required");
        setError(input, "* required");
      }
      break;

    case "confirm-password":
      if (input.value !== password.value) {
        input.setCustomValidity("Passwords do not match");
        setError(input, "Passwords do not match");
      }
      break;

    default:
      break;
  }

  if (input.validity.valid) {
    removeFeedback(input);
  }

  input.reportValidity();
}

email.addEventListener("change", (e) => testInput(e.target));
country.addEventListener("change", (e) => testInput(country));
zipCode.addEventListener("change", (e) => testInput(e.target));
password.addEventListener("input", (e) => testPasswordOnInput(e.target));
password.addEventListener("change", (e) => testInput(e.target));
confirmPassword.addEventListener("change", (e) => testInput(e.target));

form.addEventListener("submit", (e) => {
  e.preventDefault();

  testInput(confirmPassword);
  testInput(password);
  testInput(zipCode);
  testInput(country);
  testInput(email);

  if (form.checkValidity()) {
    result.classList.remove("incorrect");
    result.classList.add("correct");

    result.textContent = "Form submitted!";
  } else {
    result.classList.remove("correct");
    result.classList.add("incorrect");

    result.textContent = "Please fill out all the fields";
  }
});
