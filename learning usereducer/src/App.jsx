import { useReducer } from "react"
const initalval =0;
  const reducerfunc=(currentval,action)=>{
    if(action.type==="INCREMENT"){
     return currentval+=1;
    }else if(action.type==="DECREMENT"){
      return currentval-=1;
    }
  }
function App() {
  const[state,disptach]=useReducer(reducerfunc,initalval);

  const incrhandler=()=>{
    disptach({
      type:"INCREMENT"
    })
  }
  const decrhandler=()=>{
    disptach({
      type:"DECREMENT"
    })
  }
  return (
    <>
      <h1>count:{state}</h1>
      <button onClick={incrhandler}>Increment</button>
      <button onClick={decrhandler}>Decrement</button>
    </>
  )
}

export default App
