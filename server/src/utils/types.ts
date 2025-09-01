export interface IUser {
  uid: string;
  email: string;
  name: string;
  profile: string;
  lastLoginAt: Date;
}

export interface IRecipe {
  name: string;
  ingredients: string[];
  method: string[];
  imageUrl: string;
  createdBy: string;
  time: Number;
}
