export interface ICreateRentalDTO {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
  rent_amount: number;
  id?: string;
  end_date?: Date;
  late_fee?: number;
  total?: number;
}
