import gClient from './Client';
import './BackgroundColor.css'
import { Color } from './Util/Color';

gClient.on('ch', (msg: any) => {
    const color = new Color(msg.ch.settings.color);
    const color2 = new Color(msg.ch.settings.color2 || msg.ch.settings.color);
    
    if (!msg.ch.settings.color2) color2.add(-0x40, -0x40, -0x40);
    document.body.style.background = `radial-gradient(circle, ${color.toHexa()} 0%, ${color2.toHexa()} 100%)`;

    let bottom = document.getElementById('bottom');
    if (bottom) {
        bottom.style.background = color2.toHexa();
    }
});
