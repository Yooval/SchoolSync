// DTO used for updating event details, enabling
// the modification of fields such as name, description, and when.

import { PartialType } from "@nestjs/mapped-types";
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) { }

