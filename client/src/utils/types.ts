export interface RecipeType {
  _id: string;
  method: string[];
  name: string;
  ingredients: string[];
  time: number;
  imageUrl: string;
  createdBy: string;
}

export interface CheckedRecipe {
  target: HTMLInputElement;
  id: string;
}

export interface User {
  uid: string;
  name: string;
  email: string;
  profile: string;
  lastLoginAt: Date;
}
