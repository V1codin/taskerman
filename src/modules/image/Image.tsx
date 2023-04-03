import Image from 'next/image';

export type ImageModuleProps = {
  src: string;
  alt: string;
  width?: number | undefined;
  height?: number | undefined;
  className?: string;
  title?: string;
  draggable?: boolean;
};

const ImageModule: React.FC<ImageModuleProps> = ({
  alt,
  src,
  height,
  width,
  className,
  title,
  draggable,
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      title={title}
      draggable={draggable}
    />
  );
};
export default ImageModule;
