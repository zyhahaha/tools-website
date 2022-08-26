/**
 * 日期格式化
 * @param {Object | String | Number} time 时间（毫秒时间戳、Date对象）
 * @param {String} cFormat 要转成的日期格式 （年-月-日：{y}-{m}-{d} 或 年:月：{y}:{m}）
 * @returns String
 */
function formatDate(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    if (!time) {
        return '-'
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        return value.toString().padStart(2, '0')
    })
    return time_str
}
