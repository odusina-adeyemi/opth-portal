'use client';
import React, { useEffect } from 'react';
import {
  Box,
  CircularProgress,
  IconButton,
  LinearProgress,
  Link,
} from '@mui/material';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { Upload as UploadIcon } from '@mui/icons-material';
import { useMutation, useLazyQuery } from '@apollo/client';
import {
  DELETE_FILE,
  FILE_UPLOAD,
} from '../../app/api/graphql/mutations/fileMutations';
import { GET_PROVIDER_CLINIC_FILE } from '../../app/api/graphql/queries/files';
import { useSnackbar } from '../../app/_components/SnackbarProvider';
import { useModal } from '../../app/_components/ModalProvider';
import { DeleteOutline } from '@mui/icons-material';
import CustomDialogContent from '../../app/_components/CustomDialogContent';
import { uploadFileNames } from '../../lib/constants/constants';

interface UploadDocumentProps {
  clinicId: string;
  documentName: string;
  providerId: string | undefined;
}

const UploadDocument = ({
  clinicId,
  documentName,
  providerId,
}: UploadDocumentProps) => {
  const { openSnackbar } = useSnackbar();
  const { showModal, hideModal } = useModal();

  const [fileUpload, { loading: fileUploading }] = useMutation(FILE_UPLOAD);
  const [deleteFile, { loading: deleteLoading }] = useMutation(DELETE_FILE);
  const [fetchFile, { data, loading: fetchFileLoading, refetch }] =
    useLazyQuery(GET_PROVIDER_CLINIC_FILE, {
      variables: { clinicId, providerId, documentName },
    });

  const handleFileSelect = (event: any) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      handleUpload(selectedFile);
    }
  };

  const handleUpload = async (file: File) => {
    if (!file || !clinicId || !providerId) {
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      try {
        // @ts-ignore
        const base64Content = reader?.result?.split(',')[1];

        const input = {
          content: base64Content,
          filename: file.name,
          mimetype: file.type,
        };

        fileUpload({
          onCompleted: () => {
            refetch();
            openSnackbar('Upload successful!', 'success');
          },
          onError: () => {
            openSnackbar('Upload failed!', 'error');
          },
          variables: {
            clinicId,
            documentName,
            file: input,
            providerId,
          },
        });
      } catch (error) {
        openSnackbar('Upload failed!', 'error');
      }
    };
    reader.readAsDataURL(file); // Trigger the onload by reading the file
  };

  const handleDeleteClick = (documentName: string) => {
    showModal(
      <CustomDialogContent
        affirmativeButtonLabel={'Yes'}
        affirmativeOnClick={() => handleUploadDelete(documentName)}
        negativeButtonLabel="No"
        negativeOnClick={hideModal}
        title={`Are you sure you want to delete the ${uploadFileNames[documentName]} file?`}
      />,
    );
  };

  const handleUploadDelete = (documentName: string) => {
    hideModal();
    deleteFile({
      refetchQueries: [
        {
          query: GET_PROVIDER_CLINIC_FILE,
          variables: { clinicId, providerId, documentName },
        },
      ],
      variables: { clinicId, documentName, providerId },
      onCompleted: () => {
        openSnackbar('File deleted successfully!', 'success');
      },
      onError: () => {
        openSnackbar('Error deleting file!', 'error');
      },
    });
  };

  useEffect(() => {
    // Only fetch the file if updating a provider
    if (providerId && clinicId) {
      fetchFile();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clinicId, providerId]);

  if (fetchFileLoading || deleteLoading) {
    return <CircularProgress size={20} />;
  }

  if (data?.providerClinicFile?.name === documentName) {
    // show file actions if uploaded file already exists
    return (
      <Box position={'relative'}>
        <>
          <Link
            href={data.providerClinicFile.signedUrl}
            target="_blank"
            rel="noreferrer"
            sx={{ position: 'relative', top: '4px' }}
          >
            <FindInPageIcon color="info" fontSize="small" />
          </Link>
          <DeleteOutline
            color="error"
            fontSize="small"
            onClick={() => handleDeleteClick(documentName)}
            sx={{ position: 'relative', top: '4px' }}
          />
        </>
      </Box>
    );
  }

  return (
    <>
      <Box>
        <input
          accept=".pdf, .doc, .docx, .xls, .xlsx"
          disabled={!clinicId || fileUploading || !providerId}
          style={{ display: 'none' }}
          id="upload-file"
          type="file"
          onChange={handleFileSelect}
        />
        <label htmlFor="upload-file">
          <IconButton
            component="span"
            disabled={!clinicId || fileUploading || !providerId}
            sx={{
              '& svg': {
                color:
                  !clinicId || !providerId ? 'rgba(0, 0, 0, 0.26)' : '#0288d1',
              },
            }}
          >
            <UploadIcon color="info" />
          </IconButton>
        </label>
      </Box>
      {fileUploading && <LinearProgress />}
    </>
  );
};

export default UploadDocument;
