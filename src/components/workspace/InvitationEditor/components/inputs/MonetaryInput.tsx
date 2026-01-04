import {
  Accordion,
  DataList,
  Flex,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { saved } from '@/helpers/toaster.helper';
import { updateMonetaryGiftApi } from '@/hooks/invitation/api';
// 주의: API 함수 구조에 맞춰 수정이 필요할 수 있습니다.

type GiftForm = {
  bankAccount: string;
  wishlistUrl: string;
};

function MonetaryInput({
  initialBankAccount,
  initialWishlistUrl,
}: {
  initialBankAccount?: string;
  initialWishlistUrl?: string;
}) {
  const searchParams = useSearchParams();
  const invitationId = searchParams.get('uid') || '';

  // Jotai Atoms (해당 아톰들이 invitationEditorAtom 내에 정의되어 있다고 가정합니다)
  const [bankAccount, setBankAccount] = useAtom(
    invitationEditorAtom.bankAccount,
  );
  const [wishlistUrl, setWishlistUrl] = useAtom(
    invitationEditorAtom.wishlistUrl,
  );

  const { register, setValue } = useForm<GiftForm>({
    defaultValues: {
      bankAccount: initialBankAccount || '',
      wishlistUrl: initialWishlistUrl || '',
    },
  });

  // 초기 데이터 로드 시 값 세팅
  useEffect(() => {
    if (initialBankAccount) {
      setBankAccount(initialBankAccount);
      setValue('bankAccount', initialBankAccount);
    }
    if (initialWishlistUrl) {
      setWishlistUrl(initialWishlistUrl);
      setValue('wishlistUrl', initialWishlistUrl);
    }
    // ... 다른 필드들도 필요시 추가
  }, [initialBankAccount, initialWishlistUrl]);

  // Blur 시 저장 로직 (API 구조에 따라 인자 값을 조정하세요)
  const handleSave = async () => {
    saved(() => updateMonetaryGiftApi(invitationId, bankAccount, wishlistUrl));
  };

  return (
    <Accordion.Item
      value="monetaryGifts"
      bg="white"
      borderRadius="sm"
      borderBottomWidth={0}
    >
      <Accordion.ItemTrigger>
        <Flex borderRadius="sm" p={4} w="full">
          <Text>Monetary & Gifts</Text>
        </Flex>
        <Accordion.ItemIndicator bg="white" mr={4} />
      </Accordion.ItemTrigger>

      <Accordion.ItemContent>
        <Accordion.ItemBody p={4}>
          <Flex w="full" direction="column" gap={6}>
            {/* 계좌 정보 (Textarea) */}
            <DataList.Root orientation="horizontal">
              <DataList.Item>
                <DataList.ItemLabel pt={2}>Bank Account</DataList.ItemLabel>
                <DataList.ItemValue>
                  <Textarea
                    {...register('bankAccount')}
                    value={bankAccount}
                    placeholder="Bank account details..."
                    variant="subtle"
                    onChange={(e) => setBankAccount(e.target.value)}
                    onBlur={handleSave}
                    size="sm"
                  />
                </DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>

            {/* 신부 위시리스트 (Input) */}
            <DataList.Root orientation="horizontal">
              <DataList.Item>
                <DataList.ItemLabel>Bride Wishlist</DataList.ItemLabel>
                <DataList.ItemValue>
                  <Input
                    {...register('wishlistUrl')}
                    value={wishlistUrl}
                    placeholder="https://..."
                    variant="subtle"
                    onChange={(e) => setWishlistUrl(e.target.value)}
                    onBlur={handleSave}
                    size="sm"
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

export default MonetaryInput;
