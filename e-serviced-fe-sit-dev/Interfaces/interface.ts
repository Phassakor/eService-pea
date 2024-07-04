export interface IDropdown {
  label: string;
  sub_id?: string;
  value: string | number;
}
export interface ICheckbox {
  label?: string;
  value?: string;
  id?: string;
  checked?: boolean;
}
export interface IFile {
  name?: string;
  fileSystem?: File | null;
  fileName?: string;
  fileType?: string;
}
