import React from "react";
import { useFormContext } from "react-hook-form";

import { Bounce1, Bounce2, Button, Spinner } from "./styles";

type SubmitBtnProps = {
  children: React.ReactNode;
  disabled?: boolean;
};

const LoadindSpinner = () => (
  <Spinner>
    <Bounce1 />
    <Bounce2 />
    <div />
  </Spinner>
);

const SubmitButton: React.FC<SubmitBtnProps> = (props) => {
  const { formState } = useFormContext();
  return (
    <Button type="submit" disabled={formState.isSubmitting || props.disabled}>
      {formState.isSubmitting ? <LoadindSpinner /> : props.children}
    </Button>
  );
};

export default SubmitButton;
