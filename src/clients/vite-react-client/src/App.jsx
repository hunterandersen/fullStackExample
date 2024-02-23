import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [heroData, setHeroData] = useState([]);
  const [modalData, setModalData] = useState({ isOpen : false });
  const [modalInputText, setModalInputText] = useState("");

  function handleEditClick(id) {
    //Find the one hero that needs updating
    const data = heroData.find((hero) => hero.heroID == id);
    //Start the modal's text as whatever the current hero description is set to
    setModalInputText(data.description);
    //Provide all the current hero data to the modal and set it to shown
    setModalData({...data, isOpen : true});
  }

  function handleInputChange(event) {
    setModalInputText(event.target.value);
  }

  function handleModalSubmit(event) {
    event.preventDefault();
    //Copy and update the data
    const copyHeroData = [...heroData];
    const index = copyHeroData.findIndex(hero => hero.heroID == modalData.heroID);
    copyHeroData[index] = {...copyHeroData[index], description: modalInputText};
    //Submit the data back to the server
    fetch(`http://localhost:${import.meta.env.VITE_PORT}/api/hero/${modalData.heroID}`, {
      method: "PUT",
      body: JSON.stringify(copyHeroData[index]),
      headers: {
        "content-type": "application/json"
      },
    })
    .then((res) => res.json())
    .then((data) => {
      //Once the PUT method has completed, then fetch the updated info from the server
      //This may feel strange, but it's best to keep 1 source of truth for our data
      //In this case, we hold the server's data as the "truest", most correct version of our data
      fetchHeros();
    })
    .catch(console.error);
    
    //Close the modal
    setModalData({ isOpen: false });
  }

  function fetchHeros() {
    /*
     * For more info on how Vite handles .env files: https://vitejs.dev/guide/env-and-mode
     * Keep in mind, client-side environment variables are NOT secure. 
     * DO NOT store sensitive information on the client
     */
    fetch(`http://localhost:${import.meta.env.VITE_PORT}/api/hero`)
    .then(res => res.json())
    .then(data => setHeroData(data))
    .catch(console.error);
  }

  useEffect(() => {
    fetchHeros();
    //This dependency array will only allow this callback function to execute
    //when the values inside of it are different from the last time useEffect was attempted
  }, []);

  return (
    <>
      <h1>Marvel Heros</h1>
      <h2>Superheros List</h2>
      {modalData.isOpen && 
        <form className="modal" onSubmit={handleModalSubmit}>
          <h2>Edit {modalData.name}'s Description</h2>
          <textarea
            className="modal-textarea" 
            type="text" 
            name="modalInputDescr" 
            id="modalInputDescr" 
            onChange={handleInputChange}
            value={modalInputText}
          />
          <button 
            className={`modal-submit ${modalInputText == modalData.description ? "noChange" : "change"}`}
          >
            Submit
          </button>
        </form>
      }
      <ul>
        {heroData.map((hero) => {
          return <li key={hero.heroID}>
            <h3>{hero.name}</h3>
            <p>
              {hero.description} 
              <button onClick={() => handleEditClick(hero.heroID)} className="button-edit" title="Edit Description">
                <div className="icon-edit">&#9998;</div>
              </button>
            </p>
            <img src={hero.imgPath} alt={hero.name} />
          </li>
        })}
      </ul>
    </>
  )
}

export default App;