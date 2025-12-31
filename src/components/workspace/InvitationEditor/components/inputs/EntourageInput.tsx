import { Accordion, DataList, Flex, Text, Textarea } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { saved } from '@/helpers/toaster.helper';
// 주의: 해당 API 함수는 기존의 updateSponsorsApi와 유사한 형식으로 존재한다고 가정하거나 새로 만드셔야 합니다.
import { updateEntourageApi } from '@/hooks/invitation/api';

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

  // Jotai Atoms (해당 atom들이 invitationEditorAtom 내에 정의되어 있어야 합니다)
  const [bm, setBm] = useAtom(invitationEditorAtom.bestMan);
  const [moh, setMoh] = useAtom(invitationEditorAtom.maidOfHonor);
  const [gm, setGm] = useAtom(invitationEditorAtom.groomsMen);
  const [bmDs, setBmDs] = useAtom(invitationEditorAtom.bridesMaids);

  const { register, setValue } = useForm<EntourageForm>({
    defaultValues: {
      bestMan: bm,
      maidOfHonor: moh,
      groomsMen: gm,
      bridesMaids: bmDs,
    },
  });

  // 초기 props 데이터 동기화
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
  }, [bestMan, maidOfHonor, groomsMen, bridesMaids]);

  // Blur 이벤트 발생 시 API 호출 (현재 상태값들을 모아서 전송)
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
    >
      <Accordion.ItemTrigger>
        <Flex borderRadius="sm" p={4} w="full">
          <Text>Entourage</Text>
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
                      {...register(field.reg)}
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
