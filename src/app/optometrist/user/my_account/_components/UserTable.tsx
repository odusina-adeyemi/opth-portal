'use client';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { SyntheticEvent } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Tabs, Tab, Box } from '@mui/material';
import { getLoggedInUser } from '../../../../../lib/getLoggedInUser';
import { fetchOrganizationUsers } from '../../../../api/graphql/queries/users';
import { User } from '../../../../../constants/types/types';

// Styled components for the table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#D1EAF0',
    // theme.palette.common.black
    color: theme.palette.text.primary,
    font: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface UsersTablesProps {
  users: User[];
}

export default function UsersTables({ users }: UsersTablesProps) {
  console.log(users);

  // const [users, setUsers] = React.useState<User[]>([]);
  const [activeTab, setActiveTab] = React.useState(0);

  const optometristUsers = users.filter(
    (user: User) =>
      typeof user.role === 'string' &&
      user.role.toLowerCase() === 'optometrist',
  );

  const nonOptometristUsers = users.filter(
    (user: User) =>
      typeof user.role === 'string' &&
      user.role.toLowerCase() !== 'optometrist',
  );

  // Select data based on the active tab
  const rows = activeTab === 0 ? optometristUsers : nonOptometristUsers;

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      {/* Tabs for switching between user categories */}

      <div className="w-full">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          TabIndicatorProps={{
            style: {
              display: 'none',
            },
          }}
        >
          <Tab
            className={`!capitalize ${activeTab === 0 ? 'bg-primary text-white   rounded-full px-4 py-1' : ''}`}
            label="Optometrist Users"
          />
          <Tab
            className={`!capitalize ${activeTab === 1 ? 'bg-primary text-white rounded-full px-4 py-1' : ''}`}
            label="Non-Optometrist Users"
          />
        </Tabs>
      </div>
      {/* Table to display user data */}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow className="!font-bold">
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell>Last Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Organization</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{row?.firstName}</StyledTableCell>
                <StyledTableCell>{row?.lastName}</StyledTableCell>
                <StyledTableCell>{row?.email}</StyledTableCell>
                <StyledTableCell>
                  {row.organization ? row.organization.name : 'N/A'}
                </StyledTableCell>
                <StyledTableCell>{row.role}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
