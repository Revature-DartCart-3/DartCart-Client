import { useState } from "react";
import "./finalModal.scss";
import TechModal from "./TechModal";
import ExperiementTechModal from "./ExperiementTechModal";
import {Modal, Form} from "react-bootstrap";
import axios from "axios";


// ExperiementTechModal

function FinalTechChatModalGroup() {
  const [modal, setModal] = useState(false);
  const [alias, setAlias] = useState('');
  const [comment, setComment] = useState('');



//STEFAN STATES
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    console.log(showModal);
  }

  const handleShow = () => {
    setShowModal(true);
    console.log(showModal);

  }

  const addComment = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/commentssection', {
      alias: alias,
      comment: comment,
    }).then(() => {
      setAlias('');
      setComment('');
    });

    alert("You concern is being passed to tech support: You are in the queue");

  };





  // const Toggle = () => setModal(!modal);
 
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
    <div className="">
      
      {/*<button className="clickMe bubbly-button" onClick={() => Toggle()}>*/}
      {/*  Tech Support*/}
      {/*</button>*/}


      {/*<ExperiementTechModal show={showModal}  onHide={handleClose} handleShow={handleShow}/>*/}


      {/*<ExperiementTechModal show={showModal}  onHide={handleClose} handleShow={handleShow}/>*/}
        This is modal content for tech support


      {/*The originial here*/}
      {/*<TechModal show={modal} close={Toggle} title="Tech Support Chat">*/}
      {/*  This is modal content for tech support*/}

      {/*</TechModal>*/}




      <button className="clickMe bubbly-button" onClick={handleShow}>
        Tech Support
      </button>


      <Modal
              className="modal"
              show={showModal}
              onHide={handleClose}
              centered
          >

              <Modal.Header>
                  <div className="modal_header">
                      {/*<button className="modal-close" onClick={() => close()}>*/}
                      {/*    Close*/}

                      {/*</button>*/}
                      <h2 className="modal_header-title ">Tech Support Chat</h2>
                  </div>
              </Modal.Header>
              <Modal.Body>
                  {/*<div className="modal_content">*/}
                  {/*    {children}*/}
                  {/*</div>*/}

                <Form.Control
                    className=""
                    type="text"
                    name="comment"
                    placeholder="What is your problem"
                    required
                    value={comment}
                    onChange={(event) => {
                      setComment(event.target.value);
                    }}
                />

              </Modal.Body>
              <Modal.Footer>
                  <div className="modal_footer">
                      <button
                          className="submit"
                          type="submit"
                          onClick
                      >
                        Submit
                      </button>
                  </div>

              </Modal.Footer>
          </Modal>

    </div>
  );
}

export default FinalTechChatModalGroup;
