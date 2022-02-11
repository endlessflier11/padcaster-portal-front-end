import { createContext, useCallback, useEffect, useState, useContext } from 'react';
import { deleteRequest, patchJson, postJson, requestJson } from '../utils/network';
import { AppContext } from './AppContext';

export const TutorialsContext = createContext();

const TutorialsProvider = ({ children }) => {
  const { showSnack } = useContext(AppContext);
  const initialEntities = { all: [], entities: {}};
  const [categories, setCategories] = useState(initialEntities);
  const [subcategories, setSubcategories] = useState({ ...initialEntities, categories: {} });
  const [articles, setArticles] = useState({ ...initialEntities, subcategories: {} });
  const [articleId, setArticleId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [subcategoryId, setSubcategoryId] = useState(null);
  const [editing, setEditing] = useState(null);
  const [articleSearchResults, setArticleSearchResults] = useState(null);
  const [searchingArticles, setSearchingArticles] = useState(false);
  const [updatingCategories, setUpdatingCategories] = useState(false);
  const [updatingSubcategory, setUpdatingSubcategory] = useState(false);
  const [loadingArticle, setLoadingArticle] = useState(false);
  const [loadingArticles, setLoadingArticles] = useState(false);

  const pageLength = 5;

  const updateEntityObject = useCallback((state, object, key = 'id') => ({
    ...state,
    entities: {
      ...state.entities,
      [object[key]]: {
        ...state.entities[object[key]],
        ...object
      }
    }
  }), []);

  // TODO: Get categories, subcategories and articles from normal API and not admin
  const loadCategories = useCallback(async () => {
    const data = await requestJson(`${process.env.TEST_API_URL}/admin/categories/`);
    const results = data?.results || [];

    if (results.length > 0) {
      setCategoryId(results[0].id);
      setCategories({
        all: results.map(r => r.id),
        entities: results.reduce((acc, cat) =>
          ({ ...acc, [cat.id]: cat }),
        {}),
      });
    }
  }, []);

  const loadSubcategories = useCallback(async () => {
    const data = await requestJson(`${process.env.TEST_API_URL}/admin/subcategories/`);
    const results = data?.results || [];

    if (results.length > 0) {
      setSubcategories({
        all: results.map(r => r.id),
        entities: results.reduce((acc, sub) =>
          ({ ...acc, [sub.id]: sub }),
        {}),
        categories: results.reduce((acc, sub) =>
          ({ ...acc, [sub.category.id]: [...(acc[sub.category.id] || []), sub.id] }),
        {})
      });
    }
  }, []);

  const loadArticles = useCallback(async () => {
    setLoadingArticles(true);
    const data = await requestJson(`${process.env.TEST_API_URL}/admin/articles/`);
    const results = data?.results || [];

    if (results.length > 0) {
      setArticles({
        all: results.map(r => r.id),
        entities: results.reduce((acc, sub) =>
          ({ ...acc, [sub.id]: sub }),
        {}),
        subcategories: results.reduce((acc, article) =>
          ({ ...acc, [article.subcategory.id]: [...(acc[article.subcategory.id] || []), article.id] }),
        {})
      });
    }
    setLoadingArticles(false);
  }, []);

  const loadArticle = useCallback(async (id) => {
    setLoadingArticle(true);
    const article = await requestJson(`${process.env.TEST_API_URL}/admin/articles/${id}/`);

    if (article) {
      const payload = {
        all: articles.all.indexOf(id) !== -1 ? articles.all : [...(articles.all || []), id],
        entities: {
          ...articles.entities,
          [id]: article,
        },
        subcategories: {
          ...articles.subcategories,
          [article.subcategory.id]: [...(articles.subcategories[article.subcategory.id] || []), article.id]
        }
      }
      setArticles(payload);
    }
    setLoadingArticle(false);
    return article;
  }, [articles]);

  const searchArticles = useCallback(async (query, start = 0, count = pageLength) => {
    try {
      if (query.length < 3) {
        setArticleSearchResults(null);
        return;
      }

      setSearchingArticles(true);
      const data = await requestJson(
        `${process.env.TEST_API_URL}/admin/articles/?search=${encodeURIComponent(query)}`);
      const results = data?.results || [];
      setArticleSearchResults(results || []);
      setSearchingArticles(false);
    } catch(error) {
      console.error(error);
      setSearchingArticles(false);
    }
  }, []);

  const updateArticle = useCallback(async (article) => {
    const response = await patchJson(`${process.env.TEST_API_URL}/admin/articles/${article.id}/`, article)
    if (response) {
      setArticles(state => updateEntityObject(state, response));
    }
    return response;
  }, [updateEntityObject]);

  const createArticle = useCallback(async (article) => {
    const response = await postJson(`${process.env.TEST_API_URL}/admin/articles/`, article)
    if (response) {
      setArticles(state => ({
        ...updateEntityObject(state, response),
        subcategories: {
          ...state.subcategories,
          [response.subcategory.id]: [...(state.subcategories[response.subcategory.id] || []), response.id]
        }
      }));
    }
    return response;
  }, [updateEntityObject]);

  // TODO: Handle case where deletes fail
  const deleteArticle = useCallback(async (article) => {
    await deleteRequest(`${process.env.TEST_API_URL}/admin/articles/${article.id}/`);

    const temp = {
      ...articles,
      subcategories: {
        ...articles.subcategories,
        [article.subcategory.id]: articles.subcategories[article.subcategory.id].filter(id => id !== article.id)
      },
      all: articles.all.filter(id => id !== article.id),
      subcategories: {
        ...articles.subcategories,
        [article.subcategory.id]: articles.subcategories[article.subcategory.id].filter(id => id !== article.id)
      }
    };
    delete temp.entities[article.id];
    setArticles(temp);
  }, [articles]);

  const updateCategories = useCallback(async (updatedCategories) => {
    setUpdatingCategories(true);

    updatedCategories.forEach(async (category) => {
      if (categories.entities[category.id].title !== category.title) {
        const response = await patchJson(`${process.env.TEST_API_URL}/admin/categories/${category.id}/`,
          {
            title: category.title,
            slug: category.slug
          }
        )
        setCategories(state => updateEntityObject(state, response));
      }
    });

    showSnack({ message: 'Categories updated!', status: 'success' });
    setUpdatingCategories(false);
  }, [categories, updateEntityObject, showSnack]);

  const updateSubcategory = useCallback(async (subcategory) => {
    setUpdatingSubcategory(true);
    const updated = await patchJson(
      `${process.env.TEST_API_URL}/admin/subcategories/${subcategory.id}/`,
      {
        title: subcategory.title,
        slug: subcategory.slug
      }
    )
    if (updated) {
      setSubcategories(state => updateEntityObject(state, updated));
    }
    showSnack({ message: 'Subcategory updated!', status: 'success' });
    setUpdatingSubcategory(false);
  }, [updateEntityObject, showSnack]);

  // TODO: Implement error handling and notify user
  const handleError = (error) => {
    console.error(error)
  }

  // TODO: Change this to request `/articles/categories/` and bootstrap the data from there instead of 3 separate calls
  const loadAll = useCallback(() => {
    loadCategories();
    loadSubcategories();
    loadArticles();
  }, [loadCategories, loadSubcategories, loadArticles])

  return (
    <TutorialsContext.Provider value={{
      articleId, setArticleId,
      articles, setArticles,
      subcategories, setSubcategories,
      categoryId, setCategoryId,
      subcategoryId, setSubcategoryId,
      categories, setCategories,
      editing, setEditing,
      loadAll,
      loadArticles, loadingArticles,
      loadArticle, loadingArticle,
      searchArticles, searchingArticles, articleSearchResults,
      updateArticle, createArticle, deleteArticle,
      updateCategories, updatingCategories,
      updateSubcategory, updatingSubcategory,
    }}>
      {children}
    </TutorialsContext.Provider>
  );
}

export default TutorialsProvider;
