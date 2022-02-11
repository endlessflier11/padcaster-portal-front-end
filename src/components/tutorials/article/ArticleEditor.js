import styles from './ArticleEditor.module.scss'
import { useContext, useEffect, useMemo, useState } from 'react';
import ArticleEditorToolbar, { modules, formats } from './ArticleEditorToolbar';
import 'react-quill/dist/quill.snow.css';
import { Alert, Button, CircularProgress, FormControl, FormGroup, MenuItem, Select, TextField } from '@mui/material';
import { TutorialsContext } from '../../../contexts/TutorialsContext';
import { useRouter } from 'next/router';
import { alertParam, toSlug } from '../../../utils/string';
import { AppContext } from '../../../contexts/AppContext';

// Have to import dynamically https://github.com/zenoamaro/react-quill/issues/122
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;

const ArticleEditor = ({ article, handleCancel }) => {
  const [form, setForm] = useState({
    ...article,
    subcategory: article.id ? article.subcategory?.id : article.subcategory
  });
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState(article?.subcategory?.category?.id);
  const { categories, subcategories, updateArticle, createArticle, deleteArticle } = useContext(TutorialsContext);
  const { showSnack, setConfirmation } = useContext(AppContext);

  const router = useRouter();

  const [requestError, setRequestError] = useState(null);
  const errorMessages = useMemo(() =>
    Object.keys(errors).filter(key => errors[key]).map(key =>
      <Alert severity="error" key={key}>{errors[key]}</Alert>
    )
  , [errors])

  const categoryOptions = useMemo(() =>
    categories.all.map(id => categories.entities[id])
  , [categories]);

  const subcategoryOptions = useMemo(() =>
    (subcategories.categories[category] || []).map(id => subcategories.entities[id])
  , [category, subcategories]);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSaveDraft = () => {
    const draft = { ...form, published: false };
    setForm(draft);
    handleSave(draft);
  }

  const handleSaveAndPublish = () => {
    const published = { ...form, published: true };
    setForm(published);
    handleSave(published);
  }

  const validateForm = () => {
    return {
      title: form.title ? null : 'Title is required',
      subcategory: form.subcategory ? null : 'Subcategory is required',
      contents: form.contents ? null : 'Content is required'
    }
  }

  const handleSave = async (data) => {
    const formErrors = validateForm();
    setErrors(formErrors);
    if (Object.keys(formErrors).filter(key => formErrors[key]).length > 0) {
      return;
    }

    if (article.id) {
      await updateArticle(data);
      router.push(`/tutorials/${article.id}`);
      showSnack({ message: 'Article updated!', status: 'success' });
    } else {
      const res = await createArticle(data)
      if (res) {
        router.push(`/tutorials/${res.id}`)
        showSnack({ message: `Article created!`, status: 'success' });
      } else {
        setRequestError('There was an error creating the article, please try again.');
      }
    }
  }

  const handleDelete = async () => {
    setConfirmation({
      message: 'Are you sure you want to delete this article? This action cannot be undone.',
      onConfirm: async () => {
        router.push('/tutorials');
        await deleteArticle(article);
        showSnack({ message: `Article deleted!`, status: 'success' });
      },
      onCancel: () => {
      }
    })
  }

  useEffect(() => {
    if (!form.subcategory && !category && categoryOptions.length > 0) {
      setCategory(categoryOptions[0].id);
    }
  }, [category, form, categoryOptions])
  /**
   * Set initial category based on article's category if available
   */
   useEffect(() => {
    if (form.subcategory && !category) {
      const sub = subcategories.entities[form.subcategory]
      if (sub) {
        setCategory(sub.category.id);
      }
    }

    if (!form.subcategory && category && subcategoryOptions.map(s => s.id).indexOf(form.subcategory) === -1) {
      setForm({ ...form, subcategory: subcategoryOptions[0]?.id });
    }
  }, [form, category, subcategories, subcategoryOptions]);

  return (
    <form
      className={styles.container}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className={styles.editorNav}>
        <div className={styles.navLeft}>
          <Button
            variant='outlined'
            color='secondary'
            size='large'
            type="button"
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>
        </div>

        <div className={styles.navRight}>
          <p className={styles.articleStatus}>
            Status: {article.published ? 'Published' : 'Draft'}
          </p>
          <Button
            variant='outlined'
            color='secondary'
            size='large'
            type="submit"
            onClick={() => handleSaveDraft()}
          >
            Save Draft
          </Button>

          <Button
            variant='contained'
            color='primary'
            size='large'
            type="submit"
            onClick={() => handleSaveAndPublish()}
          >
            Save & Publish
          </Button>
        </div>
      </div>

      <div className={styles.editorContainer}>
        <div className={styles.errors}>
          {requestError ? <Alert severity="error">{requestError}</Alert> : null}
          {errorMessages}
        </div>

        <FormControl
          className={styles.formControl}
          fullWidth
        >
          <label>Category</label>
          <select
            required
            className={styles.select}
            value={category}
            onChange={(event) => setCategory(+event.target.value)}
          >
            {categoryOptions.map(category => (
              <option key={category.id} value={category.id}>{category.title}</option>
            ))}
          </select>
        </FormControl>

        <FormControl
          className={styles.formControl}
          fullWidth
        >
          <label>Subcategory</label>
          <select
            required
            className={styles.select}
            value={form.subcategory}
            onChange={(event) => setForm({ ...form, subcategory: +event.target.value })}
          >
            {subcategoryOptions.map(sub => (
              <option key={sub.id} value={sub.id}>{sub.title}</option>
            ))}
          </select>
        </FormControl>

        <FormControl
          className={styles.formControl}
          fullWidth
        >
          <label>Title</label>
          <TextField
            value={form.title}
            onChange={(event) =>
              setForm({
                ...form,
                title: event.target.value,
                slug: toSlug(event.target.value)
              })
            }
            // error={!!errors.title}
            // helperText={errors.title}
          />
        </FormControl>

        <FormControl
          className={styles.formControl}
        >
          <label>Priority Level</label>
          <TextField
            type='number'
            value={form.priority}
            // TODO: confirm the min max priority
            inputProps={{ min: 0, max: 10 }}
            onChange={(event) => handleChange('priority', +event.target.value)}
          />
        </FormControl>

        {/* TODO: Implement file upload */}
        {/* <FormControl
          className={styles.formControl}
        >
          <label>Thumbnail</label>
          <input type='file' value={form.thumbnail} />
        </FormControl> */}

        <div
          className={styles.formControl}
        >
          <label>Content</label>
          <ArticleEditorToolbar />
          <ReactQuill
            theme="snow"
            value={form.contents}
            onChange={(val) => handleChange('contents', val)}
            placeholder={"Write something awesome..."}
            modules={modules}
            formats={formats}
          />
        </div>

        {article.id ?
          <div className={styles.deleteArticle}>
            <Button
              variant='outlined'
              color='error'
              size='large'
              onClick={() => handleDelete()}
            >
              Delete Article
            </Button>
          </div>
        : null}
      </div>
    </form>
  );
}

export default ArticleEditor;

