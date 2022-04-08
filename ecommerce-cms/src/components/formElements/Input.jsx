import { useField } from 'formik';

const Input = (props) => {
  const [field, meta] = useField(props.name);

  return (
    <>
      <input
        type="text"
        {...props}
        {...field}
        className="rounded-md bg-gray-700  outline-none  text-white
        "
        autoComplete="false"
        autoCorrect="false"
        inputMode="text"
      />
      <p className="text-red-500 text-xs mt-1">{meta.error}</p>
    </>
  );
};

export default Input;
