import { db } from '@server/db';
import { moodRepository } from './mood.repository';
import { moodService } from './mood.service';
import { moodController } from './mood.controller';

const repository = moodRepository(db);
const service = moodService(repository);
export const controller = moodController(service);
