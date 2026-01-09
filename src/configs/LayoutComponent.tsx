import CustomCalendar from '@/components/studio/InvitationEditor/components/calendar/CustomCalendar';
import DressCode from '@/components/studio/InvitationEditor/components/template/components/DressCode';
import Entourage from '@/components/studio/InvitationEditor/components/template/components/Entourage';
import Gallery from '@/components/studio/InvitationEditor/components/template/components/Gallery';
import Greeting from '@/components/studio/InvitationEditor/components/template/components/Greeting';
import Location from '@/components/studio/InvitationEditor/components/template/components/Location';
import MonetaryGift from '@/components/studio/InvitationEditor/components/template/components/MonetaryGift';
import Notice from '@/components/studio/InvitationEditor/components/template/components/Notice';
import RSVP from '@/components/studio/InvitationEditor/components/template/components/RSVP';
import Sponsor from '@/components/studio/InvitationEditor/components/template/components/Sponsor';

export const COMPONENT_MAP: Record<string, JSX.Element> = {
  Greeting: <Greeting />,
  Gallery: <Gallery />,
  Location: <Location />,
  DressCode: <DressCode />,
  Calendar: <CustomCalendar />,
  RSVP: <RSVP />,
  Notice: <Notice />,
  Sponsor: <Sponsor />,
  Entourage: <Entourage />,
  MonetaryGift: <MonetaryGift />,
};
