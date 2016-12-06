export interface IDay {
    type: string;
}

export class Day implements IDay {
    type: string;

    constructor(type: string) {
        this.type = type;
    }
}

export interface IWeek {
    week: Day[];
}

export class Week implements IWeek {
    week: Day[];

    constructor() {
        this.week = [];
    }
}

export class WorkDayRB {
    year: number;
    month: number;
    day: number;
    requiredHours: number;

    constructor(year: number, month: number, day: number, requiredHours: number) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.requiredHours = requiredHours;
    }
}

export class StartTaskRB {
    year: number;
    month: number;
    day: number;
    taskId: string;
    startTime: string;
    comment: string;

    constructor(year: number, month: number, day: number, taskId: string, comment: string, startTime: string) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.taskId = taskId;
        this.startTime = startTime;
        this.comment = comment;
    }
}

export class FinishingTaskRB {
    year: number;
    month: number;
    day: number;
    taskId: string;
    startTime: string;
    endTime: string;

    constructor(year: number, month: number, day: number, taskId: string, startTime: string, endTime: string) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.taskId = taskId;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

export class ModifyTaskRB {
    year: number;
    month: number;
    day: number;
    taskId: string;
    startTime: string;
    newTaskId: string;
    newComment: string;
    newStartTime: string;
    newEndTime: string;

    constructor(year: number, month: number, day: number,
                taskId: string, startTime: string,
                newTaskId: string, newComment: string, newStartTime: string, newEndTime: string) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.taskId = taskId;
        this.startTime = startTime;
        this.newTaskId = newTaskId;
        this.newComment = newComment;
        this.newStartTime = newStartTime;
        this.newEndTime = newEndTime;
    }
}

export class DeleteTaskRB {
    year: number;
    month: number;
    day: number;
    taskId: string;
    startTime: string;

    constructor(year: number, month: number, day: number, taskId: string, startTime: string) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.taskId = taskId;
        this.startTime = startTime;
    }
}

export class UserRB {
    name: string;
    password: string;

    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
    }
}



