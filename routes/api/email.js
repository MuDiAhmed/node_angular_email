const router = require("express").Router();
const nodemailer = require("nodemailer");
const nodemailerGun = require("nodemailer-mailgun-transport");
const env = require("../../env").getEnv();

async function main(email) {
  let auth = {
    auth: {
      api_key: env.smtp_api_key,
      domain: env.smtp_domain
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
    return res.status(200).send({ messageId: messageInfo.messageId });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
