import React from 'react';
export const Form = ({ onSubmit }) => {

    
return (
<form onSubmit={onSubmit}>
  <div className="form-group">
  <textarea name="styled-textarea" id="styled"  placeholder="Type your question here" className="text-area" />
    
  </div> 
  
  <div className="form-group">
    <button className="form-control btn btn-primary" type="submit"  >
      Submit
    </button>
</div>
</form>
);
};
export default Form;