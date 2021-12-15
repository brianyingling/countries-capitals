import CountryCapitalsGame from '../components/CountryCapitalsGame'

export default function Home() {

  const data = {
    'United States':'Washington',
    'Germany':'Berlin',
    'Japan':'Tokyo',
    'China':'Beijing',
    'Australia':'Canberra',
    'United Kingdom':'London',
    'France':'Paris'
  }
  
  return (
    <CountryCapitalsGame data={data}/>
  )
}
