'use client';

import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { toaster } from '@/components/ui/toaster';
import { api } from '@/requests';

type InquiryDialogProps = {
  variant?: 'outline' | 'solid' | 'subtle' | 'surface' | 'ghost' | 'plain';
  buttonText?: string;
  size?: 'sm' | 'md' | 'lg';
  colorPalette: string;
};

type FormValues = {
  name: string;
  phone: string;
  email: string;
  nation: string;
  inquiry: string;
};

function InquiryDialog({
  variant,
  buttonText,
  size,
  colorPalette,
}: InquiryDialogProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onSubmit',
  });

  const t = useTranslations('inquiryDialog');

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      await api.post('/inquiry', data);
      setOpen(false);
      setLoading(false);
      toaster.create({
        description: '문의가 접수되었습니다.',
        type: 'success',
      });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant={variant || 'solid'}
          colorPalette={colorPalette || 'gray'}
          size={size || 'md'}
        >
          {buttonText || t('triggerText')}
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{t('title')}</Dialog.Title>
            </Dialog.Header>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Dialog.Body>
                <Stack>
                  <Field.Root required invalid={!!errors.name}>
                    <Field.Label>{t('name')}</Field.Label>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                        minLength: {
                          value: 2,
                          message: t('nameMinLength'),
                        },
                      }}
                      render={({ field }) => (
                        <Input {...field} placeholder={t('namePlaceholder')} />
                      )}
                    />
                  </Field.Root>
                  <Field.Root required invalid={!!errors.phone}>
                    <Field.Label>{t('phone')}</Field.Label>
                    <Controller
                      name="phone"
                      control={control}
                      defaultValue=""
                      rules={{ required: t('phonePlaceholder') }}
                      render={({ field }) => (
                        <Input {...field} placeholder={t('phonePlaceholder')} />
                      )}
                    />
                  </Field.Root>
                  <Field.Root invalid={!!errors.email} required>
                    <Field.Label>{t('email')}</Field.Label>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: t('emailRequired'),
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: t('emailInvalid'),
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          type="email"
                          {...field}
                          placeholder={t('emailPlaceholder')}
                        />
                      )}
                    />
                    {errors.email && (
                      <Field.ErrorText>{t('emailInvalid')}</Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root required invalid={!!errors.nation}>
                    <Field.Label>{t('nation')}</Field.Label>
                    <Controller
                      name="nation"
                      defaultValue=""
                      rules={{ required: t('nationPlaceholder') }}
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder={t('nationPlaceholder')}
                        />
                      )}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>{t('inquiry')}</Field.Label>
                    <Controller
                      name="inquiry"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          placeholder={t('inquiryPlaceholder')}
                          rows={5}
                        />
                      )}
                    />
                  </Field.Root>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button onClick={() => setOpen(false)} variant="outline">
                    {t('cancelText')}
                  </Button>
                </Dialog.ActionTrigger>
                <Button loading={loading} disabled={!isValid} type="submit">
                  {t('buttonText')}
                </Button>
              </Dialog.Footer>
            </form>

            <Dialog.CloseTrigger asChild>
              <CloseButton onClick={() => setOpen(false)} size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default InquiryDialog;
