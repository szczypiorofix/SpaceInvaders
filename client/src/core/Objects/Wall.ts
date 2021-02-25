import { Canvas, Sprite } from '../Engine';


export enum WallType {
    TYPE1,
    TYPE2
}


export class Wall {

    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private sprite: Sprite;
    private type: WallType;
    private damage: number;


    public constructor(wT: WallType, x: number, y: number, d?: number) {
        this.x = x;
        this.y = y;
        this.type = wT;
        this.damage = d ? d : 0;

        this.sprite = new Sprite('images/wall.png');

        this.width = this.sprite.getWidth();
        this.height = this.sprite.getHeight();

    }

    public getDamage() {
        return this.damage;
    }

    public setDamage(d: number) {
        this.damage = d;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public setX(x: number): void {
        this.x = x;
    }

    public setY(y: number): void {
        this.y = y;
    }

    public getType(): WallType {
        return this.type;
    }

    public getWidth() {
        return this.width;
    }

    public getHeight() {
        return this.height;
    }

    public update() {

    }

    public draw(canvas: Canvas) {
        if (canvas.ctx) this.sprite.drawTile(canvas.ctx, this.damage, this.x, this.y);
    }
}