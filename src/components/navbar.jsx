import styles from '../styles/navbar.module.sass'

export default function Navbar() {

  return (
    <div className={styles.wrapper}>
      <div className={styles.nav}>
        <div className={styles.sitename}>天氣預報</div>
      </div>
    </div>
  )
}
