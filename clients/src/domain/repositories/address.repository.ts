import {
  CreateAddressParams,
  GetAddressByIdReturn,
  UpdateAddressParams,
} from '../interfaces/address.interfaces';

export abstract class AddressRepository {
  abstract getById(id: string): Promise<GetAddressByIdReturn | void>;
  abstract create(address: CreateAddressParams): Promise<GetAddressByIdReturn>;
  abstract update(
    id: string,
    address: UpdateAddressParams,
  ): Promise<GetAddressByIdReturn | void>;
  abstract delete(id: string): Promise<boolean>;
}
