export interface User {
  id: number
  login: string
  photoProfil: string
  roles: Array<string>
  mailAdress: string
  recipes: Array<any>
  dateOfBirth: string
  status: string
  premium: boolean
  profileImage: string
}

export interface Recipe {
  id: number
  author: User
  title: string
  description: string
  preparation: Array<string>
  datePublication: string
  details: Array<any>
  ingredients: Array<any>
  difficulty: number
  nbPersons: number
  compositions: Array<any>
  categories: Array<any>
  comments: Array<any>
  favorites: Array<any>
  imageName: string
}

export interface Category {
  id: number
  name: string
  description: string
  recipes: Array<Recipe>
}

export interface Comment {
  id: number
  auteur: User
  recipe: Recipe
  message: string
  datePublication: string
}

export interface Favorite {
  id: number
  auteur: User
  recipe: Recipe
}
