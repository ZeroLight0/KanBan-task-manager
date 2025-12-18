function InputError({ message }) {
  if (!message) return null;

  return (
    <p className="text-red-500 text-xs sm:text-sm mt-1 font-medium flex items-center gap-1">
      <span>⚠️</span>
      {message}
    </p>
  );
}

export default InputError;
