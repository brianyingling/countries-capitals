import { useEffect, useState } from "react"
import { shuffle } from '../utils';

const useCapitals = values => {
    const [capitals, setCapitals] = useState(null);
    const [selected, setSelected] = useState(null);
    const [matched, setMatched ] = useState({});

    useEffect(() => {
        setCapitals(shuffle(values));
    }, []);

    return {
        capitals: capitals && capitals.filter(capital => !matched[capital]),
        matched,
        setMatched,
        selected,
        setSelected
    }
}

export { useCapitals };