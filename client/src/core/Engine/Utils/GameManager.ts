import { GameState, StateType } from './GameState';
import { Canvas } from '../Video/Canvas';
import { Level, LevelGenerator } from './LevelGenerator';
import { Bullet, Spaceship } from '../../Objects';
import { Input, MOUSE_LEFT_BUTTON, MOUSE_RIGHT_BUTTON } from './Input';
import { Music } from '..';


export class GameManager {

    private player: Spaceship;
    private gameState: GameState;
    private canvas?: Canvas;
    private currentLevel: Level;
    private levelGenerator: LevelGenerator;
    private bullets: Bullet[];

    private maxBullets: number = 22;
    private skipBulletFrame: number = 4;
    
    /**
     * Best settings:
     * max: 30, skip: 3
     * max: 22, skip: 4
     * max: 18, skip: 5
     * max: 16, skip: 6
     * max: 15, skip: 7
     * max: 12, skip: 8
     * max: 11, skip: 9
     * max: 10, skip: 10
     * max: 9, skip: 11
     * max: 9, skip: 12
     */


    private curBulletFrame: number = 0;
    private curBullet: number = 0;
    private gameInput: Input;
    private music: Music;

    private readonly updates: number = 60; // No. of ticks/updates per second
    private now: number = 0;
    private then: number = 0;
    private interval: number = 0;
    private delta: number = 0;
    // private counter: number = 0;
    // private first: number = 0;
    private second_since: number = 0;
    private second: number = 0;
    private second_fps: number = 0;

    public constructor() {
        this.gameState = {gameState: StateType.SplashMenu};
        this.player = new Spaceship(320, 420, this.gameState);
        this.levelGenerator = new LevelGenerator();
        this.currentLevel = this.levelGenerator.createLevel({name: "default", diff: 0, eC: 8, eT: 1}, this.player);
        
        this.bullets = [];

        for (let i = 0; i < this.maxBullets; i++) {
            this.bullets.push(new Bullet(this.player.getX(), this.player.getY()));
        }

        this.music = new Music("./music/loop1.mp3");
        this.music.play();

        this.gameInput = {
            mouseLeftDown: false,
            mouseRightDown: false
        }

        this.curBullet = 0;

    }

    // public getPlayer(): Spaceship {
    //     return this.player;
    // }

    public startGame(canvas: Canvas) {
        this.canvas = canvas;
        if (!this.canvas)
            return;
        if (!this.canvas.canvas)
            return;

        this.music = new Music("./music/loop1.mp3");
        this.music.play();
        this.music.setLoop(true);

        window.requestAnimationFrame = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
                function(f:TimerHandler) {
                    window.setTimeout(f,1e3/60);
                }
        }();

        this.now = 0;
        this.then = Date.now();
        this.second_since = Date.now();
        this.second_fps = 0;
        this.second = 0;
        this.interval = 1000 / this.updates;
        this.delta = 0;
        // this.counter = 0;
        // this.first = this.then;

        this.canvas.canvas.addEventListener("mousemove", (e: MouseEvent) => {
            if (this.canvas)
            if (e.clientX - this.canvas.getCanvasRect().left < this.canvas.getScreenWidth() - this.player.getWidth())
            this.player.setX(e.clientX - this.canvas.getCanvasRect().left);
        });

        this.canvas.canvas.addEventListener("mouseleave", (e: MouseEvent) => {
            this.gameInput.mouseLeftDown = false;
            this.gameInput.mouseRightDown = false;
            // console.log("Leaving canvas...");
        });

        this.canvas.canvas.addEventListener("mousedown", (e: MouseEvent) => {
            if (e.button === MOUSE_LEFT_BUTTON) {
                this.gameInput.mouseLeftDown = true;
            }
            if (e.button === MOUSE_RIGHT_BUTTON) {
                this.gameInput.mouseRightDown = true;
            }
        });


        this.canvas.canvas.addEventListener("mouseup", (e: MouseEvent) => {
            if (e.button === MOUSE_LEFT_BUTTON) {
                this.gameInput.mouseLeftDown = false;
                // this.gameManager.getPlayer().stopShooting();
            }
            if (e.button === MOUSE_RIGHT_BUTTON) {
                this.gameInput.mouseRightDown = false;
                // this.gameManager.getPlayer().stopShooting();
            }
        });


        this.gameLoop();
    }

    private gameLoop = () => {
        if (this.second > 1000) {
            this.second_since = Date.now();
            this.second = 0; 
            console.log(this.second_fps);
            this.second_fps = 0;
        } else {
            this.second = Date.now() - this.second_since;
            ++this.second_fps;
        }
        requestAnimationFrame(this.gameLoop);
        this.now = Date.now();
        this.delta = this.now - this.then;
        if (this.delta > this.interval) {
            this.then = this.now - (this.delta % this.interval);
            // =================== GAME LOOP ===================
            if (this.canvas)
                this.canvas.clear();
            this.input(this.gameInput);
            this.update();
            this.render();
            // =================================================
        }
    }

    private input(input: Input): void {
        if (!this.canvas)
            return;

        if (this.player.getX() > 0) {
            this.player.moveLeft()
        }
        
        if (this.player.getX() < this.canvas.getScreenWidth() - 32) {
            this.player.moveRight();
        }  

        if (input.mouseLeftDown) {
            this.player.setShoot(true);
        } else {
            this.player.setShoot(false);
        }
    }

    private update(): void {
        this.player.update();
        this.currentLevel.update();
        
        for (let i: number = 0; i < this.maxBullets; i++) {
            if (this.bullets[i].isAlive()) {
                this.bullets[i].update();
            }
        }

        if (this.player.isShooting() && !this.bullets[this.curBullet].isAlive() && this.curBulletFrame === 0 ) {
            this.bullets[this.curBullet].shoot(this.player.getX());
            this.curBullet++;
            if (this.curBullet >= this.maxBullets) {
                this.curBullet = 0;
            }
        }

        if (this.player.isShooting()) {
            if (this.curBulletFrame < this.skipBulletFrame) {
                this.curBulletFrame++;
            } else this.curBulletFrame = 0;
        }

    }

    private render(): void {
        if (!this.canvas)
            return;
        if (!this.canvas.ctx)
            return;
        
        this.player.draw(this.canvas.ctx);
        this.currentLevel.draw(this.canvas);

        for (let i = 0; i < this.bullets.length; i++)
        if (this.canvas.ctx && (this.bullets[i].isAlive()))
            this.bullets[i].draw(this.canvas.ctx);
    }

}
