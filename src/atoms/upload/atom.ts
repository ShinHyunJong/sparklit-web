import { atom } from 'jotai';

import type { UploadingImage } from '@/types/client.model';
import type { InvitationPhoto } from '@/types/model';

export const uploading = atom<boolean>(false);
export const uploadingImageList = atom<UploadingImage[]>([]);
export const staticUploadingImageList = atom<UploadingImage[]>([]);
export const isProcessing = atom<boolean>(false);

export const photoEditorOpen = atom<boolean>(false);
export const thumbnailEditorOpen = atom<boolean>(false);
export const selectedImage = atom<InvitationPhoto | undefined>(undefined);

export const mainImage = atom<UploadingImage | undefined>(undefined);
export const mainImageUploading = atom<boolean>(false);

export const endImage = atom<UploadingImage | undefined>(undefined);
export const endImageUploading = atom<boolean>(false);

export const openingFirstImage = atom<UploadingImage | undefined>(undefined);
export const openingSecondImage = atom<UploadingImage | undefined>(undefined);
export const setSelectedOpeningImage = atom<UploadingImage | undefined>(
  undefined,
);
