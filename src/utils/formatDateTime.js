export const formatDateTime = (date) => {
    const day = new Date(date).getDate()
    const month = new Date(date).getMonth() + 1
    const year = new Date(date).getFullYear()
    const hour = new Date(date).getHours()
    const minute = new Date(date).getMinutes()
    return `${day} thg ${month}, ${year} ${hour}:${minute}`
}