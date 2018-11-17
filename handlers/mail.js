const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice'); // Allows us to inline CSS
const htmlToText = require('html-to-text'); // Converts html to basic text for older browsers and email clients
const promisify = require('es6-promisify');

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

const generateHTML = (filename, options = {}) => {
    // __dirname is equal to the current directory that we are running this file from - this variable is available for us to use anywhere in the program
    const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options);
    const inlined = juice(html);
    return inlined;
}

exports.send = async (options) => {
    const html = generateHTML(options.filename, options);
    const text = htmlToText.fromString(html);
    const mailOptions = {
        from: `Matt Gaddes <noreply@mg.com>`,
        to: options.user.email,
        subject: options.subject,
        html,
        text
    };
    const sendMail = promisify(transport.sendMail, transport);
    return sendMail(mailOptions);
};