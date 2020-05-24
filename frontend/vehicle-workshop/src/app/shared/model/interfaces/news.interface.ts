
export interface NewsInterface {
  id?: number;
  authorName?: string;
  title: string;
  text: string;
  tags?: string;
  createdDate?: Date;
  lastModifiedDate?: Date;
}
