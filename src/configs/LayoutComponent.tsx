import CustomCalendar from '@/components/workspace/InvitationEditor/components/calendar/CustomCalendar';
import DressCode from '@/components/workspace/InvitationEditor/components/template/components/DressCode';
import Entourage from '@/components/workspace/InvitationEditor/components/template/components/Entourage';
import Gallery from '@/components/workspace/InvitationEditor/components/template/components/Gallery';
import Greeting from '@/components/workspace/InvitationEditor/components/template/components/Greeting';
import Location from '@/components/workspace/InvitationEditor/components/template/components/Location';
import Notice from '@/components/workspace/InvitationEditor/components/template/components/Notice';
import RSVP from '@/components/workspace/InvitationEditor/components/template/components/RSVP';
import Sponsor from '@/components/workspace/InvitationEditor/components/template/components/Sponsor';

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
};
