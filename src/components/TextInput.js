import React from "react";
const TextInput = React.forwardRef((props, ref) => {
  return (
    <>
      <p>{props.name}</p>
      <p className="text-black">
        <input className="w-64 h-8 rounded-none" type={props.type} name={props.name} ref={ref} />
      </p>
    </>
  );
});
export default TextInput;
