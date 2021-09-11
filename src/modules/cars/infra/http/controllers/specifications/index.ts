import { SpecificationsRepository } from '../../../../repositories/SpecificationsRepository';
import { CreateSpecificationService } from '../../../../services/CreateSpecificationService';
import { ListSpecificationService } from '../../../../services/ListSpecificationService';
import { CreateSpecificationsController } from './CreateSpecificationsController';
import { ListSpecificationsController } from './ListSpecificationsController';

const specificationsRepository = SpecificationsRepository.getInstance();

const createSpecificationService = new CreateSpecificationService(
  specificationsRepository,
);
const listSpecificationsService = new ListSpecificationService(
  specificationsRepository,
);

const createSpecificationController = new CreateSpecificationsController(
  createSpecificationService,
);

const listSpecificationController = new ListSpecificationsController(
  listSpecificationsService,
);

export { createSpecificationController, listSpecificationController };
