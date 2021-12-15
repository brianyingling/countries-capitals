
import styles from './styles.module.scss';

const Capitals = ({children}) => (
    <div className={styles.capitals}>
        { children }
    </div>
);

export default Capitals;