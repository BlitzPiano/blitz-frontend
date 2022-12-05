import { useState, useEffect, ReactNode, KeyboardEvent as ReactKeyboardEvent } from 'react';
import './Chat.css'
import gClient from '../Client';
import { gModal } from '../Modal/Modal';

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
        scrollToBottom();
    }

    const addMessages = (msgs: ChatMessage[]) => {
        setMessages([...messages, ...msgs]);
        scrollToBottom();
    }

    const removeAllMessages = () => {
        setMessages(initMessages);
    }

    const scrollToBottom = () => {
        let chatDiv = document.getElementById('chat');
        if (!chatDiv) return;
        let ul = chatDiv.getElementsByTagName('ul')[0];
        if (!ul) return;
        ul.scrollTop = ul.scrollHeight - ul.clientHeight;
    }

    const focus = () => {
        setChatting('chatting');
        const input = document.getElementById('chat-input');
        if (!input) return;
        input.focus();
        scrollToBottom();
    }
    
    const unfocus = () => {
        setChatting('');
        const input = document.getElementById('chat-input');
        if (!input) return;
        input.blur();
        scrollToBottom();
    }

    const toggleFocus = () => {
        if (chatting === 'chatting') {
            unfocus();
        } else {
            focus();
        }
    }

    const submitChatMessage = (message: string) => {
        gClient.sendArray([{
            m: 'a',
            message: message
        }]);
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
            } else if (!gModal && (evt.key === 'Enter' || evt.key === 'Escape')) {
                focus();
            }
        }

        const clickHandler = (evt: MouseEvent) => {
            if (chatting !== 'chatting') return;
            if (!evt.target) return;
            const chat = document.getElementById('chat');
            if (!chat) return;
            if (!chat.contains(evt.target as HTMLElement)) {
                unfocus();
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
            scrollToBottom();
        }

        const chatHistoryMessageHandler = (msg: any) => {
            removeAllMessages();
            let i = 0;
            addMessages(msg.c.sort((a: ChatMessage, b: ChatMessage) => Number(a.t > b.t)));
        }

        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('click', clickHandler);
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

    const handleInputKeyDown = (evt: ReactKeyboardEvent<HTMLInputElement>) => {
        if (evt.key === 'Enter') {
            if (!gClient.isConnected()) return;
            let message = (evt.target as HTMLInputElement).value;

            if (message.length > 0) {
                submitChatMessage(message);
                (evt.target as HTMLInputElement).value = '';
            }

            // timeout is original behavior
            setTimeout(() => {
                unfocus();
            }, 100);

            evt.preventDefault();
            evt.stopPropagation();
        }

        if (evt.key === 'Escape') {
            unfocus();
        }

        if (evt.key === 'Tab' || evt.key === 'Escape') {
            evt.preventDefault();
            evt.stopPropagation();
        }
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
                    onFocus={ focus } onKeyDown={ handleInputKeyDown } />
        </div>
    );
}

export default Chat
