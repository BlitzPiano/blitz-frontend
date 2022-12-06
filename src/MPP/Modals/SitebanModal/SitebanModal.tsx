import { Modal } from '../../Modal/Modal'
import './SitebanModal.css'
import SubmitButton from '../../Modal/SubmitButton/SubmitButton'

function SitebanModal() {
    return (
        <Modal id="siteban">
            <p><label>User ID: <input type="text" name="id" placeholder="User's ID" maxLength={24} className='text' /></label></p>
            <p><label>Reason: <select name="reasonSelect">
                <option value="Discrimination against others">Discrimination</option>
                <option value="Discussion of inappropriate topics through chat or names">Inappropriate discussion</option>
                <option value="Sharing or advertising inappropriate content">Sharing inappropriate content</option>
                <option value="Discussing self-harm or very negative topics">Discussing self-harm</option>
                <option value="Spamming the piano in lobbies">Piano spam in lobbies</option>
                <option value="Evading site-wide punishments">Evading site-wide punishments</option>
                <option value="Evading user's mutes or kickbans">Evading mutes or kickbans</option>
                <option value="Exploiting bugs">Exploiting bugs</option>
                <option value="Phishing or IP grabbing">Phishing/IP Grabbing</option>
                <option value="Abusing bots or scripts">Abusing bots or scripts</option>
                <option value="Promoting violence or illegal activities">Promoting violence/illegal activities</option>
                <option value="Promoting breaking the rules">Promiting breaking the rules</option>
                <option value="Giving out another user's personal information without their consent">Giving other user's personal information</option>
                <option value="Sending similar messages throughout multiple rooms">Sending the same message in many rooms</option>
                <option value="Spamming the piano throughout multiople rooms to annoy users">Spamming the piano in many rooms</option>
                <option value="Holding the crown in a room that does not belong to you">Holding the crown in someone else's room</option>
                <option value="Abusing permissions or higher quotas">Abusing permissions/quotas</option>
                <option value="Misleading others through impersonation">Impersation</option>
                <option value="Lying about users on the site in a way that negatively affects them">Lying about other users</option>
                <option value="custom">Custom...</option>
            </select>
            <input type="text" name="reasonText" placeholder="Ban reason..." maxLength={512} className='text' style={{ width: '100%' }} />
            </label></p>

            <p><label>Duration: <br /><input type="number" name="durationNumber" placeholder='Amount of unit...' defaultValue={5} className='text' style={{ width: '60%' }} />
                <select name="durationUnit">
                    <option value="seconds">Seconds</option>
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                    <option value="permanent">Permanent</option>
                </select>
            </label></p>

            <p><label>Notes: <textarea name="note" cols={49} rows={5} maxLength={512} placeholder="Optional note for staff..."></textarea></label></p>
            <p id="error-text" style={{ color: 'red', fontSize: '16px' }}></p>
            <SubmitButton>BAN</SubmitButton>
        </Modal>
    )
}

export default SitebanModal
