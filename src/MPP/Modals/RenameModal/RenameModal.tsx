import { Modal } from '../../Modal/Modal'
import SubmitButton from '../../Modal/SubmitButton/SubmitButton'
import './RenameModal.css'

export function RenameModal() {
    return (
        <Modal id="rename">
            <p>
                <input type="text" name="name" placeholder="My Fancy New Name" maxLength={40} className='text' />
                <input type="color" name="color" placeholder="" maxLength={7} className='color' />
            </p>
            <SubmitButton>USER SET</SubmitButton>
        </Modal>
    )
}
