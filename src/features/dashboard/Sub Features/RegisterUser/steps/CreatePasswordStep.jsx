import PasswordForm from '../common/PasswordForm';

const CreatePasswordStep = ({ formData = {}, onFormChange = () => {},register, errors, setValue, watch }) => {
  return (
    <PasswordForm
      mode="create"
      formData={formData}
      onFormChange={onFormChange}
      register={register}
      errors={errors}
      setValue={setValue}
      watch={watch}
    />
  );
};

export default CreatePasswordStep;
