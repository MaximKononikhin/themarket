import React from "react";
import {
    FormProvider,
    SubmitHandler,
    UnpackNestedValue,
    UseFormReturn,
} from "react-hook-form";


interface FormProps<T> {
    children: React.ReactElement[] | React.ReactElement;
    onSubmit: SubmitHandler<T>;
    context: UseFormReturn<T>;
    fields: Array<keyof T>;
    errorMessage?: string;
}

function Form<T>(props: React.PropsWithChildren<FormProps<T>>) {
    const { handleSubmit, setError } = props.context;

    const onSubmit = async (
        data: UnpackNestedValue<T>,
        event?: React.BaseSyntheticEvent | undefined
    ) => {
        try {
            await props.onSubmit(data, event);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <FormProvider {...props.context}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{ width: "100%" }}
                >
                    {props.children}
                </form>
            </FormProvider>
        </>
    );
}

export default Form;
