import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';
import { ListAvailableCarService } from '@modules/cars/services/ListAvailableCarService';

let listAvailableCarService: ListAvailableCarService;
let fakeCarsRepositoy: FakeCarsRepository;

describe('List all Cars available', () => {
  beforeEach(() => {
    fakeCarsRepositoy = new FakeCarsRepository();
    listAvailableCarService = new ListAvailableCarService(fakeCarsRepositoy);
  });

  it('should be able to list all cars available', async () => {
    const car = await fakeCarsRepositoy.create({
      name: 'Testando Carro',
      description: 'Cadastro de teste',
      daily_rate: 150,
      license_plate: 'DAD-4347',
      fine_amount: 50,
      brand: 'FIAT',
      category_id: 'd04e6bd3-df53-446d-b6dc-045ab2acaab6',
    });

    const cars = await listAvailableCarService.execute({});
    expect(cars).toEqual([car]);
  });

  it('should be possible to list all available cars by brand name', async () => {
    const car = await fakeCarsRepositoy.create({
      name: 'Testando Car2',
      description: 'Cadastro de teste 2',
      daily_rate: 120.0,
      license_plate: 'DAD-4348',
      fine_amount: 60,
      brand: 'Chevrolet',
      category_id: 'd04e6bd3-df53-446d-b6dc-045ab2acaab6',
    });

    const cars = await listAvailableCarService.execute({
      brand: 'Chevrolet',
    });
    expect(cars).toEqual([car]);
  });

  it('should be possible to list all available cars by car name', async () => {
    const car = await fakeCarsRepositoy.create({
      name: 'Testando Car 3',
      description: 'Cadastro de teste 3',
      daily_rate: 120.0,
      license_plate: 'DAD-4349',
      fine_amount: 60,
      brand: 'Chevrolet',
      category_id: 'd04e6bd3-df53-446d-b6dc-045ab2acaab6',
    });

    const cars = await listAvailableCarService.execute({
      name: 'Testando Car 3',
    });
    expect(cars).toEqual([car]);
  });

  it('should be possible to list all available cars by category', async () => {
    const car = await fakeCarsRepositoy.create({
      name: 'Testando Car 4',
      description: 'Cadastro de teste 4',
      daily_rate: 120.0,
      license_plate: 'DAD-4350',
      fine_amount: 60,
      brand: 'Chevrolet',
      category_id: 'd04e6bd3-df53-446d-b6dc-045ab2acaab6',
    });

    const cars = await listAvailableCarService.execute({
      category_id: 'd04e6bd3-df53-446d-b6dc-045ab2acaab6',
    });
    expect(cars).toEqual([car]);
  });
});
