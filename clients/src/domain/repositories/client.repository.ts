import { ClientEntity } from '@domain/entities/client.entity';
import {
  CreateClientParams,
  GetClientByIdReturn,
  UpdateClientParams,
} from '../interfaces/client.interfaces';

export abstract class ClientRepository {
  abstract getByRegistration(
    registration: string,
  ): Promise<GetClientByIdReturn | void>;
  abstract getByEmail(email: string): Promise<GetClientByIdReturn | void>;
  abstract getByEmailToLogin(email: string): Promise<ClientEntity | void>;
  abstract getById(id: string): Promise<GetClientByIdReturn | void>;
  abstract getByIdToLogin(id: string): Promise<ClientEntity | void>;
  abstract create(params: CreateClientParams): Promise<GetClientByIdReturn>;
  abstract update(
    id: string,
    params: UpdateClientParams,
  ): Promise<GetClientByIdReturn | void>;
  abstract delete(id: string): Promise<boolean>;
}
