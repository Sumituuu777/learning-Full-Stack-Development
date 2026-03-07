import { useContext } from "react";
import themecontext from "./themecontext";
const Heading = () => {
    const {theme}=useContext(themecontext);
    return (
        <div className={`rounded-2xl mt-10 mx-50 min-h-96 min-w-3 shadow-2xl
        ${theme==='light'?'bg-gray-200':'bg-gray-800'}`}>
            <p className= {`text-4xl ${theme==='light'?'text-gray-800':'text-gray-200'}`}>this is the content.</p>
        </div>
    )
}
export default Heading;