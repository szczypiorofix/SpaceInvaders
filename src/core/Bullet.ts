import { Sprite } from "./";

export class Bullet {

    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private speed: number = 10;
    private shootSingle: boolean = false;
    private shootMultiple: boolean = false;
    private sprite: Sprite;
    private multiShotSpread: number = 0;
    private mutliShotSpreadValue: number = 2;


    constructor(x: number, y: number) {
        this.x = x + 28;
        this.y = y;
        this.width = 8;
        this.height = 8;
        this.shootSingle = false;
        this.sprite = new Sprite("images/bullet.png");

    }

    public getY() {
        return this.y;
    }
    
    public getX() {
        return this.x;
    }

    public setX(x: number) {
        this.x = x;
    }

    public setY(y: number) {
        this.y = y;
    }

    public getWidth() {
        return this.width;
    }

    public getHeight() {
        return this.height;
    }

    public isShoot() {
        return this.shootSingle;
    }

    public isShootMulti() {
        return this.shootMultiple;
    }

    public setShoot(s: boolean) {
        this.shootSingle = s;
    }

    public setShootMulti(s: boolean) {
        this.shootMultiple = s;
        this.multiShotSpread = 0;
    }

    public shoot(x: number) {
        this.x = x + 12;
        this.shootSingle = true;
        this.shootMultiple = false;
    }

    public shootMulti(x: number) {
        this.x = x;
        this.shootMultiple = true;
        this.shootSingle = false;
    }

    public update() {
        if (this.shootSingle || this.shootMultiple) {
            this.y -= this.speed;

            if (this.shootMultiple) {
                this.multiShotSpread += this.mutliShotSpreadValue;
            }
            // this.checkCollision();

        }

    }

    public setCoord(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        
        if (this.shootSingle) this.sprite.draw(ctx, this.x, this.y - 8);

        if (this.shootMultiple) {
            this.sprite.draw(ctx, this.x - 4 - this.multiShotSpread, this.y + 4);
            this.sprite.draw(ctx, this.x + 12, this.y - 8);
            this.sprite.draw(ctx, this.x + 28 + (this.multiShotSpread), this.y + 4);
        }
    };

}
