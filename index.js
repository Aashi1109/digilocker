if (process.env.NODE_ENV === "production") {
  const dotenv = require("dotenv");
}

const { Config } = require("./models/config");
const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
// const bodyParser = require("body-parser");
const multer = require("multer");
const { Customer } = require("./models/customer");
const { Account } = require("./models/account");
const { runPython } = require("./extras/runPython");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { id } = req.params;

    const dir = `./public/uploads/${id}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
    // console.log(req.body);
  },
  filename: function (req, file, cb) {
    console.log(file.mimetype);
    cb(null, file.originalname);
  },
});
// const upload = multer({ dest: "/uploads" });
const upload = multer({ storage });

const app = express();
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// app.use(bodyParser.json());

const port = 8082;

mongoose
  .connect("mongodb://localhost:27017/frlocker")
  .then(() => console.log("Database Connection Done"))
  .catch((err) => {
    console.log("Error in connection");
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/home", async (req, res) => {
  const user = await Customer.find({ id: "6343e925cded3681fd8075b9" });
  res.render("home", { user });
});

app.get("/account", async (req, res) => {
  const accounts = await Account.find().populate("primary secondary");
  // accounts.map(i)
  // console.log(accounts);
  res.render("locker/account", { accounts });
});
app.get("/add", async (req, res) => {
  const { i } = await Config.findOne();
  // console.log(Config.find({}));
  const lockerID = `LCR${i}`;
  res.render("locker/add", { lockerID });
});
app.get("/open", (req, res) => {
  res.render("locker/open");
});

app.post("/add/:id", upload.array("image"), async (req, res) => {
  // console.log(req.body);
  console.log("post request");
  const { id } = req.params;
  const p_data = {
    first: req.body.p_first,
    middle: req.body.p_middle,
    last: req.body.p_last,
    isActive: "Yes",
    address: req.body.p_address,
    city: req.body.p_city,
    state: req.body.p_state,
    country: req.body.p_country,
  };

  const p_image = req.files[0].path.replace("public\\", "") || "";
  // console.log(p_image);
  const p_cust = new Customer(p_data);
  await p_cust.save();

  const { s_first } = req.body;
  let s_data = "";
  let s_image = undefined;
  if (s_first) {
    s_image = req.files[1].path.replace("public\\", "") || "";
    s_data = {
      first: s_first,
      middle: req.body.s_middle,
      last: req.body.s_last,
      isActive: "Yes",
      image: s_image,
      address: req.body.s_address,
      city: req.body.s_city,
      state: req.body.s_state,
      country: req.body.s_country,
    };
  }

  const s_cust = new Customer(s_data);
  await s_cust.save();

  const account_data = {
    lockerid: id,
    primary: p_cust,
    secondary: s_cust,
    p_enco: "",
    s_enco: "",
    p_img: p_image,
    s_img: s_image,
  };

  const p_account = new Account(account_data);
  await p_account.save();
  const { i } = await Config.findOne();
  await Config.findOneAndUpdate({ i }, { i: i + 1 });

  console.log("data saved");
  return res.redirect("/account");

  // console.log(req.files);
});

app.get("/locker/:id", async (req, res) => {
  const { id } = req.params;
  const locker = await Account.findOne({ lockerid: id });
  // console.log(locker);
  return res.json(locker);
});

app.get("/recognize/:id/:whom/:what", async (req, res) => {
  const { id, whom, what } = req.params;
  const resp = runPython(id, whom, what).then(value => console.log(value)).catch(err => console.error(err));
  res.json({ resp });
});
