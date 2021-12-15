/**
 * @jest-environment jsdom
 */

import {render, fireEvent, waitFor, screen } from '@testing-library/react'
import CountryCapitalsGame from '..';

const data = {
    'United States':'Washington',
    'Germany':'Berlin',
    'Japan':'Tokyo',
    'China':'Beijing',
    'Australia':'Canberra',
    'United Kingdom':'London',
    'France':'Paris'
};

  const countriesCapitals = [
    [/United States/, /Washington/],
    [/China/, /Beijing/],
    [/France/, /Paris/],
    [/United Kingdom/, /London/],
    [/Germany/, /Berlin/],
    [/Australia/, /Canberra/],
    [/Japan/, /Tokyo/]
];

describe('<CountryCapitalsGame/>', () => {
    
    it('renders', async () => {
        render(<CountryCapitalsGame data={data}/>);
        for (let pair of countriesCapitals) {
            const [country, capital] = pair;
            expect(screen.getByText(country)).toBeInTheDocument();
            expect(screen.getByText(capital)).toBeInTheDocument();
        }
    });

    it('removes the country-capital combination when the user makes a successful match', () => {
        render(<CountryCapitalsGame data={data}/>);
        const selectedCountry = screen.getByText(/United States/);
        fireEvent.click(selectedCountry);

        const selectedCapital = screen.getByText(/Washington/);
        fireEvent.click(selectedCapital);

        // clicking the button again validates the match and removes them from the board
        fireEvent.click(selectedCapital);

        expect(screen.queryByText(/United States/)).not.toBeInTheDocument();
        expect(screen.queryByText(/Washington/)).not.toBeInTheDocument();
    });

    it('does not remove the country-capital combination when the user fails to make a successful match', () => {
        render(<CountryCapitalsGame data={data}/>);
        const selectedCountry = screen.getByText(/China/);
        fireEvent.click(selectedCountry);

        const selectedCapital = screen.getByText(/Paris/);
        fireEvent.click(selectedCapital);

        // clicking the button again validates the match and removes them from the board
        fireEvent.click(selectedCapital);

        expect(screen.queryByText(/United States/)).toBeInTheDocument();
        expect(screen.queryByText(/Washington/)).toBeInTheDocument();
    });

    it('displays "Congratulations!" when all of the country-capital combinations have been matched', async () => {
        render(<CountryCapitalsGame data={data}/>);

        for (let pair of countriesCapitals) {
            const [country, capital] = pair;
            const selectedCountry = await screen.findByText(country);
            
            // clicking the button again validates the match and removes them from the board
            fireEvent.click(selectedCountry);
            fireEvent.click(selectedCountry);
            
            const selectedCapital = await screen.findByText(capital);
            fireEvent.click(selectedCapital);
            
            await waitFor(() => {
                expect(screen.queryByText(country)).not.toBeInTheDocument();
                expect(screen.queryByText(capital)).not.toBeInTheDocument();
            });
        };
        
        expect(await screen.findByText(/Congratulations!/)).toBeInTheDocument();
    });
});