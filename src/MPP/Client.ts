import { ChannelSettings } from './Bottom/RoomList/RoomList';
import { Client } from './MPPCloneClient';

console.log("%cWelcome to MPP's developer console!", "font-size:20px;");

const getURLChannelName = () => {
    const hash = decodeURIComponent(globalThis.window.location.hash);
    return hash.substring(1) || 'lobby';
}

let uri = 'wss://mppclone.com:8443';
const gClient = new Client(uri);
gClient.start();
gClient.setChannel(getURLChannelName());

globalThis.window.addEventListener('hashchange', () => {
    gClient.setChannel(getURLChannelName());
});

// Legacy API
(globalThis as any).MPP = {
    client: gClient
}

export default gClient

export let gHistoryDepth = 0;

export function changeRoom(name: string, direction: string = 'right', settings: any = {}, push: boolean = true) {
    const opposite = direction == 'left' ? 'right' : 'left';

    if (name == '') name = 'lobby';
    if (gClient.channel && gClient.channel._id === name) return;

    if (push) {
        const url = '#' + encodeURIComponent(name).replace("'", "%27");
        if (window.history && history.pushState) {
            history.pushState({ depth: gHistoryDepth += 1, name: name }, "Piano > " + name, url);
        } else {
            window.location.hash = url;
            return;
        }
    }

    gClient.setChannel(name, settings);
}
