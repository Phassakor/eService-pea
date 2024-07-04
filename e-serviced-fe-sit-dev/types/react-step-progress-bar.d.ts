// types/react-step-progress-bar.d.ts

declare module 'react-step-progress-bar' {
    import { Component, ReactNode } from 'react';
  
    interface ProgressBarProps {
      percent: number;
      filledBackground: string;
      children?: ReactNode;
    }
  
    interface StepProps {
      transition?: string;
      children?: (props: { accomplished: boolean }) => ReactNode;
    }
  
    export class ProgressBar extends Component<ProgressBarProps, any> {}
    export class Step extends Component<StepProps, any> {}
  }
  