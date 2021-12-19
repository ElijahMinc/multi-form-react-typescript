export enum NameOfValues {
   NAME = 'name',
   LASTNAME = 'lastname',
   NUMBER = 'number',
   EMAIL = 'email'
}
export interface IInitialStateForm{
   step1: IStep1
}

export interface IStep1{
   name: string
   lastname: string
   number: number
   email: string
}

export const initialStateForm: IInitialStateForm = {
   step1: {
      name: '',
      lastname: '',
      number: 0,
      email: '',
   }
}