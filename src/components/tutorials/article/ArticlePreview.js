import Image from 'next/image';
import Link from 'next/link';
import ImageLoader from '../../ImageLoader';
import styles from './ArticlePreview.module.scss'

const ArticlePreview = ({ article }) => {
  {/* TODO: Replace with thumbnail image when returned by api */}
  const thumbnail = 'thumbnail.jpg'; // article.thumbnail

  return (
    <div className={styles.container}>
      <div className={styles.preview}>
        {thumbnail && (
          <Link
            href={`/tutorials/${article.id}`}
            passHref
          >
            <a className={styles.thumbnail}>
              <Image
                className={styles.thumbnailImage}
                src={`images/thumbnail.jpg`}
                alt={article.title}
                loader={ImageLoader}
                layout="fill"
                unoptimized={true}
              />
            </a>
          </Link>
        )}
        <div className={`${styles.previewCopy} ${thumbnail ? styles.paddedPreview : ''}`}>
          {article.title ?
              <Link href={`/tutorials/${article.id}`} passHref>
              <a className={styles.title}>
                <b>{article.title}</b>
              </a>
            </Link>
          : null}
          {article.contents ?
            <Link href={`/tutorials/${article.id}`} passHref>
              <a className={styles.content}>
                {article.contents.replace(/<[^>]+>/g, '').substring(0, 100)}...
              </a>
            </Link>
          : null}
        </div>
      </div>
    </div>
  );
}

export default ArticlePreview;

