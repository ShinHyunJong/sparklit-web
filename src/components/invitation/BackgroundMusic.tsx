'use client';
import { Box, IconButton } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { LuVolume2, LuVolumeX } from 'react-icons/lu'; // 스피커 모양 아이콘

interface MusicPlayerProps {
  url: string;
}

const BackgroundMusic = ({ url }: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasStarted = useRef(false);

  // 음악 재생 로직
  const playMusic = () => {
    if (!audioRef.current || hasStarted.current) return;

    hasStarted.current = true;
    audioRef.current.volume = 0;

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        // 부드러운 페이드인
        let vol = 0;
        const fadeIn = setInterval(() => {
          if (vol < 0.4) {
            vol += 0.05;
            if (audioRef.current) audioRef.current.volume = vol;
          } else {
            clearInterval(fadeIn);
          }
        }, 200);
      })
      .catch((err) => {
        console.log('Autoplay blocked', err);
        hasStarted.current = false;
      });
  };

  useEffect(() => {
    const handleFirstAction = () => {
      console.log('User interacted, attempting to play music');
      playMusic();
      window.removeEventListener('scroll', handleFirstAction);
      window.removeEventListener('click', handleFirstAction);
      window.removeEventListener('touchstart', handleFirstAction);
    };

    window.addEventListener('scroll', handleFirstAction, { once: true });
    window.addEventListener('click', handleFirstAction, { once: true });
    window.addEventListener('touchstart', handleFirstAction, { once: true });

    return () => {
      window.removeEventListener('scroll', handleFirstAction);
      window.removeEventListener('click', handleFirstAction);
      window.removeEventListener('touchstart', handleFirstAction);
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Box
      position="fixed"
      top="16px" // 최상단 배치
      right="16px" // 오른쪽 배치
      zIndex={1500} // 다른 요소보다 위에 오도록 설정
    >
      <audio ref={audioRef} src={url} loop />
      <IconButton
        aria-label="Toggle Music"
        onClick={toggleMusic}
        variant="ghost" // 배경을 투명하게 설정
        color={isPlaying ? 'gray.800' : 'gray.400'} // 재생 여부에 따른 색상 변화
        _hover={{ bg: 'transparent' }} // 호버 시에도 투명 유지
        _active={{ bg: 'transparent' }} // 클릭 시에도 투명 유지
        size="lg"
        fontSize="24px" // 아이콘 크기 조절
      >
        {isPlaying ? <LuVolume2 /> : <LuVolumeX />}
      </IconButton>
    </Box>
  );
};

export default BackgroundMusic;
