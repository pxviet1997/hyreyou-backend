import nodemailer from 'nodemailer';

export const smtpTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'vietphamtesting@gmail.com', // generated ethereal user
    pass: 'glmblqoxvqdetmku', // generated ethereal password
  },
});