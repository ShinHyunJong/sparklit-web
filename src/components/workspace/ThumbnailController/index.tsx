import { Button, Dialog, Flex, Image, Portal } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';

import uploadAtom from '@/atoms/upload';
import getCroppedImg from '@/helpers/image.helper';
import type { CropPos, UploadingImage } from '@/types/client.model';

const thumbContainerH = 82;
const headerHeight = 48;

function ThumbnailController() {
  const [uploadingImageList, setUploadingImageList] = useAtom(
    uploadAtom.uploadingImageList,
  );
  const [staticUploadingImageList, setStatic] = useAtom(
    uploadAtom.staticUploadingImageList,
  );
  const [selectedImage, setSelectedImage] = useAtom(uploadAtom.selectedImage);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoEditorOpen, setPhotoEditorOpen] = useAtom(
    uploadAtom.photoEditorOpen,
  );

  const handleNext = async () => {
    setPhotoUploading(true);
  };

  const onCropComplete = useCallback(
    async (croppedArea, croppedAreaPixels, imageId) => {
      const targetImage = staticUploadingImageList.find(
        (x) => x.id === imageId,
      );
      if (!targetImage) return;
      const croppedImage = await getCroppedImg(
        targetImage.src,
        croppedAreaPixels,
      );
      const prev = [...staticUploadingImageList];
      const targetIndex = prev.findIndex((x) => x.id === imageId);
      const target = prev[targetIndex];
      if (!target) return;
      prev.splice(targetIndex, 1, {
        ...target,
        croppedBlob: croppedImage,
        croppedUrl: URL.createObjectURL(croppedImage!),
      });
      setStatic(prev);
    },
    [staticUploadingImageList],
  );

  const handleThumb = (img: UploadingImage) => {
    setSelectedImage(img);
  };

  const handleZoom = (z: number, imageId: number) => {
    if (!selectedImage) return;
    const prev = [...uploadingImageList];
    const targetIndex = prev.findIndex((x) => x.id === imageId);
    const target = prev[targetIndex];
    if (!target) return;
    prev.splice(targetIndex, 1, {
      ...target,
      zoom: z,
    });
    setUploadingImageList(prev);
    // setSelectedImage({
    //   ...selectedImage,
    //   zoom: z,
    // });
  };

  const handleCrop = (c: CropPos, imageId: number | string) => {
    if (!selectedImage) return;
    const prev = [...uploadingImageList];
    const targetIndex = prev.findIndex((x) => x.id === imageId);
    const target = prev[targetIndex];
    if (!target) return;
    prev.splice(targetIndex, 1, {
      ...target,
      crop: c,
    });
    setUploadingImageList(prev);
    // setSelectedImage({
    //   ...target,
    //   crop: c,
    // });
  };

  const onClickUpload = () => {
    setPhotoEditorOpen(false);
  };

  const renderedImage = uploadingImageList.find(
    (x) => x.id === selectedImage?.id,
  );
  if (!renderedImage) return null;

  return (
    <Dialog.Root
      open={photoEditorOpen}
      // onOpenChange={(e) => setPhotoEditorOpen(e.open)}
      size="full"
    >
      <Portal>
        <Dialog.Backdrop></Dialog.Backdrop>
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Body p={0}>
              <Flex
                px={4}
                alignItems="center"
                justifyContent="end"
                w="full"
                bg="white"
                position="fixed"
                top={0}
                h={`${headerHeight}px`}
              >
                <Button onClick={onClickUpload} size="sm">
                  Confirm
                </Button>
              </Flex>
              <Flex
                position="relative"
                direction="column"
                w="full"
                top={`${headerHeight}px`}
                h={`calc(100vh - ${thumbContainerH + headerHeight}px)`}
              >
                {renderedImage && (
                  <Cropper
                    image={renderedImage.src}
                    crop={renderedImage.crop}
                    zoom={renderedImage.zoom}
                    aspect={renderedImage.ratio}
                    onCropChange={(c: CropPos) =>
                      handleCrop(c, renderedImage.id)
                    }
                    onCropComplete={(croppedArea, croppedAreaPixels) =>
                      onCropComplete(
                        croppedArea,
                        croppedAreaPixels,
                        renderedImage.id,
                      )
                    }
                    onZoomChange={(z: number) =>
                      handleZoom(z, renderedImage.id)
                    }
                  />
                )}
              </Flex>
              <Flex
                position="fixed"
                bottom={0}
                h={`${thumbContainerH}px`}
                bg="white"
              >
                <Flex
                  h="full"
                  overflowX="auto"
                  alignItems="center"
                  px={4}
                  gap={2}
                >
                  {staticUploadingImageList.map((image) => {
                    const selected = renderedImage?.id === image.id;
                    return (
                      <Flex
                        key={`${image.id}`}
                        role="button"
                        cursor="pointer"
                        onClick={() => handleThumb(image)}
                        borderWidth={1}
                        borderColor={selected ? 'brand.900' : 'gray.100'}
                      >
                        <Image
                          w="48px"
                          h="48px"
                          objectFit="contain"
                          alt={`${image.id}`}
                          src={image.croppedUrl || image.thumbSrc}
                        />
                      </Flex>
                    );
                  })}
                </Flex>
              </Flex>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default ThumbnailController;
