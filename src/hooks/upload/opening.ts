import { useAtom, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';

import uploadAtom from '@/atoms/upload';
import {
  staticUploadingImageList,
  uploadingImageList,
} from '@/atoms/upload/atom';
import getCroppedImg, {
  calculateRatio,
  calculateRatioCropCoordinates,
  compressImage,
  createImage,
} from '@/helpers/image.helper';
import { generateRandomNumber } from '@/helpers/random.helper';

import { usePostInvitationPhoto } from '../invitation/photo';

export function useOpeningUpload() {
  const [uploading, setUploading] = useAtom(uploadAtom.uploading);
  const [openingFirstImage, setOpeningFirstImage] = useAtom(
    uploadAtom.openingFirstImage,
  );
  const [openingSecondImage, setOpeningSecondImage] = useAtom(
    uploadAtom.openingSecondImage,
  );

  const router = useRouter();
  const setSelectedImage = useSetAtom(uploadAtom.selectedImage);
  const [isProcessing, setIsProcessing] = useAtom(uploadAtom.isProcessing);
  const { postPhoto, isPending } = usePostInvitationPhoto();

  const initialize = () => {
    setOpeningFirstImage(undefined);
    setOpeningSecondImage(undefined);
    setSelectedImage(undefined);
  };

  const processFileList = async (files: File[] | Blob[]) => {
    setIsProcessing(true);
    try {
      const fileList = [...files];
      const file = fileList[0];
      if (!file) return;
      const { url, compressedResult } = await compressImage(file, 0.8);
      const { url: thumbSrc, compressedResult: thumbCompressed } =
        await compressImage(file, 0.1);
      const image = await createImage(url);
      const ratio = calculateRatio(image.width, image.height);
      const croppedHeight = image.width / ratio;

      const { x, y, width, height, thumbX, thumbY, thumbWidth, thumbHeight } =
        calculateRatioCropCoordinates(image.width, image.height);

      const defaultMainCropped = await getCroppedImg(url, {
        width,
        height,
        x,
        y,
      });

      const defaultThumbCropped = await getCroppedImg(thumbSrc, {
        width: thumbWidth,
        height: thumbHeight,
        x: thumbX,
        y: thumbY,
      });

      const defaultCropY = Math.round((image.height - croppedHeight) / 2);
      const result = {
        id: generateRandomNumber(),
        file: compressedResult,
        thumbFile: thumbCompressed,
        src: url,
        thumbSrc,
        name: file.name,
        width: image.width,
        height: image.height,
        crop: { x: 0, y: 0 },
        thumbCrop: { x: thumbX, y: thumbY },
        thumbZoom: 1,
        zoom: 1,
        ratio,
        croppedBlob: defaultMainCropped,
        croppedUrl: URL.createObjectURL(defaultMainCropped!),
        thumbCroppedBlob: defaultThumbCropped,
        thumbCroppedUrl: URL.createObjectURL(defaultThumbCropped!),
        defaultCropY,
      };

      const formData = new FormData();
      formData.append('originalPhoto', result.file);
      formData.append('croppedPhoto', result.croppedBlob!);
      formData.append('thumbnailPhoto', result.thumbFile);
      formData.append('photoJSON', JSON.stringify(result));
      await postPhoto(formData);
      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);
    }
  };

  const deletePhoto = (imageId: string) => {
    const prevUploadingImageList = [...uploadingImageList];
    const prevStaticUploadingImageList = [...staticUploadingImageList];
    const targetIndex = prevUploadingImageList.findIndex(
      (x) => x.id === imageId,
    );
    const targetStaticIndex = prevStaticUploadingImageList.findIndex(
      (x) => x.id === imageId,
    );
    if (targetIndex === -1 || targetStaticIndex === -1) return;
    prevUploadingImageList.splice(targetIndex, 1);
    prevStaticUploadingImageList.splice(targetStaticIndex, 1);
  };

  return {
    isProcessing,
    isPostingPending: isPending,
    uploading,
    uploadingImageList,
    processFileList,
    initialize,
    deletePhoto,
  };
}
