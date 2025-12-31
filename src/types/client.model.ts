export type CropPos = {
  x: number;
  y: number;
};

export type UploadingImage = {
  id: string;
  file: File | Blob;
  src: string;
  thumbSrc: string;
  name: string;
  width: number;
  height: number;
  ratio: number;
  croppedBlob: Blob | null;
  croppedUrl: string | null;
  thumbCroppedBlob: Blob | null;
  thumbCroppedUrl: string | null;
  defaultCropY: number;
  crop: CropPos;
  thumbCrop: CropPos;
  zoom: number;
  thumbZoom: number;
};

export type PlaceTimeBody = {
  hour: number;
  minute: number;
  ampm: string;
  name: string;
  description?: string | null;
};

export type Template = {
  id: number;
  imageUrl?: string;
};

export type LayoutItem = {
  id: string;
  visible: boolean;
};
