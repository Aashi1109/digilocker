const homeHtml = `<section class="main">
                <div class="main__item">
                    <div class="main__title">Welcome back, User</div>
                    <span class="line-break"></span>
                    <div class="main__content">
                        <h3 class="content__title">Statistics</h3>
                        <div class="content__chart">Chart</div>
                    </div>
                </div>
                <div class="main__data">
                    <div class="data__item">
                        <div>
                            <img src="svg/info-large-outline.svg" alt="logo" class="data__logo">
                            <!-- <svg class="data__logo">
                        <use xlink:href="svg/info-large-outline.svg"></use>
                    </svg> -->
                            <span class="data__heading">Details</span>
                        </div>
                        <img src=" svg/edit.svg" alt="edit logo" class="data__logo data__edit">
                    </div>
                    <div class=" data__item line-break" style="background-color: white;"></div>

                    <div class="data__item">
                        <img src="img/ashish_pal.jpg" alt="banker image" class="data__img">
                    </div>

                    <div class="data__item">

                        <!-- <img src="svg/account.svg" alt="logo" class="data__logo"> -->
                        <span class="data__name">Ashish Pal</span>
                    </div>

                    <div class="data__item">
                        <div class="data__title">Lead Banker | Admin</div>
                    </div>
                    <div class="data__item">
                        <span class="data__text">Active</span>
                        <img src="svg/checkbox-circle.svg" alt="logo" class="data__logo">
                    </div>
                    <div class=" data__item line-break" style="background-color: white;"></div>
                    <div class="data__contact">
                        <div class="contact__item">
                            <img src="svg/email.svg" alt="email" class="data__logo">
                            <span class="data__text">ashishpal@gmail.com</span>
                        </div>
                        <div class="contact__item">
                            <img src="svg/phone.svg" alt="email" class="data__logo">
                            <span class="data__text">+91 455 555 7554</span>
                        </div>
                    </div>
                </div>
                <div class="main__recent">
                    <div class="recent__item recent__heading">
                        Recent
                    </div>
                    <div class="recent__item line-break" style="background-color: white;"></div>
                </div>"`;

const accountHtml = `<section class="account">
                <div class="account__heading">All Accounts</div>
                <div class="account__line-break line-break"></div>
                <div class="account__item pad-5">
                    <div class="account__text">Locker ID</div>
                    <div class="account__text">Primary User Image</div>
                    <div class="account__text">Primary User Name</div>
                    <div class="account__text">Secondary User Image</div>
                    <div class="account__text">Secondary User Name</div>
                    <div class="account__text">Edit Details</div>
                </div>
                <div class="account__item pad-5">
                    <div class="account__text">LCR1899AP</div>
                    <img src="fr_images/ashish_pal.jpg" alt="primary user image" class="account__image">
                    <div class="account__text">Ashish Pal</div>

                    <img src="fr_images/elon_musk.jpg" alt="secondary user image" class="account__image">
                    <div class="account__text">Vaibhav Dhawale</div>
                    <div class="account__edit">
                        <div class="account__text mr-8">Edit</div>
                        <img src="svg/edit.svg" alt="edit logo" class="account__logo">
                    </div>
                </div>

            </section>`;

const addUserHtml = `<section class="user">
                <div class="account__heading">Add new user</div>
                <!-- <div class="account__line-break line-break"></div> -->
                <form action="" method="post" enctype="multipart/form-data" class="user__form">
                    <div class="user__form-heading heading__secondary">Primary User Data</div>
                    <div class="user__form-line line-break white"></div>
                    <div class="user__item">
                        <input type="text" class="user__input" name="first_name" id="first_name"
                            placeholder="First Name" required>
                        <label for="first_name" class="user__label">First Name</label>

                    </div>
                    <div class="user__item">
                        <input type="text" class="user__input" name="middle_name" id="middle_name"
                            placeholder="Middle Name">
                        <label for="middle_name" class="user__label">Middle Name</label>

                    </div>
                    <div class="user__item">
                        <input type="text" class="user__input" name="last_name" id="last_name" placeholder="Last Name"
                            required>
                        <label for="last_name" class="user__label">Last Name</label>

                    </div>
                    <div class="user__item user__address">
                        <input type="text" class="user__input" name="address" id="address" placeholder="Address"
                            required>
                        <label for="address" class="user__label">Address</label>
                    </div>
                    <div class="user__item">
                        <input type="text" class="user__input" name="city" id="city" placeholder="City" required>
                        <label for="city" class="user__label">City</label>
                    </div>
                    <div class="user__item">
                        <input type="text" class="user__input" name="state" id="state" placeholder="State" required>
                        <label for="state" class="user__label">State</label>
                    </div>
                    <div class="user__item">
                        <input type="text" class="user__input" name="country" id="country" placeholder="Country"
                            required>
                        <label for="country" class="user__label">Country</label>
                    </div>
                    <div class="user__item user__image user__image-primary">
                        <div>
                            <label for="image" class="user__label margin-0"><img src="svg/file-add.svg" alt="add image"
                                    class="user__logo user__logo--big"></label>

                        </div>
                        <input type="file" name="image" id="image" class="user__input" accept="image/*">
                    </div>
                    <!-- <button class="btn user__form-btn">Add Secondary Account</button>
                <button class="btn user__form-btn">Create Account</button> -->



                    <!-- Secondary user -->
                    <div class="user__form hidden full-span">
                        <div class="user__form-heading heading__secondary user-secondary">
                            <div>Secondary User Data</div>
                            <div class="user__form-cancel">
                                <div class="user__label">Cancel</div>
                                <img src="svg/close.svg" alt="cancel logo" class="user__logo">
                            </div>
                        </div>
                        <div class="user__form-line line-break white"></div>
                        <div class="user__item">
                            <input type="text" class="user__input" name="first_name" id="first_name"
                                placeholder="First Name" required>
                            <label for="first_name" class="user__label">First Name</label>

                        </div>
                        <div class="user__item">
                            <input type="text" class="user__input" name="middle_name" id="middle_name"
                                placeholder="Middle Name">
                            <label for="middle_name" class="user__label">Middle Name</label>

                        </div>
                        <div class="user__item">
                            <input type="text" class="user__input" name="last_name" id="last_name"
                                placeholder="Last Name" required>
                            <label for="last_name" class="user__label">Last Name</label>

                        </div>
                        <div class="user__item user__address">
                            <input type="text" class="user__input" name="address" id="address" placeholder="Address"
                                required>
                            <label for="address" class="user__label">Address</label>
                        </div>
                        <div class="user__item">
                            <input type="text" class="user__input" name="city" id="city" placeholder="City" required>
                            <label for="city" class="user__label">City</label>
                        </div>
                        <div class="user__item">
                            <input type="text" class="user__input" name="state" id="state" placeholder="State" required>
                            <label for="state" class="user__label">State</label>
                        </div>
                        <div class="user__item">
                            <input type="text" class="user__input" name="country" id="country" placeholder="Country"
                                required>
                            <label for="country" class="user__label">Country</label>
                        </div>
                        <div class="user__item user__image user__image-secondary">
                            <div>
                                <label for="image" class="user__label margin-0"><img src="svg/file-add.svg"
                                        alt="add image" class="user__logo user__logo--big"></label>

                            </div>
                            <input type="file" name="image" id="image" class="user__input" accept="image/*">
                        </div>
                        <button class="btn user__form-btn">Add Secondary Account</button>
                        <button class="btn user__form-btn">Create Account</button>
                    </div>
                </form>
            </section>`;

const openHtml = `<section class="open">
                <h2 class="heading__primary full-span">Open Locker</h2>
                <div class="line-break full-span"></div>
                <div class="open__search full-span">
                    <input type="text" class="user__input grey" placeholder="Enter Locker ID">
                    <div class="open__message open__message--success">Locker not found</div>
                </div>
                <div class="open__text full-span">Recognition Step</div>
                <div class="line-break full-span"></div>
                <div class="open__text open__text--medium full-span"><em>! Note: Try to place your face in view of
                        camera
                        for
                        recognition</em></div>
                <div class="open__recognize open__recognize--left hidden">
                    <div class="open__text--medium">Banker Face Recognition</div>

                    <div class="open__camera">
                        <img src="svg/video-camera.svg" alt="video logo" class="open__logo open__camera--initial">
                    </div>
                    <button class="btn open__btn">Start Recogninzing</button>
                    <div class="open__message open__text open__message--success">Banker Recognition Done</div>
                </div>

                <div class=" open__recognize--add">
                    <img src="svg/plus-rec.svg" alt="add logo" class="open__logo">
                </div>

                <div class="open__recognize open__recognize--right hidden">
                    <div class="open__text--medium">User Face Recognition</div>
                    <div class="open__camera">
                        <img src="svg/video-camera.svg" alt="video logo" class="open__logo open__camera--initial">
                    </div>
                    <button class="btn open__btn">Start Recogninzing</button>
                    <div class="open__message open__text open__message--success">User recognition done</div>
                </div>
                <div class="line-break full-span"></div>

                <div class="open__recognize-success open__text open__message--success">Recognition done opening
                    locker
                </div>

            </section>`;

const navigation = document.querySelector(".navigation");
const dataSection = document.querySelector(".left");
const dynamicScript = document.querySelector(".dynamic__script");
const body = document.querySelector("body");
dataSection.innerHTML = homeHtml;

const genScript = (page) => {
  body.insertAdjacentHTML(
    "beforeend",
    `<script  src="js/${page}.js"></script>`
  );
};

navigation.addEventListener("click", (e) => {
  //   console.log(e.target);
  const clicked = e.target.closest(".navigation__item");

  if (!clicked) {
    return;
  }
  const page = clicked.dataset["nav"];
  //   console.log(page);
  if (page === "home") {
    dataSection.innerHTML = homeHtml;
  } else if (page === "account") {
    dataSection.innerHTML = accountHtml;
    genScript(page);
  } else if (page === "add") {
    dataSection.innerHTML = addUserHtml;
    genScript(page);
  } else if (page === "open") {
    dataSection.innerHTML = openHtml;
    genScript(page);
  }
});
