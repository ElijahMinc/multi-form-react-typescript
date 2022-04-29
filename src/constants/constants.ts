interface ComboboxOption<LabelCombobox> {
  value: number
  text: LabelCombobox
}

type Languages = 'Ukrain' | 'English' | 'Polish'
type Gender = 'Male' | 'Female' | 'Unknown'

export const languageOptions: ComboboxOption<Languages>[] = [
  { value: 1, text: 'Ukrain' },
  { value: 2, text: 'English' },
  { value: 3, text: 'Polish' },
]
export const genderOptions: ComboboxOption<Gender>[] = [
  { value: 1, text: 'Male' },
  { value: 2, text: 'Female' },
  { value: 3, text: 'Unknown' },
]
