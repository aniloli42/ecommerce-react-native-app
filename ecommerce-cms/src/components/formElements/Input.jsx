import { useField } from 'formik';

const Input = (props) => {
  const [field, meta] = useField(props.name);

  return (
    <>
      <input
        type="text"
        {...props}
        {...field}
        className="rounded bg-gray-700 focus:ring-1 focus:ring-gray-500 outline-none p-2 text-white"
        autoComplete="false"
        autoCorrect="false"
        inputMode="text"
      />
      <p className="text-red-500 text-xs mt-1">{meta.error}</p>
    </>
  );
};

export default Input;
