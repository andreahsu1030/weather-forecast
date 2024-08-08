import styles from '../styles/modal.module.sass'

export default function Modal({ children, onClose }) {
  return (
    <>
      <div className={styles.backdrop} onClick={onClose}></div>
      <dialog open className={styles.modal}>{children}</dialog>
    </>
    
  )
}
