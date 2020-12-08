import { Animation, Bullet, Canvas, Enemy, GameState, SFX, Sprite, StateType} from './';


export class Spaceship {

    private x: number;
    private y: number;
    private width: number = 32;
    private height: number = 32;
    private alive: boolean = true;
    private shoot: boolean = false;
    private shootMulti: boolean = false;

    private speedX: number = 5;
    private speedY: number = 5;
    private imageOrigin: number = 32;
    private imageScale: number = 32;

    private health: number;
    private maxHealth: number = 10;

    private sprite: Sprite;
    private animation: Animation;

    private bullets: Bullet[];
    private maxBullets: number = 20;
    private skipBulletFrame: number = 4; // dobre do upgradeów ??
    private curBulletFrame: number = 0;
    private curBullet: number = 0;

    private shootSound: SFX;
    private shootSound2: SFX;

    private gameState: GameState;
    private enemies: Enemy[];



    constructor(x: number, y: number, gameState: GameState) {
        this.x = x;
        this.y = y;

        this.health = this.maxHealth;

        this.gameState = gameState;

        this.shootSound = new SFX("./music/shot.wav");
        this.shootSound2 = new SFX("./music/shot2.wav");

        this.bullets = [];
        for (let i = 0; i < this.maxBullets; i++) {
            this.bullets.push(new Bullet(this.x, this.y));
        }

        this.curBullet = 0;

        this.enemies = [];

        this.sprite = new Sprite('images/spaceship.png');

        this.animation = new Animation(this.sprite, 4, 3, this.imageOrigin, this.imageScale);

    }

    public getX() {
        return this.x;
    }

    public getY() {
        return this.y;
    }

    public setX(x: number) {
        this.x = x;
    }

    public setY(y: number) {
        this.y = y;
    }

    public setCoord(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public getWidth() {
        return this.width;
    }

    public getHeight() {
        return this.height;
    }

    public moveRight() {
        this.x += this.speedX;
    }

    public moveLeft() {
        this.x -= this.speedX;
    }

    public isShooting() {
        return this.shoot;
    }

    public stopShooting() {
        this.curBulletFrame = 0;
    }

    public setShoot(s: boolean) {
        this.shoot = s;
    }

    public isShootingMulti() {
        return this.shootMulti;
    }

    public setShootMulti(s: boolean) {
        this.shootMulti = s;
    }

    public isAlive() {
        return this.alive;
    }

    public looseHealth() {
        this.health--;
    }

    public setAlive(a: boolean) {
        this.alive = a;
    }

    public getMaxBullets() {
        return this.maxBullets;
    }

    public getBullets(): Bullet[] {
        return this.bullets;
    }

    public setEnemies(e: Enemy[]) {
        this.enemies = e;
    }

    public update() {

        if (this.health <= 0) {
            this.alive = false;
            this.gameState.gameState = StateType.GameLoose;
            console.log("GAME OVER !!!");
        }

        if (this.alive) {
            this.animation.nextStep();

            for (let i = 0; i < this.bullets.length; i++) {
                if (this.bullets[i].getY() < 0) {
                    this.bullets[i].setShoot(false);
                    this.bullets[i].setShootMulti(false);
                    this.bullets[i].setY(this.y);
                }
                else {
                    this.bullets[i].update();
                    for (let j = 0; j < this.enemies.length; j++) {
                        if (this.bullets[i].isShoot()) {
                            if (this.bullets[i].getX() > this.enemies[j].getX()
                                && this.bullets[i].getX() < this.enemies[j].getX() + 32
                                && this.bullets[i].getY() < this.enemies[j].getY() + 32
                                && this.bullets[i].getY() > this.enemies[j].getY()
                                && this.enemies[j].isAlive() ) {
                                this.enemies[j].setAlive(false);
                                this.bullets[i].setShoot(false);
                                this.bullets[i].setY(this.y);
                            }
                        }
                    }
                }
            }
    
            if (this.shoot && !this.bullets[this.curBullet].isShoot() && this.curBulletFrame === 0 ) {
                this.bullets[this.curBullet].setShootMulti(false);
                this.bullets[this.curBullet].shoot(this.x);
                this.shootSound.play();
                this.curBullet++;
                if (this.curBullet > this.maxBullets - 1) {
                    this.curBullet = 0;
                }
            }
    
            if (this.shootMulti && !this.bullets[this.curBullet].isShootMulti() && this.curBulletFrame === 0 ) {
                this.bullets[this.curBullet].setShoot(false);
                this.bullets[this.curBullet].shootMulti(this.x);
                this.shootSound2.play();
                this.curBullet++;
                if (this.curBullet > this.maxBullets - 1) {
                    this.curBullet = 0;
                }
            }
    
            if (this.shoot || this.shootMulti) {
                if (this.curBulletFrame < this.skipBulletFrame) {
                    this.curBulletFrame++;
                } else this.curBulletFrame = 0;
            }
        }

    }


    public draw(canvas: Canvas) {
        if (this.alive) {
            this.animation.drawAnimation(canvas, this.x, this.y);
        }

        for (let i = 0; i < this.bullets.length; i++)
        if (canvas.ctx && (this.bullets[i].isShoot() || this.bullets[i].isShootMulti()))
            this.bullets[i].draw(canvas.ctx);


        if (canvas.ctx) {
            canvas.ctx.fillStyle = "#AA0011";
            canvas.ctx.fillRect(20, 20, 10, (this.health * (440)) / this.maxHealth);
        }
    }

}
