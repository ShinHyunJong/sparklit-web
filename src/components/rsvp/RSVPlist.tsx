'use client';

import {
  Box,
  Center,
  HStack,
  Input,
  Spinner,
  Stack, // 반응형 레이아웃용 추가
  Table,
  Text,
} from '@chakra-ui/react';
import type { SortingState } from '@tanstack/react-table';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import {
  LuArrowUpDown,
  LuCircleCheck,
  LuCircleDashed,
  LuSearch,
  LuUsers,
} from 'react-icons/lu';

import { useRSVP } from '@/hooks/invitation/rsvp';
import type { InivitationRSVP } from '@/types/model';

const columnHelper = createColumnHelper<InivitationRSVP>();

function RSVPlistPage() {
  const { rsvpList, isLoading } = useRSVP();
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => (
          <Text fontWeight="semibold" color="#2e2823" whiteSpace="nowrap">
            {info.getValue() ?? '-'}
          </Text>
        ),
      }),
      columnHelper.accessor('attending', {
        header: 'Status',
        cell: (info) => (
          <HStack gap={1} whiteSpace="nowrap">
            {info.getValue() ? (
              <HStack color="green.600" gap={1}>
                <LuCircleCheck size={16} />
                <Text fontSize="sm" fontWeight="medium">
                  Attend
                </Text>
              </HStack>
            ) : (
              <HStack color="gray.500" gap={1}>
                <LuCircleDashed size={16} />
                <Text fontSize="sm">Absent</Text>
              </HStack>
            )}
          </HStack>
        ),
      }),
      columnHelper.accessor('phone', {
        header: 'Phone',
        cell: (info) => (
          <Text fontSize="sm" whiteSpace="nowrap">
            {info.getValue() ?? '-'}
          </Text>
        ),
      }),
      columnHelper.accessor('createdAt', {
        header: 'Date',
        cell: (info) => {
          const date = info.getValue();
          return (
            <Text fontSize="xs" color="gray.500" whiteSpace="nowrap">
              {date ? dayjs(date).format('YYYY.MM.DD') : '-'}
            </Text>
          );
        },
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: rsvpList ?? [],
    columns,
    state: { globalFilter, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) {
    return (
      <Center h="300px">
        <Spinner color="#7d6e5d" size="lg" />
        <Text ml={3} color="#7d6e5d">
          Loading data...
        </Text>
      </Center>
    );
  }

  return (
    <Box pt={[4, 6]} maxW="1200px" mx="auto">
      {/* Header Section: 모바일에서 상하 배치 대응 */}
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        mb={6}
        justify="space-between"
        align={{ base: 'flex-start', sm: 'flex-end' }}
        gap={4}
      >
        <Box>
          <HStack gap={2} mb={1}>
            <LuUsers size={20} color="#7d6e5d" />
            <Text fontSize="xl" fontWeight="bold" color="#4a4036">
              RSVP
            </Text>
          </HStack>
          <Text fontSize="sm" color="#a39281">
            Check the attendance of guests in real-time.
          </Text>
        </Box>
        <Text fontSize="sm" fontWeight="medium" color="#7d6e5d">
          Total Responses: {table.getFilteredRowModel().rows.length}
        </Text>
      </Stack>

      {/* Search Bar */}
      <Box mb={4} position="relative">
        <Input
          placeholder="Search by name, phone, email"
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          pl="10"
          bg="#fdfcfb"
          borderColor="#eaddd3"
          _focus={{ borderColor: '#a39281', boxShadow: '0 0 0 1px #a39281' }}
        />
        <Box
          position="absolute"
          left="3"
          top="50%"
          transform="translateY(-50%)"
          color="#a39281"
        >
          <LuSearch size={18} />
        </Box>
      </Box>

      {/* Table Unit: 가로 스크롤 최적화 핵심 */}
      <Box
        border="1px solid"
        borderColor="#eaddd3"
        borderRadius="lg"
        bg="white"
        boxShadow="sm"
        overflow="hidden" // 컨테이너 밖으로 내용 안나가게 함
      >
        <Box overflowX="auto" WebkitOverflowScrolling="touch">
          <Table.Root size="md" variant="line" minW="600px">
            <Table.Header bg="#f7f5f2">
              {table.getHeaderGroups().map((headerGroup) => (
                <Table.Row key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Table.ColumnHeader
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      cursor={
                        header.column.getCanSort() ? 'pointer' : 'default'
                      }
                      py={4}
                      color="#635649"
                      fontSize="sm"
                      fontWeight="bold"
                      whiteSpace="nowrap" // 헤더 줄바꿈 방지
                      _hover={
                        header.column.getCanSort() ? { bg: '#eaddd3' } : {}
                      }
                    >
                      <HStack gap={1}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getCanSort() && (
                          <LuArrowUpDown size={12} />
                        )}
                      </HStack>
                    </Table.ColumnHeader>
                  ))}
                </Table.Row>
              ))}
            </Table.Header>

            <Table.Body>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <Table.Row key={row.id} _hover={{ bg: '#fafaf9' }}>
                    {row.getVisibleCells().map((cell) => (
                      <Table.Cell key={cell.id} py={3}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell
                    colSpan={columns.length}
                    textAlign="center"
                    py={10}
                    color="#a39281"
                  >
                    No results found.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
            <Table.Footer>
              <Table.Row bg="#f7f5f2">
                <Table.Cell
                  colSpan={columns.length}
                  textAlign="right"
                  py={2}
                  fontSize="xs"
                  color="#7d6e5d"
                >
                  Attend :{' '}
                  {
                    table
                      .getFilteredRowModel()
                      .rows.filter((x) => !!x.original.attending).length
                  }
                </Table.Cell>
              </Table.Row>
              <Table.Row bg="#f7f5f2">
                <Table.Cell
                  colSpan={columns.length}
                  textAlign="right"
                  py={2}
                  fontSize="xs"
                  color="#7d6e5d"
                >
                  Absent :{' '}
                  {
                    table
                      .getFilteredRowModel()
                      .rows.filter((x) => !x.original.attending).length
                  }
                </Table.Cell>
              </Table.Row>
            </Table.Footer>
          </Table.Root>
        </Box>
      </Box>
      <Text
        display={{ base: 'block', md: 'none' }}
        fontSize="2xs"
        color="gray.400"
        mt={2}
        textAlign="center"
      >
        ← Swipe left or right to view more →
      </Text>
    </Box>
  );
}

export default RSVPlistPage;
