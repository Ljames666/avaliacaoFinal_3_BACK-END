export interface IContactUpdateRequest {
  id: string;
  avatarURL: string;
  name: string;
  email: string;
  address: JSON;
  phoneNumber: JSON;
  description: string;
}
