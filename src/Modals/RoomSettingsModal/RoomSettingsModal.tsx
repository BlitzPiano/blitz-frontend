import { Modal } from '../../Modal/Modal'
import './RoomSettingsModal.css'
import UglyButton from '../../UglyButton/UglyButton'
import SubmitButton from '../../Modal/SubmitButton/SubmitButton'

function RoomSettingsModal() {
    return (
        <Modal id="room-settings">
            <UglyButton className='drop-crown'>Drop crown</UglyButton>
            <p><label><input type="checkbox" name="visible" className="checkbox translate" defaultChecked />Visible (open to everyone)</label></p>
            <p><label><input type="checkbox" name="chat" className="checkbox translate" defaultChecked />Enable Chat</label></p>
            <p><label><input type="checkbox" name="crownsolo" className="checkbox" />Only Owner can Play</label></p>
            <p><label><input type="checkbox" name="nocussing" className="checkbox" />No Cussing</label></p>
            <p><label>Inner color: &nbsp;<input type="color" name="color" placeholder="" maxLength={7} className="color" /></label></p>
            <p><label>Outer color: &nbsp;<input type="color" name="color2" placeholder="" maxLength={7} className="color" /></label></p>
            <p><label>Player limit: &nbsp;<input type="text" name="limit" maxLength={2} defaultValue={50} /></label></p>
            <SubmitButton>APPLY</SubmitButton>
        </Modal>
    )
}

export default RoomSettingsModal
