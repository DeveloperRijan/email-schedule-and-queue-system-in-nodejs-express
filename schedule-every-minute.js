const {mailWorker} = require("./queues")
const User = require("../models/User")

async function everyMinute(){
    User.find({
        isActive:true,
        "contract.expiry.from":{
            $lte:new Date().setHours(0, 0 , 0)
        },
        "contract.expiry.to":{
            $gt: new Date().setHours(0, 0 , 0)
        }
    }).then((users)=>{
        if(!users.length){
            console.log("No users available for : MailWorker")
        }else{
            mailWorker.add(users)
            .then(()=>{
                console.log("Tasks are added to mailWorker!")
            })
            .catch((e)=>{
                console.log("Adding task to mailWorker exception: ", e)
            })
        }
    })
}

module.exports = everyMinute
