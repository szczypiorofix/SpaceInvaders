import { Animation, Sprite, SFX, getRandomInt, Canvas } from '../Engine';
// import { BulletAlien } from './';
import { GameObject } from './GameObject';


export enum EnemyType {
    ALIEN1,
    ALIEN2
}


export class Enemy extends GameObject {

    private type: EnemyType;
    private animation: Animation;
    private sprite: Sprite;
    private imageOrigin: number = 32;
    private imageScale: number = 32;

    // private bullet: BulletAlien;
    private shooting: boolean;
    private curBulletFrame: number = 0;
    private shootSound: SFX;


    public constructor(type: EnemyType, x: number, y: number) {
        super();
        this.type = type;
        this.x = x;
        this.y = y;

        this.shooting = false;
        this.alive = true;

        this.shootSound = new SFX("./sfx/shotalien.wav");

        // this.bullet = new BulletAlien(this.x, this.y);

        this.sprite = new Sprite('images/alien1.png');

        this.animation = new Animation(this.sprite, 7, 3, this.imageOrigin, this.imageScale);
    }

    public getType(): EnemyType {
        return this.type;
    }


    public update() {

        this.animation.nextStep();

        // if (getRandomInt(0, 350) === 0 && !this.bullet.isShoot() && this.alive) {
            // this.bullet.fire(this.x);
            // this.shootSound.play();
        // }

        if (this.alive) {
            // this.bullet.update(player);
            // this.bullet.update();
        }

    }

    public draw(ctx: CanvasRenderingContext2D) {
        if (this.alive) {
            this.animation.drawAnimation(ctx, this.x, this.y);
        }
        
        // if (this.bullet.isShoot() && this.alive && ctx) {
        //     this.bullet.draw(ctx);
        // }
    }
}