document.getElementById("random").addEventListener("click", () => {
  reset();
  const newPromise = new Promise((resolve, reject) => {
    const randNum = Math.floor(Math.random() * 10);
    document.getElementById("randNum").textContent = randNum;
    console.log(randNum);
    if (randNum < 2) resolve("Operation Success");
    else reject("Operation failed");
  });

  newPromise
    .then((result) => {
      console.log(result);
      document.getElementById("result").textContent = result;
      console.log(typeof result);
    })
    .catch((error) => {
      console.log(error);
      console.log(typeof error);
      document.getElementById("result").textContent = error;
    });
});

function reset() {
  const container = document.getElementById("data-container");
  document.getElementById("randNum").textContent = "";
  document.getElementById("result").textContent = "";
  //   console.log(container);
  if (container) {
    // console.log("Container is there.", container.innerHTML);
    container.innerHTML = "";
    document.body.removeChild(container);
  }
}
document.getElementById("reset").addEventListener("click", reset);

document.getElementById("btnApi").addEventListener("click", () => {
  reset();
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayData(data);
    })
    .catch((error) => {
      console.log("This is the error", error);
      const errorMsg = document.createElement("p");
      errorMsg.textContent = "An Error Occured";
      document.body.appendChild(errorMsg);
    });

  function displayData(data) {
    const container = document.createElement("div");
    container.id = "data-container";
    container.style.border = "1px solid green";
    document.body.appendChild(container);

    const headingEl = document.createElement("h2");
    headingEl.style.textAlign = "center";
    headingEl.textContent = "User Data";
    container.appendChild(headingEl);

    data.forEach((user) => {
      let userDataEl = document.createElement("p");
      // console.log(user);
      // console.log(user.company.name);

      userDataEl.innerHTML =
        `User id: ${user.id}, User Name: ${user.name} <br>` +
        ` Address : ${user.address.street}, ${user.address.city}, ${user.address.zipcode} <br>` +
        `Company : ${user.company.name} <br>`;
      container.appendChild(userDataEl);
    });
  }
});
