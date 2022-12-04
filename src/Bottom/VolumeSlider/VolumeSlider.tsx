import { useEffect, useState } from 'react';
import './VolumeSlider.css'

function VolumeSlider() {
    return (
        <>
            <div id="volume">
                <input type="range" id="volume-slider" min="0.0" max="1.0" step="0.01" />
            </div>
            <div id="volume-label">volume</div>
        </>
    )
}

export default VolumeSlider
