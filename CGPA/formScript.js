const email = document.getElementById("email");
const password = document.getElementById("password");
const phone = document.getElementById("phone");
const form = document.getElementById("form");
const msg = document.getElementById("msg");

const validateEmail = (inputEmail) =>
  inputEmail.value.match(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

const validatePassword = (inputPassword) =>
  inputPassword.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);

const validatePhone = (inputPhone) => inputPhone.value.match(/^\d{10}$/);

const generateError = (errorName, errorMsg) => {
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const phoneError = document.getElementById("phoneError");
  const genderError = document.getElementById("genderError");

  if (errorName === "email") {
    emailError.innerText = errorMsg;
  } else if (errorName === "password") {
    passwordError.innerText = errorMsg;
  } else if (errorName === "phone") {
    phoneError.innerText = errorMsg;
  } else if (errorName === "gender") {
    genderError.innerText = errorMsg;
  }
};

const formValidate = (inputEmail, inputPassword, inputPhone, gender) => {
  let isValid = true;

  if (!validateEmail(inputEmail)) {
    const emailError = "Please enter a valid email address";
    generateError("email", emailError);
    isValid = false;
  } else {
    generateError("email", "");
  }

  if (!validatePassword(inputPassword)) {
    const passwordError =
      "Password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter";
    generateError("password", passwordError);
    isValid = false;
  } else {
    generateError("password", "");
  }

  if (!validatePhone(inputPhone)) {
    const phoneError = "Please enter a valid phone number";
    generateError("phone", phoneError);
    isValid = false;
  } else {
    generateError("phone", "");
  }

  if (!gender || (gender !== "male" && gender !== "female")) {
    const genderError = "Please select a gender";
    generateError("gender", genderError);
    isValid = false;
  } else {
    generateError("gender", "");
  }

  return isValid;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const gender = document.querySelector('input[name="gender"]:checked');
  formValidate(email, password, phone, gender ? gender.value : null);
});

email.addEventListener("focusout", () => {
  generateError("email", "");
});

password.addEventListener("focusout", () => {
  generateError("password", "");
});

phone.addEventListener("focusout", () => {
  generateError("phone", "");
});

const genderRadios = document.querySelectorAll('input[name="gender"]');
genderRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    generateError("gender", "");
  });
});
