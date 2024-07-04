import { IDropdown } from "./interface";
import React from "react";
export interface IModalFormProps {
  isOpen?: boolean;
  onOpenChange?: () => void;
  pathImmage?: string[];
  title?: string;
}
export interface IInputText {
  label?: string;
  isRequired?: boolean;
  value?: string;
  placeholder?: string;
  type?: string;
  textError?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  readonly?: boolean;
}
export interface IInputFormProps extends IInputText {
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isClear?: boolean;
  onClear?: () => void;
}
export interface IInputUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileName?: File | null;
  onDelete?: () => void;
  setFile: (e: React.DragEvent<HTMLElement>) => void;
  errorMsg?:string
}
export interface ITextareaFormProps extends IInputText {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  classBase?: string;
  height?: string;
}
export interface IDropdownSelectProps {
  value?: string;
  name?: string;
  id?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
  dataList?: IDropdown[];
  className?: string;
  isRequired?: boolean;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  key?: string;
  isInvalid?: boolean;
  errorMessage?: string;
}
export interface ICheckBoxProps {
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  id?: string;
  name?: string;
  isChecked?: boolean;
  value?: string;
  key?: any;
  isInvalid?: boolean;
}
export interface IDatePickerMutiProps {
  nameStartDate?: string;
  nameEndDate?: string;
  valueStartDate?: string;
  valueEndDate?: string;
  numberOfDiffDate?: string | number | null;
  onChangeDate?: (validatedValue: string) => false | void;
  onClearStart?: () => void;
  onClearEnd?: () => void;
  inputDateRight?: boolean;
  isInvalid?: boolean;
}

export interface SocialMediaDetail {
  id?: string;
  fk_site_settings_id?: string;
  name?: string;
  url?: string;
  logo?: string;
  active_flag?: boolean;
}

export interface SiteSetting {
  id?: string;
  logo?: string;
  address_name?: string;
  address_detail?: string;
  email?: string;
  phone?: string;
  hotline?: string;
  facebook?: string;
  instagram?: string;
  x?: string;
  copyright?: string;
  social_media_detail?: SocialMediaDetail[];
  active_flag?: boolean;
}
export interface SiteCarousels {
  id?: string;
  type?: number;
  name?: string;
  description?: string;
  content_type?: string;
  content_detail?: string;
  url?: string;
  button_text?: string;
  image?: string;
  start_date: string;
  end_date?: string | null;
  display_flag?: boolean;
  active_flag?: boolean;
  created_date: string;
  created_by?: string;
  updated_date?: string;
  updated_by?: string;
}
export interface Category {
  id?: string;
  name?: string;
  description?: string;
  icon?: string;
  display_flag?: boolean;
  active_flag?: boolean;
  created_date?: string;
  created_by?: any;
  updated_date?: string;
  updated_by?: any;
}
export interface MenuServeice {
  id?: string;
  fk_master_categories_id?: string;
  master_categories?: string;
  name?: string;
  description?: string;
  icon?: string;
  content_type?: string;
  content_detail?: string;
  url?: string;
  open_mode?: string;
  display_flag?: boolean;
  active_flag?: boolean;
  created_date?: string;
  created_by?: string;
  updated_date?: string;
  updated_by?: string;
}


export interface ServiceFormProps {
  serviceId: string | null;
}