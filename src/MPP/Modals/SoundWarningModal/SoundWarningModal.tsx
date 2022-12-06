import './SoundWarningModal.css'
import { Modal } from '../../Modal/Modal'
import SubmitButton from '../../Modal/SubmitButton/SubmitButton'

function SoundWarningModal() {
    return (
        <Modal id="sound-warning">
            <p>This site makes a lot of sound! You may want to adjust the volume before continuing.</p>
            <SubmitButton>PLAY</SubmitButton>
        </Modal>
    )
}
