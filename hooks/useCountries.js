import { useEffect, useState } from "react"
import { shuffle } from '../utils';

const useCountries = values => {
    const [countries, setCountries] = useState(null);
    const [selected, setSelected] = useState(null);
    const [matched, setMatched ] = useState({});

    useEffect(() => {
        setCountries(shuffle(values));
    }, []);
    
    return {
        countries: countries && countries.filter(country => !matched[country]),
        matched,
        setMatched,
        selected,
        setSelected
    }
}

export { useCountries }