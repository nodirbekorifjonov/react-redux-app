import { useCallback } from "react";
import { useSelector } from "react-redux";

const ValidationError = () => {
  const { error } = useSelector((state) => state.auth);

  const errorMessage = useCallback(() => {
    return Object.keys(error).map((name) => {
      const msg = error[name].join(", ");
      return `${name} - ${msg}`;
    });
  }, [error]);

  return (
    error !== null &&
    errorMessage().map((err, idx) => (
      <div
        key={idx}
        className="alert alert-danger m-1 p-2 text-start"
        role="alert"
      >
        {err}
      </div>
    ))
  );
};

export default ValidationError;
