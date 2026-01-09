import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  LuBell,
  LuCalendar,
  LuCircleCheck,
  LuClapperboard,
  LuHeartHandshake,
  LuImage,
  LuInfinity,
  LuLayers,
  LuMail,
  LuMapPin,
  LuMessageSquare,
  LuMousePointerClick,
  LuMusic,
  LuPalette,
  LuScrollText,
  LuSparkles,
  LuUsers,
} from 'react-icons/lu';

import { THEME } from '@/app/page';

import SectionShell from './SectionShell';

// ✅ NEW: English copy for 6 alternating sections
type HighlightSection = {
  tag: string;
  eyebrow?: string;
  title: string;
  desc: string;
  bullets?: string[];
  cta?: { label: string; href?: string };
  art: {
    mainIcon: React.ReactNode;
    subIconA?: React.ReactNode;
    subIconB?: React.ReactNode;
    badge?: string;
  };
};

const Sticker = ({
  children,
  tone = 'beige',
}: {
  children: React.ReactNode;
  tone?: 'beige' | 'mint' | 'blue' | 'pink' | 'yellow';
}) => {
  const toneMap: Record<string, { bg: string; border: string }> = {
    beige: { bg: '#F6F1EC', border: '#E7E0DA' },
    mint: { bg: '#E7F5EE', border: '#BFE3CE' },
    blue: { bg: '#EAF2FF', border: '#BBD3FF' },
    pink: { bg: '#FCE7F3', border: '#F8B4D9' },
    yellow: { bg: '#FEF3C7', border: '#FCD34D' },
  };
  const t = toneMap[tone] ?? toneMap.beige;

  return (
    <Box
      px={3}
      py={2}
      borderRadius="xl"
      bg={t.bg}
      borderWidth="1px"
      borderColor={t.border}
      fontWeight="black"
      letterSpacing="0.06em"
      fontSize="xs"
      lineHeight="1"
      display="inline-flex"
      alignItems="center"
      gap={2}
    >
      {children}
    </Box>
  );
};

const FeatureArt = ({ art }: { art: HighlightSection['art'] }) => {
  return (
    <Box
      position="relative"
      borderRadius="3xl"
      bg="white"
      borderWidth="1px"
      borderColor={THEME.cardBorder}
      minH={{ base: '240px', md: '320px' }}
      overflow="hidden"
    >
      <Box
        position="absolute"
        inset={0}
        bg="linear-gradient(180deg, rgba(246,241,236,0.0) 0%, rgba(246,241,236,0.55) 100%)"
      />

      <Box
        position="absolute"
        top={{ base: 10, md: 14 }}
        left={{ base: 10, md: 14 }}
        transform="rotate(-10deg)"
      >
        <Box
          w={{ base: '130px', md: '160px' }}
          h={{ base: '110px', md: '135px' }}
          borderRadius="2xl"
          bg="white"
          borderWidth="1px"
          borderColor={THEME.cardBorder}
          boxShadow="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon fontSize={{ base: '44px', md: '54px' }} color="#2F2F2F">
            {art.mainIcon}
          </Icon>
        </Box>
      </Box>

      {art.subIconA && (
        <Box
          position="absolute"
          bottom={{ base: 12, md: 16 }}
          left={{ base: 14, md: 22 }}
          transform="rotate(7deg)"
        >
          <Box
            w={{ base: '120px', md: '150px' }}
            h={{ base: '95px', md: '120px' }}
            borderRadius="2xl"
            bg="white"
            borderWidth="1px"
            borderColor={THEME.cardBorder}
            boxShadow="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon fontSize={{ base: '38px', md: '46px' }} color="#2F2F2F">
              {art.subIconA}
            </Icon>
          </Box>
        </Box>
      )}

      {art.subIconB && (
        <Box
          position="absolute"
          top={{ base: 16, md: 22 }}
          right={{ base: 12, md: 18 }}
          transform="rotate(12deg)"
          opacity={0.95}
        >
          <Box
            w={{ base: '120px', md: '150px' }}
            h={{ base: '95px', md: '120px' }}
            borderRadius="2xl"
            bg="white"
            borderWidth="1px"
            borderColor={THEME.cardBorder}
            boxShadow="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon fontSize={{ base: '38px', md: '46px' }} color="#2F2F2F">
              {art.subIconB}
            </Icon>
          </Box>
        </Box>
      )}

      {art.badge && (
        <Box position="absolute" top={6} right={6}>
          <Box
            px={3}
            py={2}
            borderRadius="2xl"
            bg="#E7F5EE"
            borderWidth="1px"
            borderColor="#BFE3CE"
            fontWeight="black"
            fontSize="sm"
            lineHeight="1"
          >
            {art.badge}
          </Box>
        </Box>
      )}

      <Box
        position="absolute"
        top={{ base: 16, md: 18 }}
        left={{ base: '52%', md: '50%' }}
        transform="translateX(-50%)"
        w="16px"
        h="16px"
        borderRadius="6px"
        bg="#FBBF24"
      />
      <Box
        position="absolute"
        bottom={{ base: 16, md: 18 }}
        left={{ base: '60%', md: '62%' }}
        w="14px"
        h="14px"
        borderRadius="6px"
        bg="#A855F7"
        opacity={0.9}
      />
    </Box>
  );
};

const HighlightSectionCard = ({
  item,
  index,
}: {
  item: HighlightSection;
  index: number;
}) => {
  const reverse = index % 2 === 1;

  const tone: 'beige' | 'mint' | 'blue' | 'pink' | 'yellow' =
    index % 5 === 0
      ? 'mint'
      : index % 5 === 1
        ? 'yellow'
        : index % 5 === 2
          ? 'blue'
          : index % 5 === 3
            ? 'pink'
            : 'beige';

  return (
    <Box pb={{ base: 10, md: 12 }}>
      <SectionShell>
        <Flex
          direction={{
            base: 'column',
            lg: reverse ? 'row-reverse' : 'row',
          }}
          gap={{ base: 10, lg: 12 }}
          align={{ base: 'stretch', lg: 'center' }}
          justify="space-between"
        >
          <Box flex="1">
            <FeatureArt art={item.art} />
          </Box>

          <VStack flex="1" align="start" gap={5}>
            <HStack gap={3} flexWrap="wrap">
              <Sticker tone={tone}>{item.tag}</Sticker>
              {item.eyebrow && (
                <Text fontSize="sm" color={THEME.muted} fontWeight="semibold">
                  {item.eyebrow}
                </Text>
              )}
            </HStack>

            <Heading
              size={{ base: 'lg', md: 'xl' }}
              lineHeight="1.15"
              color={THEME.text}
            >
              {item.title}
            </Heading>

            <Text fontSize="md" color="#4B5563" maxW="lg">
              {item.desc}
            </Text>

            {item.bullets?.length ? (
              <Stack gap={2} pt={1}>
                {item.bullets.map((b, i) => (
                  <HStack key={`${item.tag}-b-${i}`} align="start" gap={2}>
                    <Icon mt="2px" color="#9CA3AF">
                      <LuCircleCheck />
                    </Icon>
                    <Text fontSize="sm" color="#4B5563">
                      {b}
                    </Text>
                  </HStack>
                ))}
              </Stack>
            ) : null}
          </VStack>
        </Flex>
      </SectionShell>
    </Box>
  );
};

const Highlight = () => {
  const sections: HighlightSection[] = [
    {
      tag: 'MUSIC',
      eyebrow: 'Set the mood',
      title: 'Add music to your invitation.',
      desc: 'A single track can change the entire vibe. Turn your invitation into an experience—not just a page.',
      bullets: [
        'Clean play / pause controls',
        'Lightweight loading on mobile',
        'Stays consistent with the template tone',
      ],
      cta: { label: 'Apply', href: '#features' },
      art: {
        mainIcon: <LuMusic />,
        subIconA: <LuSparkles />,
        subIconB: <LuClapperboard />,
      },
    },
    {
      tag: 'PHOTOS',
      eyebrow: 'Share memories',
      title: 'Up to 20 photos, beautifully.',
      desc: 'Add lots of photos without making the page feel crowded. Guests get a gallery that’s actually enjoyable to browse.',
      bullets: [
        'Swipe-friendly viewing',
        'Curated, clean layout',
        'Fast and lightweight experience',
      ],
      cta: { label: 'Apply', href: '#features' },
      art: {
        mainIcon: <LuImage />,
        subIconA: <LuHeartHandshake />,
        subIconB: <LuPalette />,
      },
    },
    {
      tag: 'EASY TO USE',
      eyebrow: 'No stress',
      title: 'A few clicks is all it takes.',
      desc: 'Start from a polished base and edit only what matters. Less effort, more done—without breaking the design.',
      bullets: [
        'Simple editing flow',
        'Natural preview & share journey',
        'Especially comfortable on mobile',
      ],
      cta: { label: 'Apply', href: '#features' },
      art: {
        mainIcon: <LuMousePointerClick />,
        subIconA: <LuMessageSquare />,
        subIconB: <LuMail />,
      },
    },
    {
      tag: 'CUSTOMIZABLE',
      eyebrow: 'Make it yours',
      title: 'Adjust it to your taste.',
      desc: 'Tune fonts, colors, and section blocks—while keeping spacing and typography consistent across the entire page.',
      bullets: [
        'Toggle sections on/off',
        'Consistent spacing & typography',
        'Crisp, clean light-mode design',
      ],
      cta: { label: 'Apply', href: '#features' },
      art: {
        mainIcon: <LuPalette />,
        subIconA: <LuScrollText />,
        subIconB: <LuSparkles />,
      },
    },
    {
      tag: 'COST SAVING',
      eyebrow: 'Value',
      title: 'Unlimited guests + lifetime access.',
      desc: 'Save on designer back-and-forth and printed materials. Update anytime, and your link stays the same.',
      bullets: [
        'No guest limit',
        'Edit anytime without re-sending files',
        'Effortless sharing and management',
      ],
      cta: { label: 'Apply', href: '#features' },
      art: {
        mainIcon: <LuInfinity />,
        subIconA: <LuUsers />,
        subIconB: <LuBell />,
        badge: 'PROMO',
      },
    },
    {
      tag: 'ALL IN ONE',
      eyebrow: 'Everything together',
      title: 'One lovely invitation for everything.',
      desc: 'Photos, music, dress code, location, D-Day, notices, and RSVP—all organized in one place so guests never get lost.',
      bullets: [
        'Key details at a glance',
        'Easy to find what guests need',
        'Simplifies the entire sharing flow',
      ],
      cta: { label: 'Apply', href: '#features' },
      art: {
        mainIcon: <LuLayers />,
        subIconA: <LuMapPin />,
        subIconB: <LuCalendar />,
      },
    },
  ];

  return (
    <Box py={16}>
      {sections.map((s, idx) => (
        <HighlightSectionCard key={s.tag} item={s} index={idx} />
      ))}
    </Box>
  );
};
export default Highlight;
