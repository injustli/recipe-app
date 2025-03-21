import { IUser } from "./types"

declare global {
  namespace Express {
    export interface Request {
      user?: IUser
    }
  }
}