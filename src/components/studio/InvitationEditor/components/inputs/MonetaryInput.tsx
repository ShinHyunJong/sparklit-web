import {
  Accordion,
  DataList,
  Flex,
  Input,
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
  updateMonetaryGiftApi,
} from '@/hooks/invitation/api';

type GiftForm = {
  bankAccount: string;
  wishlistUrl: string;
  wishlistText: string;
};

function MonetaryInput({
  initialBankAccount,
  initialWishlistUrl,
  initialWishlistText,
}: {
  initialBankAccount?: string;
  initialWishlistUrl?: string;
  initialWishlistText?: string;
}) {
  const searchParams = useSearchParams();
  const invitationId = searchParams.get('uid') || '';

  // 1. 레이아웃 순서 및 가시성 상태 atom
  const [layoutSettings, setLayoutSettings] = useAtom(
    invitationEditorAtom.layoutOrderAtom,
  );

  const [bankAccount, setBankAccount] = useAtom(
    invitationEditorAtom.bankAccount,
  );
  const [wishlistUrl, setWishlistUrl] = useAtom(
    invitationEditorAtom.wishlistUrl,
  );
  const [wishlistText, setWishlistText] = useAtom(
    invitationEditorAtom.wishlistText,
  );

  // 2. 현재 'monetary' 항목의 가시성 상태 찾기 (ID 소문자 일치)
  const monetaryLayout = layoutSettings.find(
    (item) => item.id === 'MonetaryGift',
  );
  const isVisible = monetaryLayout?.visible ?? true;

  const { register, setValue } = useForm<GiftForm>({
    defaultValues: {
      bankAccount: initialBankAccount || '',
      wishlistUrl: initialWishlistUrl || '',
    },
  });
  const dataListOrientation =
    useBreakpointValue({ base: 'vertical', md: 'horizontal' }) ?? 'horizontal';

  useEffect(() => {
    if (initialBankAccount) {
      setBankAccount(initialBankAccount);
      setValue('bankAccount', initialBankAccount);
    }
    if (initialWishlistUrl) {
      setWishlistUrl(initialWishlistUrl);
      setValue('wishlistUrl', initialWishlistUrl);
    }
    if (initialWishlistText) {
      setWishlistText(initialWishlistText);
      setValue('wishlistText', initialWishlistText);
    }
  }, [
    initialBankAccount,
    initialWishlistUrl,
    initialWishlistText,
    setBankAccount,
    setWishlistUrl,
    setWishlistText,
    setValue,
  ]);

  // 가시성 토글 핸들러
  const handleToggleVisible = (details: { checked: boolean }) => {
    const nextLayout = layoutSettings.map((item) =>
      item.id === 'MonetaryGift' ? { ...item, visible: details.checked } : item,
    );

    setLayoutSettings(nextLayout);
    // 변경된 레이아웃 설정을 DB에 저장
    saved(() => updateLayoutOrderApi(invitationId, JSON.stringify(nextLayout)));
  };

  const handleSave = async () => {
    saved(() =>
      updateMonetaryGiftApi(
        invitationId,
        bankAccount,
        wishlistText,
        wishlistUrl,
      ),
    );
  };

  return (
    <Accordion.Item
      value="monetary"
      bg="white"
      borderRadius="sm"
      borderBottomWidth={0}
      opacity={isVisible ? 1 : 0.6}
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
            onClick={(e) => e.stopPropagation()}
          >
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch.Root>

          <Text fontWeight={isVisible ? 'bold' : 'normal'}>
            Monetary & Gifts
          </Text>
        </Flex>
        <Accordion.ItemIndicator bg="white" mr={4} />
      </Accordion.ItemTrigger>

      <Accordion.ItemContent>
        <Accordion.ItemBody p={{ base: 3, md: 4 }}>
          <Flex w="full" direction="column" gap={{ base: 4, md: 6 }}>
            <DataList.Root orientation={dataListOrientation}>
              <DataList.Item>
                <DataList.ItemLabel pt={2}>Bank Account</DataList.ItemLabel>
                <DataList.ItemValue w="full">
                  <Textarea
                    {...register('bankAccount')}
                    value={bankAccount}
                    placeholder="Bank account details..."
                    variant="subtle"
                    onChange={(e) => setBankAccount(e.target.value)}
                    onBlur={handleSave}
                    size="sm"
                    w="full"
                  />
                </DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>

            <DataList.Root orientation={dataListOrientation}>
              <DataList.Item>
                <DataList.ItemLabel>Wishlist Title</DataList.ItemLabel>
                <DataList.ItemValue w="full">
                  <Textarea
                    {...register('wishlistText')}
                    value={wishlistText}
                    placeholder="Wishlist title"
                    variant="subtle"
                    onChange={(e) => setWishlistText(e.target.value)}
                    onBlur={handleSave}
                    size="sm"
                    w="full"
                  />
                </DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>

            <DataList.Root orientation={dataListOrientation}>
              <DataList.Item>
                <DataList.ItemLabel>Wishlist URL</DataList.ItemLabel>
                <DataList.ItemValue w="full">
                  <Input
                    {...register('wishlistUrl')}
                    value={wishlistUrl}
                    placeholder="https://..."
                    variant="subtle"
                    onChange={(e) => setWishlistUrl(e.target.value)}
                    onBlur={handleSave}
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

export default MonetaryInput;
