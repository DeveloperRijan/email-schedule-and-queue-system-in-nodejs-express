exports.CONSTANTS = {
    app:{
        appUrl:`http://localhost:${process.env.PORT}`,
        name:"Demo Queue+Scheduler App",
        title:"Hello Queue + Schedule",
        isLocal:true,
        socialUrls:{
            facebook:"https://www.facebook.com",
            twitter:"https://www.twitter.com",
            linkedin:"https://www.linkedin.com",
            youtube:"https://www.youtube.com",
            instagram:"https://www.instagram.com"
        }
    },
    redisDbCredentials:{
        port:6379,
		    host:"127.0.0.1"
    }
}
