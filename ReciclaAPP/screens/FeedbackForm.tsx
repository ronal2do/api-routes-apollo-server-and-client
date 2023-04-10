import * as React from "react";
import { withFormik, FormikErrors, FormikProps, Field, Form } from "formik";
import { View, Text } from "react-native";
import Button from "../components/Button";
import AwesomeInput from "../components/AwesomeInput";
import { contentSchema } from "../yupSchemas/user";

interface FormValues {
  content: string;
}

interface OtherProps {
  message: string;
}

const InnerForm = () => (
  <AwesomeInput color="green" value="{props.values.content}" label="content" onChange={text => console.log('content', text)} />
)

export default withFormik<any, FormValues>({
  validationSchema: contentSchema,
  mapPropsToValues: () => ({ content: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      return setErrors(errors);
    }

    props.onFinish();
  }
})(InnerForm);
