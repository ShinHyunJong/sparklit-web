import { Box } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';

import invitationEditorAtom from '@/atoms/invitationEditor';

import CustomCalendar from '../../calendar/CustomCalendar';

function Calendar() {
  const pointColor = useAtomValue(invitationEditorAtom.selectedPointColor);
  return (
    <Box>
      <CustomCalendar></CustomCalendar>
    </Box>
  );
}

export default Calendar;
