import { db } from '@server/db';
import { hydrationRepository } from './hydration.repository';
import { hydrationController } from './hydration.controller';
import { hydrationService } from './hydration.service';

const repository = hydrationRepository(db);
const service = hydrationService(repository);
export const controller = hydrationController(service);
