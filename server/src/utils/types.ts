export interface IUser {
  email: string,
  name: string,
  profile: string,
  refreshToken: string,
  refreshTokenExpiry: Date
}

export interface IRecipe {
  name: string,
  ingredients: string[],
  method: string[],
  imageUrl: string,
  createdBy: string,
  time: Number
}