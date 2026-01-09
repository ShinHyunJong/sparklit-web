'use client';

import {
  Button,
  Field,
  Fieldset,
  Flex,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useUpdateUser } from '@/hooks/auth';
import { loginApi } from '@/hooks/auth/api';

type FormValues = {
  email: string;
  password: string;
};

function LoginPage() {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });
  const [loginLoading, setLoginLoading] = useState(false);
  const { setInitialUser } = useUpdateUser();
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    setLoginLoading(true);
    try {
      const {
        tokens: { accessToken },
        user,
      } = await loginApi(data.email, data.password);
      document.cookie = `token=${accessToken}; Path=/; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`;
      setInitialUser(user);
      router.replace(`/studio`);
      setLoginLoading(false);
    } catch (error) {
      setLoginLoading(false);
      console.error('Login failed:', error);
    }
  };

  return (
    <Fieldset.Root
      size="lg"
      maxW="md"
      bg="white"
      p={8}
      borderRadius="md"
      boxShadow="md"
    >
      <Flex direction="column">
        <Heading as="h1" size="lg">
          Login to Sparklit
        </Heading>
        <Text color="gray.500">
          Please enter your email and password to login.
        </Text>
      </Flex>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Email</Field.Label>
            <Input {...register('email')} name="email" type="email" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Password</Field.Label>
            <Input
              {...register('password')}
              autoComplete="current-password"
              name="password"
              type="password"
            />
          </Field.Root>
        </Fieldset.Content>

        <Button
          loading={loginLoading}
          mt={8}
          type="submit"
          alignSelf="flex-start"
        >
          Login
        </Button>
      </form>
    </Fieldset.Root>
  );
}

export default LoginPage;
