import axios from 'axios';

import { S3_BUCKET_URL } from '@/configs/domain.config';
import { api } from '@/requests';
import type { PlaceTimeBody } from '@/types/client.model';
import type {
  InivitationRSVP,
  Invitation,
  InvitationPhoto,
  InvitationPlaceTime,
} from '@/types/model';

import type { InvitationEditorFormValues } from '.';

/**
 * 외부 URL에서 이미지 데이터를 Blob 형태로 가져옵니다.
 * @param url 가져올 이미지의 외부 URL
 * @returns Blob 객체를 resolve하는 Promise
 */
export async function getBlobFromUrl(key: string): Promise<File> {
  try {
    const response = await axios.get(`${S3_BUCKET_URL}${key}`, {
      // 💡 핵심: 응답 타입을 'blob'으로 설정
      responseType: 'blob',
    });

    // Axios 응답의 data 속성은 이미 Blob 객체입니다.
    const imageBlob: Blob = response.data;

    const file = new File([imageBlob], key, {
      type: imageBlob.type,
      lastModified: Date.now(),
    });

    return file;
  } catch (error) {
    console.error('이미지 Blob을 가져오는 중 오류 발생:', error);
    // 오류 처리
    throw error;
  }
}

export async function getInvitationListApi(): Promise<Invitation[]> {
  const { data } = await api.get('/invitation');
  return data;
}

export async function getInvitationDetailApi(id: string): Promise<Invitation> {
  const { data } = await api.get(`/invitation/${id}`);
  const fileInserted = await Promise.all(
    data.photoList.map(async (photo: InvitationPhoto) => {
      const file = await getBlobFromUrl(photo.originalKey);
      return {
        ...photo,
        file,
        url: URL.createObjectURL(file),
      };
    }),
  );

  return {
    ...data,
    photoList: fileInserted,
  };
}

export async function updateMainPhotoApi(
  id: string,
  formData: FormData,
  type: string,
) {
  const { data } = await api.put(
    `/invitation/cover-photo/${id}?type=${type}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return data;
}

export async function postInvitationApi(): Promise<Invitation> {
  const { data } = await api.post('/invitation');
  return data;
}

export async function updatePlaceTimeApi(
  placeTimeId: number,
  timeData: PlaceTimeBody,
): Promise<InvitationPlaceTime> {
  const { data } = await api.put(`/places/time/${placeTimeId}`, timeData);
  return data;
}

export async function deleteInvitationPlaceApi(
  invitationPlaceId: number,
): Promise<string> {
  const { data } = await api.delete(`/places/${invitationPlaceId}`);
  return data;
}

export async function updateInvitationApi(
  id: string,
  invitationData: InvitationEditorFormValues,
) {
  const { data } = await api.put(`/invitation/${id}`, invitationData);
  return data;
}

export async function updateGreetingApi(
  uid: string,
  title: string,
  content: string,
) {
  const { data } = await api.put(`/invitation/greeting/${uid}`, {
    title,
    content,
  });
  return data;
}

export async function updateTemplateNoApi(id: string, templateNo: number) {
  const { data } = await api.put(`/invitation/templateNo/${id}`, {
    templateNo,
  });
  return data;
}

export async function updateColorApi(id: string, type: string, color: string) {
  const { data } = await api.put(`/invitation/color/${id}`, {
    type,
    color,
  });
  return data;
}

export async function updateMainTextColorApi(id: string, color: string) {
  const { data } = await api.put(`/invitation/main-text-color/${id}`, {
    color,
  });
  return data;
}

export async function postPhotoListApi(
  invitationId: string,
  formData: FormData,
): Promise<string> {
  const { data } = await api.post(`/photo/${invitationId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}

export async function updatePhotoOrderApi(photoIds: number[]): Promise<string> {
  const { data } = await api.put(`/photo/order`, { photoIds: photoIds });
  return data;
}

export async function updatePhotoCropApi(photoId: number, formData: FormData) {
  const { data } = await api.put(`/photo/update/${photoId}`, formData);
  return data;
}

export async function deletePhotoApi(photoId: number): Promise<string> {
  const { data } = await api.delete(`/photo/${photoId}`);
  return data;
}

export async function updateDressCodeApi(
  uid: string,
  dressCodeGentleman: string,
  dressCodeLady: string,
) {
  const { data } = await api.put(`/invitation/dressCode/${uid}`, {
    dressCodeGentleman,
    dressCodeLady,
  });
  return data;
}

export async function updateDressCodeColorApi(
  uid: string,
  mainColor: string,
  subColor: string,
  thirdColor: string,
) {
  const { data } = await api.put(`/invitation/dressCodeColor/${uid}`, {
    mainColor,
    subColor,
    thirdColor,
  });
  return data;
}

export async function postRSVPApi(
  uniqueId: string,
  name: string,
  phone: string,
  email: string,
  attending: string,
): Promise<string> {
  const { data } = await api.post(`/invitation/rsvp/${uniqueId}`, {
    name,
    phone,
    email,
    attending: Boolean(attending === 'true'),
  });
  return data;
}

export async function updateMusicApi(uid: string, musicKey: string) {
  const { data } = await api.put(`/invitation/music/${uid}`, {
    key: musicKey,
  });
  return data;
}

export async function uploadMusicApi(uid: string, formData: FormData) {
  const { data } = await api.put(`/invitation/music/upload/${uid}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}

export async function updateSponsorsApi(
  uid: string,
  primarySponsor: string,
  secondarySponsor: string,
) {
  const { data } = await api.put(`/invitation/sponsor/${uid}`, {
    primarySponsor,
    secondarySponsor,
  });
  return data;
}

export async function updateEntourageApi(
  uid: string,
  bestMan: string,
  maidOfHonor: string,
  groomsMen: string,
  bridesMaids: string,
) {
  const { data } = await api.put(`/invitation/entourage/${uid}`, {
    bestMan,
    maidOfHonor,
    groomsMen,
    bridesMaids,
  });
  return data;
}

export async function updateNoticeApi(uid: string, notice: string) {
  const { data } = await api.put(`/invitation/notice/${uid}`, {
    notice,
  });
  return data;
}

export async function updateLayoutOrderApi(uid: string, layoutOrder: string) {
  const { data } = await api.put(`/invitation/layoutOrder/${uid}`, {
    layoutOrder,
  });
  return data;
}

export async function getRSVPlistApi(uid: string): Promise<InivitationRSVP[]> {
  const { data } = await api.get(`/invitation/rsvp/${uid}`);
  return data;
}

export async function updateFontApi(id: string, font: string) {
  const { data } = await api.put(`/invitation/font/${id}`, {
    font,
  });
  return data;
}

export async function updateMonetaryGiftApi(
  uid: string,
  bankAccount: string,
  wishlistUrl: string,
) {
  const { data } = await api.put(`/invitation/monetaryGift/${uid}`, {
    bankAccount,
    wishlistUrl,
  });
  return data;
}

export async function updateEndingTextApi(uid: string, endingText: string) {
  const { data } = await api.put(`/invitation/endingText/${uid}`, {
    endingText,
  });
  return data;
}
