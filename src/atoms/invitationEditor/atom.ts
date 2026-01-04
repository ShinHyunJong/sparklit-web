import type { Color } from '@chakra-ui/react';
import { parseColor } from '@chakra-ui/react';
import { format } from 'date-fns';
import { atom } from 'jotai';

import {
  defaultGreetingTitle,
  defaultSampleGreeting,
} from '@/constants/editor';
import type { LayoutItem } from '@/types/client.model';
import type { InvitationPhoto, InvitationPlace } from '@/types/model';

export const initialOrder: LayoutItem[] = [
  { id: 'Greeting', visible: true },
  { id: 'Gallery', visible: true },
  { id: 'Location', visible: true },
  { id: 'DressCode', visible: true },
  { id: 'Calendar', visible: true },
  { id: 'RSVP', visible: true },
  { id: 'Notice', visible: true },
  { id: 'Sponsor', visible: true },
  { id: 'Entourage', visible: true },
];

export const loginLoading = atom<boolean>(false);
export const isSaving = atom<boolean>(false);
export const selectedDate = atom<string>(format(new Date(), 'MM/dd/yyyy'));
export const selectedAmPm = atom<string | null>(format(new Date(), 'a'));
export const selectedHour = atom<string | null>(format(new Date(), 'hh'));
export const selectedMinute = atom<string | null>('00');
export const selectedTemplateNo = atom<number>(1);
export const selectedMusicKey = atom<string>('assets/music/sampleMusic1.wav');
export const selectedMusicFilename = atom<string | null>(null);
export const selectedMusicFileKey = atom<string | null>(null);
export const selectedBgColor = atom<string>('');
export const selectedPointColor = atom<string>('');
export const selectedMainColor = atom<Color>(parseColor('#000000'));
export const selectedFontFamily = atom<string>('montserrat');

export const greetingTitle = atom<string>(defaultGreetingTitle);
export const greetingContent = atom<string>(defaultSampleGreeting);

export const dressCodeGentleman = atom<string>('');
export const dressCodeLady = atom<string>('');
export const dressCodeMainColor = atom<Color>(parseColor('#000000'));
export const dressCodeSubColor = atom<Color>(parseColor('#000000'));
export const dressCodeThirdColor = atom<Color>(parseColor('#000000'));

export const primarySponsor = atom<string>('');
export const secondarySponsor = atom<string>('');

export const bestMan = atom<string>('');
export const maidOfHonor = atom<string>('');
export const groomsMen = atom<string>('');
export const bridesMaids = atom<string>('');

export const brideLastName = atom<string>('');
export const brideFirstName = atom<string>('');
export const brideMiddleName = atom<string>('');
export const brideMomName = atom<string>('');
export const brideDadName = atom<string>('');

export const groomLastName = atom<string>('');
export const groomFirstName = atom<string>('');
export const groomMiddleName = atom<string>('');
export const groomMomName = atom<string>('');
export const groomDadName = atom<string>('');

export const postPlaceLoading = atom<boolean>(false);
export const invitationPlaceList = atom<InvitationPlace[]>([]);
export const placeDialogOpen = atom<boolean>(false);
export const manualPlaceDialogOpen = atom<boolean>(false);
export const placeName = atom<string>('');
export const placeAddress = atom<string>('');

export const bankAccount = atom<string>('');
export const wishlistUrl = atom<string>('');

export const renderingPhotoList = atom<InvitationPhoto[]>([]);
export const notice = atom<string>('');
export const endingText = atom<string>('<p>The best thing to hold onto in life is each other.</p><br/><p>– Audrey Hepburn</p>');
export const layoutOrderAtom = atom<LayoutItem[]>(initialOrder);
