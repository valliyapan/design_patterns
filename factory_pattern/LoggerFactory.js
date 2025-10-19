import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

class Logger {

    static logLevels = {
        'DEBUG': 3,
        'INFO': 2,
        'WARN': 1,
        'ERROR': 0,
    }

    constructor(logLevel) {
        this.logLevel = logLevel || 'ERROR'
    }

    debug(data) {
        if (Logger.logLevels['DEBUG'] <= Logger.logLevels[this.logLevel]) {
            this.send('[DEBUG]:', data)
        }
    }

    log(data) {
        if (Logger.logLevels['INFO'] <= Logger.logLevels[this.logLevel]) {
            this.send('[INFO]:', data)
        }
    }

    warn(data) {
        if (Logger.logLevels['WARN'] <= Logger.logLevels[this.logLevel]) {
            this.send('[WARN]:', data)
        }
    }

    error(data) {
        if (Logger.logLevels['ERROR'] <= Logger.logLevels[this.logLevel]) {
            this.send('[ERROR]:', data)
        }
    }
}

class CloudWatchLogger extends Logger {
    constructor({logLevel, logGroupName, region }) {
        super(logLevel)
        this.logGroupName = logGroupName
        this.region = region
    }

    send(...args) {
        console.log(`[CLOUDWATCH LOG - ${this.logGroupName} - ${this.region}]`)
        const data = args.join(' ')
        // logic to send data to aws cloudwatch logs
        console.log(data)
    }
}

class FileLogger extends Logger {
    constructor({ logLevel, logFileName }) {
        super(logLevel)
        this.logFile = logFileName
    }

    send(...args) {
        console.log(`[FILE LOG - ${this.logFile}]`)
        const data = args.join(' ')
        fs.appendFile(this.logFile, data)
        console.log(data)
    }
}

class ConsoleLogger extends Logger {
    constructor({ logLevel }) {
        super(logLevel)
    }

    send(...args) {
        console.log('[CONSOLE LOG]')
        const data = args.join(' ')
        console.log(data)
    }
}

class LoggerFactory {
    static createLogger(type, options) {
        const parsedOptions = JSON.parse(options)
        switch (type) {
            case 'cloudwatch':
                return new CloudWatchLogger(parsedOptions)
            case 'file':
                return new FileLogger(parsedOptions)
            case 'console':
            default:
                return new ConsoleLogger(parsedOptions)
        }
    }
}

/**
 * Even when we add a new log type, no need to change the consumer code
 * The methods log, debug, error, warn are going to be the same and the type and options are injected via env vars
 * Unit testing is very easy as we can simply mock the createLogger function
 * createLogger factory method allows us to pass log type and options at runtime
*/

const logger = LoggerFactory.createLogger(process.env.LOG_TYPE, process.env.LOG_OPTIONS)

logger.log('I am info level log')
logger.debug('I am debug level log')
logger.error('I am error level log')
logger.warn('I am warn level log')