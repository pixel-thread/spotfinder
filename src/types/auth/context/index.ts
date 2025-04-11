export type UserT = {
  name: string;
  email: string;
  id: string;
};

export interface AuthContextI {
  user: UserT | null;
  isAuthLoading: boolean;
}
