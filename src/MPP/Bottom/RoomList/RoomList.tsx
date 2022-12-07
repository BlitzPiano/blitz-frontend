import { useEffect, MouseEvent as ReactMouseEvent, useState } from 'react'
import gClient, { changeRoom } from '../../Client';
import './RoomList.css'

export interface Vector2 {
    x: number;
    y: number;
}

export interface Crown {
    userId: string;
    participantId?: string;
    time: number;
    startPos: Vector2;
    endPos: Vector2;
}

export interface ChannelSettings {
    // original channel settings
    visible: boolean;
    color: string;
    color2?: string;
    chat: boolean;
    crownsolo: boolean;
    'no cussing'?: boolean;
    'lyrical notes'?: boolean;
    owner_id?: string;

    // mppclone channel settings
    limit: number;
    minOnlineTime?: number;
    lobby?: boolean;
}

export interface Tag {
    text: string;
    color: string;
}

export interface Participant {
    id: string;
    _id: string;
    name: string;
    color: string;

    x?: number;
    y?: number;

    tag?: Tag;
    vanished?: boolean;
}

export interface ChannelInfo {
    banned?: boolean;
    count: number;
    id: string;
    _id: string;
    crown: Crown;
    settings: ChannelSettings;
}

export interface ChannelMessage {
    m: 'ch';
    ch: ChannelInfo;
    ppl: Participant[];
    p: string;
}

export interface ChannelListMessage {
    m: 'ls';
    c: boolean;
    u: ChannelInfo[];
}

function RoomList() {
    const [moreVisibility, setMoreVisibility] = useState(false);
    const [channelList, setChannelList] = useState([] as ChannelInfo[])

    useEffect(() => {
        const handleChannelMessage = (msg: ChannelMessage) => {
            const channel = msg.ch;
            
            const room = document.getElementById('room');
            if (!room) return;
            
            const info = (room.getElementsByClassName('info')[0] as HTMLDivElement);
            if (!info) return;

            info.innerText = channel._id;

            if (channel.settings.lobby) info.classList.add('lobby');
            else info.classList.remove('lobby');
            if (!channel.settings.chat) info.classList.add('no-chat');
            else info.classList.remove('no-chat');
            if (channel.settings.crownsolo) info.classList.add('crownsolo');
            else info.classList.remove('crownsolo');
            if (channel.settings['no cussing']) info.classList.add('no-cussing');
            else info.classList.remove('no-cussing');
            if (!channel.settings.visible) info.classList.add('not-visible');
            else info.classList.remove('not-visible');
        }

        const handleChannelListMessage = (msg: ChannelListMessage) => {
            for (let i in msg.u) {
                if (!msg.u.hasOwnProperty(i)) continue;
                const room = msg.u[i];
                // room list stuff
            }
        }

        gClient.on('ch', handleChannelMessage);
        gClient.on('ls', handleChannelListMessage);

        return () => {
            gClient.off('ch', handleChannelMessage);
            gClient.off('ls', handleChannelListMessage);
        }
    });

    const handleClick = (evt: ReactMouseEvent) => {
        const target = evt.target as HTMLDivElement;
        const more = document.getElementsByClassName('more')[0];
        if (!more) return;

        // clicks on a new room
        if (more.contains(target) && target.classList.contains('info')) {
            setMoreVisibility(false);

            const selectedName = target.getAttribute('roomname');
            if (typeof selectedName == 'string') {
                changeRoom(selectedName, 'right');
            }
        }

        const documentMouseHandler = (evt: MouseEvent) => {
            const target = evt.target as HTMLElement;
            if (target.classList.contains('more')) return;
            document.removeEventListener('mousedown', documentMouseHandler);
            setMoreVisibility(false);
            gClient.sendArray([{ m: '-ls' }])
        }

        document.addEventListener('mousedown', documentMouseHandler);
        setMoreVisibility(true);
        gClient.sendArray([{ m: '+ls' }]);
    }

    return (
        <div id="room" onClick={ handleClick }>
            <div className="info">--</div>
            <div className="expand"></div>
            <div className="more" style={{ display: moreVisibility ? 'unset' : 'none' }}>
                <div className="new translate">New Room...</div>
            </div>
        </div>
    )
}

export default RoomList
