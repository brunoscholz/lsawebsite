import { uuid } from '../util/uuid';

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
  //media: Media[];
  images: Image[];
  ratings: Rating[];
  relationships: Relationship[];
  schoolAwards: SchoolAwards[];
  schoolCampis: SchoolCampi[];
  schoolFeatures: SchoolFeatures[];

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
  schoolFeatures: SchoolFeatures[];

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
  courseEnrolls: CourseEnroll[];
  courseFeatures: CourseFeatures[];
  courseInstructors: CourseInstructor[];
  courseSections: CourseSection[];
  media: Media[];
  ratings: Rating[];
  relationships: Relationship[];

  enrolled: boolean;

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

  courseSectionItems: CourseSectionItem[];
  courseSectionResources: CourseSectionResource[];
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
  address2: string;
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
  schoolCampis: SchoolCampi[];
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

  courseInstructors: CourseInstructor[];
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
  images: Image[];

  courseEnrolls: CourseEnroll[];
  payments: Payments[];
  ratings: Rating[];
  relationships: Relationship[];
}

export class ChatUser {
  userId: string;

  constructor(public name:string, public avatarSrc: string, public role:string, id = null) {
    this.userId = id || uuid();
  }
}

export class User {
  userId:string;
  username:string;
  email:string;
  password:string;
  last_login_at:string;
  last_login_ip:string;
  /*confirmed_at:string;
  blocked_at:string;
  role:number;*/
  role_label:string;
  /*status:number;*/
  status_label:string;
  /*created_at:string;
  updated_at:string;*/

  student: Student;
  instructor: Instructor;
  agent: Agent;
  school: School;
  courseEnrolls: CourseEnroll[];

  chatUser: ChatUser;

  constructor(values: Object = {}) {
    Object.assign(this, values);
    this.chatUser = new ChatUser(this.username, 'assets/img/generic-avatar.png', this.role_label, this.userId);
  }
}

export class Agent {
  agentId: string;
  userId: string;
  name: string;
  about: string;
  rating: number;
  status: string;
  user: User;

  //schoolagents: SchoolAgent[];
  media: Media[];
  ratings: Rating[];
}

/*********************/
/*       STUFF       */
/*********************/

export class Relationship {}
export class ReferenceTransaction {}

export interface ISearchData {
  type: string;
  body: string;
  cost: number;
  id: string;
  picture: Media[];
  reviews: Rating[];
  title: string;
}
  /*schools: School[];
  instructors: Instructor[];
  courses: Course[];
  agents: Agent[];*/

export class IPayload {
  q: string;
  startDate: string;
  endDate: string;
  courseType: string;
  accomodation: string;
  pickup: Checkbox;
};

export class Checkbox {
  name:string;
  description:string;
  checked:boolean;
}
