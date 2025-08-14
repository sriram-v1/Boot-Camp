import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App({name,major,year}){
name="Sriram";
major="Information Technology";
year="4";
return(
  <>
  <h1>Sriram</h1>
  <p><strong>name:</strong>{name}</p> 
  <p><strong>major:</strong>{major}</p> 
  <p><strong>year:</strong>{year}</p>
  
  </>
)
}
export default App;
  