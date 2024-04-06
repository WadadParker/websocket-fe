import { useEffect, useState } from "react"

//  You can even crete a custom hook called useSocket which will have all useEffect logic for socket

function App() {
  const [socket,setSocket] = useState<null | WebSocket>(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(()=> {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () => {
      console.log('Connected')
    }
    socket.onmessage = (message) => {
      console.log('Recieved Message:' , message.data)
      setLatestMessage(message.data);
    }
    setSocket(socket)

    return ()=> {
      socket.close()
      //  Remember to close your websocket connections
    }
  },[])


  if(!socket) {
    return <div className=" text-5xl">Connecting to socket server...</div>
  }

  return (
    <div>
      <p className="text-3xl"> {latestMessage}</p>
      <input value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Enter message to send to websokcet" />
      <button onClick={()=>socket.send(message)} className="bg-red-400 text-white text-2xl p-3 rounded hover:bg-white hover:text-red-400">Send chat</button>
    </div>
  )
}

export default App
