import { Sprite } from "../Engine/Video/Sprite";
import { GameObject } from './GameObject';


export class Bullet extends GameObject {

    private speed: number = 4;
    private sprite: Sprite;
    private spawnY: number;


    constructor(x: number, y: number) {
        super();
        this.x = x + 28;
        this.y = y;
        this.width = 8;
        this.height = 8;
        this.alive = false;
        this.spawnY = y;
        this.sprite = new Sprite("images/bullet.png");
    }

    public shoot(x: number) {
        this.x = x + 12;
        this.alive = true;
    }

    public update() {
        if (this.alive) {
            this.y -= this.speed;
        }
        if (this.y < 0) {
            this.alive = false;
            this.y = this.spawnY;
            // console.log("Bullet die!");
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        if (this.alive) {
            this.sprite.draw(ctx, this.x, this.y - 8);
        }
    };

}
