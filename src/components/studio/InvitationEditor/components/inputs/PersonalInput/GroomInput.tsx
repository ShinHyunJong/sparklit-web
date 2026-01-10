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

type GroomInputProps = {
  lastName: string;
  firstName: string;
  middleName: string;
  momName: string;
  dadName: string;
};

function GroomInput({
  lastName,
  firstName,
  middleName,
  momName,
  dadName,
}: GroomInputProps) {
  const { onClickSave } = useSaveInvitation();
  const { control, formState, setValue } = useInvitationEditorForm();

  const [groomLastName, setGroomLastName] = useAtom(
    invitationEditorAtom.groomLastName,
  );
  const [groomFirstName, setGroomFirstName] = useAtom(
    invitationEditorAtom.groomFirstName,
  );
  const [groomMiddleName, setGroomMiddleName] = useAtom(
    invitationEditorAtom.groomMiddleName,
  );
  const [groomMomName, setGroomMomName] = useAtom(
    invitationEditorAtom.groomMomName,
  );
  const [groomDadName, setGroomDadName] = useAtom(
    invitationEditorAtom.groomDadName,
  );

  useEffect(() => {
    setValue('groomLastName', lastName || '');
    setValue('groomFirstName', firstName || '');
    setValue('groomMiddleName', middleName || '');
    setValue('groomMomName', momName || '');
    setValue('groomDadName', dadName || '');

    setGroomLastName(lastName || '');
    setGroomFirstName(firstName || '');
    setGroomMiddleName(middleName || '');
    setGroomMomName(momName || '');
    setGroomDadName(dadName || '');
  }, [lastName, firstName, middleName, momName, dadName, setValue]);

  return (
    <SimpleGrid
      columns={{ base: 1, md: 4 }}
      gap={{ base: 3, md: 4 }}
      gridTemplateColumns={{ base: '1fr', md: '0.5fr 2fr 2fr 2fr' }}
    >
      <GridItem>
        <Flex h="full" alignItems="center">
          <Text color="gray.500" fontSize="sm">
            Groom
          </Text>
        </Flex>
      </GridItem>
      <GridItem>
        <Field.Root invalid={!!formState.errors.groomFirstName}>
          <Controller
            control={control}
            name="groomFirstName"
            rules={{
              required: 'First name is required',
            }}
            render={({ field }) => (
              <Input
                {...field}
                onChange={(e) => {
                  setGroomFirstName(e.target.value);
                  field.onChange(e.target.value);
                }}
                type="text"
                variant="subtle"
                onBlur={() => onClickSave()}
                placeholder="First name"
              />
            )}
          ></Controller>
          {formState.errors.groomFirstName && (
            <Field.ErrorText>
              {formState.errors.groomFirstName.message}
            </Field.ErrorText>
          )}
        </Field.Root>
      </GridItem>
      <GridItem>
        <Field.Root>
          <Controller
            control={control}
            name="groomMiddleName"
            render={({ field }) => (
              <Input
                {...field}
                variant="subtle"
                onChange={(e) => {
                  setGroomMiddleName(e.target.value);
                  field.onChange(e.target.value);
                }}
                type="text"
                onBlur={() => onClickSave()}
                placeholder="Middle name"
              />
            )}
          ></Controller>
        </Field.Root>
      </GridItem>
      <GridItem>
        <Field.Root invalid={!!formState.errors.groomLastName}>
          <Controller
            control={control}
            name="groomLastName"
            rules={{
              required: 'Last name is required',
            }}
            render={({ field }) => (
              <Input
                variant="subtle"
                {...field}
                type="text"
                placeholder="Last name"
                onChange={(e) => {
                  setGroomLastName(e.target.value);
                  field.onChange(e.target.value);
                }}
                onBlur={() => onClickSave()}
              />
            )}
          ></Controller>
          {formState.errors.groomLastName && (
            <Field.ErrorText>
              {formState.errors.groomLastName.message}
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
            name="groomMomName"
            render={({ field }) => (
              <Input
                {...field}
                variant="subtle"
                onChange={(e) => {
                  setGroomMomName(e.target.value);
                  field.onChange(e.target.value);
                }}
                onBlur={() => onClickSave()}
                type="text"
                placeholder="Mom's name"
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
            name="groomDadName"
            render={({ field }) => (
              <Input
                {...field}
                variant="subtle"
                onChange={(e) => {
                  setGroomDadName(e.target.value);
                  field.onChange(e.target.value);
                }}
                type="text"
                onBlur={() => onClickSave()}
                placeholder="Dad's name"
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
export default GroomInput;
