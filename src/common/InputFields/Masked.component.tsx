import MaskedInput from 'react-text-mask';

export const Masked = (props: any) => {
  const {inputRef, ...other} = props;

  return (
    <MaskedInput
      {...other}
      // ref={(ref) => {
      //   inputRef(ref ? ref.inputElement : null);
      // }}
      guide={false}
      mask={[
        '(',
        /\d/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
    />
  );
};
