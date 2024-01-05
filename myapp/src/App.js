import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io("http://localhost:5000");
function App() {
  const [chatActive, setChatActive] = useState("");
  const [userName, setUSername] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("recived-message", (message) => {
      setMessages([...messages, message]);
      console.log(messages);
    });
  }, [messages, socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(messages);
    const messageData = {
      message: newMessage,
      user: userName,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    newMessage == ""
      ? alert("Messga cannot be empty")
      : socket.emit("send-message", messageData);
    setNewMessage([" "]);
    
  };

  //image function
  const divStyle = {
    backgroundImage: 'url("/images/chat.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // width: '100%',
    height: '90vh',
    // borderRadius: '20px', // Adjust as needed
    position: 'relative', // Ensure z-index works as expected
  };

  return (
    <>
      <div className="w-screen h-screen justify-center items-center flex bg-purple-300" >
        {chatActive ? (
          <div>
            <div className="rounded-md w-full  md:w-[80vh] lg-w[40vh] mx-auto " style={divStyle} >
              <h1 className="text-center font-bold text-xl  mt-0 font-serif" style={{background:"rgb(239 223 218)"}}>
                TEAM CHAT
              </h1>
              <div>
                <div className="overflow-y-scroll h-[80vh] lg:h-[80vh]  focus:scroll-auto">
                  {messages.map((message, index) => {
                    return (
                      <div
                        key={index}
                        className={`flex rounded-full    my-3  w-fit px-2   
                  
                    ${userName === message.user && `ml-auto`}`}
                      >
                        <div
                          className={`bg-green-500 justify-center item-center flex rounded-l-md w-8 h-8 rounded-full
                    ${userName == message.user && `bg-blue-500`} `}
                        >
                          <h3 className="text-lg px-2 font-bold">
                            {message.user.charAt(0).toUpperCase()}
                          </h3>
                        </div>
                        <div className="px-7  bg-white rounded-md shadow-md ">
                          <span className="text-sm  " >{message.user}</span>
                          <div className="flex gap-8">
                          <h3 className="font-bold text-left">{message.message}</h3>
                          <p className=" text-right text-xs ">
                            {message.time}
                            </p> 
                          </div>
                        </div>
                      </div>
                    );  
                  })}
                </div>
                <form className="flex gap-3 md:gap-4 ">
                  <input
                    type="text"
                    name=""
                    id=""
                    className="px-3 py-2 border-2 w-full rounded-md text-black font-bold"
                    placeholder="type  here"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    style={{background:"rgb(239 223 218)"}}
                  />
                  <button
                    className=" rounded-md px-7 py-2  text-white font-bold "style={{background:"rgb(86 142 223)"}}
                    onClick={sendMessage}
                  >
                    {" "}
                    send{" "}
                  </button>
                </form>
              </div>  
            </div>
          </div>
        ) : (
          
          <div className="bg-purple-300 h-screen flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4 font-serif">Chat Application </h1>
          <div className="rounded-md w-full md:w-[80vh] lg-w-[40vh] mx-auto">
            <div className="flex flex-col items-center justify-center gap-2">
              <input
                type="text"
                id=" "
                value={userName}
                onChange={(e) => setUSername(e.target.value)} 
                placeholder="Enter username"
                className="text-center px-3 py-2 rounded-md border-2 outline-none"
              />
              <button
                type="submit"
                className="bg-green-500 text-black font font-semibold px-3 py-2 rounded-md"
                onClick={() => userName.trim() !== "" && setChatActive(true)}
              >
                Start Chat
              </button>
            </div>
          </div>
        </div>
        

        )}
      </div>
    </>
  );
}

export default App;
