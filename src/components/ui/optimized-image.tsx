import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Image components (Rule 75). All ultimately use next/image for responsive
 * loading, modern formats and correct sizing.
 */

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/** Standard optimized image with explicit dimensions (no CLS). */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("object-cover", className)}
      priority={priority}
      sizes={sizes}
      quality={85}
    />
  );
}

interface ArtDirectedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

/**
 * Art-directed image: different crops per breakpoint via CSS object-position.
 * Desktop and mobile compositions can differ without loading two images.
 */
export function ArtDirectedImage({
  src,
  alt,
  className,
  priority = false,
}: ArtDirectedImageProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        quality={85}
      />
    </div>
  );
}

interface SceneImageProps {
  src: string;
  alt: string;
  className?: string;
}

/** Scene image: decorative, lazy-loaded, with a subtle reveal. */
export function SceneImage({ src, alt, className }: SceneImageProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 60vw"
        quality={80}
        loading="lazy"
      />
    </div>
  );
}
