import classNames from 'classnames';

declare global {
  declare var cx: typeof classNames;

  declare module '*.module.css' {
    const classNames: {
      [className: string]: string;
    };
    export default classNames;
  }

  declare module '*.svg' {
    const content: string;
    export default content;
  }
}