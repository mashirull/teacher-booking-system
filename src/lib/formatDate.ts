export const formatDate = (date : Date) =>  {
    const currentDate =  new Date(date)

    const formatedDate =  currentDate.toLocaleDateString("en-IN" , {
        day : "numeric",
        weekday  : "short",
        year  :  "numeric",
        month : "short"
    })

    return formatedDate;

}