/* eslint-disable @typescript-eslint/no-var-requires */
const log4js = require('log4js');

var LogType = {
    NONE: "none",
    DEBUG: "debug",
    INFO: "info",
    WARN: "warn",
    ERROR: "error",
    FATAL: "fatal",
}

var LogTypeOrder = {
    NONE: 0,
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4,
    FATAL: 5,
}

var Kinds = ["log"];

function appenderFull(filename) {
    return {
        type: "dateFile",
        filename: filename,  //日志文件的存储路径
        alwaysIncludePattern: true,  //（可选，默认false）将模式包含在当前日志文件的名称以及备份中
        pattern: "yyyy-MM-dd.log",  //（可选，默认为-yyyy-MM-dd） 确定何时滚动日志的模式。 格式:.yyyy-MM-dd-hh:mm:ss.log
        encoding: 'utf-8', //（可选，默认为utf-8）文件数据的存储编码
        maxLogSize: "1M" //文件最大存储空间，当文件内容超过文件存储空间会自动生成一个文件xxx.log.1的序列自增长的文件, 单位：K M G
    }
}

var appenders = { default: appenderFull("./logs/default") };
var categories = { default: { appenders: ["default"], level: log4js.levels.ALL } };

for (const kind of Kinds) {
    for (let type in LogType) {
        if (LogType.hasOwnProperty(type)) {
            type = LogType[type];
            let key = kind + "_" + type;
            appenders[key] = appenderFull(`./logs/${type}/${type}`);
            categories[key] = { appenders: [key], level: type === LogType.NONE ? log4js.levels.ALL : type }
        }
    }
}

log4js.configure({
    appenders: appenders,
    categories: categories,
});

/**
   * 添加日志接口，对应的日志类型将指定日志的输出文件，例如"none"类型的日志，将把日志内容指定输出到'./logs/business/none/none.log'文件，
   * "error"类型的日志，将把日志内容指定输出到'./logs/business/error/error.log'文件。
   * @param {LogType|String} type -- 日志的类型："none", "debug", "info", "warn", "error", "fatal"。
   *                                 如果该值不为枚举中的值，那么日志的类型默认设置为"none"类型，且将该参数
   *                                 作为日志内容的开头部分。
   * @param {...} arguments -- 日志内容，参数个数不定（一个或者多个，如果不填，那么默认将type作为日志内容参数）
   * @return {undefined}
   */
var KindIndex = 0;
exports.log = function (type) {
    try {
        if (arguments.length === 0) return;
        let more = "";
        for (let i = 1; i < arguments.length; i++) {
            more += (more === "" ? arguments[i] : "  " + arguments[i]);
        }
        if (typeof (type) === "string" && arguments.length > 1 && LogType[type.toUpperCase()]) {
            type = type.toLowerCase();
            log4js.getLogger(Kinds[KindIndex] + "_" + type)[type === LogType.NONE ? LogType.DEBUG : type](more);
        }
        else {
            more = type + more;
            log4js.getLogger(Kinds[KindIndex] + "_" + LogType.NONE)[LogType.DEBUG](more);
        }
    } catch (error) {
        console.error(error);
    }
};

function _registerLogFunc(type) {
    return function () {
        if (arguments.length === 0) return;
        let args = [type];
        for (let i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        exports.log.apply(null, args);
    }
}

const DEFAULT_FORMAT = ':remote-addr - -'
    + ' ":method :url HTTP/:http-version"'
    + ' :status :content-length ":referrer"'
    + ' ":user-agent"';

/**
 * 添加网络通讯日志接口，如果日志类型为"none"，那么所有的日志内容指定输出到'./logs/net/none/none.log'文件，
 * 如果是其他类型的日志，那么相应类型的日志将记录到对应名字的文件，例如"error"类型的日志，将把日志内容指定输出到'./logs/net/error/error.log'文件。
 * @param {LogType} type -- 日志的类型："none", "debug", "info", "warn", "error", "fatal"。
 *                          如果该值不为枚举中的值，那么日志的类型默认设置为"none"类型。
 * @return {function}
 */
exports.netLog = function (type) {
    try {
        type = typeof (type) === "string" && LogType[type.toUpperCase()] ? type.toLowerCase() : LogType.NONE;
        return log4js.connectLogger(log4js.getLogger(Kinds[1] + "_" + LogType.NONE), {
            level: 'auto', format: function (req, res, callback) {
                try {
                    let level = LogType.INFO;
                    if (res.statusCode) {
                        if (res.statusCode >= 300) level = LogType.WARN;
                        if (res.statusCode >= 400) level = LogType.ERROR;
                    }
                    let record = callback(DEFAULT_FORMAT);
                    let category = type === LogType.NONE ? type : level;
                    KindIndex = 1;
                    LogTypeOrder[category.toUpperCase()] >= LogTypeOrder[type.toUpperCase()] && exports.log(category, record);
                    KindIndex = 0;
                } catch (error) {
                    console.error(error);
                }
                return;
            }
        });
    } catch (error) {
        console.error(error);
    }
}

/**
 * exports.debug, exports.info, exports.warn, exports.error, exports.fatal参数传日志内容，参数个数不限。
 */
exports.debug = _registerLogFunc(LogType.DEBUG);
exports.info = _registerLogFunc(LogType.INFO);
exports.warn = _registerLogFunc(LogType.WARN);
exports.error = _registerLogFunc(LogType.ERROR);
exports.fatal = _registerLogFunc(LogType.FATAL);