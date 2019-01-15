import { Tag } from './tag';

export class Theme {
  id: number;
  topic: string;
  description: string;
  createdAt: Date = new Date();
  tags: Tag[] = new Array<Tag>();
  lecturer: string;
  assigned: Array<string>;

  constructor() {}
}
