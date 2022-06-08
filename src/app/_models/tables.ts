import { Rating } from "./rating";
import { User } from "./user"

export interface Table {

  id: number;
  tableName?: string;
  description?: string;
  createDate?: string;
  userOwner?: User;
  isDeleted?: boolean;
  sharedWith?: User[];
  ratings?: Rating[];
}