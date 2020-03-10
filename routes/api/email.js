const router = require("express").Router();
const nodemailer = require("nodemailer");
const nodemailerGun = require("nodemailer-mailgun-transport");

async function main(email) {
  let auth = {
    auth: {
      api_key: "854b1495090d2943db7e9dc71c50b646-c322068c-5eaa2edd",
      domain: "sandboxe9cc29ed3e814ef1b5a5376c9c01d2e7.mailgun.org"
    }
  };

  let transporter = nodemailer.createTransport(nodemailerGun(auth));

  let info = await transporter.sendMail({
    from: email.fromEmail,
    to: email.toEmail,
    subject: email.subject,
    text: email.body
  });
  return info;
}

router.post("/", async (req, res) => {
  try {
    let messageInfo = await main(req.body);
    return res.sendStatus(200).send({ messageId: messageInfo.messageId });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
