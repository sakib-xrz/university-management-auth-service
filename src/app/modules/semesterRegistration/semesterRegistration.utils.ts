// function generateISODateTime(dateStr, timeStr) {
//   const [day, month, year] = dateStr.split('/').map(Number);
//   const [hours, minutes] = timeStr.split('.').map(Number);

//   const date = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));

//   return date.toISOString();
// }

// const isoDateTime = generateISODateTime('15/12/2024', '17.25');

// Formate dateStr: dd/mm/yyyy, timeStr: hh.mm (24h)

const SemesterRegistrationUtils = {};

export default SemesterRegistrationUtils;
