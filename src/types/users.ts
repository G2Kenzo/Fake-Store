export interface UserName {
  firstname: string;
  lastname: string;
}

export interface UserAddress {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: {
    lat: string;
    long: string;
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  name: UserName;
  address: UserAddress;
  phone: string;
}

export type newUser = Omit<User, "id">;
