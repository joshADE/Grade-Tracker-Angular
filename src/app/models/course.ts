export class Course {
    code!: string;
    name!: string;
    grade!: number;
    credits!: number;

    constructor(name: string, code: string, grade: number, credits: number){
        this.name = name;
        this.code = code;
        this.grade = grade;
        this.credits = credits;
    }

    static EmptyCourse() {
        return new Course('NA', 'NA', 0.0, 1.0);
    }
}
export interface AddCourseOutput { 
    termIndex: number;
    newCourse: Course;
}

export type PrereqType = { [code: string] : string[] };
export type CoreqType = string[][];
