import { Accordion, Flex, Input } from '@chakra-ui/react';

function OpeningInput() {
  const handleFile = async () => {};

  return (
    <Accordion.Item
      value="opening"
      bg="white"
      borderRadius="sm"
      borderBottomWidth={0}
    >
      <Accordion.ItemTrigger>
        <Flex borderRadius="sm" p={{ base: 3, md: 4 }} w="full">
          Opening Video
        </Flex>
        <Accordion.ItemIndicator bg="white" mr={4} />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody p={{ base: 3, md: 4 }}>
          <Input
            id="photo-upload"
            multiple
            visibility="hidden"
            onChange={handleFile}
            type="file"
            accept="image/*"
          />
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
}

export default OpeningInput;
