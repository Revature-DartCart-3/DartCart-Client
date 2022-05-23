import React from "react";
import { css } from "@emotion/react";

 class SupportApp extends React.Component<{}, { value: string }> {
    state: { value: string; };


    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
   setState(arg0: { value: any; }) {
     throw new Error("Method not implemented.");
   }
  
    handleSubmit(event) {
      alert('Your question is submitted: ' + this.state.value);
      event.preventDefault();
    }

    
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
          Tech Support: &nbsp; &#160; &#160;
          <textarea name="styled-textarea" id="styled"  value={this.state.value} placeholder="Type your question here" className="text-area" onChange={this.handleChange} />
        </label> &nbsp; &#160; &#160;
          <input type="submit" className="helpBtn" value="Submit" />
        </form>
      );
    }
  }

export default SupportApp;
