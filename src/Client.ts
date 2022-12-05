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
