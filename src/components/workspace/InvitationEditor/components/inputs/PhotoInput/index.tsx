'use client';

import { Accordion, Flex, Input, Text } from '@chakra-ui/react';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

import invitationEditorAtom from '@/atoms/invitationEditor';
import uploadAtom from '@/atoms/upload';
import PhotoEditor from '@/components/workspace/PhotoEditor';
import { useUpload } from '@/hooks/upload';
import type { InvitationPhoto } from '@/types/model';

import MainPhoto from './components/MainPhoto';
import Thumb from './components/Thumb';

function PhotoInput({ photoList }: { photoList: InvitationPhoto[] }) {
  const { processFileList, isPostingPending } = useUpload();

  const [isThumb, setIsThumb] = useState(false);
  const [renderingPhotoList, setRenderingPhotoList] = useAtom<
    InvitationPhoto[]
  >(invitationEditorAtom.renderingPhotoList);
  const isProcessing = useAtomValue(uploadAtom.isProcessing);
  useEffect(() => {
    setRenderingPhotoList(photoList);
  }, [photoList]);

  const handleFile = async (e: any) => {
    try {
      const prevLength = photoList.length;
      const { files } = e.target;
      const totalLength = prevLength + files.length;
      if (totalLength > 30) {
        alert('You can only upload a maximum of 30 files.');
        return;
      }
      const result = await processFileList(files);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <>
      <PhotoEditor isThumb={isThumb} />
      <Accordion.Item
        value="photo"
        bg="white"
        borderRadius="sm"
        borderBottomWidth={0}
      >
        <Accordion.ItemTrigger>
          <Flex borderRadius="sm" p={4} w="full">
            <Text>Gallery</Text>
          </Flex>
          <Accordion.ItemIndicator bg="white" mr={4} />
        </Accordion.ItemTrigger>

        <Accordion.ItemContent>
          <Accordion.ItemBody p={4}>
            <Text
              display={{ base: 'block' }}
              fontSize="sm"
              color="gray.400"
              mb={4}
              textAlign="center"
            >
              ← Swipe left or right to edit next →
            </Text>
            <Flex w="full" mb={4}>
              <MainPhoto
                photoList={renderingPhotoList}
                setIsThumb={setIsThumb}
              />
            </Flex>
            <Thumb
              isProcessing={isProcessing}
              photoList={renderingPhotoList}
              setIsThumb={setIsThumb}
              isPostingPending={isPostingPending}
              setRenderingPhotoList={setRenderingPhotoList}
            />
            <Input
              id="photo-upload"
              multiple
              visibility="hidden"
              onChange={handleFile}
              type="file"
              accept="image/*"
            />
          </Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    </>
  );
}

export default PhotoInput;
