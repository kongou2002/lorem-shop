import { ChangeEventHandler } from "react";

interface props {
  color: string;
  isChecked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const ColorRadio = (props: { props: props }) => {
  const { color, isChecked, onChange } = props.props;
  return (
    <label
      //   style={{
      //     backgroundColor: props.props.color,
      //     padding: "10px",
      //     borderRadius: "50%",
      //   }}
      className={`bg-${color}-500 padding-10 rounded-[50%]`}
    >
      <input
        type="radio"
        checked={isChecked}
        onChange={onChange}
        placeholder="color"
      />
    </label>
  );
};

export default ColorRadio;
