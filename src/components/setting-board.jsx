import styles from '../styles/setting-board.module.sass'
import availableLocations from '../utils/availableLocations'
import { useState } from 'react'


export default function SettingBoard({ onCancel, handleLocationChange, currentLocation }) {
  const [locationName, setLocationName] = useState(currentLocation) 
  const handleSelected = (e) =>{
    setLocationName(e.target.value)
  }

  const handleSaved = () =>{
    handleLocationChange(locationName)
    onCancel()
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>地區</div>
      <div>
        <select onChange={handleSelected} value={locationName} name="location" id="location">
          {availableLocations.map(item => (
            <option key={item} value={item}>{item}</option>
            
          ))}
        </select>
      </div>
      <div className={styles.actions}>
        <button onClick={handleSaved} className={styles.save}>儲存</button>
        <button onClick={onCancel} className={styles.cancel}>取消</button>
      </div>
    </div>
  )
}
