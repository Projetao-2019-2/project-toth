const nodemailer = require('nodemailer');


class Mailer
{
    async sendMail(SMTP, User, Subject, Body)
    {
            var transporter = nodemailer.createTransport({
            port: SMTP.port,
            host: SMTP.host,
            secure: true,
            auth: {
               user: SMTP.email,
               pass: SMTP.password
            }
        });

            const mailOptions = {
            from: SMTP.email, // sender address
            to: User.email, // list of receivers
            subject: Subject, // Subject line
            html: Body//'<p>Ho!</p>' plain text body
          };

          transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
         });
    }
}

module.exports = new Mailer();