import moment from 'moment/min/moment-with-locales';

// ตั้งค่า locale โดยอิงจากภาษาของเบราว์เซอร์ผู้ใช้
moment.locale(navigator.language || navigator.userLanguage);

// ฟังก์ชันแสดงวันที่ในรูปแบบที่สอดคล้องกับ locale ของผู้ใช้
export const localFormatDate = (date) => {
    return moment(date).format('ll');
}

// ฟังก์ชันแสดงวันที่เป็นภาษาไทยโดยเฉพาะ
export const ThaiformatDate = (date) => {
    return moment(date).locale('th').format('ll');
}
