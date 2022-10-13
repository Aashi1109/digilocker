const form = document.querySelector(".user__form");
const secondaryForm = document.querySelector(".user__form--secondary");
const cancelSecondaryForm = document.querySelector(".user__form-cancel");
const addSecondaryBtn = document.querySelector(".add__secondary-btn");

cancelSecondaryForm.addEventListener("click", function (e) {
  const clicked = e.target.closest(".user__form-cancel");
  if (!clicked) return;
  addSecondaryBtn.classList.toggle("hidden");
  secondaryForm.classList.toggle("hidden");
});

addSecondaryBtn.addEventListener("click", (e) => {
  secondaryForm.classList.toggle("hidden");
  addSecondaryBtn.classList.toggle("hidden");
});

const secondaryFormInputs = document.querySelectorAll(
  ".user__form--secondary input[type='text']"
);

const secondaryFormShown = secondaryForm.classList.contains("hidden")
  ? true
  : false;

// console.log(secondaryFormShown);
for (const input of secondaryFormInputs) {
  if (secondaryFormShown) {
    input.required = false;
  } else {
    input.required = true;
  }
}
// console.log(form);
// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   console.log(form.elements);

//   // form.elements.filter((i) => console.log(i.id));
//   for (const elements of form.elements) {
//     console.log(elements);
//   }
// });

const [pImgContainer, sImgContainer] = document.querySelectorAll(
  'img[class~="user__logo--big"]'
);

const [pImgInput, sImgInput] = document.querySelectorAll('input[type="file"]');
// console.log(pImgContainer, sImgContainer);
// console.log(pImgInput, sImgInput);

// console.log(pImgInput);

const readFile = function (input, container) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      // console.log(e);
      container.src = e.target.result;
      container.style.height = "22rem";
      container.style.width = "100%";
      container.style.filter = "none";
    };

    reader.readAsDataURL(input.files[0]);
  }
};
pImgInput.addEventListener("change", function () {
  // console.log(pImgInput.files);
  readFile(pImgInput, pImgContainer);
});

if (secondaryFormShown) {
  sImgInput.addEventListener("change", function () {
    // console.log(pImgInput.files);
    readFile(sImgInput, sImgContainer);
  });
}
