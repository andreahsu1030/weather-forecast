import styles from '../styles/board.module.sass'
import { LuDroplets } from 'react-icons/lu'
import { LuSunrise } from 'react-icons/lu'
import { LuSunset } from 'react-icons/lu'
import { WiMoonrise } from 'react-icons/wi'
import { WiMoonset } from 'react-icons/wi'
import { IoUmbrellaSharp } from 'react-icons/io5'
import WeatherIcon from './weatherIcon'
import { RiErrorWarningFill } from 'react-icons/ri'
import { FaSearchLocation } from 'react-icons/fa'

export default function Board({ currentWeather, moment, onOpen }) {
  const weeklyWeather = currentWeather.weeklyDaytimeInfo

  return (
    <div className={styles.wrapper}>
      <div className={styles.board}>
        <div className={styles.setting}>
          <button onClick={onOpen}>
            <FaSearchLocation size={20} /> <span>搜尋城市</span>
          </button>
        </div>
        <div className={styles.description}>
          <div className={styles.location}>{currentWeather.locationName}</div>

          <div className={styles.weather}>
            <WeatherIcon
              weatherCode={currentWeather.weatherCode}
              moment={moment}
              size={50}
              color={'#002233'}
            />

            <div className={styles.description}>
              {currentWeather.description}
            </div>
          </div>

          <div className={styles.detail}>
            <div className={styles.temperature}>
              {Math.round(currentWeather.TEMP)} <span>°C</span>
            </div>
            <div className={styles.info}>
              <div className={styles.humid}>
                <LuDroplets
                  size={20}
                  color='#002233'
                />
                <span>{currentWeather.humid}%</span>
              </div>
              <div className={styles.rain}>
                <IoUmbrellaSharp
                  size={20}
                  color='#002233'
                />

                <span>{currentWeather.rainProbability}%</span>
              </div>
            </div>
            <div>
              最高:{Math.round(currentWeather.H)}
              最低:{Math.round(currentWeather.L)}
            </div>
          </div>
        </div>

        <div className={styles['rise-set']}>
          <div className={styles.sunrise}>
            <LuSunrise size={40} />
            <p className={styles.time}>{currentWeather.sunriseTime}</p>
          </div>
          <div className={styles.sunset}>
            <LuSunset size={40} />
            <p className={styles.time}>{currentWeather.sunsetTime}</p>
          </div>
          <div className={styles.moonrise}>
            <WiMoonrise size={43} />
            <p className={styles.time}>{currentWeather.moonriseTime}</p>
          </div>
          <div className={styles.moonset}>
            <WiMoonset size={43} />
            <p className={styles.time}>{currentWeather.moonsetTime}</p>
          </div>
        </div>

        <div className={styles.weeklyInfo}>
          {weeklyWeather &&
            weeklyWeather.map((item, index) => (
              <div
                className={styles.weeklyPredict}
                key={index}
              >
                <div className={styles.day}>
                  <div className={styles.date}>
                    {item.month}/{item.day}
                  </div>
                  <div className={styles.icon}>
                    {
                      <WeatherIcon
                        weatherCode={item.weatherCode}
                        moment={'day'}
                        size={25}
                        color={'#002233'}
                      />
                    }
                  </div>
                  <div className={styles.dayTem}>
                    {item.tem} <span>°C</span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {currentWeather.weatherAlert && (
          <div className={styles['weather-alert']}>
            <RiErrorWarningFill
              size='30'
              color='red'
            />
            <span>warning description</span>
          </div>
        )}
      </div>
    </div>
  )
}
