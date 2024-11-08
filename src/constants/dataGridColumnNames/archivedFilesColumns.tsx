import { Link, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import RestorePageIcon from '@mui/icons-material/RestorePage';
import {
  GridActionsCellItem,
  GridRowParams,
  GridValidRowModel,
} from '@mui/x-data-grid-pro';
import { FileResponse } from '../../constants/types/types';
import { uploadFileNames } from '../../lib/constants/constants';
import { eventEmitter } from '../../app/_components/EventEmitter';

const handleDeleteClick = (row: GridValidRowModel) => {
  eventEmitter.emit('deleteArchivedFile', row);
};

const handleUnarchiveFileClick = (row: GridValidRowModel) => {
  eventEmitter.emit('unarchiveFile', row);
};

export const archivedFileColumns = [
  {
    id: 'id',
    field: 'id',
    hideable: false,
  },
  {
    field: 'name',
    headerName: 'File',
    renderCell: ({ row }: { row: FileResponse }) => (
      <Link
        href={row?.signedUrl}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ cursor: 'pointer' }}>
        {uploadFileNames[row.name]}
      </Link>
    ),
    width: 200,
  },
  {
    field: 'providerId',
    flex: 1,
    headerName: 'Provider',
    renderCell: ({ row }: { row: any }) =>
      `${row.provider.firstName} ${row.provider.lastName}`,
  },
  {
    field: 'clinic',
    flex: 1,
    headerName: 'Clinic',
    renderCell: ({ row }: { row: any }) => row.clinic.name,
  },
  {
    field: 'user',
    flex: 1,
    headerName: 'User',
    renderCell: ({ row }: { row: any }) =>
      `${row.user.firstName} ${row.user.lastName}`,
  },
  {
    field: 'updatedAt',
    headerName: 'Archived Date',
    renderCell: ({ row }: { row: any }) =>
      new Date(Number(row.updatedAt)).toLocaleDateString(),
    width: 150,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    getActions: ({ row }: GridRowParams) => {
      return [
        <GridActionsCellItem
          key={'view'}
          icon={
            <Tooltip title="View">
              <Link
                href={row?.signedUrl}
                target="_blank"
                rel="noopener noreferrer">
                <FindInPageIcon sx={{ width: 22, height: 22 }} />
              </Link>
            </Tooltip>
          }
          label="View"
          sx={{ position: 'relative', top: '1px' }}
        />,
        <GridActionsCellItem
          key={'restore'}
          icon={
            <Tooltip title="Unarchive file">
              <RestorePageIcon sx={{ width: 22, height: 22 }} />
            </Tooltip>
          }
          label="View"
          onClick={() => handleUnarchiveFileClick(row)}
        />,
        <GridActionsCellItem
          key={'delete'}
          icon={
            <Tooltip title="Delete">
              <DeleteIcon sx={{ width: 22, height: 22 }} />
            </Tooltip>
          }
          label="Delete"
          onClick={() => handleDeleteClick(row)}
          sx={{ color: 'indianred' }}
        />,
      ];
    },
    type: 'actions',
  },
];
