import React, { PureComponent } from 'react'
import Button from './Button';
import { theme as color } from '../constants/Colors'

type AnswerButtonProps = {
  value: number;
  label: string;
  correct?: number | null | undefined;
  action: () => void;
  response?: number | null | undefined;
}

export default class AnswerButton extends PureComponent<AnswerButtonProps> {
  render() {
    const {
      value, // valor default da question
      label,
      correct, // resposta correta
      action,
      response // escolhida pelo usuario
    } = this.props;

    const selectColor = Number(response) === null ? color.GRAY /** "#D1D6D9" */
      : Number(correct) === Number(value) && Number(correct) === Number(response) ? color.YELLOW
      : Number(correct) !== Number(response) && Number(response) === Number(value) ? color.RED : color.GRAY

    const textColor = Number(response) !== null && Number(response) !== Number(value) ? color.BLUE : 'white'

    return (
      <Button 
        backgroundColor={selectColor}
        progress={true}
        disabled={response !== null}
        onPress={action}
        textColor={textColor}
        label={label}
      />
    )
  }
}
