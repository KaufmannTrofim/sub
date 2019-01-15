export class User {
  id: number;
  fullName: string;
  email: string;
  lastVisit: Date = new Date();
  roles: string[];

  constructor() {}
}
