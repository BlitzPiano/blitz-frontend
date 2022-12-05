import { useState, useRef, KeyboardEvent, useEffect, useCallback, ReactNode } from 'react';
import './Chat.css'
import gClient from '../Client';

function Chat() {
  const [chatting, setChatting] = useState('');
  // const [display, setDisplay] = useState('none');
  const [display, setDisplay] = useState('unset');
  const [chatMessages, setChatMessages] = useState(<></>);

  // gClient.on('ch', (msg: any) => {
  //   if (!msg.ch) return;
  //   if (!msg.ch.settings) return;
  //   console.log(msg.ch);
  //   setDisplay(Boolean(msg.ch.settings.chat) ? 'unset' : 'none');
  // });

  gClient.on('a', (msg: any) => {
    // setChatMessages(<li><span className='name'>{ msg.p.name }:</span><span className='message'>{ msg.a }</span></li>);
    setChatMessages((<li style={{ opacity: 1 }}><span className='name'>{msg.p.name}:</span><span className='message'>{msg.a}</span></li>));
  });

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

  const ref = useCallback((node: ReactNode) => {
    // globalThis.window.addEventListener('mousedown', evt => {
      console.log('a thing')
    // });
  }, []);

  return (
    <div id="chat" className={ chatting } style={{ display }}>
      <ul>{ chatMessages }</ul>
      <input id="chat-input" className="translate" maxLength={512} autoComplete="off" placeholder="You can chat with this thing."
          onFocus={ focus } onBlur={ unfocus } />
    </div>
  );
}

export default Chat
