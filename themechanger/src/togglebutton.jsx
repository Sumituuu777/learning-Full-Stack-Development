import { useContext } from "react"
import themecontext from "./themecontext"

function Togglebutton(){

    const {theme,Togglehandler}=useContext(themecontext);
    return(
        <>
        <button 
        className={`border-2 rounded ${theme==='light'?'bg-gray-200 text-gray-800':'bg-gray-800 text-gray-200'}`}
        onClick={Togglehandler}
        >change theme to {theme==='light'?'dark':'light'}

        </button>
        </>
    )
}
export default Togglebutton