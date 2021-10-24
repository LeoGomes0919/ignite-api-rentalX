import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';
import { CreateCarService } from '@modules/cars/services/CreateCarService';
import { AppError } from '@shared/errors/AppError';

let createCarService: CreateCarService;
let fakeCarsRepositoy: FakeCarsRepository;

describe('Create Car', () => {
  beforeEach(() => {
    fakeCarsRepositoy = new FakeCarsRepository();
    createCarService = new CreateCarService(fakeCarsRepositoy);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarService.execute({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'GTH-1323',
      fine_amount: 60,
      brand: 'Brand Car',
      category_id: '2',
    });
    expect(car).toHaveProperty('id');
  });

  it('should not be possible to register a car with the same license plate', () => {
    expect(async () => {
      await createCarService.execute({
        name: 'Name Car',
        description: 'Description Car',
        daily_rate: 100,
        license_plate: 'GTH-1323',
        fine_amount: 60,
        brand: 'Brand Car',
        category_id: '2',
      });

      await createCarService.execute({
        name: 'Name Car 2',
        description: 'Description Car 2',
        daily_rate: 200,
        license_plate: 'GTH-1323',
        fine_amount: 120,
        brand: 'Brand Car 2',
        category_id: '3',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be possible to register a car as available by default', async () => {
    const car = await createCarService.execute({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'GTH-1323',
      fine_amount: 60,
      brand: 'Brand Car',
      category_id: '2',
    });
    expect(car.available).toBe(true);
  });
});
