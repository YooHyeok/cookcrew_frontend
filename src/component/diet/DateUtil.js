
export function hipenToKrfmtDate(hipeDate) {
    let date = new Date(hipeDate);
    let year = date.getFullYear();
    let month = (date.getMonth()+1);
    let day = date.getDate();
    return year+"년 "+month+"월 "+day+"일";
    
}
//import { hipenToKrfmtDate, gmtToKrfmtDate, gmtToHipenfmtDate} from './DateUtil'

export const gmtToKrfmtDate = (hipeDate) => {
    let year = hipeDate.getFullYear();
    let month = (hipeDate.getMonth()+1);
    let day = hipeDate.getDate();
    return year+"년 "+month+"월 "+day+"일";
}

export const gmtToHipenfmtDate = (hipeDate) => {
    let year = hipeDate.getFullYear();
    let month = (hipeDate.getMonth()+1);
    let day = hipeDate.getDate();
    return year+"-"+month+"-"+day;
}