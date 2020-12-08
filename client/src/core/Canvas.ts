export class Canvas {

    public canvas: HTMLCanvasElement | null;
    public ctx: CanvasRenderingContext2D | null;
    private screenWidth: number;
    private screenHeight: number;
    private canvasRect: DOMRect | null;


    constructor() {
        this.screenWidth = 0;
        this.screenHeight = 0;
        this.canvasRect = null;

        this.canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');
        if (this.ctx) {
            this.ctx.imageSmoothingEnabled = false;
            this.screenWidth = this.canvas.width;
            this.screenHeight = this.canvas.height;

            this.canvasRect = this.canvas.getBoundingClientRect();
        }
    }

    public getCanvasRect(): DOMRect {
        if (this.canvasRect)
            return this.canvasRect;
        
        const t: DOMRect = {bottom: 0, height: 0, left: 0, right: 0,top: 0, width: 0, x: 0, y: 0, toJSON: ()=> {}};
        return t;
    }

    public getScreenWidth() {
        return this.screenWidth;
    }

    public getScreenHeight() {
        return this.screenHeight;
    }

    public clear() {
        if (this.ctx) this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
    }

}
