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
    },
    dateFormats:{
        DATE:"MM/DD/YYYY",
        DATE_TIME:"MM/DD/YYYY HH:mm",
        DATE_TIME_AMPM:"MM/DD/YYYY hh:mm A"
    },
    addUserConstants:{
        sendSMSFrequents:{
            no_repeat:"no_repeat",
            repeat_30:"repeat_30",
            repeat_60:"repeat_60"
        },
        sendEmail:{
            frequent:{
                daily:"daily",
                weekly:"weekly",
                monthly:"monthly"
            }
        },
        realTimeDataFields:{
            data1:"data1",
            data2:"data2",
            data3:"data3",
            data4:"data4",
            data5:"data5",
            data6:"data6",
            data7:"data7",
            data8:"data8",
            data9:"data9",
            data10:"data10",
            data11:"data11",
            data12:"data12",
            data13:"data13",
            data14:"data14",
            data15:"data15",
            data16:"data16"
        }
    }
}
