import { ReactNode, useEffect, useState } from 'react'
import { Participant } from '../Bottom/RoomList/RoomList';
import gClient from '../Client'
import { Cursor, CursorMessage } from './Cursor/Cursor';
import './Cursors.css'

function Cursors() {
    const [cursors, setCursors] = useState(new Array<ReactNode>());
    useEffect(() => {
        const handleCursorMessage = (msg: CursorMessage) => {
            
        }

        const handleParticipantAdded = (p: Participant) => {
            const part = gClient.ppl[p.id];
            if (!part) return;
            if (!part.cursorDiv) {
                const cursorDiv = <Cursor key={ part.id } id={ part.id } />
                part.cursorDiv = cursorDiv;
                setCursors([...cursors, part.cursorDiv]);
            }
        }

        gClient.on('m', handleCursorMessage);
        gClient.on('participant added', handleParticipantAdded);

        return () => {
            gClient.off('m', handleCursorMessage);
            gClient.off('participant added', handleParticipantAdded);
        }
    });

    return (
        <div id="cursors">
            { cursors }
        </div>
    )
}

export default Cursors
