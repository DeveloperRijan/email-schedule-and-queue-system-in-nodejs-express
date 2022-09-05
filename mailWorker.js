const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId; 
const DB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;
const mailSender = require("./mailSender")
const {CONSTANTS} = require("./constants")

const mailWorker = async(job, done)=>{
    try {        
        //create connection
        MongoClient.connect(DB_URI, function(err, db) {
            if (err) throw err;
            const dbo = db.db(DB_NAME);
            
            for (let i = 0; i < job.data.length; i++) {

                user = job.data[i]//get user from scheduler, passing....
                console.log("(mailWorker) processing: ", user.email)
                
                dbo.collection(CONSTANTS.MODEL_COLLECTIONS.DataHistory).find(
                    {
                        user:ObjectId(user._id)
                    }, 
                ).toArray(function(err, results) {
                    if(err){
                        console.log(`(mailWorker) Error to fetch history of: ${user.email} | msg: ${err.message}`)
                    }else{
                        console.log(`(mailWorker) Mail Total Histories Fetched : `, results.length)

                        const data = {
                            user:user,
                            histories:results
                        }
                        mailSender(
                            user.sendEmail.data.to,
                            user.sendEmail.data.subject,
                            user.sendEmail.data.cc ? user.sendEmail.data.cc :  null,
                            user.sendEmail.data.bcc ? user.sendEmail.data.bcc :  null,
                            data
                        )

                    }
                    
                })
                

                
            }
            done()
        });
        

    } catch (error) {
        console.log(error)
        throw new Error(`An exception occured to process job : ${error.message}`)
    }
}

module.exports = sendMailProcessor
