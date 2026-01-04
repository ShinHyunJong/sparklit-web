import { Box } from '@chakra-ui/react';

function PhotoPlaceholder({
  overlayComponent,
}: {
  placeholder?: string;
  overlayComponent?: React.ReactNode;
}) {
  return (
    <Box position="relative" aspectRatio="4/5" w="full  " bg="gray.200">
      <Box position="absolute" top={0} w="full" h="full">
        {overlayComponent}
      </Box>
    </Box>
  );
}
export default PhotoPlaceholder;
