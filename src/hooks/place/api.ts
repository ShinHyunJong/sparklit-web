import { api } from '@/requests';
import type { InvitationPlace } from '@/types/model';

export async function postPlaceApi(
  uid: string,
  googlePlaceId: string,
  name: string,
  address: string,
  lat?: number,
  lng?: number,
): Promise<InvitationPlace> {
  const { data } = await api.post(`/places/${uid}`, {
    googlePlaceId,
    name,
    address,
    lat,
    lng,
  });

  return data;
}

export async function postPlaceTimeApi(invitationPlaceId: number) {
  const { data } = await api.post(`/places/time/${invitationPlaceId}`);
  return data;
}

export async function deletePlaceTimeApi(placeId: number) {
  const { data } = await api.delete(`/places/time/${placeId}`);
  return data;
}

export async function getPlaceAutocompleteApi(
  input: string,
  sessionToken: string,
): Promise<{ description: string; place_id: string }[]> {
  const { data } = await api.get(
    `/places/autocomplete?input=${input}&sessionToken=${sessionToken}`,
  );
  return data;
}

export async function getPlaceDetailApi(placeId: string, sessionToken: string) {
  const { data } = await api.get(
    `/places/detail?placeId=${placeId}&sessionToken=${sessionToken}`,
  );
  return data;
}
