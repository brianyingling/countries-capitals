import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
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
