export interface IDay {
  type: string;
}

export class Day implements IDay {
    public type: string;

    constructor(type: string) {
        this.type = type;
    }
}

export interface IWeek {
  week: Day[];
}

export class Week implements IWeek {
    public week: Day[];

    constructor() {
        this.week = [];
    }
}
