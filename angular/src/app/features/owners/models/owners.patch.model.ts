import { Owner_Post_Request } from "./owner-post-request.model";

export interface Owner_Patch extends Owner_Post_Request{
  id: string;
}
