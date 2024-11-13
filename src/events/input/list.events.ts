// Defines the filters and pagination options for listing events,
// enabling queries for event lists with optional filters (e.g., date range).

export class ListEvents {
  when?: WhenEventFilter = WhenEventFilter.All;
  page: number = 1; // 1 is default
}

export enum WhenEventFilter { // WhenEventFilter is an enum
  All = 1,
  Today,
  Tommorow,
  ThisWeek,
  NextWeek,
}
