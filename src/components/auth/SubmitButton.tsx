type SubmitButtonProps = {
  text: string;
};

export const SubmitButton = ({
  text,
}: SubmitButtonProps): React.JSX.Element => (
  <button
    type="submit"
    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 
               text-white font-semibold rounded-lg shadow-md 
               transition duration-300"
  >
    {text}
  </button>
);
