export default function getMoment( sunriseTime, sunsetTime ){
  const now = new Date()
  const hours = String(now.getHours()).padStart(2,'0')
  const minutes = String(now.getMinutes()).padStart(2,'0')
  const nowTimeStamp = `${hours}:${minutes}`


 return sunriseTime <= nowTimeStamp && nowTimeStamp <= sunsetTime ? 'day' : 'night'
}