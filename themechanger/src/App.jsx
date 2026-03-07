import {useState } from "react"
import Heading from "./heding"
import Togglebutton from "./togglebutton"
import themecontext from "./themecontext";

function App() {

const [theme,settheme]=useState('dark');

function Togglehandler(){
  console.log("ebkjbkudbwjc")
  settheme(currenttheme=>currenttheme==='light'?'dark':'light');
}
const contextobj={
  theme:theme,
  Togglehandler:Togglehandler,
}

  return (
    <themecontext.Provider value={contextobj}>
      <Heading />
      <Togglebutton/>
    </themecontext.Provider>
  )
}

export default App


      {/* <span class="material-symbols-outlined">
        favorite
      </span> */}