// This file includes Business logic for managing attendees, such as adding,
// removing, and updating attendee statuses for events.

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Attendee } from "./attendee.entity";
import { Injectable } from "@nestjs/common";
import { CreateAttendeeDto } from "./input/create-attendee.dto";
@Injectable()
export class AttendeesService {
  constructor(
    @InjectRepository(Attendee)
    private readonly attendeeRepository: Repository<Attendee>
  ) { }

  public async findByEventId(eventId: number): Promise<Attendee[]> {
    return await this.attendeeRepository.find({
      where: { eventId }
    });
  }

  public async findOneByEventIdAndUserId(
    eventId: number, userId: number
  ): Promise<Attendee | undefined> {
    return await this.attendeeRepository.findOne({
      where: {
        event: { id: eventId },
        user: { id: userId }
      }
    });
  }

  public async createOrUpdate(
    input: CreateAttendeeDto, eventId: number, userId: number
  ): Promise<Attendee> {
    const attendee = await this.findOneByEventIdAndUserId(eventId, userId)
      ?? new Attendee();

    attendee.eventId = eventId;
    attendee.userId = userId;
    attendee.answer = input.answer;
    // Rest of input...

    return await this.attendeeRepository.save(attendee);
  }
}
