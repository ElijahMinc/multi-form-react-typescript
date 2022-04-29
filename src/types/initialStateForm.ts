import moment from 'moment'
import { genderOptions, languageOptions } from '../constants/constants'

export enum NameOfValues {
  NAME = 'name',
  LASTNAME = 'lastname',
  NUMBER = 'number',
  EMAIL = 'email',
  PASSWORD = 'password',
  DATE_OF_BIRTH = 'dateOfBirth',
  LANGUAGE = 'language',
  FILE = 'file',
  GENDER = 'gender',
}
export interface IInitialStateForm {
  step1: IStep1
  step2: IStep2
}

export interface IStep1 {
  name: string
  lastname: string
  number: number
  email: string
  password: string
}

export interface IStep2 {
  dateOfBirth: any
  language: string | number
  file: (any | FileList)[]
  gender: string | number
}

const unknownGenderOption = genderOptions[2].value
const englishLanguageOption = languageOptions[1].value

export const initialStateForm: IInitialStateForm = {
  step1: {
    name: '',
    lastname: '',
    number: 0,
    email: '',
    password: '',
  },
  step2: {
    dateOfBirth: moment(),
    language: englishLanguageOption,
    file: [],
    gender: unknownGenderOption,
  },
}
