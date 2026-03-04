import PersonalDetailsForm from '../common/PersonalDetailsForm';

const PersonalDetailsStep = ({
  mode = 'create',
  formData = {},
  initialData = {},
  onFormChange = () => {},
  onSubmit = () => {},
  onCancel = () => {},
  register, errors, setValue, watch
}) => {
  return (
    <PersonalDetailsForm
      mode={mode}
      formData={formData}
      initialData={initialData}
      onFormChange={onFormChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
      showButtons={true}
      register={register}
      errors={errors}

    />
  );
};

export default PersonalDetailsStep;
