import { FakeSpecificationsRepository } from '@modules/cars/repositories/fakes/FakeSpecificationsRepository';
import { CreateSpecificationService } from '@modules/cars/services/CreateSpecificationService';
import { AppError } from '@shared/errors/AppError';

let createSpecificationService: CreateSpecificationService;
let fakeSpecificationsRepository: FakeSpecificationsRepository;

describe('Create Specification', () => {
  beforeEach(() => {
    fakeSpecificationsRepository = new FakeSpecificationsRepository();
    createSpecificationService = new CreateSpecificationService(
      fakeSpecificationsRepository,
    );
  });

  it('should able a create new Specification', async () => {
    const specification = {
      name: 'Testando',
      description: 'Testando descrição',
    };

    await createSpecificationService.execute(specification);

    const speficationCreated = await fakeSpecificationsRepository.findByName(
      specification.name,
    );

    expect(speficationCreated).toHaveProperty('id');
  });

  it('should not be able to create a new cate with same name exists', async () => {
    expect(async () => {
      const specification = {
        name: 'Testando',
        description: 'Testando descrição',
      };

      await createSpecificationService.execute({
        name: specification.name,
        description: specification.description,
      });

      await createSpecificationService.execute({
        name: specification.name,
        description: specification.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
