import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../ui";
import { useNavigate } from "react-router-dom";
import { getArticlesStart, getArticleSuccess } from "../../slice/article";
import ArticleService from "../../service/article";
import { useEffect } from "react";

const Main = () => {
  const dispatch = useDispatch();
  const { articles, isLoading } = useSelector((state) => state.article);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const getArticles = async () => {
    dispatch(getArticlesStart());
    try {
      const response = await ArticleService.getArticles();
      dispatch(getArticleSuccess(response.articles));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteArticle = async (slug) => {
    try {
      await ArticleService.deleteArticle(slug);
      getArticles();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {articles.map((item) => (
          <div key={item.id} className="col">
            <div className="card h-100 shadow-sm">
              <svg
                className="bd-placeholder-img card-img-top"
                width="100%"
                height="225"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Thumbnail"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c"></rect>
              </svg>
              <div className="card-body">
                <p className="card-text fw-bold m-0">{item.title}</p>
                <p className="card-text">{item.description}</p>
              </div>

              <div className="card-footer d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-success"
                    onClick={() => navigate(`/article/${item.slug}`)}
                  >
                    View
                  </button>
                  {isLoggedIn && user.username === item.author.username && (
                    <>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => navigate(`/edit-article/${item.slug}`)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteArticle(item.slug)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
                <small className="text-body-secondary text-capitalize fw-bold">
                  {item.author.username}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Main;
