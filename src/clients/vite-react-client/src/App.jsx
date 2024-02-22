import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [heroData, setHeroData] = useState([]);

  useEffect(() => {
    /*
     * For more info on how Vite handles .env files: https://vitejs.dev/guide/env-and-mode
     * Keep in mind, client-side environment variables are NOT secure. 
     * DO NOT store sensitive information on the client
     */
    fetch(`http://localhost:${import.meta.env.VITE_PORT}/api/hero`)
    .then(res => res.json())
    .then(data => setHeroData(data))
    .catch(console.error);
  }, []);

  return (
    <>
      <h1>Marvel Heros</h1>
      <h2>Superheros List</h2>
      <ul>
        {heroData.map((hero) => {
          return <li key={hero.heroID}>
            <h3>{hero.name}</h3>
            <p>{hero.description}</p>
            <img src={hero.imgPath} alt={hero.name} />
          </li>
        })}
      </ul>
    </>
  )
}

export default App
