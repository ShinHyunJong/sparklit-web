import { Box, Text } from '@chakra-ui/react';

import { defaultSampleGreeting } from '@/constants/editor';

function GreetingPlaceholder() {
  return (
    <Box color="gray.500">
      <Text lineHeight={2}>{defaultSampleGreeting}</Text>
    </Box>
  );
}

export default GreetingPlaceholder;
