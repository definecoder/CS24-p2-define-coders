export default function formatTimestamp(timestamp : string) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    let minutes:(string | number) = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+ minutes : minutes;
  
    const strTime = hours + '.' + minutes + ' ' + ampm;
    return strTime;
  }
  