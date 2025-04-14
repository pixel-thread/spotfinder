export type RoleT = 'ADMIN' | 'USER' | 'SUPERADMIN';
export type VehicleTypeT = 'TWO_WHEELER' | 'FOUR_WHEELER';
export type UserStatusT = 'ACTIVE' | 'INACTIVE';

export type UserT = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: RoleT;
  isVerified: boolean;
  profilePic: string | null;
  vehicleType: VehicleTypeT;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  status: UserStatusT;
};

export interface AuthContextI {
  user: UserT | null;
  isAuthLoading: boolean;
  onLogout: () => void;
  refresh: () => void;
}
