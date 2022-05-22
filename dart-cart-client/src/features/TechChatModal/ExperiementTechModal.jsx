import ReactDom from "react-dom";
import "./finalModal.scss";
import Axios from 'axios';
import { useState } from 'react';
import {Modal, Form} from "react-bootstrap";
import axios from "axios";

const ExperiementTechModal = ({ showModal, handleClose, title, handleShow}) => {
    const [alias, setAlias] = useState('');
    const [comment, setComment] = useState('');




    // const [showModal, setShowModal] = useState(false);

    //stef added
    // const [showModal, setShowModal] = useState(false);

    // const handleClose = () => {
    //     setShowModal(false);
    // }

    // const handleShow = () => {
    //     setShowModal(true);
    // }

//
    const addComment = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/commentssection', {
            alias: alias,
            comment: comment,
        }).then(() => {
            setAlias('');
            setComment('');
        });
    };

    return (
        <>

            <button className="clickMe bubbly-button" onClick={handleShow}>
                Tech Support
            </button>

            <Modal
                show={showModal}
                onHide={handleClose}
                centered
            >

                <Modal.Header>
                    <h1> Header Content</h1>
                </Modal.Header>
                <Modal.Body>
                    <h1> Body Content</h1>
                </Modal.Body>
                <Modal.Footer>

                    <h1>Footer Content</h1>
                </Modal.Footer>
            </Modal>

        </>
    )
}



// ----------------------------------------------------------------------------------


// <Modal
//     className="modal"
//     show={showModal}
//     onHide={handleClose}
//     centered
// >
//
//     <Modal.Header>
//         <div className="modal_header">
//             {/*<button className="modal-close" onClick={() => close()}>*/}
//             {/*    Close*/}
//
//             {/*</button>*/}
//             <h2 className="modal_header-title ">{title}</h2>
//         </div>
//     </Modal.Header>
//     <Modal.Body>
//         {/*<div className="modal_content">*/}
//         {/*    {children}*/}
//         {/*</div>*/}
//     </Modal.Body>
//     <Modal.Footer>
//         <div className="modal_footer">
//             <Form.Control
//                 className=""
//                 type="text"
//                 name="comment"
//                 required
//                 value={comment}
//                 onChange={(event) => {
//                     setComment(event.target.value);
//                 }}
//             />
//
//             <button className="submit" type="submit">Submit</button>
//         </div>
//
//     </Modal.Footer>
// </Modal>




//----------------------------------------------------------------------------------
//// THIS IS THE OLD CDE
            {/*<div*/}
            {/*    className={`modalContainer ${show ? "show" : ""} `}*/}
            {/*    onClick={() => close()}*/}
            {/*>*/}


//                 <div className="modal" onClick={(e) => e.stopPropagation()}>
//                     {/*<header className="modal_header">*/}
//                     {/*    <button className="modal-close" onClick={() => close()}>*/}
//                     {/*        Close*/}
//
//                     {/*    </button>*/}
//                     {/*    <h2 className="modal_header-title ">{title}</h2>*/}
//                     {/*    <button className="close" onClick={() => close()}>*/}
//                     {/*        Close*/}
//                     {/*    </button>*/}
//                     {/*</header>*/}
//                     <main className="modal_content">{children}</main>
//                     <footer className="modal_footer">
//                         <input
//                             className=""
//                             type="text"
//                             name="comment"
//                             required
//                             value={comment}
//                             onChange={(event) => {
//                                 setComment(event.target.value);
//                             }}
//                         />
//                         <button className="submit ">Submit</button>
//                     </footer>
//                 </div>
//             {/*</div>*/}
//
//         </>,
//         document.getElementById("modal")
//     );
// };

export default ExperiementTechModal;
