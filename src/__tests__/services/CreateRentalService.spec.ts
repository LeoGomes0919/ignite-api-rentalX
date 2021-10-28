import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';
import { FakeRentalsRepository } from '@modules/rentals/repositories/fakes/FakeRentalsRepository';
import { CreateRentalService } from '@modules/rentals/services/CreateRentalService';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import dayjs from 'dayjs';

let createRentalService: CreateRentalService;
let fakeRentalsRepository: FakeRentalsRepository;
let dayjsDateProvider: DayjsDateProvider;
let fakeCarsRepositoy: FakeCarsRepository;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    fakeRentalsRepository = new FakeRentalsRepository();
    fakeCarsRepositoy = new FakeCarsRepository();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalService = new CreateRentalService(
      fakeRentalsRepository,
      dayjsDateProvider,
      fakeCarsRepositoy,
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalService.execute({
      car_id: '1234',
      user_id: '12345',
      expected_return_date: dayAdd24Hours,
      rent_amount: 100,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    expect(async () => {
      await createRentalService.execute({
        car_id: '12345',
        user_id: '12345',
        expected_return_date: dayAdd24Hours,
        rent_amount: 100,
      });

      await createRentalService.execute({
        car_id: '1234',
        user_id: '12345',
        expected_return_date: dayAdd24Hours,
        rent_amount: 200,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    expect(async () => {
      await createRentalService.execute({
        car_id: '12345',
        user_id: '12345',
        expected_return_date: dayAdd24Hours,
        rent_amount: 100,
      });

      await createRentalService.execute({
        car_id: '12345',
        user_id: '1234',
        expected_return_date: new Date(2021, 10 - 1, 20),
        rent_amount: 200,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if return time less than 24 hours', async () => {
    expect(async () => {
      await createRentalService.execute({
        car_id: '12345',
        user_id: '12345',
        expected_return_date: dayjs().toDate(),
        rent_amount: 100,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
