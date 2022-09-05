const Queue = require('bull');
const {CONSTANTS} = require("./constants")

//make workers
const mailWorker = new Queue("mailWorker", {
    redis: CONSTANTS.redisDbCredentials
})

module.exports = {
    mailWorker
}
