import { useState } from 'react';

export default function ImageWithFallback({ src, fallbackSrc, alt, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc || '/placeholder.jpg');
  };

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      onError={handleError}
      {...props}
    />
  );
}
