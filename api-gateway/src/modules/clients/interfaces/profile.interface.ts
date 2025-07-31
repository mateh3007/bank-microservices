export interface UpdateProfileParams {
  fullname?: string;
  email?: string;
  registration?: string;
  dateOfBirth?: Date;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    neighborhood?: string;
    number?: string;
    complement?: string;
  };
  avatarFile?: string;
  agency?: string;
  accountNumber?: string;
  bankName?: string;
}
