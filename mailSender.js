const nodemailer = require('nodemailer')
const hbs = require("nodemailer-express-handlebars")
const {CONSTANTS} = require("./constants")
const {dayjs} = require("./dateUtils")
const {getLogFileDir} = require("./helpers")
const fs = require("fs")

/*
* Email Sending Helper Function
*/
let smtpTransporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '',
        pass: ''
    }
});
smtpTransporter.use('compile', hbs({
    viewEngine:{
        defaultLayout:false,
        partialsDir:"./views/email_templates/",
        extname:"handlebars",
        helpers:{
            compareStrings(v1, v2, options) {
                //console.log("Comparing:", v1, v2)
                if (v1 === v2) { return options.fn(this); }
                return options.inverse(this);
            },
            formatDate(dateStr, options){
                return dayjs(dateStr).format(CONSTANTS.dateFormats.DATE_TIME)
            }
        },
        //"express-handlebars"
    },
    viewPath:"./views/email_templates/",
    extName:".handlebars",
    
}));

//You may Verify your SMTP server here....
// smtpTransporter.verify(function (error, success) {
//     if (error) {
//       console.log("Mail Server Verification Error : ", error);
//     } else {
//       console.log("Mail Server Verified Successfully!");
//     }
// });

  //@templateData should be an object of users+histories
async function historyMailSender(to, subject, cc=null, bcc=null, templateData, attachment=[], from=null){
    let templateDataObject = null
    try {    
    templateDataObject = templateData
    templateDataObject['year'] = `${(new Date().getFullYear())}`
    templateDataObject['app'] = CONSTANTS.app
    templateDataObject['subject'] = subject
    templateDataObject['today'] = dayjs(`${new Date()}`).format(CONSTANTS.dateFormats.DATE)
    
    console.log("Mail Total Histories: ", templateDataObject.histories.length)
    if(!templateDataObject.histories.length){
        templateDataObject.histories = "NO_DATA"
    }

    let options = {
        from: (from ? from : process.env.MAIL_FROM_ADDRESS),
        to:to,
        subject:subject,
        template:"historyMail",
        context:{
            templateDataObject:templateDataObject
        }
    }
    if(cc){
        options["cc"] = cc
    }
    if(bcc){
        options["bcc"] = bcc
    }

    smtpTransporter.sendMail(options, async function(err, res){
        if(err) console.log(err)
        console.log(res)

        mailHistoryLogger(templateDataObject)

        return res.end();
    })
   } catch (error) {
        mailHistoryLogger(templateDataObject, error)
        console.log(`An exception occured to sending mail: `, error)
   }
}


async function mailHistoryLogger(templateDataObject, exceptionError=null){
    try {
        //log history
        const data_ = {
            user:templateDataObject.user._id,
            subject:templateDataObject.subject,
            frequent:templateDataObject.user.sendEmail.data.frequent,
            status:(exceptionError ? 'failed':'sent'),
            failedReason:(exceptionError ? exceptionError.message : null),
            createdAt: new Date()
        }
        console.log(`Mail Log Data: `, data_)

        const fileName = `${new Date().toISOString()}__${data_.user}.json`
        const dir = await getLogFileDir()

        fs.writeFile(`${dir}/${fileName}`, JSON.stringify(data_), function(err){
            if(err) return console.log(`Create+Writing json mail log file failed : `, err)
            console.log(`Create+Writing json mail log file done`)
        })

    } catch (error) {
        console.log("An exception occured to write emaiLog :", error.message)
    }
}

module.exports = historyMailSender
