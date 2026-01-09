import {
  Accordion,
  Box,
  Circle,
  Flex,
  Icon,
  Input,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FaPause, FaPlay, FaPlus } from 'react-icons/fa6';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { S3_BUCKET_URL } from '@/configs/domain.config';
import { sampleMusicList } from '@/configs/music.config';
import { saved } from '@/helpers/toaster.helper';
import { updateMusicApi, uploadMusicApi } from '@/hooks/invitation/api';

function MusicInput({
  musicKey,
  musicFileKey,
  musicFilename,
}: {
  musicKey: string | null;
  musicFileKey: string | null;
  musicFilename: string | null;
}) {
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid') || '';
  const [isUploading, setIsUploading] = useState(false);
  const [selectedMusicKey, setSelectedMusicKey] = useAtom(
    invitationEditorAtom.selectedMusicKey,
  );
  const [selectedMusicFilename, setSelectedMusicFilename] = useAtom(
    invitationEditorAtom.selectedMusicFilename,
  );
  const [selectedMusicFileKey, setSelectedMusicFileKey] = useAtom(
    invitationEditorAtom.selectedMusicFileKey,
  );
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (musicKey) {
      setSelectedMusicKey(musicKey);
    }
    if (musicFilename) {
      setSelectedMusicFilename(musicFilename);
    }
    if (musicFileKey) {
      setSelectedMusicFileKey(musicFileKey);
    }
  }, [musicKey, musicFilename, musicFileKey]);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.play();
    }
  }, [currentTrack]);

  const handleSelectMusic = async (s3Key: string) => {
    setSelectedMusicKey(s3Key);
    saved(() => updateMusicApi(uid, s3Key));
  };

  const handlePlay = (e: React.MouseEvent<HTMLDivElement>, s3Key: string) => {
    e.stopPropagation();
    setCurrentTrack(s3Key);
  };

  const handlePause = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setCurrentTrack(null);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleMusic = async (e: any) => {
    const { files } = e.target;
    if (files.length === 0) {
      return;
    }
    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);
    try {
      setIsUploading(true);
      const key = await uploadMusicApi(uid, formData);
      setSelectedMusicKey(key);
      setSelectedMusicFileKey(key);
      await updateMusicApi(uid, key);
      setSelectedMusicFilename(file.name);
      setIsUploading(false);
    } catch (error) {
      setIsUploading(false);
    }
  };

  const isCustomMusicSelected = selectedMusicKey === selectedMusicFileKey;

  return (
    <Accordion.Item
      value="music"
      bg="white"
      borderRadius="sm"
      borderBottomWidth={0}
    >
      <Accordion.ItemTrigger>
        <Flex borderRadius="sm" p={{ base: 3, md: 4 }} w="full">
          <Text>Music</Text>
        </Flex>
        <Accordion.ItemIndicator bg="white" mr={4} />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody p={{ base: 3, md: 4 }}>
          <audio
            controls
            style={{ display: 'none' }}
            ref={audioRef}
            src={`${S3_BUCKET_URL}${currentTrack}`}
          ></audio>
          <Input
            id="music-upload"
            display="none"
            onChange={handleMusic}
            type="file"
            accept="audio/*"
          />
          <Stack spaceY={0}>
            {sampleMusicList.map((x) => {
              const isActive = x.s3Key === selectedMusicKey;
              const isPlaying = x.s3Key === currentTrack;
              return (
                <Flex
                  role="button"
                  cursor="pointer"
                  p={2}
                  borderWidth={2}
                  borderColor={isActive ? 'gray.700' : 'gray.200'}
                  borderRadius="md"
                  key={x.s3Key}
                  align="center"
                  gap={2}
                  onClick={() => handleSelectMusic(x.s3Key)}
                >
                  <Circle
                    w="14px"
                    h="14px"
                    bg={isActive ? 'gray.700' : 'gray.200'}
                    p="2px"
                  >
                    <Box
                      w="full"
                      h="full"
                      borderRadius="full"
                      bg={isActive ? 'gray.700' : 'gray.200'}
                      borderWidth={2}
                      borderColor={isActive ? 'white' : 'transparent'}
                    />
                  </Circle>
                  <Text fontSize="sm" color="gray.800">
                    {x.name}
                  </Text>
                  <Box
                    role="button"
                    cursor="pointer"
                    onClick={(e) =>
                      isPlaying ? handlePause(e) : handlePlay(e, x.s3Key)
                    }
                  >
                    <Icon fontSize="sm">
                      {currentTrack === x.s3Key ? (
                        <FaPause></FaPause>
                      ) : (
                        <FaPlay></FaPlay>
                      )}
                    </Icon>
                  </Box>
                  {/* <audio controls>
                  <source src={x.url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio> */}
                </Flex>
              );
            })}
            {selectedMusicFileKey && (
              <Flex
                p={2}
                gap={2}
                alignItems="center"
                borderWidth={2}
                borderRadius="md"
                cursor="pointer"
                role="button"
                onClick={() => handleSelectMusic(selectedMusicFileKey)}
                borderColor={isCustomMusicSelected ? 'gray.700' : 'gray.200'}
              >
                <Circle
                  w="14px"
                  h="14px"
                  bg={isCustomMusicSelected ? 'gray.700' : 'gray.200'}
                  p="2px"
                >
                  <Box
                    w="full"
                    h="full"
                    borderRadius="full"
                    bg={isCustomMusicSelected ? 'gray.700' : 'gray.200'}
                    borderWidth={2}
                    borderColor={isCustomMusicSelected ? 'white' : 'transparent'}
                  />
                </Circle>
                <Text fontSize="sm" color="gray.800">
                  {selectedMusicFilename}
                </Text>
                <Box
                  role="button"
                  cursor="pointer"
                  onClick={(e) =>
                    currentTrack === selectedMusicFileKey
                      ? handlePause(e)
                      : handlePlay(e, selectedMusicFileKey)
                  }
                >
                  <Icon fontSize="sm">
                    {currentTrack === selectedMusicFileKey ? (
                      <FaPause></FaPause>
                    ) : (
                      <FaPlay></FaPlay>
                    )}
                  </Icon>
                </Box>
              </Flex>
            )}
            {isUploading ? (
              <Flex
                p={2}
                borderWidth={1}
                justifyContent="center"
                alignItems="center"
              >
                <Spinner></Spinner>
              </Flex>
            ) : (
              <Flex
                as="label"
                borderWidth={1}
                p={2}
                cursor="pointer"
                justifyContent="center"
                alignItems="center"
                gap={2}
                htmlFor="music-upload"
              >
                <Icon fontSize="sm">
                  <FaPlus></FaPlus>
                </Icon>
                <Text fontSize="sm">Choose Music</Text>
              </Flex>
            )}
          </Stack>
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
}
export default MusicInput;
