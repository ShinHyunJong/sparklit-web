import {
  Accordion,
  DataList,
  Flex,
  Switch,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { saved } from '@/helpers/toaster.helper';
import {
  updateEntourageApi,
  updateLayoutOrderApi,
} from '@/hooks/invitation/api';

type EntourageForm = {
  bestMan: string;
  maidOfHonor: string;
  groomsMen: string;
  bridesMaids: string;
};

function EntourageInput({
  bestMan,
  maidOfHonor,
  groomsMen,
  bridesMaids,
}: {
  bestMan: string | null;
  maidOfHonor: string | null;
  groomsMen: string | null;
  bridesMaids: string | null;
}) {
  const searchParams = useSearchParams();
  const invitationId = searchParams.get('uid') || '';

  // 1. 레이아웃 순서 및 가시성 상태 atom
  const [layoutSettings, setLayoutSettings] = useAtom(
    invitationEditorAtom.layoutOrderAtom,
  );

  // Jotai Atoms
  const [bm, setBm] = useAtom(invitationEditorAtom.bestMan);
  const [moh, setMoh] = useAtom(invitationEditorAtom.maidOfHonor);
  const [gm, setGm] = useAtom(invitationEditorAtom.groomsMen);
  const [bmDs, setBmDs] = useAtom(invitationEditorAtom.bridesMaids);

  // 2. 현재 'entourage' 항목의 가시성 상태 찾기
  const entourageLayout = layoutSettings.find(
    (item) => item.id === 'Entourage',
  );
  const isVisible = entourageLayout?.visible ?? true;

  const { register, setValue } = useForm<EntourageForm>({
    defaultValues: {
      bestMan: bm,
      maidOfHonor: moh,
      groomsMen: gm,
      bridesMaids: bmDs,
    },
  });

  useEffect(() => {
    if (bestMan) {
      setBm(bestMan);
      setValue('bestMan', bestMan);
    }
    if (maidOfHonor) {
      setMoh(maidOfHonor);
      setValue('maidOfHonor', maidOfHonor);
    }
    if (groomsMen) {
      setGm(groomsMen);
      setValue('groomsMen', groomsMen);
    }
    if (bridesMaids) {
      setBmDs(bridesMaids);
      setValue('bridesMaids', bridesMaids);
    }
  }, [
    bestMan,
    maidOfHonor,
    groomsMen,
    bridesMaids,
    setBm,
    setMoh,
    setGm,
    setBmDs,
    setValue,
  ]);

  // 가시성 토글 핸들러
  const handleToggleVisible = (details: { checked: boolean }) => {
    const nextLayout = layoutSettings.map((item) =>
      item.id === 'Entourage' ? { ...item, visible: details.checked } : item,
    );

    setLayoutSettings(nextLayout);
    saved(() => updateLayoutOrderApi(invitationId, JSON.stringify(nextLayout)));
  };

  const handleUpdate = async () => {
    saved(() => updateEntourageApi(invitationId, bm, moh, gm, bmDs));
  };

  const fields = [
    { label: 'Best Man', value: bm, setter: setBm, reg: 'bestMan' },
    { label: 'Maid of Honor', value: moh, setter: setMoh, reg: 'maidOfHonor' },
    { label: 'Groomsmen', value: gm, setter: setGm, reg: 'groomsMen' },
    { label: 'Bridesmaids', value: bmDs, setter: setBmDs, reg: 'bridesMaids' },
  ] as const;

  return (
    <Accordion.Item
      value="entourage"
      bg="white"
      borderRadius="sm"
      borderBottomWidth={0}
      opacity={isVisible ? 1 : 0.6}
    >
      <Accordion.ItemTrigger>
        <Flex borderRadius="sm" p={4} w="full" align="center" gap={3}>
          {/* 가시성 토글 스위치 */}
          <Switch.Root
            colorScheme="teal"
            checked={isVisible}
            onCheckedChange={handleToggleVisible}
            onClick={(e) => e.stopPropagation()}
          >
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch.Root>

          <Text fontWeight={isVisible ? 'bold' : 'normal'}>Entourage</Text>
        </Flex>
        <Accordion.ItemIndicator bg="white" mr={4} />
      </Accordion.ItemTrigger>

      <Accordion.ItemContent>
        <Accordion.ItemBody p={4}>
          <Flex w="full" mb={4} direction="column" gap={4}>
            {fields.map((field) => (
              <DataList.Root orientation="horizontal" key={field.reg}>
                <DataList.Item>
                  <DataList.ItemLabel>{field.label}</DataList.ItemLabel>
                  <DataList.ItemValue>
                    <Textarea
                      {...register(field.reg as any)}
                      value={field.value}
                      variant="subtle"
                      onChange={(e) => field.setter(e.target.value)}
                      onBlur={handleUpdate}
                      size="sm"
                    />
                  </DataList.ItemValue>
                </DataList.Item>
              </DataList.Root>
            ))}
          </Flex>
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
}

export default EntourageInput;
