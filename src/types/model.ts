export type User = {
  id: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Invitation = {
  id: number;
  title: string;
  uniqueId: string;
  date: Date | null;
  baseFont: string | null;
  dressCodeGentleman: string;
  dressCodeLady: string;
  dressCodeMainColor: string;
  dressCodeSubColor: string;
  dressCodeThirdColor: string;
  brideLastName: string;
  brideFirstName: string;
  brideMiddleName: string;
  brideMomName: string;
  brideDadName: string;
  groomLastName: string;
  groomFirstName: string;
  groomMiddleName: string;
  groomMomName: string;
  groomDadName: string;
  templateNo: number;
  musicKey: string | null;
  musicFilename: string | null;
  musicFileKey: string | null;
  invitationCoverPhotoList: InvitationCoverPhoto[];
  placeList: InvitationPlace[];
  photoList: InvitationPhoto[];
  greetingTitle: string | null;
  greetingContent: string | null;
  notice: string | null;
  mainTextColor: string | null;
  pointColor: string | null;
  bgColor: string | null;
  primarySponsor: string | null;
  secondarySponsor: string | null;
  bestMan: string | null;
  maidOfHonor: string | null;
  groomsMen: string | null;
  bridesMaids: string | null;
  layoutOrder: string | null;
  endingText: string | null;
  wishlistUrl: string | null;
  wishlistText: string | null;
  bankAccount: string | null;
  ogImageKey: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type InvitationCoverPhoto = {
  id: number;
  type: string;
  file: Blob | File;
  url: string;
  invitationId: number;
  originalKey: string;
  croppedKey: string;
  thumbKey: string;
  order: number;
  cropX: number;
  cropY: number;
  width: number;
  height: number;
  cropZoom: number;
  croppedBlob?: Blob | null;
};

export type InvitationPhoto = {
  id: number;
  file: Blob | File;
  url: string;
  invitationId: number;
  originalKey: string;
  croppedKey: string;
  thumbKey: string;
  order: number;
  cropX: number;
  cropY: number;
  thumbX: number;
  thumbY: number;
  width: number;
  height: number;
  cropZoom: number;
  thumbZoom: number;
  thumbCroppedBlob?: Blob | null;
  croppedBlob?: Blob | null;
};

export type InvitationPlace = {
  id: number;
  order: number;
  placeId: number;
  place?: Place;
  timeList: InvitationPlaceTime[];
};

export type InvitationPlaceTime = {
  id: number;
  invitationPlaceId: number;
  time: Date;
  name: string;
  description: string | null;
};

export type InivitationRSVP = {
  id: number;
  invitationId: number;
  name: string;
  phone: string;
  email: string;
  attending: boolean;
  createdAt: Date;
};

export type Place = {
  id: number;
  googlePlaceId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
};
