export const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
export const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function getLastMonday(date) {
  const d = date || new Date();
  const day = d.getDay();
  const sundayOffset = (d.getDay() === 0) ? 7 : day;

  return new Date(new Date().setDate(d.getDate() - sundayOffset + 1));
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

export function getISODate(date) {
  const d = date || new Date();
  return [d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()].map(pad0).join('-');
}
