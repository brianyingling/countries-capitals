
import { useState } from 'react';
import classNames from 'classnames';
import { useCapitals } from '../../hooks/useCapitals';
import { useCountries } from '../../hooks/useCountries';
import Countries from './Countries';
import Capitals from './Capitals';
import Congratulations from './Congratulations';
import styles from './styles.module.scss';
import { useEffect } from 'react/cjs/react.development';

const CountryCapitalsGame = ({data}) => {
    const [count, setCount] = useState(0);
    const [isInvalidMatch, setIsInvalidMatch] = useState(false);
    
    const { 
        countries,
        setMatched: setMatchedCountry,
        selected: selectedCountry,
        setSelected: setSelectedCountry
    } = useCountries(Object.keys(data));
    
    const { 
        capitals,
        setMatched: setMatchedCapital,
        selected: selectedCapital,
        setSelected: setSelectedCapital
    } = useCapitals(Object.values(data));
    

    useEffect(() => {
        if (count % 3 === 0) {
            setSelectedCapital(null);
            setSelectedCountry(null);
            setIsInvalidMatch(false);
        }
    }, [count, isInvalidMatch, selectedCapital, selectedCountry]);

    useEffect(() => {
        if (selectedCountry && selectedCapital) {
            if (data[selectedCountry] === selectedCapital) {
                setMatchedCountry(state => [...state, selectedCountry]);
                setMatchedCapital(state => [...state, selectedCapital]);
            } else {
                setIsInvalidMatch(true)
            }
        }
    }, [selectedCountry, selectedCapital, isInvalidMatch])
    
    
    if (!countries || !capitals)
        return <div>Loading...</div>
    
    if (!countries.length && !capitals.length)
        return <Congratulations/>
    
    return (
        <div>
            <Countries countries={countries}>
                {   
                    countries.map((country, i) => {
                        return (
                            <button 
                                className={classNames({
                                    [styles.selected]: selectedCountry === country,
                                    [styles.invalidMatch]: selectedCountry === country && isInvalidMatch
                                })}
                                key={`${country}-${i}`}
                                onClick={() => {
                                    setCount(count => count + 1);
                                    setSelectedCountry(country);
                                }}
                            >
                                {country}
                            </button>
                        )
                    })
                }
            </Countries>
            <Capitals>
                { capitals.map((capital, i) => (
                    <button
                        className={classNames({
                            [styles.selected]: selectedCapital === capital,
                            [styles.invalidMatch]: selectedCapital === capital && isInvalidMatch
                        })}
                        key={`${capital}-${i}`}
                        onClick={() => {
                            setCount(count => count + 1);
                            setSelectedCapital(capital);
                        }}
                    >
                        {capital}
                    </button>
                )) }
            </Capitals>
        </div>
    )
};

export default CountryCapitalsGame;