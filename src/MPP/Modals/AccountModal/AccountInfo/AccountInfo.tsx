import './AccountInfo.css'

export function AccountInfo() {
    return (
        <div id="account-info">
            <div id="logged-in-text" className='text logged-in-text'>Logged in as</div>
            <img className='avatar-image' />
        </div>
    )
}
