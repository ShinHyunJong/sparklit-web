'use client';

import {
  Box,
  Center,
  HStack,
  Input,
  Spinner,
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

  // 2. Column Definitions in English
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => (
          <Text fontWeight="semibold" color="#2e2823">
            {info.getValue() ?? '-'}
          </Text>
        ),
      }),
      columnHelper.accessor('attending', {
        header: 'Status',
        cell: (info) => (
          <HStack gap={1}>
            {info.getValue() ? (
              <HStack color="green.600" gap={1}>
                <LuCircleCheck size={16} />
                <Text fontSize="sm" fontWeight="medium">
                  Attending
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
        cell: (info) => <Text fontSize="sm">{info.getValue() ?? '-'}</Text>,
      }),
      columnHelper.accessor('createdAt', {
        header: 'Date',
        cell: (info) => {
          const date = info.getValue();
          return (
            <Text fontSize="xs" color="gray.500">
              {date ? new Date(date).toLocaleDateString('en-US') : '-'}
            </Text>
          );
        },
      }),
    ],
    [],
  );

  // 3. Table Configuration
  const table = useReactTable({
    data: rsvpList ?? [],
    columns,
    state: {
      globalFilter,
      sorting,
    },
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
    <Box p={6} maxW="1200px" mx="auto">
      {/* Header Section */}
      <HStack mb={6} justify="space-between" align="flex-end">
        <Box>
          <HStack gap={2} mb={1}>
            <LuUsers size={20} color="#7d6e5d" />
            <Text fontSize="xl" fontWeight="bold" color="#4a4036">
              RSVP Management
            </Text>
          </HStack>
          <Text fontSize="sm" color="#a39281">
            Check the attendance of guests in real-time.
          </Text>
        </Box>
        <Text fontSize="sm" fontWeight="medium" color="#7d6e5d">
          Total: {table.getFilteredRowModel().rows.length} Guests
        </Text>
      </HStack>

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

      {/* Table Unit */}
      <Box
        border="1px solid"
        borderColor="#eaddd3"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        boxShadow="sm"
      >
        <Table.Root size="md" variant="line">
          <Table.Header bg="#f7f5f2">
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.ColumnHeader
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    cursor={header.column.getCanSort() ? 'pointer' : 'default'}
                    py={4}
                    color="#635649"
                    fontSize="sm"
                    fontWeight="bold"
                    _hover={header.column.getCanSort() ? { bg: '#eaddd3' } : {}}
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
        </Table.Root>
      </Box>
    </Box>
  );
}

export default RSVPlistPage;
