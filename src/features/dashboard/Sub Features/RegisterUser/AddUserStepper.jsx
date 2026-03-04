import React from 'react';
import Stepper from '../../../../shared/components/Stepper/Stepper';
import selectVendorIcon from "../../../../assets/Images/Page_Image/Dashboard/User/Add_User_Flow/selectVendor.png";
import personalDetailsIcon from "../../../../assets/Images/Page_Image/Dashboard/User/Add_User_Flow/personalDetails.png";
import passwordIcon from "../../../../assets/Images/Page_Image/Dashboard/User/Add_User_Flow/password.png";

const AddUserStepper = ({ currentStep = 0, onStepClick = () => {} }) => {
  const steps = [
    { id: 0, label: 'Select vendor',icon:selectVendorIcon },
    { id: 1, label: 'Personal details',icon:personalDetailsIcon },
    { id: 2, label: 'Create password',icon:passwordIcon }
  ];

  return (
    <div className="w-full mb-8">
      <Stepper steps={steps} currentStep={currentStep} onStepClick={onStepClick} />
    </div>
  );
};

export default AddUserStepper;
