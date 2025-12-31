import { Accordion, DataList, Flex, Text, Textarea } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { saved } from '@/helpers/toaster.helper';
import { updateSponsorsApi } from '@/hooks/invitation/api';

type SponsorForm = {
  primary: string;
  secondary: string;
};

function SponsorInput({
  primary,
  secondary,
}: {
  primary: string | null;
  secondary: string | null;
}) {
  const searchParams = useSearchParams();
  const invitationId = searchParams.get('uid') || '';

  const [primarySponsor, setPrimarySponsor] = useAtom(
    invitationEditorAtom.primarySponsor,
  );
  const [secondarySponsor, setSecondarySponsor] = useAtom(
    invitationEditorAtom.secondarySponsor,
  );

  const { register, handleSubmit, setValue } = useForm<SponsorForm>({
    defaultValues: { primary: primarySponsor, secondary: secondarySponsor },
  });

  useEffect(() => {
    if (primary) {
      setPrimarySponsor(primary);
      setValue('primary', primary);
    }
    if (secondary) {
      setSecondarySponsor(secondary);
      setValue('secondary', secondary);
    }
  }, [primary, secondary]);

  const onBlurPrimary = async (value: string) => {
    saved(() => updateSponsorsApi(invitationId, value, secondarySponsor));
  };

  const onBlurSecondary = async (value: string) => {
    saved(() => updateSponsorsApi(invitationId, primarySponsor, value));
  };

  return (
    <Accordion.Item
      value="dressCode"
      bg="white"
      borderRadius="sm"
      borderBottomWidth={0}
    >
      <Accordion.ItemTrigger>
        <Flex borderRadius="sm" p={4} w="full">
          <Text>Sponsor</Text>
        </Flex>
        <Accordion.ItemIndicator bg="white" mr={4} />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody p={4}>
          <Flex w="full" mb={4} direction="column" gap={4}>
            <DataList.Root orientation="horizontal">
              <DataList.Item>
                <DataList.ItemLabel>Primary</DataList.ItemLabel>
                <DataList.ItemValue>
                  <Textarea
                    {...register('primary')}
                    value={primarySponsor}
                    variant="subtle"
                    onChange={(e) => setPrimarySponsor(e.target.value)}
                    onBlur={(e) => onBlurPrimary(e.target.value)}
                    size="sm"
                  ></Textarea>
                </DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>
            <DataList.Root orientation="horizontal">
              <DataList.Item>
                <DataList.ItemLabel>Secondary</DataList.ItemLabel>
                <DataList.ItemValue>
                  <Textarea
                    {...register('secondary')}
                    value={secondarySponsor}
                    variant="subtle"
                    onChange={(e) => setSecondarySponsor(e.target.value)}
                    onBlur={(e) => onBlurSecondary(e.target.value)}
                    size="sm"
                  ></Textarea>
                </DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>
          </Flex>
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
}

export default SponsorInput;
