import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import banner from './banner.png'; // Ensure you have a banner image in the src folder
import audioFile from './My Movie - Small.mov'; // Ensure you have the audio file in the src folder

const App = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const playAudio = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.log('Autoplay failed, user interaction required:', err);
      }
    };

    playAudio();

    // Add event listener for user interaction
    const handleUserInteraction = () => {
      playAudio();
      // Remove the event listener after it has played once
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Container>
      <BannerContainer>
        <Banner src={banner} alt="Banner" />
      </BannerContainer>
      <ContentContainer>
        <Box>
          <BoxContent />
          <BoxText>Rules</BoxText>
        </Box>
        <Box>
          <BoxContent />
          <BoxText>Print Outs</BoxText>
        </Box>
      </ContentContainer>
      <AudioPlayerContainer>
        <Audio autoPlay loop ref={audioRef}>
          <source src={audioFile} type="video/mp4" />
          Your browser does not support the audio element.
        </Audio>
        <SpeakerButton onClick={toggleAudio}>
          <FontAwesomeIcon icon={isPlaying ? faVolumeUp : faVolumeMute} />
        </SpeakerButton>
      </AudioPlayerContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; /* Added to contain the absolute positioning of the audio player */
`;

const BannerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Banner = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoxContent = styled.div`
  width: 200px;
  height: 200px;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoxText = styled.h2`
  margin-top: 10px;
  font-size: 1.5em;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.2em; /* Adjust font size for smaller screens */
  }
`;

const AudioPlayerContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
`;

const Audio = styled.audio`
  display: none; /* Hides the audio element */
`;

const SpeakerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
  color: #333;
  margin-left: 10px;

  &:focus {
    outline: none;
  }
`;

export default App;
