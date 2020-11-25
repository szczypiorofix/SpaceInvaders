import { Canvas, EnemyType, GameState, Level, LevelGenerator, Spaceship, StateType } from "./";


export class GameManager {
    
    private canvas: Canvas;
    private gameState: GameState;
    
    private mouseLeftDown: boolean = false;
    private mouseRightDown: boolean = false;
    private playerMoveRight: boolean = false;
    private playerMoveLeft: boolean = false;

    private player: Spaceship;

    private levelGenerator: LevelGenerator;
    private currentLevel: Level;


    constructor() {
        this.canvas = new Canvas();

        this.gameState = { gameState: StateType.Game};

        this.player = new Spaceship(320, 420, this.gameState);

        this.levelGenerator = new LevelGenerator();
        this.currentLevel = this.levelGenerator.createLevel("intro", 10, 0, EnemyType.ALIEN1, this.player);


        this.canvas.canvas?.addEventListener("mousemove", (e: MouseEvent) => {
            if (e.clientX - this.canvas.getCanvasRect().left < this.canvas.getScreenWidth() - 32)
            this.player.setX(e.clientX - this.canvas.getCanvasRect().left);
            // this.checkUserInteraction();
        });

        window.oncontextmenu = () => {
            // console.log("Context menu?");
            return false;
        };

        window.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === "Control") {
                this.mouseLeftDown = true;
            }
            if (e.key === "ArrowLeft") {
                this.playerMoveLeft = true;
            }
            if (e.key === "ArrowRight") {
                this.playerMoveRight = true;
            }
        });


        window.addEventListener("keyup", (e: KeyboardEvent) => {

            if (e.key === "Control") {
                this.mouseLeftDown = false;
                this.player.stopShooting();
            }
            if (e.key === "ArrowLeft") {
                this.playerMoveLeft = false;
            }
            if (e.key === "ArrowRight") {
                this.playerMoveRight = false;
            }
        });

        this.canvas.canvas?.addEventListener("mousedown", (e: MouseEvent) => {
            if (e.button === 0) {
                this.mouseLeftDown = true;
            }
            if (e.button === 2) {
                this.mouseRightDown = true;
            }
        });

        this.canvas.canvas?.addEventListener("mouseup", (e: MouseEvent) => {
            if (e.button === 0) {
                this.mouseLeftDown = false;
                this.player.stopShooting();
            }
            if (e.button === 2) {
                this.mouseRightDown = false;
                this.player.stopShooting();
            }
        });

        this.canvas.canvas?.addEventListener("mouseleave", (e: MouseEvent) => {
            this.mouseLeftDown = false;
            this.mouseRightDown = false;
        });

    }

    mainLoop = () => {

        this.canvas.clear();
        switch (this.gameState.gameState) {
            // GAME
            case StateType.Game:
                
            // input
                if (this.playerMoveLeft && this.player.getX() > 0) {
                    this.player.moveLeft()
                }
                if (this.playerMoveRight && this.player.getX() < this.canvas.getScreenWidth() - 32) {
                    this.player.moveRight();
                }

                if (this.mouseLeftDown) {
                    this.player.setShoot(true);
                } else this.player.setShoot(false);

                if (this.mouseRightDown) {
                    this.player.setShootMulti(true);
                } else this.player.setShootMulti(false);

                // update
                this.player.update();
                this.currentLevel.update();

                // ======================== DRAW ========================
                
                this.player.draw(this.canvas);
                this.currentLevel.draw(this.canvas);

                // ======================================================
                break;
            default:
                // main menu



                break;
        }

        requestAnimationFrame(this.mainLoop);
    }

    public startGame() {

        var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
        requestAnimationFrame(this.mainLoop);
    }

}

