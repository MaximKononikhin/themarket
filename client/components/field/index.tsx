import cn from "classnames";
import * as React from "react";
import { FieldError, useFormContext } from "react-hook-form";

import styles from "./index.module.scss";

interface FieldProps {
  children: React.ReactElement;
  label: string | React.ReactNode;
  style?: { [key: string]: any };
  isWhite?: boolean;
}

export function Field(props: FieldProps) {
  const [state, setState] = React.useState({
    focused: false,
  });

  const name = props.children.props.name;

  const { formState, trigger, watch } = useFormContext();

  const error: FieldError = formState.errors[name];

  const handleFocus = () => {
    setState({ ...state, focused: true });
  };

  const handleBlur = () => {
    trigger(name);
    setState({ ...state, focused: false });
  };

  const hasValue = () => {
    const value = watch(name);
    return (
      (value !== undefined && value !== null && value !== "") || state.focused
    );
  };

  const childProps = {
    id: name,
    name,
    className: !error
      ? cn(styles.control, props.isWhite ? styles.control_white : "")
      : cn(
          styles.control,
          props.isWhite ? styles.control_white : "",
          styles.highlight
        ),
    onFocus: handleFocus,
    onBlur: handleBlur,
  };

  const child = React.cloneElement(props.children, childProps);

  return (
    <div
      className={cn(styles["form-group"], {
        [styles.focused]: state.focused,
        [styles.active]: hasValue(),
      })}
    >
      {!!props.label && (
        <label
          htmlFor={name}
          className={cn(styles.label, props.isWhite ? styles.label_white : "")}
        >
          {props.label}
        </label>
      )}
      {child}
      {error && <div className={styles.errorMessage}>{error.message}</div>}
    </div>
  );
}
