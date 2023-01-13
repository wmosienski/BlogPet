import path from "path";

export const config = {
    refreshTokenExpireTime: 24*60*60*1000,
    accessTokenExpireTime: 15*60*1000,
    fileLogBatchSizeDefault: 10,
    logFilePath: path.join(process.cwd(), 'logs/logs.log'),
    logFileErrorsPath: path.join(process.cwd(), 'logs/logs_errors.log')
}