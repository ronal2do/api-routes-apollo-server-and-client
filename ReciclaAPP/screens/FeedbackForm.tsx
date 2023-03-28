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

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
// const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
//   const { handleSubmit, setFieldValue } = props;
//   return (
//     <View>
//       <AwesomeInput color="green" value={props.values.content} label="content" onChange={text => setFieldValue('content', text)} />
//       <Button
//        label="Submit"
//        backgroundColor="gray"
//        onPress={handleSubmit as any}
//      />
//     </View>
//   );
// };

const InnerForm = () => (
  // <AwesomeInput color="green" value={props.values.content} label="content" onChange={text => setFieldValue('content', text)} />
  <AwesomeInput color="green" value="{props.values.content}" label="content" onChange={text => console.log('content', text)} />
)

// class C extends React.PureComponent<FormikProps<FormValues> & {}> {
//   render() {
//     const { handleSubmit } = this.props;
//     return (
//       <View
//         style={{
//           flex: 1,
//           display: "flex",
//           justifyContent: "center"
//         }}
//       >
//         {/* <View>
//           <Text style={{ fontSize: 30, marginBottom: 10 }}>Login</Text>
//           <Field
//             name="content"
//             placeholder="Content"
//             component={AwesomeInput}
//             containerStyle={{ width: "100%" }}
//             autoCapitalize="none"
//           />
//           <Button
//             label="Submit"
//             backgroundColor="gray"
//             onPress={handleSubmit as any}
//           />
//         </View> */}
//         <Text style={{ fontSize: 30, marginBottom: 10 }}>Login</Text>
//       </View>
//     );
//   }
// }

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
