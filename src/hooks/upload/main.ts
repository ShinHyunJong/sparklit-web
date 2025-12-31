import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import uploadAtom from '@/atoms/upload';
import getCroppedImg, {
  calculateRatio,
  calculateRatioCropCoordinates,
  compressImage,
  createImage,
} from '@/helpers/image.helper';
import { generateRandomNumber } from '@/helpers/random.helper';

import { updateMainPhotoApi } from '../invitation/api';

export function usePostMainPhotoUpload() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      invitationId,
      formData,
    }: {
      invitationId: string;
      formData: FormData;
    }) => updateMainPhotoApi(invitationId, formData, 'main'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['invitationDetail', uid],
      });
    },
  });

  const postMainPhoto = async (formData: FormData) => {
    if (!uid) return;
    await mutateAsync({ invitationId: uid!, formData });
  };

  return {
    postMainPhoto,
    isPending,
  };
}

export function useMainUpload() {
  const [uploading, setUploading] = useAtom(uploadAtom.mainImageUploading);

  const router = useRouter();
  const setSelectedImage = useSetAtom(uploadAtom.selectedImage);
  const [isProcessing, setIsProcessing] = useAtom(uploadAtom.isProcessing);
  const { postMainPhoto, isPending } = usePostMainPhotoUpload();

  const initialize = () => {
    setSelectedImage(undefined);
  };

  const processFileList = async (file: File | Blob) => {
    setIsProcessing(true);
    try {
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

      const defaultCropY = Math.round((image.height - croppedHeight) / 2);
      const result = {
        id: generateRandomNumber(),
        file: compressedResult,
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
        defaultCropY,
      };

      const formData = new FormData();
      formData.append('originalFile', result.file);
      formData.append('croppedFile', result.croppedBlob!);
      formData.append('photoJSON', JSON.stringify(result));

      await postMainPhoto(formData);
      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);
    }
  };

  // const deletePhoto = (imageId: string) => {
  //   const prevUploadingImageList = [...uploadingImageList];
  //   const prevStaticUploadingImageList = [...staticUploadingImageList];
  //   const targetIndex = prevUploadingImageList.findIndex(
  //     (x) => x.id === imageId,
  //   );
  //   const targetStaticIndex = prevStaticUploadingImageList.findIndex(
  //     (x) => x.id === imageId,
  //   );
  //   if (targetIndex === -1 || targetStaticIndex === -1) return;
  //   prevUploadingImageList.splice(targetIndex, 1);
  //   prevStaticUploadingImageList.splice(targetStaticIndex, 1);
  // };

  return {
    isProcessing,
    isPostingPending: isPending,
    uploading,
    processFileList,
    initialize,
    // deletePhoto,
  };
}
