declare module 'spider-banner' {
    import { FC, ReactNode } from 'react';
  
    interface SpiderBannerProps {
      children: ReactNode;
      noOfDots?: number;
      colors?: string[];
      lineLenght?: number;
      className?: string;
    }
  
    const SpiderBanner: FC<SpiderBannerProps>;
  
    export default SpiderBanner;
  }
  