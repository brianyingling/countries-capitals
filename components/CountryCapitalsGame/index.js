
import { useEffect, useState } from 'react';
import { useCapitals } from '../../hooks/useCapitals';
import { useCountries } from '../../hooks/useCountries';
import Countries from './Countries';
import Capitals from './Capitals';
import Congratulations from './Congratulations';
import Button from './Button';

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
                setMatchedCountry(state => ({ ...state, ...{ [selectedCountry]: true } } ));
                setMatchedCapital(state => ({ ...state, ...{ [selectedCapital]: true } } ));
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
        <>
            <Countries>
                { countries.map((country, i) => (
                    <Button 
                        element={country}
                        isInvalidMatch={isInvalidMatch}
                        key={`${country}-${i}`}
                        selectedElement={selectedCountry}
                        setSelectedElement={setSelectedCountry}
                        setCount={setCount}
                    />))
                }
            </Countries>
            <Capitals>
                { capitals.map((capital, i) => (
                    <Button 
                        element={capital}
                        isInvalidMatch={isInvalidMatch}
                        key={capital}
                        selectedElement={selectedCapital}
                        setSelectedElement={setSelectedCapital}
                        setCount={setCount}
                    />))
                }
            </Capitals>
        </>
    )
};

export default CountryCapitalsGame;