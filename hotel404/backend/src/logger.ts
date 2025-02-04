import winston from "winston";
import path from 'path';

const logDir = path.join(__dirname, 'logs');
const { combine, timestamp, printf, colorize } = winston.format;

// en funktion för att hämta vilken fil och kod rad error sker på
const getCallerInfo = () => {
    const stack = new Error().stack?.split('\n')[3]; 
    const match = stack?.match(/\((.*):(\d+):(\d+)\)/);
    if (match) {
      const filePath = match[1]; 
      const fileName = path.basename(filePath); 
      const lineNumber = match[2]; 
      return `${fileName}:${lineNumber}`;
    }
    return 'unknown'; 
};

//Definerat en custom log format
const logFormat = printf(({ level, message, timestamp }) => {
    const callerInfo = getCallerInfo(); 
    return `${timestamp} [${level.toUpperCase()}] [${callerInfo}]: ${message}`;
});

//skapar instans av logger
const logger = winston.createLogger({

    level: "info" , format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss'}),
        logFormat
    ),
    transports: [

        new winston.transports.Console(),
        new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error'}),
        new winston.transports.File({ filename: path.join(logDir, 'combined.log') })

    ]
});

export default logger;