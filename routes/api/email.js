const router = require("express").Router();
const nodemailer = require("nodemailer");
const nodemailerGun = require("nodemailer-mailgun-transport");

async function main() {
  let testAccount = await nodemailer.createTestAccount();
  let auth = {
    auth: {
      api_key: "854b1495090d2943db7e9dc71c50b646-c322068c-5eaa2edd",
      domain: "sandboxe9cc29ed3e814ef1b5a5376c9c01d2e7.mailgun.org"
    }
  };

  let transporter = nodemailer.createTransport(nodemailerGun(auth));
  //   let transporter = nodemailer.createTransport({
  //     host: "smtp.ethereal.email",
  //     port: 587,
  //     secure: false,
  //     auth: {
  //       user: testAccount.user,
  //       pass: testAccount.pass
  //     }
  //   });

  let info = await transporter.sendMail({
    from:
      "Mailgun Sandbox <postmaster@sandboxe9cc29ed3e814ef1b5a5376c9c01d2e7.mailgun.org>",
    to: "ukp58988@bcaoo.com",
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

router.post("/", async (req, res) => {
  //   try {
  //     const createdPost = await postRepo.create(req.body);
  //     return res.status(201).json(createdPost);
  //   } catch (err) {
  //     if (err instanceof APIError) {
  //       return res.status(err.status).send(err.message);
  //     }
  //     return res.status(500).send(err.message);
  //   }

  try {
    main();
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get("/", async (req, res) => {
  return res.send("what");
});

module.exports = router;
