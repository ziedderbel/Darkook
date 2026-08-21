import "react";

declare module "react" {
  interface ImgHTMLAttributes<T> {
    src?: string | import("next/image").StaticImageData | undefined;
  }
}

declare module "*.png" {
  const value: string | import("next/image").StaticImageData;
  export default value;
}

declare module "*.jpg" {
  const value: string | import("next/image").StaticImageData;
  export default value;
}

declare module "*.jpeg" {
  const value: string | import("next/image").StaticImageData;
  export default value;
}

declare module "*.svg" {
  const value: string | import("next/image").StaticImageData;
  export default value;
}

declare module "*.webp" {
  const value: string | import("next/image").StaticImageData;
  export default value;
}

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
