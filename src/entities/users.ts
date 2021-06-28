import { UUID, UUIDV4 } from 'sequelize';
import {
  Model,
  Table,
  Column,
  DataType,
  Unique,
  Default,
  BeforeCreate,
} from 'sequelize-typescript';
import { Role } from '../modules/auth/roles/roles.enum';
import { hashPassword } from '../shared/utils/crypto';
@Table({ tableName: 'users', timestamps: true })
export class Users extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  })
  id: string;

  @Unique
  @Column({ field: 'username', type: DataType.STRING(48) })
  username: string;

  @Default(Role.USER)
  @Column({ field: 'roles', type: DataType.ENUM(...Object.values(Role)) })
  roles: string;

  @Column({ field: 'password', type: DataType.STRING(1000) })
  password: string;

  @Column({ field: 'session', allowNull: true, type: DataType.STRING(1000) })
  session?: string;

  sub?: string;

  @BeforeCreate
  static genetatePassword(user: Users): void {
    user.password = hashPassword(user.password);
  }
}
