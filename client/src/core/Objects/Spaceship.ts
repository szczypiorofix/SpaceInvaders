import { Animation, GameState, SFX, Sprite, StateType } from '../Engine';
import { GameObject } from './GameObject';


export class Spaceship extends GameObject {

    private shoot: boolean = false;

    private speedX: number = 5;
    private speedY: number = 5;
    private imageOrigin: number = 32;
    private imageScale: number = 32;

    private health: number;
    private maxHealth: number = 10;

    private sprite: Sprite;
    private animation: Animation;

    private shootSound: SFX;

    private gameState: GameState;



    constructor(x: number, y: number, gameState: GameState) {
        super();
        this.x = x;
        this.y = y;

        this.width = 32;
        this.height = 32;

        this.alive = true;

        this.health = this.maxHealth;

        this.gameState = gameState;

        this.shootSound = new SFX("./sfx/shot.wav");

        this.sprite = new Sprite('images/spaceship.png');

        this.animation = new Animation(this.sprite, 4, 3, this.imageOrigin, this.imageScale);

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

    // public stopShooting() {
    //     this.curBulletFrame = 0;
    // }

    public setShoot(s: boolean) {
        this.shoot = s;
    }

    public looseHealth() {
        this.health--;
    }


    public update() {

        if (this.health <= 0) {
            this.alive = false;
            this.gameState.gameState = StateType.GameLoose;
            console.log("GAME OVER !!!");
        }

        if (this.alive) {
            this.animation.nextStep();
        }

    }


    public draw(ctx: CanvasRenderingContext2D) {
        if (this.alive) {
            this.animation.drawAnimation(ctx, this.x, this.y);
        }


        // TO DO OSOBNEGO PLIKU UI.TS
        // if (canvas.ctx) {
        //     canvas.ctx.fillStyle = "#AA0011";
        //     canvas.ctx.fillRect(20, 20, 10, (this.health * (440)) / this.maxHealth);
        // }
    }

}
