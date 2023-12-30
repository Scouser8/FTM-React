type InputType = "text" | "password" | "number" | "date";

export type Field<FormValues> = {
  fieldProps: {
    name: keyof FormValues;
    label: string;
    type?: InputType;
    InputProps?: Object;
  };
  wrapperProps?: { gridSize: { md: number } };
};

export type UserLoginInfo = { email: string; password: string };

export type UserRegisterInfo = UserLoginInfo & {
  firstName: string;
  lastName: string;
};
