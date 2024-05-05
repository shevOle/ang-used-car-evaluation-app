type errorType =
  | 'required'
  | 'requiredTrue'
  | 'min'
  | 'minlength'
  | 'max'
  | 'maxlength'
  | 'email'
  | 'pattern';

export interface IError {
  errorType: errorType;
  message: string;
}
