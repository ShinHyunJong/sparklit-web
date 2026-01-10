'use client';

import {
  Field,
  Flex,
  GridItem,
  Input,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { useInvitationEditorForm, useSaveInvitation } from '@/hooks/invitation';

type BrideInputProps = {
  lastName: string;
  firstName: string;
  middleName: string;
  momName: string;
  dadName: string;
};

function BrideInput({
  lastName,
  firstName,
  middleName,
  momName,
  dadName,
}: BrideInputProps) {
  const { onClickSave } = useSaveInvitation();
  const [brideLastName, setBrideLastName] = useAtom(
    invitationEditorAtom.brideLastName,
  );
  const [brideFirstName, setBrideFirstName] = useAtom(
    invitationEditorAtom.brideFirstName,
  );
  const [brideMiddleName, setBrideMiddleName] = useAtom(
    invitationEditorAtom.brideMiddleName,
  );
  const [brideMomName, setBrideMomName] = useAtom(
    invitationEditorAtom.brideMomName,
  );
  const [brideDadName, setBrideDadName] = useAtom(
    invitationEditorAtom.brideDadName,
  );

  const { control, formState, setValue, getValues } = useInvitationEditorForm();

  useEffect(() => {
    setValue('brideLastName', lastName || '');
    setValue('brideFirstName', firstName || '');
    setValue('brideMiddleName', middleName || '');
    setValue('brideMomName', momName || '');
    setValue('brideDadName', dadName || '');

    setBrideLastName(lastName || '');
    setBrideFirstName(firstName || '');
    setBrideMiddleName(middleName || '');
    setBrideMomName(momName || '');
    setBrideDadName(dadName || '');
  }, [lastName, firstName, middleName, momName, dadName]);

  return (
    <SimpleGrid
      columns={{ base: 1, md: 4 }}
      gap={{ base: 3, md: 4 }}
      gridTemplateColumns={{ base: '1fr', md: '0.5fr 2fr 2fr 2fr' }}
    >
      <GridItem>
        <Flex h="full" alignItems="center">
          <Text color="gray.500" fontSize="sm">
            Bride
          </Text>
        </Flex>
      </GridItem>
      <GridItem>
        <Field.Root invalid={!!formState.errors.brideFirstName}>
          <Controller
            control={control}
            name="brideFirstName"
            rules={{
              required: 'First name is required',
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                variant="subtle"
                placeholder="First name"
                onBlur={() => onClickSave()}
                onChange={(e) => {
                  setBrideFirstName(e.target.value);
                  field.onChange(e.target.value);
                }}
              />
            )}
          ></Controller>
          {formState.errors.brideFirstName && (
            <Field.ErrorText>
              {formState.errors.brideFirstName.message}
            </Field.ErrorText>
          )}
        </Field.Root>
      </GridItem>

      <GridItem>
        <Field.Root>
          <Controller
            control={control}
            name="brideMiddleName"
            render={({ field }) => (
              <Input
                variant="subtle"
                {...field}
                type="text"
                placeholder="Middle name"
                onBlur={() => onClickSave()}
                onChange={(e) => {
                  setBrideMiddleName(e.target.value);
                  field.onChange(e.target.value);
                }}
              />
            )}
          ></Controller>
        </Field.Root>
      </GridItem>
      <GridItem>
        <Field.Root invalid={!!formState.errors.brideLastName}>
          <Controller
            control={control}
            name="brideLastName"
            rules={{
              required: 'Last name is required',
            }}
            render={({ field }) => (
              <Input
                {...field}
                onChange={(e) => {
                  setBrideLastName(e.target.value);
                  field.onChange(e.target.value);
                }}
                onBlur={() => onClickSave()}
                variant="subtle"
                type="text"
                placeholder="Last name"
              />
            )}
          ></Controller>
          {formState.errors.brideLastName && (
            <Field.ErrorText>
              {formState.errors.brideLastName.message}
            </Field.ErrorText>
          )}
        </Field.Root>
      </GridItem>

      <GridItem>
        <Flex h="full" alignItems="center">
          <Text color="gray.500" fontSize="sm">
            Mother
          </Text>
        </Flex>
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 3 }}>
        <Field.Root>
          <Controller
            control={control}
            name="brideMomName"
            render={({ field }) => (
              <Input
                variant="subtle"
                {...field}
                type="text"
                onBlur={() => onClickSave()}
                placeholder="Mom's name"
                onChange={(e) => {
                  setBrideMomName(e.target.value);
                  field.onChange(e.target.value);
                }}
              />
            )}
          ></Controller>
          <Field.HelperText color="gray.400" fontSize="xs">
            Leave this blank if you prefer not to mention it.
          </Field.HelperText>
        </Field.Root>
      </GridItem>
      <GridItem>
        <Flex h="full" alignItems="center">
          <Text color="gray.500" fontSize="sm">
            Father
          </Text>
        </Flex>
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 3 }}>
        <Field.Root>
          <Controller
            control={control}
            name="brideDadName"
            render={({ field }) => (
              <Input
                variant="subtle"
                {...field}
                type="text"
                placeholder="Dad's name"
                onBlur={() => onClickSave()}
                onChange={(e) => {
                  setBrideDadName(e.target.value);
                  field.onChange(e.target.value);
                }}
              />
            )}
          ></Controller>
          <Field.HelperText color="gray.400" fontSize="xs">
            Leave this blank if you prefer not to mention it.
          </Field.HelperText>
        </Field.Root>
      </GridItem>
    </SimpleGrid>
  );
}
export default BrideInput;
