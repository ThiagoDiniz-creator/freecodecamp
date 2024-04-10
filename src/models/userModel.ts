import { connect } from "@/dbConfig/dbConfig";
import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken: string | null;
  forgotPasswordTokenExpiry: Date | null;
  verifyToken: string | null;
  verifyTokenExpiry: Date | null;
}

export interface UserInput
  extends Optional<
    UserAttributes,
    | "id"
    | "isVerified"
    | "isAdmin"
    | "forgotPasswordToken"
    | "forgotPasswordTokenExpiry"
    | "verifyToken"
    | "verifyTokenExpiry"
  > {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public isVerified!: boolean;
  public isAdmin!: boolean;
  public forgotPasswordToken!: string | null;
  public forgotPasswordTokenExpiry!: Date | null;
  public verifyToken!: string | null;
  public verifyTokenExpiry!: Date | null;
}

const ATTRIBUTES = {
  id: {
    type: DataTypes.INTEGER({ length: 11 }),
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING({ length: 60 }),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING({ length: 64 }),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING({ length: 72 }),
    allowNull: false,
  },
  isVerified: {
    type: DataTypes.BOOLEAN(),
    defaultValue: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN(),
    defaultValue: false,
  },
  forgotPasswordToken: {
    type: DataTypes.STRING({ length: 255 }),
    allowNull: true,
  },
  forgotPasswordTokenExpiry: {
    type: DataTypes.DATE(),
    allowNull: true,
  },
  verifyToken: {
    type: DataTypes.STRING({ length: 255 }),
    allowNull: true,
  },
  verifyTokenExpiry: {
    type: DataTypes.DATE(),
    allowNull: true,
  },
};

const sequelize = connect() as Sequelize;

const OPTIONS = {
  timestamps: false,
  sequelize,
  tableName: "users",
};

// Inicializando o model
User.init(ATTRIBUTES, OPTIONS);

// Sincronizando o domínio
void User.sync();

export default User;
