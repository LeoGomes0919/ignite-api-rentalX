import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';
import { FakeSpecificationsRepository } from '@modules/cars/repositories/fakes/FakeSpecificationsRepository';
import { CreateCarSpecificationService } from '@modules/cars/services/CreateCarSpecificationService';
import { AppError } from '@shared/errors/AppError';

let createCarSpecificationService: CreateCarSpecificationService;
let fakeCarsRepositoy: FakeCarsRepository;
let fakeSpecificationsRepository: FakeSpecificationsRepository;

describe('Create Car Specification', () => {
  beforeEach(() => {
    fakeCarsRepositoy = new FakeCarsRepository();
    fakeSpecificationsRepository = new FakeSpecificationsRepository();
    createCarSpecificationService = new CreateCarSpecificationService(
      fakeCarsRepositoy,
      fakeSpecificationsRepository,
    );
  });

  it('should be able to add a new specification to a now-existent car', () => {
    expect(async () => {
      const car_id = '12345';
      const specifications_id = ['123456789'];
      await createCarSpecificationService.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to a new specification to the car', async () => {
    const car = await fakeCarsRepositoy.create({
      name: 'Testando Car 4',
      description: 'Cadastro de teste 4',
      daily_rate: 120.0,
      license_plate: 'DAD-4350',
      fine_amount: 60,
      brand: 'Chevrolet',
      category_id: 'd04e6bd3-df53-446d-b6dc-045ab2acaab6',
    });

    const specifications = await fakeSpecificationsRepository.create({
      name: 'Teste',
      description: 'Testando',
    });

    const specifications2 = await fakeSpecificationsRepository.create({
      name: 'Teste 2',
      description: 'Testando 2',
    });

    const specifications_id = [specifications.id, specifications2.id];

    const specificationsCars = await createCarSpecificationService.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(2);
  });
});
