import { useState } from "react";
import { Input, Textarea } from "../../ui";

const FormComponent = () => {
  const { title, setTitle } = useState("");
  const [desciption, setDesciption] = useState("");
  const [body, setBody] = useState("");
  return (
    <form>
      <Input label={"Title"} state={title} setState={setTitle} />
      <Textarea
        label={"Description"}
        state={desciption}
        setState={setDesciption}
      />
      <Textarea label={"Body"} state={body} setState={setBody} height="300px" />

      <button className="btn btn-primary w-100 py-2 mt-2" type="submit">
        Create
      </button>
    </form>
  );
};

export default FormComponent;
