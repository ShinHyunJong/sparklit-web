import {
  Button,
  CloseButton,
  Dialog,
  Flex,
  Input,
  Portal,
  Text,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDebounceValue } from 'usehooks-ts';
import { v4 as uuidv4 } from 'uuid';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { getPlaceAutocompleteApi, getPlaceDetailApi } from '@/hooks/place/api';

import ManualPlaceDialog from '../ManualPlaceDialog';

type SelectedPlace = {
  googlePlaceId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
};

function PlaceSearch({
  postPlace,
}: {
  postPlace: (
    googlePlaceId: string,
    name: string,
    address: string,
    lat?: number,
    lng?: number,
  ) => Promise<void>;
}) {
  const { watch, setValue, control } = useForm({
    defaultValues: {
      searchTerm: '',
      manualAddress: '',
    },
  });

  const t = useTranslations('workspace.invitationEditor.places');
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');

  const [predictions, setPredictions] = useState<
    Array<{
      description: string;
      place_id: string;
      structured_formatting: { main_text: string; secondary_text: string };
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const sessionTokenRef = useRef<string | null>(null);
  const [debouncedValue, setDebounceValue] = useDebounceValue('', 300);
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(
    null,
  );
  const [open, setOpen] = useAtom(invitationEditorAtom.placeDialogOpen);
  const [postLoading, setPostLoading] = useAtom(
    invitationEditorAtom.postPlaceLoading,
  );
  const [placeList, setPlaceList] = useAtom(
    invitationEditorAtom.invitationPlaceList,
  );
  const [manualDialogOpen, setManualDialogOpen] = useAtom(
    invitationEditorAtom.manualPlaceDialogOpen,
  );
  const startNewSession = useCallback(() => {
    sessionTokenRef.current = uuidv4();
    console.log('새로운 세션 토큰 생성:', sessionTokenRef.current);
  }, []);

  const fetchPredictions = async (input: string) => {
    setIsLoading(true);
    if (!input || !sessionTokenRef.current) return;
    try {
      const data = await getPlaceAutocompleteApi(
        input,
        sessionTokenRef.current,
      );
      setPredictions(data);
      setIsLoading(false);
    } catch (err) {
      console.error('Error', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    startNewSession();
  }, [startNewSession]);

  useEffect(() => {
    if (debouncedValue) {
      fetchPredictions(debouncedValue);
    }
  }, [debouncedValue]);

  const handlePredictionClick = async (prediction: {
    description: string;
    place_id: string;
    structured_formatting: { main_text: string; secondary_text: string };
  }) => {
    if (!uid) return;
    setPostLoading(true);
    setSelectedPlace({
      name: prediction.structured_formatting.main_text,
      address: prediction.description,
      googlePlaceId: prediction.place_id,
      lat: 0,
      lng: 0,
    });

    setOpen(false);
    startNewSession();
    const detail = await getPlaceDetailApi(
      prediction.place_id,
      sessionTokenRef.current!,
    );
    postPlace(
      prediction.place_id,
      prediction.structured_formatting.main_text,
      detail.formatted_address,
      detail.geometry.location.lat,
      detail.geometry.location.lng,
    );

    // setPlaceList((prev) => {
    //   return [
    //     ...prev,
    //     {
    //       id: randomId,
    //       placeId: randomId,
    //       place: {
    //         googlePlaceId: prediction.place_id,
    //         name: prediction.structured_formatting.main_text,
    //         address: detail.formatted_address,
    //         lat: detail.geometry.location.lat,
    //         lng: detail.geometry.location.lng,
    //       },
    //       timeList: [
    //         {
    //           id: Date.now(),
    //           time: new Date(),
    //           invitationPlaceId: randomId,
    //         },
    //       ],
    //     },
    //   ];
    // });

    setSelectedPlace({
      googlePlaceId: prediction.place_id,
      name: prediction.description,
      address: detail.formatted_address,
      lat: detail.geometry.location.lat,
      lng: detail.geometry.location.lng,
    });
    setPostLoading(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <ManualPlaceDialog
        postPlace={postPlace}
        postLoading={postLoading}
      ></ManualPlaceDialog>
      {/* <Dialog.Trigger asChild>
        <Button
          variant="subtle"
          onClick={() => {
            setOpen(true);
            startNewSession();
          }}
        >
          {selectedPlace?.name || t('enterAddress')}
        </Button>
      </Dialog.Trigger> */}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Search Address</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Controller
                control={control}
                name="searchTerm"
                render={({ field }) => (
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setDebounceValue(e.target.value);
                    }}
                    type="text"
                    placeholder={t('addressPlaceholder')}
                  />
                )}
              />
              {predictions.map((prediction) => (
                <Flex
                  key={prediction.place_id}
                  onClick={() => handlePredictionClick(prediction)}
                  p={4}
                  mt={4}
                  justifyContent="space-between"
                  borderBottom="1px solid"
                  borderColor="gray.100"
                  cursor="pointer"
                  _hover={{ bg: 'gray.50' }}
                  _last={{ borderBottom: 'none' }}
                >
                  <Flex direction="column">
                    <Text fontWeight="bold">
                      {prediction.structured_formatting.main_text}
                    </Text>
                    <Text color="gray.600">
                      {prediction.structured_formatting.secondary_text}
                    </Text>
                  </Flex>
                  <Button size="sm" variant="outline">
                    Select
                  </Button>
                </Flex>
              ))}
              <Flex
                w="full"
                py={4}
                bg="brand.100"
                direction="column"
                borderRadius="lg"
                alignItems="center"
                mt={8}
                gap={2}
              >
                <Text>Cannot find address?</Text>
                <Button onClick={() => setManualDialogOpen(true)}>
                  Add manually
                </Button>
              </Flex>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button loading={postLoading} variant="outline">
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default PlaceSearch;
