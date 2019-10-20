class Canvas {
    public DOMElement: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _intervalId: number;

    constructor(width: number, height: number) {
        //Canvas initialization
        this.DOMElement = document.createElement('canvas');
        this.DOMElement.width = width;
        this.DOMElement.height = height;
        this._ctx = this.DOMElement.getContext('2d') || new CanvasRenderingContext2D();
    }

    /**
     * Returns mouse position on canvas
     * @param {MouseEvent} evt Mouse event on canvas DOM Element
     * @returns {{x: number, y: number}}
     */
    public getMousePosition(evt: MouseEvent) {
        let rect = this.DOMElement.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    /**
     * Appends canvas to html element
     * @param {HTMLElement} parent
     */
    public appendTo(parent: HTMLElement): void {
        if (!(parent instanceof HTMLElement)) throw new Error('Append to expects HTMLElement as parameter');
        parent.appendChild(this.DOMElement);
    }

    /**
     * Sets the animation loop
     * @param {(ctx: CanvasRenderingContext2D) => void} loop
     * @param {number} fps Frames per seconds
     */
    public setAnimationLoop(loop: (ctx: CanvasRenderingContext2D) => void, fps: number): void {
        if (this._intervalId) throw new Error('Unable to set more than 1 animation loop for one canvas');
        this._intervalId = setInterval(() => loop(this._ctx), 1000 / fps);
    }

    /**
     * Stops animation loop
     */
    public clearAnimationLoop(): void {
        if (!this._intervalId) throw new Error('No loop to stop');
        clearInterval(this._intervalId);
        this._intervalId = 0;
    }
}