import {
  Button,
  Center,
  CloseButton,
  Dialog,
  Field,
  HStack,
  Input,
  Portal,
  RadioCard,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import { postRSVPApi } from '@/hooks/invitation/api';
type FormValues = {
  name: string;
  phone: string;
  email: string;
};

const items = [
  { value: 'true', title: 'Attend' },
  { value: 'false', title: 'Not Attend' },
];

function RSVPDialog() {
  const uniqueId = useSearchParams().get('uid') || '';
  const [open, setOpen] = useState(false);
  const [attending, setAttending] = useState('true');
  const [loading, setLoading] = useState(false);
  const { control, register, formState, handleSubmit } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      phone: '',
      email: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!uniqueId) return;
    console.log('Form Data:', { ...data, attending });
    try {
      setLoading(true);
      await postRSVPApi(uniqueId, data.name, data.phone, data.email, attending);
      setLoading(false);
      setOpen(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const isDisabled =
    !!formState.errors.name ||
    !!formState.errors.phone ||
    !!formState.errors.email;

  return (
    <Dialog.Root
      open={open}
      lazyMount
      onOpenChange={(p) => setOpen(p.open)}
      placement="center"
    >
      <Dialog.Trigger>
        <Center
          py={2}
          px={3}
          mt={8}
          bg="white"
          role="button"
          cursor="pointer"
          borderWidth={1}
          rounded="full"
        >
          <Text fontSize="sm">Submit RSVP</Text>
        </Center>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger />
            <Dialog.Header>
              <Dialog.Title>R.S.V.P</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spaceY={4}>
                  <RadioCard.Root
                    value={attending}
                    onValueChange={(e) => setAttending(e.value as string)}
                  >
                    <RadioCard.Label>Attend</RadioCard.Label>
                    <HStack align="stretch">
                      {items.map((item) => (
                        <RadioCard.Item key={item.value} value={item.value}>
                          <RadioCard.ItemHiddenInput />
                          <RadioCard.ItemControl>
                            <RadioCard.ItemText>
                              {item.title}
                            </RadioCard.ItemText>
                            <RadioCard.ItemIndicator />
                          </RadioCard.ItemControl>
                        </RadioCard.Item>
                      ))}
                    </HStack>
                  </RadioCard.Root>
                  <Field.Root invalid={formState.errors.name ? true : false}>
                    <Field.Label>Name</Field.Label>
                    <Input
                      {...register('name', {
                        required: 'This field is required',
                        pattern: {
                          value: /^[A-Za-z\s]+$/,
                          message: 'Enter a valid name',
                        },
                        minLength: {
                          value: 2,
                          message: 'Name must be at least 2 characters',
                        },
                      })}
                      placeholder="Enter your name"
                    />
                    {formState.errors.name && (
                      <Field.ErrorText>
                        {formState.errors.name.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root invalid={formState.errors.email ? true : false}>
                    <Field.Label>Email</Field.Label>
                    <Input
                      placeholder="Enter your email"
                      {...register('email', {
                        required: 'This field is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Enter a valid email address',
                        },
                      })}
                    />
                    {formState.errors.email && (
                      <Field.ErrorText>
                        {formState.errors.email.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root invalid={formState.errors.phone ? true : false}>
                    <Field.Label>Phone</Field.Label>
                    <Controller
                      name="phone" // 폼 데이터에 저장될 필드 이름
                      control={control} // useForm에서 가져온 control 객체
                      rules={{
                        required: 'This field is required',
                        minLength: {
                          value: 11,
                          message: 'Enter a valid phone number',
                        },
                      }}
                      render={({ field }) => (
                        <PatternFormat
                          {...field}
                          onValueChange={(values) => {
                            field.onChange(values.value);
                          }}
                          placeholder="0912-345-678"
                          format="####-###-####" // 원하는 패턴
                          mask="-"
                          customInput={Input} // 위에서 정의한 커스텀 컴포넌트
                        />
                      )}
                    />
                    {formState.errors.phone && (
                      <Field.ErrorText>
                        {formState.errors.phone.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>
                  <Button
                    disabled={isDisabled}
                    loading={loading}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Submit
                  </Button>
                </Stack>
              </form>
            </Dialog.Body>
            <Dialog.Footer />
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
export default RSVPDialog;
