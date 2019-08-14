/// <reference types="next" />
/// <reference types="next/types/global" />
declare module '*.less' {
    const content: { [className: string]: string };
    export = content;
}