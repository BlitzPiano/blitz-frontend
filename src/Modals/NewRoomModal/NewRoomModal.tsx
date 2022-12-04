import { Modal } from '../../Modal/Modal'
import SubmitButton from '../../Modal/SubmitButton/SubmitButton'
import './NewRoomModal.css'

export function NewRoomModal() {
    return (
        <Modal id='new-room'>
            <p><input type="text" name="name" placeholder="room name" className='text translate' maxLength={512} /></p>
            <p><label><input type="checkbox" name="visible" className='checkbox translate' defaultChecked />Visible (open to everyone)</label></p>
            <SubmitButton>go</SubmitButton>
        </Modal>
    )
}
