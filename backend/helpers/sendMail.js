import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "kalavaguntapurnesh@gmail.com",
    pass: "oamugyjnvtldzgez",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(to, subject, text, html) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "kalavaguntapurnesh@gmail.com", // sender address
    to,
    subject,
    text,
    html,
  });
  console.log("Mail Sent Successfully");
}

async function forgotMail(subject, text, html) {
  const info = await transporter.sendMail({
    from: "kalavaguntapurnesh@gmail.com", // sender address
    to,
    subject,
    text,
    html,
  });
  console.log("Forgot Password Sent Successfully");
}

export { sendMail as sendMail };
export { forgotMail as forgotMail };
