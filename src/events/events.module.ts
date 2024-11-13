// Defines the Events module, which organizes the services, controllers,
//and other components related to event management.



import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventsController } from './events.controller';
import { Attendee } from './attendee.entity';
import { EventsService } from './events.service';
import { AttendeesService } from './attendees.service';
import { CurrentUserEventAttendanceController } from './current-user-event-attendance.controller';
import { EventAttendeesController } from './event-attendees.controller';
import { EventsOrganizedByUserController } from './events-organized-by-user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Attendee]),
  ],
  controllers: [EventsController, CurrentUserEventAttendanceController, EventAttendeesController, EventsOrganizedByUserController], // determine that events.controller will handel HTTP requests.
  providers: [EventsService, AttendeesService]
})
export class EventsModule { }