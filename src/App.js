import { useEffect , useState } from 'react'
import './App.css'
import Singlecard from './components/Singlecard'

// array of images
const cardImages = [
  { "src" : "/img/helmet-1.png" , matched:false},
  { "src" : "/img/potion-1.png" , matched:false},
  { "src" : "/img/ring-1.png" , matched:false},
  { "src" : "/img/scroll-1.png" , matched:false},
  { "src" : "/img/shield-1.png" , matched:false},
  { "src" : "/img/sword-1.png" , matched:false},
]

function App() {
  
  // using state to set cards
  const [cards,setCards] = useState([])
  // setting state to understand if the card is turned
const [turns , setTurns] = useState(0)


// setting choice state
const [firstChoice , setFirstChoice] = useState(null)
const [secondChoice , setSecondChoice] = useState(null)
  

  // function to have random cards on the grill
  const randomizeCards = () =>{
    const randomizedCards = [...cardImages,...cardImages].sort(() => Math.random()-0.5).map((card) => ({...card , id: Math.random()}))
    setCards(randomizedCards)
    setTurns(0)  
  }
 
  // function to handleChoice
  const  handleChoice = (card) => {
    // use ternal operator to set the choise
    firstChoice ? setSecondChoice(card) : setFirstChoice(card)
    console.log(firstChoice + "è la prima scelta", secondChoice + "è la seconda scelta")
  }



  // i use useeffect to compare 2 cards
useEffect(() =>{
  if(firstChoice && secondChoice){

    if(firstChoice.src !== secondChoice.src){
      setTimeout(() => resetTurns(), 3000);
            
    }else{
      setCards( prevCards => {
        return prevCards.map(card => {
          if(card.src === firstChoice.src || card.src === secondChoice){

            //i use spread operator to create a new object with matched proprierty , true
            return {...card , matched:true}            
          }else{

            return  card
          }
          
        })        
      })
      determineWin();
      resetTurns();
    }
  }
}, [firstChoice , secondChoice] )

const resetTurns = () => {
  setFirstChoice(null)
  setSecondChoice(null)
  setTurns(prevTurns => prevTurns +1)
}

// Determine when the user won the game
const allTrue = (card) => card.matched === true;


//! da trasformare da console log in una modale!
const determineWin = () => {
  if(cards.every(allTrue) && cards.length > 0){
    console.log('complimenti hai vinto')
  }else{
    console.log('non hai ancora vinto')
  }
}


return (
    <div className="App">
      <h1>Memory</h1>
      <button onClick={randomizeCards}>Start Game</button>
      <h1>Moves: {turns}</h1>
      <h1 className={cards.every(allTrue) && cards.length > 0  ? "" : "d-none" }> HAI VINTO</h1>

      {/* grill section */}
      {cards.map(card =>(
      <Singlecard 
      key={card.id} 
      card={card} 
      handleChoice={handleChoice}
      flipped={ card === firstChoice || card === secondChoice || card.matched}
      disabled={firstChoice && secondChoice}
      />
        )
        )
      }
    </div>
  );
}

export default App