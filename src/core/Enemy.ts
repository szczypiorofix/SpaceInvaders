import { Animation, BulletAlien, Canvas, getRandomInt, SFX, Spaceship, Sprite } from './';


export enum EnemyType {
    ALIEN1,
    ALIEN2
}


export class Enemy {

    private type: EnemyType;
    private x: number;
    private y: number;
    private alive: boolean;
    private animation: Animation;
    private sprite: Sprite;
    private imageOrigin: number = 32;
    private imageScale: number = 32;

    private bullet: BulletAlien;
    private shooting: boolean;
    private curBulletFrame: number = 0;
    private shootSound: SFX;


    public constructor(type: EnemyType, x: number, y: number) {
        this.type = type;
        this.x = x;
        this.y = y;

        this.shooting = false;
        this.alive = true;

        this.shootSound = new SFX("./music/shotalien.wav");

        this.bullet = new BulletAlien(this.x, this.y);

        this.sprite = new Sprite('images/alien1.png');

        this.animation = new Animation(this.sprite, 7, 3, this.imageOrigin, this.imageScale);
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

    public getType(): EnemyType {
        return this.type;
    }

    public isAlive() {
        return this.alive;
    }

    public setAlive(a: boolean) {
        this.alive = a;
    }


    public update(player: Spaceship) {

        this.animation.nextStep();

        if (getRandomInt(0, 350) === 0 && !this.bullet.isShoot() && this.alive) {
            this.bullet.fire(this.x);
            // this.shootSound.play();
        }

        if (this.alive) {
            this.bullet.update(player);
        }

    }

    public draw(canvas: Canvas) {
        if (this.alive) this.animation.drawAnimation(canvas, this.x, this.y);
        if (this.bullet.isShoot() && this.alive && canvas.ctx) this.bullet.draw(canvas.ctx);
    }
}