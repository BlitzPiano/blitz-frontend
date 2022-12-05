import { useState, useEffect, ReactNode } from 'react';
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

  

  const focus = () => {
    setChatting('chatting');
    const input = document.getElementById('chat-input');
    if (!input) return;
    input.focus();
  }
  
  const unfocus = () => {
    setChatting('');
    const input = document.getElementById('chat-input');
    if (!input) return;
    input.blur();
    // scroll to bottom
    let chatDiv = document.getElementById('chat');
    if (!chatDiv) return;
    let ul = chatDiv.getElementsByTagName('ul')[0];
    if (!ul) return;
    ul.scrollTop = ul.scrollHeight - ul.clientHeight;
  }

  const toggleFocus = () => {
    if (chatting === 'chatting') {
      unfocus();
    } else {
      focus();
    }
  }

  useEffect(() => {
    const keyDownHandler = (evt: KeyboardEvent) => {
      if (chatting === 'chatting') {
        if (evt.key === 'Enter') {
          focus();
        }

        if (evt.key === 'Escape') {
          unfocus();
          evt.preventDefault();
          evt.stopPropagation();
        }
      }
    }

    const channelMessageHandler = (msg: any) => {
      if (!msg.ch) return;
      if (!msg.ch.settings) return;
      if (msg.ch.settings.chat) setDisplay('unset');
      else setDisplay('none');
    }

    const chatMessageHandler = (msg: any) => {
      addMessage(msg);
    }

    const chatHistoryMessageHandler = (msg: any) => {
      let i = 0;
      addMessages(msg.c.sort((a: ChatMessage, b: ChatMessage) => Number(a.t > b.t)));
    }

    document.addEventListener('keydown', keyDownHandler);
    gClient.on('ch', channelMessageHandler);
    gClient.on('a', chatMessageHandler);
    gClient.on('c', chatHistoryMessageHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      gClient.off('ch', channelMessageHandler);
      gClient.off('a', chatMessageHandler);
      gClient.off('c', chatHistoryMessageHandler);
    }
  });

  const submitChatMessage = () => {
    const input = document.getElementById('chat-input');
    if (!input) return;
    gClient.sendArray([{
      m: 'a',
      message: input.innerText
    }]);
  }

  return (
    <div id="chat" className={ chatting } style={{ display }}>
      <ul>{
        (() => {
          let opacities: number[] = [];
          
          for (let i = Math.min(messages.length, 50); i >= 1; i--) {
            opacities.push((1.0 - (i * 0.03)) || 1);
          }

          opacities.reverse();

          return messages.map<ReactNode>((msg: ChatMessage) => {
            let i = messages.length - messages.indexOf(msg);
            return (
              <li key={`${msg.p._id}-${msg.t}`} style={{ color: msg.p.color, opacity: opacities[i] }}>
                <span className='name'>{msg.p.name}:</span>
                <span className='message'>{msg.a}</span>
              </li>
            );
          })
        })()
      }</ul>
      <input id="chat-input" className="translate" maxLength={512} autoComplete="off" placeholder="You can chat with this thing."
          onFocus={ focus } onBlur={ unfocus } onSubmit={ submitChatMessage } />
    </div>
  );
}

export default Chat
