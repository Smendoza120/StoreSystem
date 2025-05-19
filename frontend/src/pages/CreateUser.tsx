import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import PageHeader from '../components/layout/PageHeader';
import UserForm from '../components/user/CreateUserForm';
import { Box } from '@mui/material';

const CreateUserPage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar open={true} onClose={() => {}} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <PageHeader title="Creación de Usuario" subtitle="Ingrese los datos del nuevo usuario" />
        <UserForm />
      </Box>
    </Box>
  );
};

export default CreateUserPage;