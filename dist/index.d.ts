/// <reference types="react" />
declare type props = {
    canvasWidth: number;
    canvasHeight: number;
    colors: string[];
    className: string;
};
/**
 *  The main React component which orchastrates everything
 * from particle generatio, collision resolution to  animation and
 * painting canvas.
 */
declare const ReactFirefly: (props: props) => JSX.Element;
export default ReactFirefly;
