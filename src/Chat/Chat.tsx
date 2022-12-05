import { useState, useRef, KeyboardEvent, useEffect, useCallback, ReactNode } from 'react';
import './Chat.css'
import gClient from '../Client';

interface ChatMessage {
  m: 'a';
  a: string;
  p: {
    name: string;
    id: string;
    _id: string;
    color: string;
    tag?: {
      color: string;
      id: string;
    }
  }
  t: number;
}

const initMessages: ChatMessage[] = [];

function Chat() {
  const [chatting, setChatting] = useState('');
  const [display, setDisplay] = useState('none');
  // const [display, setDisplay] = useState('unset');
  const [messages, setMessages] = useState(initMessages);

  const addMessage = (msg: any) => {
    setMessages([...messages, msg]);
  }

  const addMessages = (msgs: ChatMessage[]) => {
    setMessages([...messages, ...msgs])
  }

  gClient.on('a', (msg: any) => {
    addMessage(msg);
  });
  
  gClient.on('c', (msg: { m: 'c', c: ChatMessage[] }) => {
    let i = 0;
    addMessages(msg.c.sort((a: ChatMessage, b: ChatMessage) => Number(a.t > b.t)));
  });
  
  gClient.on('ch', (msg: any) => {
    if (!msg.ch) return;
    if (!msg.ch.settings) return;
    if (msg.ch.settings.chat) setDisplay('unset');
    else setDisplay('none');
  });

  const focus = () => {
    setChatting('chatting');
  }
  
  const unfocus = () => {
    setChatting('');
  }

  const toggleFocus = () => {
    if (chatting == 'chatting') {
      unfocus();
    } else {
      focus();
    }
  }

  globalThis.window.addEventListener('keydown', evt => {
    if (evt.key == 'Enter' || evt.key == 'Escape') {
      toggleFocus();
    }
  });

  return (
    <div id="chat" className={ chatting } style={{ display }}>
      <ul>{ messages.map<ReactNode>((msg: ChatMessage) => (
        <li key={`${msg.p._id}-${msg.t}`} style={{ color: msg.p.color, opacity: 1 }}>
          <span className='name'>{msg.p.name}:</span>
          <span className='message'>{msg.a}</span>
        </li>
      )) }</ul>
      <input id="chat-input" className="translate" maxLength={512} autoComplete="off" placeholder="You can chat with this thing."
          onFocus={ focus } onBlur={ unfocus } />
    </div>
  );
}

export default Chat
