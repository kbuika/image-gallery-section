require('dotenv').config();
const redis = require("redis");
const moment = require("moment");

const redisClient = redis.createClient();
redisClient.on("error", (err) => console.log("Redis error: ", err));

const WINDOW_SIZE_IN_HOURS = 24;
const MAX_WINDOW_REQUEST_COUNT= 500;
const WINDOW_LOG_INTERVAL_IN_HOURS = 1;
redisClient.connect();

const redisRateLimiter = async ( req, res, next ) => {
    try {
        // check that redis client exists
        if (!redisClient) {
            throw new Error("Redis client does not exist!");
        }
        const record = await redisClient.get(req.ip);
        const currentRequestTime = moment();
        console.log("Current time: ", currentRequestTime.format());
        // if no record exists, create a new record for user
        if (record == null) {
            let newRecord = [];
            let requestLog = {
                requestTimeStamp: currentRequestTime.unix(),
                requestCount: 1,
            }
            newRecord.push(requestLog);
            await redisClient.set(req.ip, JSON.stringify(newRecord));
            next();
        }
        // if record exists, parse data and determine whether user has reached max requests per window
        let data = JSON.parse(record);
        if(data !== null){
            let windowStartTimestamp = moment().subtract(WINDOW_SIZE_IN_HOURS, "hours").unix();
            let requestsWithinWindow = data.filter(entry => {
                return entry.requestTimeStamp > windowStartTimestamp;
            })
            console.log("Request data within window: ", requestsWithinWindow);
            let totalWindowRequestsCount = requestsWithinWindow.reduce((accumulator, entry) => {
                return accumulator + entry.requestCount;
            }, 0);
    
            if (totalWindowRequestsCount >= MAX_WINDOW_REQUEST_COUNT) {
                return res.status(429).send("You have exceeded the " + MAX_WINDOW_REQUEST_COUNT + " requests in " + WINDOW_SIZE_IN_HOURS + " hrs limit!");
            }
            else {
                // if user has not reached max requests per window, increment counter
                let lastRequestLog = data[data.length - 1];
                let potentialCurrentWindowIntervalStartTimeStamp = currentRequestTime.subtract(WINDOW_LOG_INTERVAL_IN_HOURS, "hours").unix();
                if (lastRequestLog.requestTimeStamp < potentialCurrentWindowIntervalStartTimeStamp) {
                    let requestLog = {
                        requestTimeStamp: currentRequestTime.unix(),
                        requestCount: 1,
                    }
                    data.push(requestLog);
                }
                else {
                    lastRequestLog.requestCount++;
                }
                await redisClient.set(req.ip, JSON.stringify(data));
                next();
            }
        }
        

    } catch(err) {
        next(err)
    }
}

module.exports = { redisRateLimiter };