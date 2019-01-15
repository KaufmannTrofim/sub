import { Theme } from './theme';

export class Event {
  id: number;
  name: string;
  date: Date;
  themesSPA: Theme[] = new Array<Theme>();

  constructor() {}
}
