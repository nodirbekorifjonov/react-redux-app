import { FormComponent } from "../../components";
import { useState } from "react";
import ArticleService from "../../service/article";
import { useDispatch, useSelector } from "react-redux";
import {
  postArticleFailure,
  postArticleStart,
  postArticleSuccess,
} from "../../slice/article";
import { useNavigate } from "react-router-dom";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { articles } = useSelector((state) => state.article);

  const formSubmit = async (e) => {
    e.preventDefault();
    const article = { title, description, body };
    dispatch(postArticleStart());
    try {
      const response = await ArticleService.postArticle(article);

      dispatch(postArticleSuccess(response.article));
      navigate("/");
    } catch (error) {
      dispatch(postArticleFailure());
    }
  };

  const formProps = {
    title,
    setTitle,
    description,
    setDescription,
    body,
    setBody,
    formSubmit,
  };

  return (
    <div className="text-center">
      <h1 className="fs-2">Create article</h1>
      <div className="w-75 mx-auto">
        <FormComponent {...formProps} />
      </div>
    </div>
  );
};
export default CreateArticle;
