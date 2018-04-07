export const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
export const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function removeNums(str) {  // removes numbers
  return str.replace(/[0-9]/g, '');
}

export function pad0(n) {  // padding with 0
  return n > 9 ? n : '0' + n;
}

export function getTime(date) {
  const d = date || new Date();
  return [d.getHours(), d.getMinutes()].map(pad0).join(':');
}

export function getDate(date) {
  const d = date || new Date();
  return `${d.getDate()} ${monthNames[d.getMonth()].slice(0, 3)}`;
}
