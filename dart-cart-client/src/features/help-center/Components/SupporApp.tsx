import React from 'react';
// import '../App.css';
import { Container } from './Container';
import { Filler } from './Filler';
const App = () => {
const triggerText = 'Open Form';
   const onSubmit = (event) => {
   event.preventDefault(event);
   console.log(event.target.name.value);
   console.log(event.target.email.value);
 };
return (
  <div className="App">
    <Filler />
    <Container triggerText={triggerText} onSubmit={onSubmit} />  
    
  </div>
  );
 };
 export default App;