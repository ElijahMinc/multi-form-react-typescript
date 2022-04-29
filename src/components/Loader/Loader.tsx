import loader from './loader.svg'
import styles from './Loader.module.scss'

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loaderContainer}>
        <img src={loader} alt="loader" />
      </div>
    </div>
  )
}
