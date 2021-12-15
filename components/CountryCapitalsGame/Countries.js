
import styles from './styles.module.scss';

const Countries = ({children}) => (
    <div className={styles.countries}>
        { children }
    </div>
)

export default Countries;