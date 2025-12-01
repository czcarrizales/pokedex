import { useMusic } from "./MusicProvider";
import './MusicToggle.css'

export default function MusicToggle() {
  const { isMuted, toggleMute } = useMusic();
  return (
    <button className="music-toggle" onClick={toggleMute}>
      {isMuted ? <span class="material-symbols-outlined">volume_off</span> : <span class="material-symbols-outlined">volume_up</span> }
    </button>
  );
}