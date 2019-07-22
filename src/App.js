import React, {useState, useEffect, useRef} from 'react';
import './App.css';

function App() {

    let messagesBlock = useRef();
    let [messageText, setMessageText] = useState('');
    let [messages, setMessages] = useState([]);
    let [ws, setWS] = useState(null);

    if (ws) {
        ws.onmessage = ((messageEvent) => {
            let message = JSON.parse(messageEvent.data);
            setMessages([...messages, ...message])
        })
    }


    useEffect(() => {
        let wsLocal = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
        setWS(wsLocal);
    }, []);


    let sendMessage = () => {
        ws.send(messageText)
    };

    let onChangeTextMessage = (e) => {
        setMessageText(e.currentTarget.value)
    };

    return (
        <div className="App">
            <div className='content'>
                <div className='messages' ref={messagesBlock}>
                    {
                        messages.map((m, index) => <div key={index} className='message'>
                            <img src={m.photo}/> <b>{m.userName}</b> <span>{m.message}</span>
                        </div>)
                    }
                </div>
                <div>
                    <textarea onChange={onChangeTextMessage} value={messageText}/>
                </div>
                <div>
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default App;
