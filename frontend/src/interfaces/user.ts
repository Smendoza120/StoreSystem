export interface UserData {
  fullName: string;
  email: string;
  password: string;
  roles: string[];
  isEnabled?: boolean; 
  username?: string; 
  permissions: {
    control_usuarios: {
      read: boolean;
      write: boolean;
      delete: boolean;
    };
    inventario: {
      read: boolean;
      write: boolean;
      delete: boolean;
    };
    ventas_diarias: {
      read: boolean;
      write: boolean;
      delete: boolean;
    };
    reportes: {
      read: boolean;
      write: boolean;
      delete: boolean;
    };
  };
}

export interface UserDataTable {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
  username: string;
  isEnabled: boolean;
  permissions: {
    control_usuarios: {
      read: boolean;
      write: boolean;
      delete: boolean;
    };
    inventario: {
      read: boolean;
      write: boolean;
      delete: boolean;
    };
    ventas_diarias: {
      read: boolean;
      write: boolean;
      delete: boolean;
    };
    reportes?: {
      read: boolean;
      write: boolean;
      delete: boolean;
    };
  };
}

export interface CreateUserResponseData {
  id: string;
  username: string;
}

export interface UserTableProps {
  users: UserDataTable[];
  onUserStatusChange?: () => void;
}

export interface UserFormProps {
  onUserCreated: () => void;
  onCancel: () => void;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
