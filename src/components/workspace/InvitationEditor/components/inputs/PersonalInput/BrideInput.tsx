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
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('workspace.invitationEditor.bride');
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
    <SimpleGrid columns={4} gap={4} gridTemplateColumns="0.5fr 2fr 2fr 2fr">
      <GridItem>
        <Flex h="full" alignItems="center">
          <Text color="gray.500" fontSize="sm">
            {t('title')}
          </Text>
        </Flex>
      </GridItem>
      <GridItem>
        <Field.Root invalid={!!formState.errors.brideLastName}>
          <Controller
            control={control}
            name="brideLastName"
            rules={{
              required: t('lastNameRequired'),
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
                placeholder={t('lastNamePlaceholder')}
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
        <Field.Root>
          <Controller
            control={control}
            name="brideMiddleName"
            render={({ field }) => (
              <Input
                variant="subtle"
                {...field}
                type="text"
                placeholder={t('middleNamePlaceholder')}
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
        <Field.Root invalid={!!formState.errors.brideFirstName}>
          <Controller
            control={control}
            name="brideFirstName"
            rules={{
              required: t('firstNameRequired'),
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                variant="subtle"
                placeholder={t('firstNamePlaceholder')}
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
        <Flex h="full" alignItems="center">
          <Text color="gray.500" fontSize="sm">
            {t('momLabel')}
          </Text>
        </Flex>
      </GridItem>
      <GridItem colSpan={3}>
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
                placeholder={t('momNamePlaceholder')}
                onChange={(e) => {
                  setBrideMomName(e.target.value);
                  field.onChange(e.target.value);
                }}
              />
            )}
          ></Controller>
        </Field.Root>
      </GridItem>
      <GridItem>
        <Flex h="full" alignItems="center">
          <Text color="gray.500" fontSize="sm">
            {t('dadLabel')}
          </Text>
        </Flex>
      </GridItem>
      <GridItem colSpan={3}>
        <Field.Root>
          <Controller
            control={control}
            name="brideDadName"
            render={({ field }) => (
              <Input
                variant="subtle"
                {...field}
                type="text"
                placeholder={t('dadNamePlaceholder')}
                onBlur={() => onClickSave()}
                onChange={(e) => {
                  setBrideDadName(e.target.value);
                  field.onChange(e.target.value);
                }}
              />
            )}
          ></Controller>
        </Field.Root>
      </GridItem>
    </SimpleGrid>
  );
}
export default BrideInput;
