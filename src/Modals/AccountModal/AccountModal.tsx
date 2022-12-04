import { Modal } from '../../Modal/Modal'
import UglyButton from '../../UglyButton/UglyButton'
import SubmitButton from '../../Modal/SubmitButton/SubmitButton'
import './AccountModal.css'

export function AccountModal() {
    return (
        <Modal id="account">
            <p>
                <label>Log in: </label>
                &nbsp;
            </p>
            <UglyButton className='login-discord'>Discord</UglyButton>
            <UglyButton className='logout-btn'>Log out</UglyButton>
            <SubmitButton className='account-close-btn'>CLOSE</SubmitButton>
        </Modal>
    )
}
