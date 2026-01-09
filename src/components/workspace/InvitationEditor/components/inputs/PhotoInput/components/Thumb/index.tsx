import { Flex, GridItem, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import type { DropResult } from '@hello-pangea/dnd';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { useSetAtom } from 'jotai';
import { FaPlus } from 'react-icons/fa6';

import uploadAtom from '@/atoms/upload';
import { updatePhotoOrderApi } from '@/hooks/invitation/api';
import { useDeletePhoto } from '@/hooks/invitation/photo';
import type { InvitationPhoto } from '@/types/model';

import ThumbItem from './ThumbItem';

function Thumb({
  photoList,
  setIsThumb,
  isPostingPending,
  isProcessing,
  setRenderingPhotoList,
}: {
  photoList: InvitationPhoto[];
  setIsThumb: (isThumb: boolean) => void;
  isPostingPending: boolean;
  setRenderingPhotoList: React.Dispatch<
    React.SetStateAction<InvitationPhoto[]>
  >;
}) {
  const setPhotoEditorOpen = useSetAtom(uploadAtom.photoEditorOpen);
  const setSelectedImage = useSetAtom(uploadAtom.selectedImage);
  const { deletePhoto, isPending: isDeletePending } = useDeletePhoto();
  const fileCount = photoList.length;

  const onClickThumb = (image: InvitationPhoto) => {
    setIsThumb(true);
    setSelectedImage(image);
    setPhotoEditorOpen(true);
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const newList = Array.from(photoList);
    const [movedItem] = newList.splice(result.source.index, 1);
    newList.splice(result.destination.index, 0, movedItem);
    setRenderingPhotoList(newList);
    await updatePhotoOrderApi(newList.map((photo) => photo.id));
  };

  const handleDelete = async (e: React.MouseEvent, imageId: number) => {
    e.stopPropagation();
    deletePhoto(imageId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="photo-list" direction="horizontal">
        {(provided) => (
          <SimpleGrid
            ref={provided.innerRef}
            {...provided.droppableProps}
            columns={{ base: 2, sm: 3, md: 5 }}
            gap={{ base: 2, md: 3 }}
          >
            {photoList.map((image, index) => (
              <Draggable
                key={image.id}
                draggableId={String(image.id)}
                index={index}
              >
                {(providedDraggable) => (
                  <ThumbItem
                    image={image}
                    onClick={onClickThumb}
                    providedDraggable={providedDraggable}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {fileCount < 30 && (
              <GridItem>
                <label
                  style={{
                    display: 'flex',
                    cursor: 'pointer',
                    gap: 2,
                  }}
                  htmlFor="photo-upload"
                >
                  <Flex
                    gap={2}
                    w="full"
                    aspectRatio={1}
                    borderColor="gray.300"
                    alignItems="center"
                    justifyContent="center"
                    borderWidth={1}
                    direction="column"
                    borderRadius="sm"
                  >
                    {isProcessing || isPostingPending ? (
                      <Spinner />
                    ) : (
                      <>
                        <FaPlus />
                        <Text fontWeight="bold" fontSize="sm">
                          Add
                        </Text>
                      </>
                    )}
                  </Flex>
                </label>
              </GridItem>
            )}
          </SimpleGrid>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Thumb;
