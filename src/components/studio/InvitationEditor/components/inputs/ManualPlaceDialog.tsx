import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Flex,
  Input,
  Portal,
  Stack,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { Controller, useForm } from 'react-hook-form';

import invitationEditorAtom from '@/atoms/invitationEditor';

function ManualPlaceDialog({
  postPlace,
  postLoading,
}: {
  postPlace: (
    googlePlaceId: string,
    name: string,
    address: string,
    lat?: number,
    lng?: number,
  ) => Promise<void>;
  postLoading: boolean;
}) {
  const [open, setOpen] = useAtom(invitationEditorAtom.manualPlaceDialogOpen);
  const { control, getValues, watch } = useForm({
    defaultValues: {
      name: '',
      address: '',
    },
  });

  const watchName = watch('name');
  const watchAddress = watch('address');
  const disabled = !watchName || !watchAddress;

  const addPlace = () => {
    postPlace(
      'manual-' + new Date().getTime().toString(),
      getValues('name'),
      getValues('address'),
    );
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} size="lg" onOpenChange={(e) => setOpen(e.open)}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Add Manual Address</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack>
                <Field.Root>
                  <Field.Label>Place Name</Field.Label>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                        type="text"
                        placeholder={'Place Name'}
                      />
                    )}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Address</Field.Label>
                  <Controller
                    control={control}
                    name="address"
                    render={({ field }) => (
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                        type="text"
                        placeholder={'Address'}
                      />
                    )}
                  />
                </Field.Root>
              </Stack>

              <Flex w="full" justifyContent="center" mt={4}>
                <Button disabled={disabled} onClick={addPlace}>
                  Add Place
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

export default ManualPlaceDialog;
