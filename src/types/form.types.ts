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
