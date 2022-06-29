import React from "react";
import '../App.css'
import './singlecard.css'
function Singlecard({card , handleChoice , flipped}){
     
       // function to handleClick
          const  handleClick = () => {
               handleChoice(card)
          }
       return ( <div className='card-grill'>
          {/* use a ternary operator to determine classname based on the prop flipped */}
               <div className={flipped ? "flip" : "" }>
                    <img className='card front' src={card.src} />
                    <img className='card back' src="/img/cover.png" alt="back" onClick={handleClick}></img>
               </div>
            </div>
       )
}

export default Singlecard