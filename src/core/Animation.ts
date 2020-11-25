import { Canvas, Sprite } from './';

export class Animation {

    private steps: number;
    private spriteSheet: Sprite;
    private animStep: number = 0;
    private animSpeed: number;
    private animFrame: number = 0;
    private imageOrigin: number;
    private imageScale: number;

    constructor(spriteSheet: Sprite, speed: number, steps: number, imageOrigin: number, imageScale: number) {
        this.steps = steps - 1;
        this.spriteSheet = spriteSheet;
        this.animSpeed = speed;
        this.imageOrigin = imageOrigin;
        this.imageScale = imageScale;
    }

    public nextStep() {
        this.animStep++;
        if (this.animStep > this.animSpeed) {
            this.animStep = 0;
            this.animFrame++;

            if (this.animFrame > this.steps) {
                this.animFrame = 0;
            }
        }
    }

    public drawAnimation(canvas: Canvas, x: number, y: number) {
        if (canvas.ctx)
            canvas.ctx.drawImage(this.spriteSheet.getImage(), this.animFrame * this.imageOrigin, 0, this.imageOrigin, this.imageOrigin, x, y, this.imageScale, this.imageScale);
    }

}
