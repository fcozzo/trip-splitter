export type PersonRaw = {
  id: string
  first_name: string
  last_name: string
  phone: string
  email: string
};

export type ExpenseRaw = {
  trip_id: string
  date: string
  payer_id: string
  amount: string
  memo: string
  split_group_id: string
};

export type SettleRaw = {
  date: string
  trip_id: string
  payer_id: string
  payee_id: string
  amount: string
  memo: string
};

export type TripRaw = {
  trip_id: string
  name: string
  invite_group_id: string
};

export type InviteGroupRaw = {
  invite_group_id: string
  person_id: string
  attending: string
};
