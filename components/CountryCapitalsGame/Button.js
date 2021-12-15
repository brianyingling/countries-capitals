import classNames from 'classnames';
import styles from './styles.module.scss';

const Button = ({
    selectedElement,
    element,
    isInvalidMatch,
    setSelectedElement,
    setCount
}) => (
    <button 
        className={classNames({
            [styles.selected]: selectedElement === element,
            [styles.invalidMatch]: selectedElement === element && isInvalidMatch
        })}
        key={element}
        onClick={() => {
            setCount(count => count + 1);
            setSelectedElement(element);
        }}
    >
        {element}
    </button>
);

export default Button;