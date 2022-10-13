const searchBtn = document.querySelector(".open__search-btn");
const searchInput = document.querySelector(".open__search-input");
const searchMsg = document.querySelector(".open__message");
const bankerRecognize = document.querySelector(".open__recognize--banker");
const userRecognize = document.querySelector(".open__recognize--user");
const successRecognize = document.querySelector(".open__recognize-success");
// const path = require("path");

const msgBox = function (ele, eleInp = undefined, msg, type = "error") {
  ele.classList.add(`open__message--${type}`);
  ele.classList.remove("hidden");
  ele.innerHTML = msg;
  if (eleInp) {
    eleInp.focus();
  }
  setTimeout(function () {
    ele.classList.add("hidden");
    ele.classList.remove(`open__message--${type}`);
  }, 2000);
};

const makeRequest = async (url) => {
  const response = await fetch(url)
    .then((response) => {
      const data = response.json();
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.error(err);
    });

  return response;
};

const btnRecog = function (btn, lockerid, whom, flag) {
  btn.classList.remove("hidden");

  btn.addEventListener("click", async function () {
    const url = `http://localhost:8082/recognize/${lockerid}/${whom}/reco`;
    const resp = await makeRequest(url);
    if (resp) flag++;
    else return;
  });
};

searchBtn.addEventListener("click", async function (e) {
  const lockerid = searchInput.value.trim();
  if (!lockerid) {
    msgBox(searchMsg, searchInput, "Please enter some value");
  } else {
    const url = `http://localhost:8082/locker/${lockerid}`;
    const account = await makeRequest(url);
    console.log(account);
    if (!account) {
      msgBox(searchMsg, searchInput, "Incorrect Locker ID");
      return;
    } else {
      msgBox(searchMsg, undefined, "Locker Found", "success");

      console.log("aasas");
      // const resp = await fetch(
      //   `http://localhost:8082/recognize/${lockerid}/all/enco`
      // )
      //   .then((resp) => resp.json())
      //   .catch((err) => console.error(err));
      // if (!resp) return;
      // else {
      //   console.log(resp);
      const flag = 0;
      btnRecog(bankerRecognize, lockerid, "banker", flag);
      if (flag > 0) {
        msgBox(searchMsg, undefined, "Banker Recognition Done", "success");
        btnRecog(userRecognize, lockerid, "user", flag);
      }

      if (flag == 2) {
        msgBox(searchMsg, undefined, "User Recognition Done", "success");
        msgBox(
          successRecognize,
          undefined,
          "Recognition done successfully opening lock",
          "success"
        );

        const open_url = `http://localhost:8081/api/open/${lockerid}/park.1109/aashish.1109`;
        const sendOpenSignal = await makeRequest(open_url);
        console.log(sendOpenSignal);
        const lock_url = `http://localhost:8081/api/lock/park.1109/aashish.1109`;
        setTimeout(async () => {
          const resp = await makeRequest(lock_url);
        }, 20000);
      }
    }
  }
});
