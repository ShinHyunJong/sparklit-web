import {
  Accordion,
  DataList,
  Flex,
  Switch,
  Text,
  Textarea,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { saved } from '@/helpers/toaster.helper';
import {
  updateLayoutOrderApi,
  updateSponsorsApi,
} from '@/hooks/invitation/api';

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

  // 레이아웃 순서 및 가시성 상태 atom
  const [layoutSettings, setLayoutSettings] = useAtom(
    invitationEditorAtom.layoutOrderAtom,
  );

  const [primarySponsor, setPrimarySponsor] = useAtom(
    invitationEditorAtom.primarySponsor,
  );
  const [secondarySponsor, setSecondarySponsor] = useAtom(
    invitationEditorAtom.secondarySponsor,
  );

  // 현재 'Sponsor' 항목의 가시성 상태 찾기
  const sponsorLayout = layoutSettings.find((item) => item.id === 'Sponsor');
  const isVisible = sponsorLayout?.visible ?? true;

  const { register, setValue } = useForm<SponsorForm>({
    defaultValues: { primary: primarySponsor, secondary: secondarySponsor },
  });
  const dataListOrientation =
    useBreakpointValue({ base: 'vertical', md: 'horizontal' }) ?? 'horizontal';

  useEffect(() => {
    if (primary) {
      setPrimarySponsor(primary);
      setValue('primary', primary);
    }
    if (secondary) {
      setSecondarySponsor(secondary);
      setValue('secondary', secondary);
    }
  }, [primary, secondary, setPrimarySponsor, setSecondarySponsor, setValue]);

  // 가시성 토글 핸들러
  const handleToggleVisible = (details: { checked: boolean }) => {
    const nextLayout = layoutSettings.map((item) =>
      item.id === 'Sponsor' ? { ...item, visible: details.checked } : item,
    );

    setLayoutSettings(nextLayout);
    // 변경된 레이아웃 설정을 DB에 저장
    saved(() => updateLayoutOrderApi(invitationId, JSON.stringify(nextLayout)));
  };

  const onBlurPrimary = async (value: string) => {
    saved(() => updateSponsorsApi(invitationId, value, secondarySponsor));
  };

  const onBlurSecondary = async (value: string) => {
    saved(() => updateSponsorsApi(invitationId, primarySponsor, value));
  };

  return (
    <Accordion.Item
      value="sponsor"
      bg="white"
      borderRadius="sm"
      borderBottomWidth={0}
      opacity={isVisible ? 1 : 0.6} // 비활성화 시 흐리게 표시
    >
      <Accordion.ItemTrigger>
        <Flex
          borderRadius="sm"
          p={{ base: 3, md: 4 }}
          w="full"
          align="center"
          gap={3}
        >
          {/* 가시성 토글 스위치 */}
          <Switch.Root
            colorScheme="teal"
            checked={isVisible}
            onCheckedChange={handleToggleVisible}
            // 스위치 클릭 시 어코디언 이벤트가 발생하는 것을 방지
            onClick={(e) => e.stopPropagation()}
          >
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch.Root>

          <Text fontWeight={isVisible ? 'bold' : 'normal'}>Sponsor</Text>
        </Flex>
        <Accordion.ItemIndicator bg="white" mr={4} />
      </Accordion.ItemTrigger>

      <Accordion.ItemContent>
        <Accordion.ItemBody p={{ base: 3, md: 4 }}>
          <Flex w="full" mb={{ base: 3, md: 4 }} direction="column" gap={4}>
            <DataList.Root orientation={dataListOrientation}>
              <DataList.Item>
                <DataList.ItemLabel>Principal</DataList.ItemLabel>
                <DataList.ItemValue w="full">
                  <Textarea
                    {...register('primary')}
                    value={primarySponsor}
                    variant="subtle"
                    onChange={(e) => setPrimarySponsor(e.target.value)}
                    onBlur={(e) => onBlurPrimary(e.target.value)}
                    size="sm"
                    w="full"
                  />
                </DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>

            <DataList.Root orientation={dataListOrientation}>
              <DataList.Item>
                <DataList.ItemLabel>Secondary</DataList.ItemLabel>
                <DataList.ItemValue w="full">
                  <Textarea
                    {...register('secondary')}
                    value={secondarySponsor}
                    variant="subtle"
                    onChange={(e) => setSecondarySponsor(e.target.value)}
                    onBlur={(e) => onBlurSecondary(e.target.value)}
                    size="sm"
                    w="full"
                  />
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
