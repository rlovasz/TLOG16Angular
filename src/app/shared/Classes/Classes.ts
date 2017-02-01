export interface IDay {
    type: string;
}

/**
 * Day type with a string field that contains information if the day is workDay, or a simple day or only an empty box
 */
export class Day implements IDay {
    type: string;

    constructor(type: string) {
        this.type = type;
    }
}

export interface IWeek {
    week: Day[];
}

/**
 * Week type with an array of days
 */
export class Week implements IWeek {
    week: Day[];

    constructor() {
        this.week = [];
    }
}

export interface ITask {
    taskId: string;
    startTime: string;
    endTime: string;
    comment: string;
    minPerTask: number;
    id: number;
}

/**
 * Task type similar to backend Task type
 */
export class Task implements ITask {
    taskId: string;
    startTime: string;
    endTime: string;
    comment: string;
    minPerTask: number;
    id: number;

    constructor(taskId: string, startTime: string, endTime: string, comment: string, minPerTask: number) {
        this.taskId = taskId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.comment = comment;
        this.minPerTask = minPerTask;
    }
}

export interface IWorkDay {
    tasks: Array<Task>;
    requiredMinPerDay: number;
    extraMinPerDay: number;
    actualDay: Date;
    sumPerDay: number;
}

/**
 * WorkDay type similar to backend WorkDay type
 */
export class WorkDay implements IWorkDay {
    tasks: Array<Task>;
    requiredMinPerDay: number;
    extraMinPerDay: number;
    actualDay: Date;
    sumPerDay: number;
}

export interface IWorkMonth {
    date: Date;
    sumPerMonth: number;
    requiredMinPerMonth: number;
    extraMinPerMonth: number;
    monthDate: string;
    id: number;
    days: Array<WorkDay>;
}

/**
 * WorkMonth type similar to backend WorkMonth type
 */
export class WorkMonth implements IWorkMonth {
    date: Date;
    days: Array<WorkDay>;
    sumPerMonth: number;
    requiredMinPerMonth: number;
    extraMinPerMonth: number;
    monthDate: string;
    id: number;
}

/**
 * rest bean for work day creation with backend calls
 */
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

/**
 * rest bean for task creation if the end time not known yet
 */
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

/**
 * rest bean for task creation with backend calls
 */
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

/**
 * rest bean for task modification with backend calls
 */
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

/**
 * rest bean for task deletion with backend calls
 */
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

/**
 * User rest bean for the backend calls
 */
export class UserRB {
    name: string;
    password: string;

    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
    }
}



