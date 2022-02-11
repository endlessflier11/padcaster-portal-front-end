const ImageLoader = ({ src, width, quality }) => {
  return `${process.env.MEDIA_URL}${src}`;
};

export default ImageLoader;
