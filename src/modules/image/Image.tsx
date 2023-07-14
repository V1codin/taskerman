import Image from 'next/image';
import { forwardRef } from 'react';

export type ImageModuleProps = {
  src: string;
  alt: string;
  width?: number | undefined;
  height?: number | undefined;
  className?: string;
  title?: string;
  draggable?: boolean;
};

const ImageModule = forwardRef<HTMLImageElement, ImageModuleProps>(
  ({ alt, src, height, width, className, title, draggable }, ref) => {
    return (
      <Image
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        title={title}
        draggable={draggable}
      />
    );
  },
);

ImageModule.displayName = 'ImageModule';

export default ImageModule;
