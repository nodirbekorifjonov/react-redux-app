import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleService from "../../service/article";
import { useDispatch, useSelector } from "react-redux";
import {
  getArticleDetailFailure,
  getArticleDetailStart,
  getArticleDetailSuccess,
} from "../../slice/article";

const ArticleDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch((state) => state.article);
  // const {get} = useSelector(state => state)

  const getArticleDetail = async () => {
    dispatch(getArticleDetailStart());
    try {
      const response = await ArticleService.getArticleDetail(slug);
      dispatch(getArticleDetailSuccess(response.article));
    } catch (error) {
      dispatch(getArticleDetailFailure(error));
    }
  };

  useEffect(() => {
    getArticleDetail();
  }, [slug]);

  return <div>ArticleDetail</div>;
};

export default ArticleDetail;
