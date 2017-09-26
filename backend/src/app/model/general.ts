/*********************/
/*      SCHOOLS      */
/*********************/

export class School {
    schoolId:string;
    userId:string;
    locationId:string;
    name:string;
    about:string;
    description:string;
    abn:string;
    cricos:string;
    yearEstablised:number;
    rating:number;
    status:string;
    location:Location;
    user:User;

    courses: Course[];
    media: Media[];
    ratings: Rating[];
    relationships: Relationship[];
    schoolawards: SchoolAwards[];
    schoolcampis: SchoolCampi[];
    schoolfeatures: SchoolFeatures[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export class SchoolCampi {
    schoolCampiId: string = '';
    schoolId: string  = '';
    locationId: string  = '';
    name: string  = '';
    status: string  = '';
    location: Location;
    school: School;

    courses: Course[];
    schoolfeatures: SchoolFeatures[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export class SchoolFeatures {
    schoolFeaturesId: string;
    schoolId: string;
    schoolCampiId: string;
    name: string;
    value: string;
    status: string;
    schoolCampi: SchoolCampi;
    school: School;
}

export class SchoolAwards {
    schoolAwardsId: string;
    schoolId: string;
    name: string;
    date: string;
    status: string;
    school: School;
}

/*********************/
/*      COURSES      */
/*********************/

export class Course {
    courseId: string;
    courseTypeId: string;
    schoolId: string;
    schoolCampiId: string;
    startDate: number;
    endDate: number;
    periodOfDay: string;
    cost: number;
    discount: number;
    name: string;
    about: string;
    remarks: string;
    rating: number;
    created_at: number;
    updated_at: number;
    status: string;
    schoolCampi: SchoolCampi;
    courseType: CourseType;
    school: School;
    courseenrolls: CourseEnroll[];
    coursefeatures: CourseFeatures[];
    courseinstructors: CourseInstructor[];
    coursesections: CourseSection[];
    media: Media[];
    ratings: Rating[];
    relationships: Relationship[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export class CourseType {
    courseTypeId: string = '';
    name: string  = '';
    certified: number = 0;
    status: string  = '';
    courses: Course[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export class CourseEnroll {
    courseEnrollId: string;
    courseId: string;
    studentId: string;
    created_at: number;
    updated_at: number;
    status: string;
    student: Student;
    course: Course;

    payments: Payments[];
}

export class CourseFeatures {
    courseFeaturesId: string;
    courseId: string;
    name: string;
    value: string;
    status: string;
    course: Course;
}

export class CourseInstructor {
    courseInstructorId: string;
    courseId: string;
    instructorId: string;
    status: string;
    instructor: Instructor;
    course: Course;
}

export class CourseSection {
    courseSectionId: string;
    courseId: string;
    name: string;
    order: string;
    created_at: number;
    updated_at: number;
    status: string;
    course: Course;

    coursesectionitems: CourseSectionItem[];
    coursesectionresources: CourseSectionResource[];
}

export class CourseSectionItem {
    courseSectionItemId: string;
    courseSectionId: string;
    name: string;
    created_at: number;
    updated_at: number;
    status: string;
    courseSection: CourseSection;
}

export class CourseSectionResource {
    courseSectionResourceId: string;
    courseSectionId: string;
    name: string;
    path: string;
    created_at: number;
    updated_at: number;
    status: string;
    courseSection: CourseSection;
}


/*********************/
/*      VARIOUS      */
/*********************/

export class Image {
    imageId: string;
    large: string;
    thumb: string;
    status: string;

    media: Media[];
}

export class Video {
    videoId: string;
    movie: string;
    length: number;
    status: string;

    media: Media[];
}

export class Media {
    mediaId: string;
    imageId: string;
    videoId: string;
    schoolId: string;
    studentId: string;
    instructorId: string;
    courseId: string;
    geographyId: string;
    userId: string;
    user: User;
    course: Course;
    geography: Geography;
    image: Image;
    instructor: Instructor;
    school: School;
    student: Student;
    video: Video;
}

export class Geography {
    geographyId: string;
    cityCode: string;
    cityName: string;
    stateCode: string;
    stateName: string;
    countryCode: string;
    countryName: string;

    locations: Location[];
    media: Media[];
}

export class Location {
    locationId: string;
    geographyId: string;
    address: string;
    streetNumber: string;
    formattedAddress: string;
    neighborhood: string;
    postCode: string;
    latitude: number;
    longitude: number;
    remarks: string;
    status: string;
    geography: Geography;

    relationships: Relationship[];
    schools: School[];
    schoolcampis: SchoolCampi[];
    students: Student[];
}

export class Payments {
    paymentId: string;
    studentId: string;
    courseEnrollId: string;
    cost: number;
    discount: number;
    created_at: number;
    updated_at: number;
    dueDate: number;
    status: string;
    courseEnroll: CourseEnroll;
    student: Student;
}

export class Rating {
    ratingId: string;
    studentId: string;
    schoolId: string;
    courseId: string;
    instructorId: string;
    created_at: number;
    updated_at: number;
    status: string;
    instructor: Instructor;
    course: Course;
    school: School;
    student: Student;
}


/*********************/
/*      PEOPLES      */
/*********************/

export class Instructor {
    instructorId: string;
    userId: string;
    name: string;
    about: string;
    expertise: string;
    rating: number;
    status: string;
    user: User;

    courseinstructors: CourseInstructor[];
    media: Media[];
    ratings: Rating[];
}

export class Student {
    studentId: string;
    userId: string;
    name: string;
    birthday: number;
    phone: string;
    emergencyPhone: string;
    locationId: string;
    status: string;
    location: Location;
    user: User;

    courseenrolls: CourseEnroll[];
    media: Media[];
    payments: Payments[];
    ratings: Rating[];
    relationships: Relationship[];
}

export class User {
    userId:string;
    username:string;
    email:string;
    password:string;
    last_login_at:string;
    last_login_ip:string;
    confirmed_at:string;
    blocked_at:string;
    status:number;
    status_label:string;
    created_at:string;
    updated_at:string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

/*********************/
/*       STUFF       */
/*********************/

export class Relationship {}
export class ReferenceTransaction {}