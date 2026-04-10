declare module 'swagger-ui-react' {
  import type { FC } from 'react';

  export interface SwaggerUIProps {
    spec?: object;
    url?: string;
    layout?: string;
    docExpansion?: 'list' | 'full' | 'none';
    defaultModelsExpandDepth?: number;
    [key: string]: unknown;
  }

  const SwaggerUI: FC<SwaggerUIProps>;
  export default SwaggerUI;
}
