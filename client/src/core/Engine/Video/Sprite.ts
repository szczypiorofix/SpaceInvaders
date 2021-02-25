
export class Sprite {

    private image: HTMLImageElement;
    private width: number = 0;
    private height: number = 0;
    private tileWidth: number = 0;
    private tileHeight: number = 0
    private tilesCount: number;


    constructor(filename: string, tilesCount?: number, tileWidth?: number, tileHeight?: number) {
        this.image = new Image();

        this.tilesCount = tilesCount ? tilesCount : 0;        

        if (filename !== undefined && filename !== '' && filename !== null) {
            this.image.src = filename;
            this.width = this.image.width;
            this.height = this.image.height;
        }
    }

    public getWidth() {
        return this.width;
    }

    public getHeight() {
        return this.height;
    }

    public getImage(): HTMLImageElement {
        return this.image;
    }

    public drawTile(ctx: CanvasRenderingContext2D, tile: number, x: number, y: number) {
        ctx.drawImage(this.image, (tile * 32), 0, 32, 32, x, y, 32, 32);
    }

    public draw(ctx: CanvasRenderingContext2D , x: number, y: number, w?: number, h?: number) {
        if (!w || !h) {
            ctx.drawImage(this.image, x, y, this.image.width, this.image.height);
        }
        else {
            ctx.drawImage(this.image, x, y, w, h);
        }
    };

}
