// import "./Modalwin.css";

const ModalWin = (cards , allTrue) => {



    return  <div className={cards.every(allTrue(cards)) && cards.length > 0 ? "" : "d-none" }>
                <h1> COMPLIMENTI HAI VINTO</h1>
            </div>
}


export default ModalWin;