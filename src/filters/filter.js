export default function setDateFormat (value) {
    let date = new Date(value);
    let curr_date = date.getDate();
    let curr_month = date.getMonth() + 1;
    let curr_year = date.getFullYear();
    return curr_date + "-" + curr_month + "-" + curr_year;
}
