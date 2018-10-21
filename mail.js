//1085798858267-n6n53bc7tdsn9bp6t23tn96ahnga275g.apps.googleusercontent.com
const nodemailer=require('nodemailer');
const xoauth2=require('xoauth2');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 465,
    auth: {
          xoauth2:xoauth2.createXOAuth2Generator({
              user:'anantrungta1999@gmail.com',
              clientId:'822301481449-libt8njr4ssrah2858hl614httmbf2mb.apps.googleusercontent.com',
              clientSecret:'yaWqT8ewkIoB02F7k23U0s7q',
              refreshToken:''
          })
       }
});


    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Anant Rungta" <romedy65i@gmail.com>', // sender address
        to: `${newUser.email}`, // list of receivers
        subject: 'Registered Successfully', // Subject line
        text: "You've been registered succesfully.", // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
