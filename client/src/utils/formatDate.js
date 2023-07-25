export const formatDate = (date) => {
    const year = date.split("-")[0]
    const month = date.split("-")[1]
    const day = date.split("-")[2]

    return `${month}/${day}/${year}`
}