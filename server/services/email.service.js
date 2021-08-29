const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PW
    }
});

const registerEmail = async(userEmail, user) => {
    try{
        const emailToken = user.generateRegisterToken();
        
        let mailGenerator = new Mailgen({
            theme: "default",
            product:{
                name: "Ecommerce",
                link: `${process.env.EMAIL_MAIL_URL}`
            }
        });
        
        const email =  {
            body: {
                name: userEmail,
                intro: 'Welcome to the store, we are excited to have you on board',
                action:{
                    instructions: 'To validate click here',
                    button: {
                        color: '#1a73e8',
                        text: 'Validate your account',
                        link: `${process.env.SITE_DOMAIN}/verification?t=${emailToken}`
                    }
                    
                },
                outro: 'Need help, just reply to this email!'
                
                
            }
        }
        
        let emailBody = mailGenerator.generate(email);
        let message = {
            from: process.env.EMAIL,
            to : userEmail,
            subject: "Welcome to waves",
            html: emailBody
        };
        
        await transporter.sendMail(message);
        
        
    } catch(err){
        throw err;
    }
}

module.exports = {
    registerEmail
}