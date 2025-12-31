import { Box, Button, Container, Flex } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useCallback } from 'react';
import Cropper from 'react-easy-crop';

import uploadAtom from '@/atoms/upload';
import getCroppedImg, { calculateRatio } from '@/helpers/image.helper';
import { useUpdatePhotoCrop } from '@/hooks/invitation/photo';
import type { CropPos } from '@/types/client.model';

function PhotoEditor({ isThumb }: { isThumb?: boolean }) {
  const [selectedImage, setSelectedImage] = useAtom(uploadAtom.selectedImage);
  const [photoEditorOpen, setPhotoEditorOpen] = useAtom(
    uploadAtom.photoEditorOpen,
  );
  const { updatePhotoCrop, isPending } = useUpdatePhotoCrop();

  const onCropComplete = useCallback(
    async (croppedArea, croppedAreaPixels, imageId) => {
      if (isNaN(croppedArea.x) || croppedAreaPixels.width === 0) return;
      const targetImage = selectedImage;
      if (!targetImage) return;
      const url = URL.createObjectURL(targetImage.file);
      const croppedImage = await getCroppedImg(url, croppedAreaPixels);
      if (!croppedImage) return;

      if (isThumb) {
        setSelectedImage((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            thumbCroppedBlob: croppedImage,
            thumbCroppedUrl: URL.createObjectURL(croppedImage!),
          };
        });
      } else {
        setSelectedImage((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            croppedBlob: croppedImage,
            croppedUrl: URL.createObjectURL(croppedImage!),
          };
        });
      }
    },
    [selectedImage],
  );

  const handleZoom = (z: number) => {
    if (!selectedImage) return;
    if (isThumb) {
      setSelectedImage((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          thumbZoom: z,
        };
      });
    } else {
      setSelectedImage((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          cropZoom: z,
        };
      });
    }
  };

  const handleCrop = (c: CropPos) => {
    if (isThumb) {
      setSelectedImage((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          thumbX: c.x,
          thumbY: c.y,
        };
      });
    } else {
      setSelectedImage((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          cropX: c.x,
          cropY: c.y,
        };
      });
    }
  };

  const handleSave = async () => {
    const targetImage = selectedImage;
    if (!targetImage) return;
    let cropX;
    let cropY;
    let zoom;
    if (isThumb) {
      cropX = targetImage.thumbX;
      cropY = targetImage.thumbY;
      zoom = targetImage.thumbZoom;
    } else {
      cropX = targetImage.cropX;
      cropY = targetImage.cropY;
      zoom = targetImage.cropZoom;
    }
    const formData = new FormData();
    formData.append('cropX', String(cropX));
    formData.append('cropY', String(cropY));
    formData.append('cropZoom', String(zoom));
    formData.append('isThumb', String(isThumb ? true : false));
    formData.append(
      'file',
      isThumb ? targetImage.thumbCroppedBlob! : targetImage.croppedBlob!,
    );
    await updatePhotoCrop(targetImage.id, formData);
    setPhotoEditorOpen(false);
    setSelectedImage(undefined);

    // const prev = [...uploadingImageList];
    // const targetIndex = prev.findIndex((x) => x.id === selectedImage?.id);
    // const target = prev[targetIndex];
    // if (!target) return;
    // if (isThumb) {
    //   prev.splice(targetIndex, 1, {
    //     ...target,
    //     thumbCrop: selectedImage.thumbCrop,
    //     thumbZoom: selectedImage.thumbZoom,
    //     thumbCroppedBlob: selectedImage.thumbCroppedBlob,
    //     thumbCroppedUrl: URL.createObjectURL(selectedImage.thumbCroppedBlob!),
    //   });
    //   setUploadingImageList(prev);
    //   setPhotoEditorOpen(false);
    // } else {
    //   prev.splice(targetIndex, 1, {
    //     ...target,
    //     crop: selectedImage.crop,
    //     zoom: selectedImage.zoom,
    //     croppedBlob: selectedImage.croppedBlob,
    //     croppedUrl: URL.createObjectURL(selectedImage.croppedBlob!),
    //   });
    //   setUploadingImageList(prev);
    //   setPhotoEditorOpen(false);
    // }
  };

  if (!selectedImage) return null;

  const src = selectedImage.url;
  const zoom = isThumb ? selectedImage.thumbZoom : selectedImage.cropZoom;
  const crop = isThumb
    ? { x: selectedImage.thumbX, y: selectedImage.thumbY }
    : { x: selectedImage.cropX, y: selectedImage.cropY };
  const ratio = isThumb
    ? 1
    : calculateRatio(selectedImage.width, selectedImage.height);

  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      w="full"
      h="100vh"
      bg="gray.200"
      alignItems="center"
      justifyContent="center"
      zIndex={2000}
      display={photoEditorOpen ? 'flex' : 'none'}
      style={{
        marginTop: 0,
        marginBottom: 0,
      }}
    >
      <Container direction="column" h="70vh">
        <Box position="relative" w="full" h={`calc(70vh - 60px)`}>
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={ratio}
            onCropChange={(c: CropPos) => handleCrop(c)}
            onCropComplete={(croppedArea, croppedAreaPixels) =>
              onCropComplete(croppedArea, croppedAreaPixels, selectedImage.id)
            }
            onZoomChange={(z: number) => handleZoom(z)}
          />
        </Box>
        <Flex h="60px" alignItems="center" justifyContent="flex-end" gap={2}>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedImage(undefined);
              setPhotoEditorOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button loading={isPending} onClick={handleSave}>
            Save
          </Button>
        </Flex>
      </Container>
    </Flex>
  );
}

export default PhotoEditor;
