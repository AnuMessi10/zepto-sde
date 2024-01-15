export type TAvatar = {
  src: string;
  alt: string;
};

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar: TAvatar;
}
