import { UUID, UUIDV4 } from 'sequelize';
import {
  Model,
  Table,
  Column,
  DataType,
  Default,
  Index,
} from 'sequelize-typescript';

const UNIQUE_CONSTRAINT_EMAIL = `unique_email_per_tenant`;
@Table({
  tableName: 'languages',
  timestamps: true,
  indexes: [
    {
      name: UNIQUE_CONSTRAINT_EMAIL,
      unique: true,
      fields: ['email'],
    },
  ],
})
export class Languages extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  })
  id?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  name?: string;

  @Column({ field: 'icon_id', allowNull: true, type: DataType.STRING })
  iconId?: string;

  // prettier-ignore
  @Column({field: 'email', allowNull: true, type: DataType.STRING, unique: true })
  @Index({ type: 'UNIQUE', unique: true })
  email: string;

  @Default(true)
  @Column({ allowNull: false, type: DataType.BOOLEAN })
  status?: boolean;

  @Column({ field: 'created_by', allowNull: true, type: DataType.STRING(20) })
  createdBy?: string;

  @Column({ field: 'updated_by', allowNull: true, type: DataType.STRING(20) })
  updatedBy?: string;

  @Column({ field: 'created_at', allowNull: true, type: DataType.DATE(6) })
  createdAt?: Date;

  @Column({ field: 'updated_at', allowNull: true, type: DataType.DATE(6) })
  updatedAt?: Date;
}
