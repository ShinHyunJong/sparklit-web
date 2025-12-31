import { Box } from '@chakra-ui/react';

import CustomCalendar from '../../calendar/CustomCalendar';

function Calendar() {
  return (
    <Box>
      {/* <SubHeader title=""></SubHeader> */}
      <CustomCalendar></CustomCalendar>
    </Box>
  );
}

export default Calendar;
