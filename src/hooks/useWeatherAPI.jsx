import { useState, useEffect, useCallback } from 'react'
const API_KEY = 'CWA-8821415F-BA8A-4B45-950C-44668565E265'
const BASE_URL = 'https://opendata.cwa.gov.tw/api/'

const now = new Date()
const nowDate = Intl.DateTimeFormat('zh-TW', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
})
  .format(now)
  .replace(/\//g, '-')

const getWeatherElements = (location) => {
  return fetch(
    `${BASE_URL}/v1/rest/datastore/F-D0047-091?Authorization=${API_KEY}&locationName=${location}`
  )
    .then((res) => res.json())
    .then((data) => {
      const locationData = data.records.locations[0].location[0]
      return {
        locationName: locationData.locationName,
        rainProbability:
          locationData.weatherElement[0].time[0].elementValue[0].value,
        TEMP: locationData.weatherElement[1].time[0].elementValue[0].value,
        humid: locationData.weatherElement[2].time[0].elementValue[0].value,
        description:
          locationData.weatherElement[6].time[0].elementValue[0].value,
        L: locationData.weatherElement[8].time[0].elementValue[0].value,
        H: locationData.weatherElement[12].time[0].elementValue[0].value,
        weatherCode:
          locationData.weatherElement[6].time[0].elementValue[1].value
      }
    })
}

const getSunriseSunset = (location) => {
  return fetch(
    `${BASE_URL}/v1/rest/datastore/A-B0062-001?Authorization=${API_KEY}&CountyName=${location}&Date=${nowDate}`
  )
    .then((res) => res.json())
    .then((data) => {
      
      const locationData = data.records.locations.location[0]
      return {
        sunriseTime: locationData.time[0].SunRiseTime,
        sunsetTime: locationData.time[0].SunSetTime
      }
    })
}

const getMoonriseMoonset = (location) => {
  return fetch(`${BASE_URL}v1/rest/datastore/A-B0063-001?Authorization=${API_KEY}&CountyName=${location}&Date=${nowDate}
  `)
    .then((res) => res.json())
    .then((data) => {
      const locationData = data.records.locations.location[0]
      return {
        moonriseTime: locationData.time[0].MoonRiseTime,
        moonsetTime: locationData.time[0].MoonSetTime
      }
    })
}

const daytimeFilter = (data) => {
  return data.filter((item) => item.startTime.includes('06:00:00'))
}

const getWeeklyPrediction = (location) => {
  return fetch(
    `${BASE_URL}v1/rest/datastore/F-D0047-091?Authorization=${API_KEY}&locationName=${location}`
  )
    .then((res) => res.json())
    .then((data) => {
      const weeklyTem =
        data.records.locations[0].location[0].weatherElement[1].time
      const weeklyCode =
        data.records.locations[0].location[0].weatherElement[6].time
      
      const filteredDaytimeCode = daytimeFilter(weeklyCode)
      const filteredDaytimeTem = daytimeFilter(weeklyTem)
      const weeklyDaytimeInfo = filteredDaytimeTem.map((neededInfo, index) => {
        const date = new Date(neededInfo.startTime)
        const month = date.getMonth() + 1 
        const day = date.getDate()
        return {
          month,
          day,
          tem: neededInfo.elementValue[0].value,
          weatherCode: filteredDaytimeCode[index]?.elementValue[1]?.value || "N/A" // 添加天氣現象編號
        }
      })
      return weeklyDaytimeInfo
    })
}

const useWeatherAPI = ({ currentLocation }) => {
  const [currentWeather, setCurrentWeather] = useState([])
  const fetchData = useCallback(async () => {
    setCurrentWeather((prev) => ({
      ...prev
    }))
    const [sunriseSunset, moonriseMoonSet, weatherElements, weekPredicted] =
      await Promise.all([
        getSunriseSunset(currentLocation),
        getMoonriseMoonset(currentLocation),
        getWeatherElements(currentLocation),
        getWeeklyPrediction(currentLocation)
      ])
    setCurrentWeather({
      ...sunriseSunset,
      ...moonriseMoonSet,
      ...weatherElements,
      weeklyDaytimeInfo: weekPredicted
    })
  }, [currentLocation])
  
  useEffect(() => {
    fetchData()
  }, [fetchData])
  return [ currentWeather ]
}

export default useWeatherAPI
