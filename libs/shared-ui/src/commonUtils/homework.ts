import { Timestamp } from '@bufbuild/protobuf';

export const remainingTimeInHours = (endTime?: Timestamp, fullTime?: boolean) => {
  if (!endTime) {
    return '0 hrs';
  }
  const time = new Timestamp(endTime).toDate();
  const currentTime = new Date();
  const timeDifference = time.getTime() - currentTime.getTime();

  if (timeDifference <= 0) {
    return '0 hrs';
  }

  const remainingTime = timeDifference / (1000 * 60 * 60); // converting milliseconds to hours
  if (remainingTime < 1) {
    const remainingMinutes = Math.round(remainingTime * 60); // converting to minutes
    return `${remainingMinutes} mins`;
  }

  const remainingTimeRounded = Math.round(remainingTime); // rounding to the nearest whole number

  if (remainingTimeRounded >= 24) {
    const days = Math.floor(remainingTimeRounded / 24);
    const hours = remainingTimeRounded % 24;
    if (hours === 0) {
      return fullTime ? `${days} days ` : `${days}D`;
    }
    return fullTime ? `${days} days ${hours} hrs` : `${days}D ${hours}H`;
  }

  return `${remainingTimeRounded} hrs`;
};
export const remainingTimeInHoursAndMins = (endTime?: Timestamp) => {
  if (!endTime) {
    return '0 mins';
  }

  const time = new Timestamp(endTime).toDate();
  const currentTime = new Date();
  const timeDifference = time.getTime() - currentTime.getTime();

  if (timeDifference <= 0) {
    return '0 mins';
  }

  const remainingTimeInMinutes = timeDifference / (1000 * 60); // converting milliseconds to minutes
  const remainingDays = Math.floor(remainingTimeInMinutes / (24 * 60)); // calculate remaining days
  const remainingHours = Math.floor((remainingTimeInMinutes % (24 * 60)) / 60); // calculate remaining hours
  const remainingMinutes = Math.floor(remainingTimeInMinutes % 60); // calculate remaining minutes

  if (remainingDays > 0) {
    return `${remainingDays}D ${remainingHours}H ${remainingMinutes}M`;
  } else if (remainingHours > 0) {
    return `${remainingHours}H ${remainingMinutes}M`;
  } else {
    return `${remainingMinutes}M`;
  }
};
export function roundNumberTo2Decimal(value: number): number {
  const isWholeNumber = value % 1 === 0;
  return isWholeNumber ? value : Math.round(value * 100) / 100;
}
