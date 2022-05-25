import { useState } from "react";
import "./_modal.scss";
import Modal from "./FinalFinalModal";

function FinalFinalTwoWay() {
  const [modal, setModal] = useState(false);

  // const Toggle = () => setModal(!modal);
  const Toggle = () => setModal(true);


  var animateButton = function(e) {

    e.preventDefault();
    //reset animation
    e.target.classList.remove('animate');
    
    e.target.classList.add('animate');
    setTimeout(function(){
      e.target.classList.remove('animate');
    },700);
  };
  
  var bubblyButtons = document.getElementsByClassName("bubbly-button");
  
  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
  }

  return (
    <div className="App">
      {/*<button className="clickMe bubbly-button" onClick={() => Toggle()}>*/}
        <button className="clickMe bubbly-button" onClick="">
        Tech Support
      </button>

      <Modal show={modal} close={Toggle} title="Tech Support Chat">
        This is modal content for tech support

      </Modal>
    </div>

  );
}

export default FinalFinalTwoWay;
