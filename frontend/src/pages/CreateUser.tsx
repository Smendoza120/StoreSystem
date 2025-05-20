import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import UserForm from '../components/user/CreateUserForm';
import { Box } from '@mui/material';

const CreateUserPage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }} className="border border-red-600">
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <PageHeader title="Creación de Usuario" subtitle="Ingrese los datos del nuevo usuario" />
        <UserForm onCancel={() => {}} onUserCreated={() => {}} />
      </Box>
    </Box>
  );
};

export default CreateUserPage;