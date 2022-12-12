import { useEffect, useState } from "react"
import { Participant } from "../../Bottom/RoomList/RoomList";
import gClient from "../../Client";

export interface CursorProps {
    id: string;
}

export interface CursorMessage {
    m: 'm';
    id: string;
    x: number;
    y: number;
}

export function Cursor(props: CursorProps) {
    const [left, setLeft] = useState('-10%');
    const [top, setTop] = useState('-10%');
    const [name, setName] = useState('Anonymous');
    const [color, setColor] = useState('#777');

    useEffect(() => {
        const handleCursorMessage = (msg: CursorMessage) => {
            if (msg.id !== props.id) return;
            try {
                setLeft(`${msg.x}%`);
                setTop(`${msg.y}%`);
            } catch (err) {}
        }

        const handleParticipantUpdate = (p: Participant) => {
            if (p.id !== props.id) return;
            try {
                setName(p.name);
                setColor(p.color);
            } catch (err) {}
        }

        gClient.on('m', handleCursorMessage);
        gClient.on('participant update', handleParticipantUpdate);
        gClient.on('participant added', handleParticipantUpdate);

        return () => {
            gClient.off('m', handleCursorMessage);
            gClient.off('participant update', handleParticipantUpdate);
            gClient.off('participant added', handleParticipantUpdate);
        }
    });

    return (
        <div className='cursor' style={{ left, top }}>
            <div className="name" style={{ backgroundColor: color }}>
                { name }
            </div>
        </div>
    )
}
