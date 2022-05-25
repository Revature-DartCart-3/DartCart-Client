// import ReactDom from "react-dom";
// ///import "./_modal.scss";
// import Axios from 'axios';
// import { useState } from 'react';
// import axios from "axios";
//
// const FinalFinalModal = ({ show, close, title, children }) => {
//   const [alias, setAlias] = useState('');
//   const [comment, setComment] = useState('');
//
//   const addComment = (event) => {
//     event.preventDefault();
//     axios.post('http://localhost:3001/commentssection', {
//       alias: alias,
//       comment: comment,
//     }).then(() => {
//       setAlias('');
//       setComment('');
//     });
//   };
//
//   return ReactDom.createPortal(
//     <>
//       <div
//         className={`modalContainer ${show ? "show" : ""} `}
//         onClick={() => close()}
//       >
//            <div className="modal" onClick={(e) => e.stopPropagation()}>
//           <header className="modal_header">
//           <button className="modal-close" onClick={() => close()}>
//
//
//             </button>
//             <h2 className="modal_header-title ">{title}</h2>
//             <button className="close" onClick={() => close()}>
//             Close
//             </button>
//           </header>
//           <main className="modal_content">{children}</main>
//           <footer className="modal_footer">
//
//             <button className="submit">Submit</button>
//           </footer>
//         </div>
//       </div>
//
//     </>,
//     document.getElementById("modal")
//   );
// };
//
// export default FinalFinalModal;
