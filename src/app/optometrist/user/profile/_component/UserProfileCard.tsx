'use client';
import { TbPencilMinus } from 'react-icons/tb';
import { HiOutlinePencil } from 'react-icons/hi';

import { useState } from 'react';
import { Grid, TextField, Button, Modal, Box } from '@mui/material';
import Image from 'next/image';
import {
  User,
  Organization,
} from '../../../../../../src/constants/types/types';

interface UserProfileCardProps {
  user: User;
  organization: Organization | null;
}

const UserProfileCard = ({ user, organization }: UserProfileCardProps) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(user?.email);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSave = () => {
    // Logic for saving the updated email (e.g., API call)
    console.log('Updated email:', email);
    handleClose();
  };

  // Safely extract firstName and lastName, with fallbacks
  const firstName = user?.firstName || 'Unknown';
  const lastName = user?.lastName || 'User';

  return (
    <Grid container py={2} display={'flex'} justifyContent={'center'}>
      <div className="w-full gap-3 p-6">
        <div className="w-full flex flex-col bg-white p-6 rounded-md drop-shadow-md ">
          {/* <div className="flex flex-row gap-4">
            <div className="mt-3 w-20">
              {user ? (
                <Image
                  src="/assets/profile-circle.png"    
                  alt={`${user.firstName} ${user.lastName} Profile Picture`}
                  className="w-6 rounded-full "
                //   width={100}
                //   height={100}
                fill
                />
              ) : (
               <div className="w-20 h-20 bg-slate-50 rounded-full text-center text-xl p-6">
                  {`${firstName.charAt(0)}${lastName.charAt(0)}`}
                </div>
              )}
            </div> */}
          <div className=" flex flex-row items-center gap-4">
            <div className="flex w-full gap-3">
              <div className="w-20 h-20 relative">
                {user ? (
                  <Image
                    src="/assets/profile-circle.png"
                    alt={`${user.firstName} ${user.lastName} Profile Picture`}
                    className="rounded-full object-cover"
                    width={80}
                    height={80}
                  />
                ) : (
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-xl font-bold">
                    {`${firstName.charAt(0)}${lastName.charAt(0)}`}
                  </div>
                )}
              </div>

              <div className="mt-3">
                <h5>{`${user?.firstName} ${user?.lastName}`}</h5>
                <p className="mb-1 text-sm">{user?.email}</p>
              </div>
              <div className="ml-auto">
                <button className="" onClick={handleOpen}>
                  <TbPencilMinus />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-row w-full gap-12 mt-20 mb-3">
            <div className="ml-3">
              <p className="text-xs">Role:</p>
              <h5>{user?.role}</h5>
            </div>
            <div className="ml-auto">
              <p className="text-xs font-medium">Organization Name:</p>
              <h5>{organization?.name}</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
          }}>
          <h2>Edit Profile</h2>
          <form>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              value={`${user?.firstName} ${user?.lastName}`}
              disabled
            />
            <TextField
              fullWidth
              margin="normal"
              label="Role"
              value={user?.role}
              disabled
            />
            <TextField
              fullWidth
              margin="normal"
              label="Organization"
              value={organization?.name || ''}
              disabled
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button onClick={handleClose} sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Grid>
  );
};

export default UserProfileCard;
