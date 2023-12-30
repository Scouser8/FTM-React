import FormDialog from "../../FormDialog/FormDialog";

type Props = {
  fields: JSX.Element[];
  handleCloseFormDialog: () => void;
  handleSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  isFormDialogOpen: boolean;
  formDialogTitle: string;
  formDialogSubmitText?: string;
};

function AddFlightTicketFormView(props: Props) {
  const {
    fields,
    isFormDialogOpen,
    handleCloseFormDialog,
    handleSubmit,
    formDialogTitle,
    formDialogSubmitText,
  } = props;

  return (
    <FormDialog
      isDialogOpen={isFormDialogOpen}
      handleDialogClose={handleCloseFormDialog}
      form={fields}
      handleSubmit={handleSubmit}
      title={formDialogTitle}
      submitText={formDialogSubmitText}
    />
  );
}

export default AddFlightTicketFormView;
