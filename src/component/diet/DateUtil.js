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

/**
 * 디데이 변환 함수
 * @param {*} endDate 기준일
 * @returns 남은일자
 */
export const diffDay = (endDate) => {
    const masTime = new Date(endDate);
    const todayTime = new Date();
    
    const diff = masTime - todayTime;

    const diffDay = String(Math.floor(diff / (1000*60*60*24)));
    const diffHour =String( Math.floor((diff / (1000*60*60)) % 24)).padStart(2,"0");
    const diffMin = String(Math.floor((diff / (1000*60)) % 60)).padStart(2,"0");
    const diffSec = String(Math.floor(diff / 1000 % 60)).padStart(2,"0");
    
    return diffDay+"일"+diffHour+"시간"+diffMin+"분"+diffSec+"초";
}