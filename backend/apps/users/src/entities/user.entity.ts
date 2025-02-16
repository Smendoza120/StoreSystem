import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  ADMIN = 'Administrador',
  EMPOYEE = 'Empleado',
  ACCOUNTANT = 'Contador',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.EMPOYEE,
  })
  role: Role;

  @Column('jsonb', { default: {} })
  permissions: {
    accounts: { canView: boolean; canEdit: boolean };
    inventory: { canView: boolean; canEdit: boolean };
    dailySales: { canView: boolean; canEdit: boolean };
    billing: { canView: boolean; canEdit: boolean };
    reporting: { canView: boolean; canEdit: boolean };
  };

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
