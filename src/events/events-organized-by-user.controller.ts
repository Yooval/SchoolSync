//Manages routes for events organized by a specific user.


import { ClassSerializerInterceptor, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Query, SerializeOptions, UseInterceptors } from "@nestjs/common";
import { EventsService } from "./events.service";

@Controller('events-organized-by-user/:userId')
@SerializeOptions({ strategy: 'excludeAll' })
export class EventsOrganizedByUserController {
  constructor(
    private readonly eventsService: EventsService
  ) { }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1 // optinal when sending this requets.
  ) {
    return await this.eventsService
      .getEventsOrganizedByUserIdPaginated(
        userId,
        { currentPage: page, limit: 5 }
      );
  }
}