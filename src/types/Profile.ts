export interface Profile {
  user: string;
  firstName: string;
  lastName: string;
  addressList: Address[];
  createdAt: string;
  updatedAt: string;
  mobile?: string;
  paymentMethod: PaymentMethod[];
  id: string;
  nationCode?: string;
  birthday: string;
}

export interface PaymentMethod {
  type: string; // e.g., "Visa"
  cardHolder: string;
  expiry: string; // e.g., "12/25"
  last4: string; // e.g., "1234"
}

interface Address {
  location: number[];
  street: string;
  city: string;
  postalCode: string;
}
