import Axios from 'axios';
import './comment.css';
import { useState, useEffect } from 'react';

const AdminComments = () => {
  const [comments, setNewComments] = useState([]);
  const [newAdminReply, setNewAdminReply] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3001/commentssection').then((response) => {
      setNewComments(response.data);
    });
  });

  const updateComments = (id) => {
    Axios.put(`http://localhost:3001/commentssection/${id}`, {
      id: id,
      adminreply: newAdminReply,
      admin: 'Admin-Bot',
      time: 'Some time later...',
    })
      .then((_response) => {
        setNewComments(
          comments.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  alias: val.alias,
                  comment: val.comment,
                  adminreply: newAdminReply,
                }
              : val;
          })
        );
      })
      .then(() => {
        setNewAdminReply('');
      });
  };

  const deleteComments = (id) => {
    Axios.delete(`http://localhost:3001/commentssection/${id}`).then(
      (_response) => {
        setNewComments(
          comments.filter((val) => {
            return val.id !== id;
          })
        );
      }
    );
  };

  return (
    <div>
      {comments.map((val, key) => {
        return (
          <>
            <div className="comment-thread">
              <details open className="comment" id="comment-1">
                <div className="comment-info">
                  <div className="comment-author">{val.alias}</div>
                  <p className="m-0">Some time ago...</p>
                </div>
                <div className="comment-body">
                  <p>{val.comment}</p>
                </div>
                <div className="replies">
                  <div className="comment-info">
                    <div className="comment-author">{val.admin}</div>
                    <p className="m-0">{val.time}</p>
                  </div>
                  <div className="comment-body">
                    <p>{val.adminreply}</p>
                  </div>
                </div>
                <form>
                  <input
                    key={val.id}
                    type="text"
                    name="newAdminReply"
                    required
                    onChange={(event) => {
                      setNewAdminReply(event.target.value, val.id);
                    }}
                  />
                  <button
                    onClick={() => {
                      updateComments(val.id);
                    }}
                  >
                    Update
                  </button>
                </form>
                {/*THIS BUTTON TRIGGERS THE DELETE REQUEST */}
                <button
                  onClick={() => {
                    deleteComments(val.id);
                  }}
                >
                  {' '}
                  Delete{' '}
                </button>
              </details>
            </div>

            <div className="form">
              <div></div>
            </div>
          </>
        );
      })}
    </div>
  );
};
export default AdminComments;
