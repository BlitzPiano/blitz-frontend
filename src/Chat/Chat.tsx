import { useState } from 'react';
import './Chat.css'

function Chat() {
  const [chatting, setChatting] = useState('');

  const onFocus = () => {
    setChatting('chatting')
  }

  return (
    <div id="chat" className={ chatting }>
      <ul></ul>
      <input id="chat-input" className="translate" maxLength={512} autoComplete="off" onFocus={ onFocus } />
    </div>
  );
}

export default Chat
