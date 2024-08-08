import { GiSnowing } from 'react-icons/gi'
import { GiRaining } from 'react-icons/gi'
import { TiWeatherCloudy } from 'react-icons/ti'
import { IoThunderstormOutline } from 'react-icons/io5'
import { IoSunnyOutline } from 'react-icons/io5'
import { BsCloudFog } from 'react-icons/bs'
import { WiNightAltSnow } from 'react-icons/wi'
import { WiNightAltThunderstorm } from 'react-icons/wi'
import { WiNightClear } from 'react-icons/wi'
import { WiNightAltCloudyWindy } from 'react-icons/wi'
import { WiNightAltCloudy } from 'react-icons/wi'
import { WiNightFog } from 'react-icons/wi'
import { WiNightAltRain } from 'react-icons/wi'
import { WiDayFog } from 'react-icons/wi'
import { useMemo } from 'react'

const weatherTypes = {
  isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
  isClear: [1],
  isCloudyFog: [25, 26, 27, 28],
  isCloudy: [2, 3, 4, 5, 6, 7],
  isFog: [24],
  isPartiallyClearWithRain: [
    8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39
  ],
  isSnowing: [23, 37, 42]
}

const weatherIcons = {
  day: {
    isThunderstorm: IoThunderstormOutline,
    isClear: IoSunnyOutline,
    isCloudyFog: BsCloudFog,
    isCloudy: TiWeatherCloudy,
    isFog: WiDayFog,
    isPartiallyClearWithRain: GiRaining,
    isSnowing: GiSnowing
  },
  night: {
    isThunderstorm: WiNightAltThunderstorm,
    isClear: WiNightClear,
    isCloudyFog: WiNightAltCloudyWindy,
    isCloudy: WiNightAltCloudy,
    isFog: WiNightFog,
    isPartiallyClearWithRain: WiNightAltRain,
    isSnowing: WiNightAltSnow
  }
}

const findWeatherIcon = (weatherCode) => {
  const [weatherType] = Object.entries(weatherTypes).find(([weatherType, weatherCodes]) =>
    weatherCodes.includes(Number(weatherCode))
  ) || []
  return weatherType
}

export default function WeatherIcon({ weatherCode, moment, size, color }) {
  const weatherType = useMemo(() => {
    return findWeatherIcon(weatherCode)
  }, [weatherCode])
  
  const IconComponent = weatherIcons[moment][weatherType]
  
  if (!IconComponent) {
    return null
  }

  return (
    <IconComponent size={size} color={color} />
  )
}