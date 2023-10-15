const names = [
    'Aaran',
    'Aaren',
    'Aarez',
    'Aarman',
    'Aaron',
    'Aaron-James',
    'Aarron',
    'Aaryan',
    'Aaryn',
    'Aayan',
    'Aazaan',
    'Abaan',
    'Abbas',
    'Abdallah',
    'Abdalroof',
    'Abdihakim',
    'Abdirahman',
    'Abdisalam',
    'Abdul',
    'Abdul-Aziz',
    'Abdulbasir',
    'Abdulkadir',
    'Abdulkarem',
    'Smith',
    'Jones',
    'Coollastname',
    'enter_name_here',
    'Ze',
    'Zechariah',
    'Zeek',
    'Zeeshan',
    'Zeid',
    'Zein',
    'Zen',
    'Zendel',
    'Zenith',
    'Zennon',
    'Zeph',
    'Zerah',
    'Zhen',
    'Zhi',
    'Zhong',
    'Zhuo',
    'Zi',
    'Zidane',
    'Zijie',
    'Zinedine',
    'Zion',
    'Zishan',
    'Ziya',
    'Ziyaan',
    'Zohaib',
    'Zohair',
    'Zoubaeir',
    'Zubair',
    'Zubayr',
    'Zuriel',
    'Xander',
    'Jared',
    'Courtney',
    'Gillian',
    'Clark',
    'Jared',
    'Grace',
    'Kelsey',
    'Tamar',
    'Alex',
    'Mark',
    'Tamar',
    'Farish',
    'Sarah',
    'Nathaniel',
    'Parker',
  ];

const addDateSuffix = date => {
  let dateStr = date.toString();

  const lastChar = dateStr.charAt(dateStr.length - 1);

  if (lastChar === '1' && dateStr !== '11') {
      dateStr = `${dateStr}st`;
  } else if (lastChar === '2' && dateStr !== '12') {
      dateStr = `${dateStr}nd`;
  } else if (lastChar === '3' && dateStr !== '13') {
      dateStr = `${dateStr}rd`;
  } else {
      dateStr = `${dateStr}th`;
  }

  return dateStr;
};

module.exports = (
  timestamp,
  { monthLength = 'short', dateSuffix = true } = {}
) => {
  let months;

  if (monthLength === 'short') {
      months = {
          0: 'Jan',
          1: 'Feb',
          2: 'Mar',
          3: 'Apr',
          4: 'May',
          5: 'Jun',
          6: 'Jul',
          7: 'Aug',
          8: 'Sep',
          9: 'Oct',
          10: 'Nov',
          11: 'Dec'
      };
  } else {
      months = {
          0: 'January',
          1: 'February',
          2: 'March',
          3: 'April',
          4: 'May',
          5: 'June',
          6: 'July',
          7: 'August',
          8: 'September',
          9: 'October',
          10: 'November',
          11: 'December'
      };
  }

  const dateObj = new Date(timestamp);
  const formattedMonth = months[dateObj.getMonth()];

  let dayOfMonth;

  if (dateSuffix) {
      dayOfMonth = addDateSuffix(dateObj.getDate());
  } else {
      dayOfMonth = dateObj.getDate();
  }

  const year = dateObj.getFullYear();

  let hour;
  // 24 hour time
  if (dateObj.getHours > 12) {
      hour = Math.floor(dateObj.getHours() / 2);
  } else {
      hour = dateObj.getHours();
  }
  // If hour is 0 (12 AM), change it to 12
  if (hour === 0) {
      hour = 12;
  }

  const minutes = dateObj.getMinutes();

  // Set AM or PM
  let periodOfDay;

  if (dateObj.getHours() >= 12) {
      periodOfDay = 'pm';
  } else {
      periodOfDay = 'am';
  }

  const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

  return formattedTimeStamp;
};