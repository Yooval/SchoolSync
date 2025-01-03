import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, SelectQueryBuilder } from "typeorm";
import { Event, PaginatedEvents } from "./event.entity";
import { AttendeeAnswerEnum } from './attendee.entity';
import { ListEvents, WhenEventFilter } from './input/list.events';
import { paginate, PaginateOptions } from './../pagination/paginator';
import { CreateEventDto } from './input/create-event.dto';
import { User } from './../auth/user.entity';
import { UpdateEventDto } from './input/update-event.dto';
// this file write functions and bussines logic in general for events.controller


@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>
  ) { }

  private getEventsBaseQuery(): SelectQueryBuilder<Event> {
    return this.eventsRepository
      .createQueryBuilder('e')
      .orderBy('e.id', 'DESC'); // order by id with decending
  }

  public getEventsWithAttendeeCountQuery(): SelectQueryBuilder<Event> {
    return this.getEventsBaseQuery().loadRelationCountAndMap(
      'e.attendeeCount', 'e.attendees'
    )
      .loadRelationCountAndMap(
        'e.attendeeAccepted',
        'e.attendees',
        'attendee',
        (qb) => qb
          .where(
            'attendee.answer = :answer',
            { answer: AttendeeAnswerEnum.Accepted })
      )
      .loadRelationCountAndMap(
        'e.attendeeMaybe',
        'e.attendees',
        'attendee',
        (qb) => qb
          .where(
            'attendee.answer = :answer',
            { answer: AttendeeAnswerEnum.Maybe })
      )
      .loadRelationCountAndMap(
        'e.attendeeRejected',
        'e.attendees',
        'attendee',
        (qb) => qb
          .where(
            'attendee.answer = :answer',
            { answer: AttendeeAnswerEnum.Rejected })
      )
  }

  private getEventsWithAttendeeCountFilteredQuery(filter?: ListEvents): SelectQueryBuilder<Event> { // filter by when
    let query = this.getEventsWithAttendeeCountQuery();

    if (!filter) {
      return query;
    }
    if (filter.when) {
      if (filter.when == WhenEventFilter.Today) {
        query = query.andWhere(
          `e.when >= CURDATE() AND e.when <= CURDATE() + INTERVAL 1 DAY`
        );
      }

      if (filter.when == WhenEventFilter.Tommorow) {
        query = query.andWhere(
          `e.when >= CURDATE() + INTERVAL 1 DAY AND e.when <= CURDATE() + INTERVAL 2 DAY`
        );
      }

      if (filter.when == WhenEventFilter.ThisWeek) {
        query = query.andWhere('YEARWEEK(e.when, 1) = YEARWEEK(CURDATE(), 1)');
      }

      if (filter.when == WhenEventFilter.NextWeek) {
        query = query.andWhere('YEARWEEK(e.when, 1) = YEARWEEK(CURDATE(), 1) + 1');
      }
    }

    return query;
  }

  public async getEventsWithAttendeeCountFilteredPaginated( // filter by when and paginated
    filter: ListEvents,
    paginateOptions: PaginateOptions
  ): Promise<PaginatedEvents> {
    return await paginate<Event, PaginatedEvents>(
      this.getEventsWithAttendeeCountFilteredQuery(filter),
      PaginatedEvents,
      paginateOptions
    );
  }


  public async getEventWithAttendeeCount(id: number): Promise<Event | undefined> { // Retrieves a single event by its ID, along with attendee counts.
    const query = this.getEventsWithAttendeeCountQuery()
      .andWhere('e.id = :id', { id });

    this.logger.debug(query.getSql());

    return await query.getOne();
  }

  public async findOne(id: number): Promise<Event | undefined> {
    return await this.eventsRepository.findOne({ where: { id } });
  }


  public async createEvent(
    input: CreateEventDto, user: User
  ): Promise<Event> {
    return await this.eventsRepository.save(
      new Event({
        ...input,
        organizer: user,
        when: new Date(input.when)
      })
    );
  }

  public async updateEvent(
    event: Event, input: UpdateEventDto
  ): Promise<Event> {
    return await this.eventsRepository.save(
      new Event({
        ...event,
        ...input,
        when: input.when ? new Date(input.when) : event.when
      })
    );
  }

  public async deleteEvent(id: number): Promise<DeleteResult> {
    return await this.eventsRepository
      .createQueryBuilder('e').delete().where('id = :id', { id }) // delete is from events.controller
      .execute();
  }

  public async getEventsOrganizedByUserIdPaginated(
    userId: number, paginateOptions: PaginateOptions
  ): Promise<PaginatedEvents> {
    return await paginate<Event, PaginatedEvents>(
      this.getEventsOrganizedByUserIdQuery(userId),
      PaginatedEvents,
      paginateOptions,
    );
  }

  private getEventsOrganizedByUserIdQuery(
    userId: number
  ): SelectQueryBuilder<Event> {
    return this.getEventsBaseQuery()
      .where('e.organizerId = :userId', { userId });
  }

  public async getEventsAttendedByUserIdPaginated(
    userId: number, paginateOptions: PaginateOptions
  ): Promise<PaginatedEvents> {
    return await paginate<Event, PaginatedEvents>(
      this.getEventsAttendedByUserIdQuery(userId),
      PaginatedEvents,
      paginateOptions
    );
  }

  private getEventsAttendedByUserIdQuery(
    userId: number
  ): SelectQueryBuilder<Event> {
    return this.getEventsBaseQuery()
      .leftJoinAndSelect('e.attendees', 'a')
      .where('a.userId = :userId', { userId });
  }
}

