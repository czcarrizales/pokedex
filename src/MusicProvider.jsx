import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import loginMusic from "./music/pokemonlab.mp3";
import profileMusic from "./music/hearthome.mp3";
import pokedexMusic from "./music/whitecity.mp3";
import quizMusic from "./music/goldenrod.mp3";
import mysteryMusic from "./music/pokemart.mp3";

const TRACKS = {
  auth: loginMusic,
  profile: profileMusic,
  pokedex: pokedexMusic,
  quiz: quizMusic,
  mystery: mysteryMusic,
};

const MusicContext = createContext({
  setTrack: (_key) => {},
  stop: () => {},
  isMuted: false,
  toggleMute: () => {}
});

let globalAudio = null;

function getAudio() {
  if (!globalAudio) {
    const a = new Audio();
    a.loop = true;
    a.volume = 0.4;
    globalAudio = a;
  }
  return globalAudio;
}

export function MusicProvider({ children }) {
  const [currentKey, setCurrentKey] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = getAudio();
    const stored = localStorage.getItem("bgmMuted");
    const shouldBeMuted = stored === "true";
    audio.muted = shouldBeMuted;
    setIsMuted(shouldBeMuted);
  }, []);

  const setTrack = useCallback(
    (key) => {
      const audio = getAudio();
      if (!audio) return;

      if (!key) {
        audio.pause();
        setCurrentKey(null);
        return;
      }

      if (key === currentKey) return;

      const src = TRACKS[key];
      if (!src) {
        console.warn("Unknown track key:", key);
        return;
      }

      audio.pause();
      audio.src = src;
      audio.currentTime = 0;
      audio
        .play()
        .then(() => {
          setCurrentKey(key);
        })
        .catch((err) => {
          console.warn("Autoplay blocked or error:", err);
        });
    },
    [currentKey]
  );

  const toggleMute = useCallback(() => {
  const audio = getAudio();
  setIsMuted((prev) => {
    const next = !prev;
    audio.muted = next;
    localStorage.setItem("bgmMuted", String(next));
    return next;
  });
}, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setCurrentKey(null);
  }, []);

  return (
    <MusicContext.Provider value={{ setTrack, stop, isMuted, toggleMute }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  return useContext(MusicContext);
}
