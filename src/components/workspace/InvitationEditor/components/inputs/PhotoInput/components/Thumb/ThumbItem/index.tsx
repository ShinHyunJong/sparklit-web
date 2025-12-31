import {
  Box,
  Circle,
  GridItem,
  Icon,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';
import type { DraggableProvided } from '@hello-pangea/dnd';
import { FaTrash } from 'react-icons/fa6';

import { S3_BUCKET_URL } from '@/configs/domain.config';
import { useDeletePhoto } from '@/hooks/invitation/photo';
import type { InvitationPhoto } from '@/types/model';

function ThumbItem({
  image,
  onClick,
  providedDraggable,
}: {
  image: InvitationPhoto;
  providedDraggable: DraggableProvided;
  onClick: (image: InvitationPhoto) => void;
}) {
  const { deletePhoto, isPending: isDeletePending } = useDeletePhoto();

  const handleDelete = async (e: React.MouseEvent, imageId: number) => {
    e.stopPropagation();
    await deletePhoto(image.id);
  };

  return (
    <GridItem
      position={'relative'}
      ref={providedDraggable.innerRef}
      {...providedDraggable.draggableProps}
      {...providedDraggable.dragHandleProps}
      onClick={() => onClick(image)}
    >
      <Box
        bg="rgba(0,0,0,0.4)"
        position="absolute"
        w="full"
        left={0}
        bottom="4px"
        cursor="pointer"
        zIndex={10}
        textAlign="center"
      >
        <Text color="white" fontSize="xs">
          Edit Thumbnail
        </Text>
      </Box>
      <Circle
        position="absolute"
        top="-6px"
        right="-6px"
        cursor="pointer"
        onClick={(e) => handleDelete(e, image.id)}
        w={6}
        h={6}
        bg="red.400"
        zIndex={10}
      >
        {isDeletePending ? (
          <Spinner size="sm"></Spinner>
        ) : (
          <Icon boxSize={3} color="white">
            <FaTrash></FaTrash>
          </Icon>
        )}
      </Circle>
      <Image
        cursor="pointer"
        w="full"
        aspectRatio={1}
        position="relative"
        src={`${S3_BUCKET_URL}${image.thumbKey}`}
        alt={`${image.id}`}
        borderRadius="sm"
        objectFit="cover"
      ></Image>
    </GridItem>
  );
}

export default ThumbItem;
