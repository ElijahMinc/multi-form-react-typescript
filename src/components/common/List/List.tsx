import { IUsersAPI } from '../../../types/usersAPItypes'
import styles from './List.module.scss'
interface IList {
  list: IUsersAPI[]
}

export const List: React.FC<IList> = ({ list }) => {
  return (
    <ul className={styles.list}>
      {!!list.length &&
        list.map((currentLi) => (
          <li key={currentLi.id} className={styles.item}>
            <div>
              <p>
                <span>Name: </span>
                {currentLi.data.step1.name}
              </p>
              <p>
                <span>Email:</span> {currentLi.data.step1.email}
              </p>
            </div>
          </li>
        ))}
    </ul>
  )
}
