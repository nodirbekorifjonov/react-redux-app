import { useSelector } from "react-redux";
import { Input, Textarea } from "../../ui";

const FormComponent = (props) => {
  const { isLoading } = useSelector((state) => state.article);
  const {
    title,
    setTitle,
    description,
    setDescription,
    body,
    setBody,
    formSubmit,
  } = props;
  return (
    <form onSubmit={formSubmit}>
      <Input label={"Title"} state={title} setState={setTitle} />
      <Textarea
        label={"Description"}
        state={description}
        setState={setDescription}
      />
      <Textarea label={"Body"} state={body} setState={setBody} height="300px" />

      <button
        className="btn btn-primary w-100 py-2 mt-2"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>{" "}
            <span role="status">Loading...</span>
          </>
        ) : (
          "Create"
        )}
      </button>
    </form>
  );
};

export default FormComponent;
