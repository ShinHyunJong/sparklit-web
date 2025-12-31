'use client';

import { Button, Field, Fieldset, Input } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useDebounceValue } from 'usehooks-ts';

import { useUpdateUser } from '@/hooks/auth';
import { checkEmailApi, registerApi } from '@/hooks/auth/api';

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const {
    control,
    formState,
    handleSubmit,
    watch,
    register,
    setError,
    clearErrors,
  } = useForm<RegisterFormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const t = useTranslations('register');
  const router = useRouter();
  const { setInitialUser } = useUpdateUser();
  const [registerLoading, setRegisterLoading] = useState(false);

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      setRegisterLoading(true);
      const {
        user,
        tokens: { accessToken },
      } = await registerApi(data.email, data.password);
      document.cookie = `token=${accessToken}; Path=/; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24}`;
      setInitialUser(user);
      router.replace(`/workspace`);
      setRegisterLoading(false);
    } catch (error) {
      setRegisterLoading(false);

      console.error('Registration failed:', error);
    }
  };

  const [debouncedValue, setValue] = useDebounceValue('', 500);
  const [emailExists, setEmailExists] = useState(false);

  const checkEmail = useCallback(
    async (email: string) => {
      try {
        const result = await checkEmailApi(email);
        setEmailExists(result);
        if (result) {
          setError('email', {
            type: 'manual',
            message: t('emailExists'),
          });
        }
      } catch (error) {
        setEmailExists(false);
      }
    },
    [t, setError],
  );

  useEffect(() => {
    if (formState.errors.email) return;
    if (debouncedValue) {
      checkEmail(debouncedValue);
    }
  }, [formState.errors.email, debouncedValue, checkEmail]);

  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');

  useEffect(() => {
    if (formState.errors.password || !confirmPasswordValue) return;
    if (confirmPasswordValue !== passwordValue) {
      // 1) 직접 setError 하기
      setError('confirmPassword', {
        type: 'validate',
        message: t('passwordMismatch'),
      });
    } else {
      clearErrors('confirmPassword');
    }
  }, [
    passwordValue,
    confirmPasswordValue,
    formState.errors.password,
    setError,
    clearErrors,
    t,
  ]);

  return (
    <Fieldset.Root size="lg" maxW="md">
      {/* <Stack>
          <Fieldset.Legend>Sign In</Fieldset.Legend>
        </Stack> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <Fieldset.Content>
            <Field.Root invalid={!!formState.errors.email}>
              <Field.Label>{t('email')}</Field.Label>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: t('emailRequired'),
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t('emailInvalid'),
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setValue(e.target.value);
                    }}
                    name="email"
                    type="email"
                    autoComplete="email"
                  />
                )}
              ></Controller>

              {formState.errors.email && (
                <Field.ErrorText>
                  {formState.errors.email.message}
                </Field.ErrorText>
              )}
            </Field.Root>
            <Field.Root invalid={!!formState.errors.password}>
              <Field.Label>{t('password')}</Field.Label>
              <Input
                {...register('password', {
                  required: t('passwordRequired'),
                  minLength: {
                    value: 8,
                    message: t('passwordMinLength'),
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W_]{8,}$/,
                    message: t('passwordConditions'),
                  },
                })}
                name="password"
                type="password"
                autoComplete="new-password"
              />
              {formState.errors.password && (
                <Field.ErrorText>
                  {formState.errors.password.message}
                </Field.ErrorText>
              )}
            </Field.Root>
            <Field.Root invalid={!!formState.errors.confirmPassword}>
              <Field.Label>{t('confirmPassword')}</Field.Label>
              <Input
                {...register('confirmPassword', {
                  required: t('confirmPasswordRequired'),
                  validate: (value) =>
                    value === passwordValue || t('passwordMismatch'),
                })}
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
              />
              {formState.errors.confirmPassword && (
                <Field.ErrorText>
                  {formState.errors.confirmPassword.message}
                </Field.ErrorText>
              )}
            </Field.Root>
          </Fieldset.Content>
          <Button
            loading={registerLoading}
            mt={8}
            type="submit"
            alignSelf="flex-start"
          >
            {t('registerButton')}
          </Button>
        </>
      </form>
    </Fieldset.Root>
  );
}

export default Register;
