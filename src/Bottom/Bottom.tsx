import UglyButton from '../UglyButton/UglyButton'
import './Bottom.css'
import RoomList from './RoomList/RoomList'
import StatusIndicator from './StatusIndicator/StatusIndicator'
import VolumeSlider from './VolumeSlider/VolumeSlider'
import NoteQuota from './NoteQuota/NoteQuota'

function Bottom() {
    return (
        <div id="bottom">
            <div className="relative">
                <RoomList />

                <UglyButton id="new-room-btn" className='translate'>New Room...</UglyButton>
                <UglyButton id="play-alone-btn">Play Alone</UglyButton>
                <UglyButton id="room-settings-btn" className='translate'>Room Settings</UglyButton>
                <UglyButton id="midi-btn" className='translate'>MIDI In/Out</UglyButton>
                {/* We're ditching these */}
                {/* <UglyButton id="record-btn" className='translate'>Record MP3</UglyButton> */}
                {/* <UglyButton id="synth-btn" className='translate'>Synth</UglyButton> */}
                <UglyButton id="sound-btn" className='sound-btn'>Sound Select</UglyButton>

                {/* MPPClone buttons */}
                <UglyButton id="client-settings-btn" className='client-settings-btn'>Client Settings</UglyButton>
                <UglyButton id="account-btn" className='account-btn'>Account</UglyButton>
                <UglyButton id="clearchat-btn" className='clearchat-btn' hidden>Clear Chat</UglyButton>
                <UglyButton id="getcrown-btn" className='getcrown-btn' hidden>Get Crown</UglyButton>
                <UglyButton id="getcrown-btn" className='vanish-btn' hidden>Vanish</UglyButton>

                {/* Status ("people are playing", "Offline mode") */}
                <StatusIndicator />

                {/* Volume slider */}
                <VolumeSlider />

                {/* Note Quota display */}
                <NoteQuota />
            </div>
        </div>
    )
}

export default Bottom
