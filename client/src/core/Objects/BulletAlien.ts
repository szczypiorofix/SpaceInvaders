import { Sprite } from '../Engine';
import { GameObject } from "./GameObject";


export class BulletAlien extends GameObject {

    private speed: number = 10;
    private shoot: boolean = false;
    private sprite: Sprite;


    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
        this.width = 8;
        this.height = 8;
        this.shoot = false;
        this.sprite = new Sprite("images/bulletAlien.png");
    }

    public isShoot() {
        return this.shoot;
    }

    public setShoot(s: boolean) {
        this.shoot = s;
    }

    public fire(x: number) {
        this.x = x + 12;
        this.y += 32;
        this.shoot = true;
    }

    // public update(player: Spaceship) {
    public update() {
        if (this.shoot) {
            this.y += this.speed;
            
            // this.checkCollision();

            // if (this.y > player.getY() && this.x > player.getX() && this.x < player.getX() + 32) {
            //     this.shoot = false;
            //     this.y = 0;
            //     player.looseHealth();
            // }
        }

        if (this.y > 480) {
            this.shoot = false;
            this.y = 0;
        }

    }

    public setCoord(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        if (this.shoot) {
            this.sprite.draw(ctx, this.x, this.y);
        }
    };

}
