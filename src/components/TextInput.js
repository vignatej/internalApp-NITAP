import React from "react";
const TextInput = React.forwardRef((props, ref) => {
  return (
    <>
      <p>{props.name}</p>
      <p className="text-black">
        <input className=" rounded-none bg-cardCol h-10 w-full text-zinc-50" type={props.type} name={props.name} ref={ref} />
      </p>
    </>
  );
});
export default TextInput;
