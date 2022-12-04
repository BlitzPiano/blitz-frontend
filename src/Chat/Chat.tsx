import { useState, useRef, KeyboardEvent } from 'react';
import './Chat.css'
import gClient from '../Client';

function Chat() {
  const [chatting, setChatting] = useState('');
  const [display, setDisplay] = useState('none');

  // gClient.on('ch', (msg: any) => {
  //   if (!msg.ch) return;
  //   if (!msg.ch.settings) return;
  //   console.log(msg.ch);
  //   setDisplay(Boolean(msg.ch.settings.chat) ? 'unset' : 'none');
  // });

  const focus = () => {
    setChatting('chatting');
  }
  
  const unfocus = () => {
    setChatting('');
  }

  const toggleFocus = () => {
    if (chatting == 'chatting') {
      setChatting('')
    } else {
      setChatting('chatting')
    }
  }

  globalThis.window.addEventListener('keydown', evt => {
    if (evt.key == 'Enter' || evt.key == 'Escape') {
      toggleFocus();
    }
  });

  return (
    <div id="chat" className={ chatting } style={{ display }}>
      <ul></ul>
      <input id="chat-input" className="translate" maxLength={512} autoComplete="off" placeholder="You can chat with this thing."
          onFocus={ focus } onBlur={ unfocus } />
    </div>
  );
}

export default Chat
