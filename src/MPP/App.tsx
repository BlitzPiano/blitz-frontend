import './App.css'
import './Client.ts'
import Bottom from './Bottom/Bottom'
import Chat from './Chat/Chat'
import Cursors from './Cursors/Cursors'
import { ModalBackground } from './Modal/ModalBackground'
import { AccountModal } from './Modals/AccountModal/AccountModal'
import { NewRoomModal } from './Modals/NewRoomModal/NewRoomModal'
import { RenameModal } from './Modals/RenameModal/RenameModal'
import RoomSettingsModal from './Modals/RoomSettingsModal/RoomSettingsModal'
import NameList from './NameList/NameList'
import Piano from './Piano/Piano'
import RoomNotice from './RoomNotice/RoomNotice'
import SitebanModal from './Modals/SitebanModal/SitebanModal'
import { TopButton } from './TopButton/TopButton'
import gClient from './Client'
import './BackgroundColor'

function App() {
  return (
    <>
      <Chat />
      <RoomNotice />
      <NameList />
      <Piano />
      <Cursors />

      <a href="https://mpp.community/" title="MPPClone Community Forum" target="_blank">
        <TopButton type="icon" icon="mppcommunity.ico" className="mppcommunity-button" />
      </a>
      <a href="https://discord.gg/338D2xMufC" title="MPPClone Discord" target="_blank">
        <TopButton type="icon" icon="discord.ico" className="discord-button" />
      </a>
      <a href="https://mppclone.reddit.com" title="MPPClone Subreddit" target="_blank">
        <TopButton type="icon" icon="reddit.ico" className="reddit-button" />
      </a>
      <a href="https://docs.google.com/document/d/1wQvGwQdaI8PuEjSWxKDDThVIoAlCYIxQOyfyi4o6HcM/edit?usp=sharing" title="Multiplayer Piano Rules" target="_blank">
        <TopButton type="text" text="Rules" className="mpp-rules-button" />
      </a>

      <noscript>
        <center>
          <p>
            Multiplayer Piano is an online, full 88-key piano you can play alone or with others in real-time. Plug up your
            MIDI keyboard, MIDI in and out are supported. You should be able to hear some seriously talented piano players
            performing here! Join in or just chat and listen.
          </p>
          <p>
            For good performance, Chrome is highly recommended. Firefox also supports the requisite Web Audio API, but
            performance may not be as good. Chrome has Web MIDI.
          </p>
          <p>
            Of course, first you need to <a href="http://www.enable-javascript.com/" className="link">Enable Javascript</a> or
            it won't do anything...!
          </p>
        </center>
      </noscript>

      <Bottom />

      <div id="modal">
        <ModalBackground />
        <AccountModal />
        <NewRoomModal />
        <RenameModal />
        <RoomSettingsModal />
        <SitebanModal />
      </div>
    </>
  )
}

export default App
