class DateUtils {

  static getDateDetail(date) {
    if(!date) return "";
    const listingTime = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const options = { month: 'short', day: 'numeric' };
    const listingDate = date.toLocaleDateString('en-US', options);
    return `${listingDate} ${listingTime}`;
  }

  static getListingAvailability(d1, d2) {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const oneHour = oneDay/24; // minutes*seconds*milliseconds
    const timeDifference = date1.getTime() - date2.getTime();

    // divide time difference by number of milliseconds in a day
    const days = Math.round(Math.abs((timeDifference)/(oneDay)));
    const numDaysDescriptor = days == 1 ? "day" : "days";
    const dayString = `${days.toString()} ${numDaysDescriptor}`

    // divide time difference by number of milliseconds in an hour,
    // and subtract time from days above
    const hours = Math.round(Math.abs(timeDifference/oneHour) - days*24);
    const numHoursDescriptor = hours == 1 ? "hour" : "hours";
    const hourString = `${hours.toString()} ${numHoursDescriptor}`

    return `${dayString} ${hourString}`;
  }

}

export default DateUtils;
