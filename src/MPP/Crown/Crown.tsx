import { useEffect, useState } from 'react'
import { ChannelMessage } from '../Bottom/RoomList/RoomList';
import gClient from '../Client';
import './Crown.css'

export default function Crown() {
    const [display, setDisplay] = useState('none');
    const [countdownText, setCountdownText] = useState('');
    const [left, setLeft] = useState('');
    const [top, setTop] = useState('');
    const [spinClass, setSpinClass] = useState('');

    const hide = () => {
        setDisplay('none');
    }

    const show = () => {
        setDisplay('unset');
    }

    const setPos = (x: number, y: number) => {
        setLeft(`${x}%`);
        setTop(`${y}%`);
    }

    const setSpin = (spinning: boolean)  => {
        if (spinning) {
            setSpinClass('spin');
        } else {
            setSpinClass('');
        }
    }

    useEffect(() => {
        const handleChannelMessage = (msg: ChannelMessage) => {
            if (msg.ch.crown) {
                const crown = msg.ch.crown;

                if (!crown.participantId || !gClient.ppl[crown.participantId]) {
                    const land_time = crown.time + 2000 - gClient.serverTimeOffset;
                    const avail_time = crown.time + 15000 - gClient.serverTimeOffset;

                    setCountdownText('');
                    show();

                    if (land_time - Date.now() <= 0) {
                        setPos(crown.endPos.x, crown.endPos.y);
                    } else {
                        setPos(crown.startPos.x, crown.startPos.y);
                        setSpin(true);
                    }
                } else {
                    hide();
                }
            } else {
                hide();
            }
        }

        gClient.on('ch', handleChannelMessage);

        return () => {
            gClient.off('ch', handleChannelMessage);
        }
    }, []);

    return (
        <div id="crown" style={{ display, left, top }} className={ spinClass }>
            <span>{ countdownText }</span>
        </div>
    )
}
