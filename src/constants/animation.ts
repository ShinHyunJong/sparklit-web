import { keyframes } from '@emotion/react';

export const slideUpFrame = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: opacity 1s ease-in-out 0.1s, transform 1.5s cubic-bezier(0, 0.21, 0.03, 1.01);
    transform: translateY(0px);
  }
`;
