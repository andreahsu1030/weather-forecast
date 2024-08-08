import './App.css'
import './normalize.css'
import Navbar from './components/navbar'
import Board from './components/board'
import SettingBoard from './components/setting-board'
import Modal from './components/modal'
import getMoment from './utils/getMoment'
import { useState } from 'react'
import useWeatherAPI from './hooks/useWeatherAPI'

function App() {
  const [currentLocation, setCurrentLocation] = useState('新北市')
  const [isSettingBoardVisible, setIsSettingBoardVisible] = useState(false)
  const moment = getMoment()
  const [currentWeather] = useWeatherAPI({currentLocation})
  
  const handleSettingVisible = () =>{
    setIsSettingBoardVisible(true)
  }

  const handleSettingClose = () =>{
    setIsSettingBoardVisible(false)
  }

  const handleLocationChange = (currentLocation) =>{
    setCurrentLocation(currentLocation)
  }


  return (
    <div className='wrapper'>
      <div className='container'>
        {isSettingBoardVisible && (
          <Modal onClose={handleSettingClose}>
            <SettingBoard onCancel={handleSettingClose} handleLocationChange={handleLocationChange}/>
          </Modal>
        )}
        <Navbar />
        <Board
          currentLocation={currentLocation}
          currentWeather={currentWeather}
          moment={moment}
          onOpen={handleSettingVisible} 
        />
      </div>
    </div>
  )
}

export default App
