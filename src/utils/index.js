export function convertDate(unixTime) {
    let newDate = {years: 0, month: 0, days: 0, hours: 0, minutes: 0}
    const date = new Date(unixTime * 1000)
    newDate.years = date.getFullYear()
    newDate.month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    newDate.days = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate()
    newDate.hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    newDate.minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    return newDate
}

export function getMaxSizePicture(item) {
    const lastIndex = item.items[0].sizes.length - 1
    return item.items[0].sizes[lastIndex].url
}
