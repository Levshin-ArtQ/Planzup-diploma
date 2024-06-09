export const parseDate = (dateString) => {
  try {
    const date = new Date(dateString);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const year = date.getFullYear();
    const isCurrentYear = year === currentYear;
    const isLessThanAMonth = date.getTime() - currentDate.getTime() < 30 * 24 * 60 * 60 * 1000;

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const parsedDate = date.toLocaleDateString('ru-RU', options);

    if (!isCurrentYear || isLessThanAMonth) {
      return `${parsedDate} ${year}`;
    }

    return parsedDate;
  } catch (error) {
    return dateString;
  }
};

export const parseTime = (timeString) => {
  try {
    const time = new Date(timeString);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
    };
    return time.toLocaleTimeString('ru-RU', options);
  } catch (error) {
    return timeString;
  }
};

export const parseTimezone = (dateString) => {
  try {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    const sign = offset > 0 ? '-' : '+';
    const absOffset = Math.abs(offset) / 60;
    if (absOffset === 3) {
      return '(МСК)';
    }
    if (absOffset === 5) {
      return '(ЧЕЛ)';
    }
    return '';
  } catch (error) {
    return '';
  }
};


export const parseMinutes = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const minutesString = remainingMinutes === 0 ? '' : ` ${remainingMinutes}м`;
  return `${hours}ч${minutesString}`;
};

export const greetUserByTime = () => {
  const date = new Date();
  const hours = date.getHours();
  let message = '';
  if (hours > 6) {
    message = 'Доброго утра';
  } else if (hours > 12) {
    message = 'Доброго дня';
  } else if (hours > 18 && hours < 22) {
    message = 'Доброго вечера';
  } else {
    message = 'Доброй ночи';
  }
  return message;
};
