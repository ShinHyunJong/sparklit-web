import {
  Box,
  Center,
  Flex,
  Icon,
  IconButton,
  Separator,
  Text,
  Timeline,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { Slide } from 'react-awesome-reveal';
import { LuMapPin } from 'react-icons/lu';
import { SiGooglemaps, SiWaze } from 'react-icons/si';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { useInvitationDetail } from '@/hooks/invitation';
import type { InvitationPlace } from '@/types/model';

import SubHeader from './SubHeader';

function Location() {
  const { invitationDetail } = useInvitationDetail();
  const placeList: InvitationPlace[] = invitationDetail?.placeList || [];
  const pointColor = useAtomValue(invitationEditorAtom.selectedPointColor);

  const handleMap = (googlePlaceId?: string) => {
    if (!googlePlaceId) return;
    const url = `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${googlePlaceId}`;
    window.open(url, '_blank');
  };

  const handleWaze = (lat: number, lng: number) => {
    const url = `https://www.waze.com/ul?ll=${lat},${lng}&navigate=yes`;
    window.open(url, '_blank');
  };

  return (
    <Box>
      <Center flexDirection="column" mb={10}>
        <SubHeader title="location"></SubHeader>
        <Icon>
          <LuMapPin size={24} color={pointColor} />
        </Icon>
      </Center>
      <Slide triggerOnce direction="up" duration={500} cascade damping={0.8}>
        <Box px={4}>
          <Timeline.Root w="full">
            {placeList.map((p) => {
              return (
                <Timeline.Item key={`place-${p.id}`}>
                  <Timeline.Connector>
                    <Timeline.Separator />
                    <Timeline.Indicator bg={pointColor}>
                      <LuMapPin></LuMapPin>
                    </Timeline.Indicator>
                  </Timeline.Connector>
                  <Timeline.Content>
                    <Flex w="full" justifyContent="space-between">
                      <Flex direction="column">
                        <Flex direction="column">
                          <Timeline.Title>{p.place?.name}</Timeline.Title>
                          <Timeline.Description>
                            {p.place?.address}
                          </Timeline.Description>
                        </Flex>

                        <Flex direction="column" mt={2} gap={2}>
                          {p.timeList?.map((t) => (
                            <Flex key={`time--${t.id}`} direction="column">
                              <Flex alignItems="center" gap={4}>
                                <Text
                                  color={pointColor}
                                  fontWeight="bold"
                                  fontSize="sm"
                                >
                                  {dayjs(t.time).format('h:mm A')}
                                </Text>
                                <Separator orientation="vertical" />
                                <Text fontSize="sm" color="gray.700">
                                  {t.name}
                                </Text>
                              </Flex>
                              <Text mt={2} fontSize="sm" color="gray.500">
                                {t.description}
                              </Text>
                            </Flex>
                          ))}
                        </Flex>
                      </Flex>
                      <Flex alignItems="center" gap={2}>
                        <IconButton
                          size="sm"
                          variant="outline"
                          onClick={() => handleMap(p.place?.googlePlaceId)}
                        >
                          <SiGooglemaps></SiGooglemaps>
                        </IconButton>
                        <IconButton
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleWaze(p.place?.lat!, p.place?.lng!)
                          }
                        >
                          <SiWaze></SiWaze>
                        </IconButton>
                      </Flex>
                    </Flex>
                  </Timeline.Content>
                </Timeline.Item>
              );
            })}
          </Timeline.Root>
        </Box>
      </Slide>
    </Box>
  );
}

export default Location;
