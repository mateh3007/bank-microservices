export interface CreateClientParams {
  fullname: string;
  email: string;
  password: string;
  registration: string;
  phone: string;
  dateOfBirth: Date;
  addressId: string;
  avatarFile: string;
}

export interface GetClientByIdReturn {
  id: string;
  fullname: string;
  email: string;
  registration: string;
  phone: string;
  avatarFile: string;
  dateOfBirth: Date;
  addressId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetClientByIdToLoginReturn {
  id: string;
  fullname: string;
  email: string;
  password: string;
  registration: string;
  phone: string;
  avatarFile: string;
  dateOfBirth: Date;
  addressId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateClientParams {
  fullname?: string;
  email?: string;
  password?: string;
  registration?: string;
  phone?: string;
  dateOfBirth?: Date;
  addressId?: string;
}
