const mongoose = require("mongoose");
const { runPython } = require("../extras/runPython");
const { Customer } = require("./customer");
const { Schema } = mongoose;

const accountSchema = Schema({
  lockerid: String,
  primary: { type: Schema.Types.ObjectID, ref: Customer },
  secondary: { type: Schema.Types.ObjectID, ref: Customer },
  p_enco: String,
  s_enco: String,
  p_img: String,
  s_img: String,
});

const Account = new mongoose.model("Account", accountSchema);

accountSchema.post("save", async function (doc) {
  if (doc) {
    const resp = runPython(doc.lockerid, "", "enco")
      .then(
        (resp) =>
          `Encodings generated for locker ${doc.lockerid}.Resp is ${resp}`
      )
      .catch((err) => console.error("Error is generating encodings", err));
    console.log(resp);
  }
});

module.exports = { Account };
