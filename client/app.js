console.log("hello baby");

const email = document.getElementById("email");
const pass = document.getElementById("password");
const namee = document.getElementById("name");
const display = document.getElementById("display");
const message = document.getElementById("message");
const signup = document.getElementById("sign-up-btn");
const signin = document.getElementById("sign-in-btn");
const switchop = document.getElementById("switch-op");

let isSignIn = true;

switchop.addEventListener("click", (e) => {
  e.preventDefault();
  if (isSignIn) {
    signin.classList.add("block");
    signup.classList.remove("block");
    isSignIn = false;
    namee.classList.remove("block");
    display.innerText = "You can signup";
  } else {
    signin.classList.remove("block");
    signup.classList.add("block");
    namee.classList.add("block");
    isSignIn = true;
    display.innerText = "You can login";
  }
});

//singin
signin.addEventListener("click", (e) => {
  let data = {
    email: email.value,
    password: pass.value,
  };

  fetch("http://localhost:5002/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json;charset=UTF-8" },
  })
    .then((val) => val.json())
    .then((val) => {
      if (val.err) {
        message.innerHTML = val.err;
      } else {
        message.innerHTML = "You are now logined";
      }
    });
});

// signup
signup.addEventListener("click", (e) => {
  const data = {
    name: namee.value,
    password: pass.value,
    email: email.value,
  };

  fetch("http://localhost:5002/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json;charset=UTF-8" },
  })
    .then((val) => val.json())
    .then((val) => {
      if (val.err) {
        message.innerHTML = val.err;
      } else {
        message.innerHTML = "Open your email and verfiy it is you";
      }
    });
});
