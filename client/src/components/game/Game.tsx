import React from 'react';
import './Game.scss';
import { Canvas, GameState, IMainMenuChoice, Level, LevelGenerator, Spaceship, StateType } from '../../core';

// declare var ChiptuneJsPlayer: any;
// declare var ChiptuneJsConfig: any;


class Game extends React.Component<IMainMenuChoice, GameState> {

    private canvas: Canvas | null;
    private gameState: GameState = { gameState: StateType.Game};
    
    private mouseLeftDown: boolean = false;
    private mouseRightDown: boolean = false;
    private playerMoveRight: boolean = false;
    private playerMoveLeft: boolean = false;

    private player: Spaceship;

    private levelGenerator: LevelGenerator;
    private currentLevel: Level;


    public constructor(props: any) {
        super(props);

        this.canvas = null;

        this.state = {gameState: StateType.Game};

        this.player = new Spaceship(320, 420, this.state);

        this.levelGenerator = new LevelGenerator();
        this.currentLevel = this.levelGenerator.createLevel({name: "default", diff: 0, eC: 8, eT: 1}, this.player);

        window.oncontextmenu = () => {
            // console.log("Context menu?");
            return false;
        };

        // window.addEventListener("keydown", (e: KeyboardEvent) => {
        //     if (e.key === "Control") {
        //         this.mouseLeftDown = true;
        //     }
        //     if (e.key === "ArrowLeft") {
        //         this.playerMoveLeft = true;
        //     }
        //     if (e.key === "ArrowRight") {
        //         this.playerMoveRight = true;
        //     }
        // });

        // window.addEventListener("keyup", (e: KeyboardEvent) => {

        //     if (e.key === "Control") {
        //         this.mouseLeftDown = false;
        //         this.player.stopShooting();
        //     }
        //     if (e.key === "ArrowLeft") {
        //         this.playerMoveLeft = false;
        //     }
        //     if (e.key === "ArrowRight") {
        //         this.playerMoveRight = false;
        //     }
        // });

        this.startGame();
    }


    private startGame() {
        var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
        requestAnimationFrame(this.mainLoop);
    }


    private mainLoop = () => {

        if (this.canvas)
            this.canvas.clear();

                
        // input
        if (this.playerMoveLeft && this.player.getX() > 0) {
            this.player.moveLeft()
        }
        if (this.canvas)
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
        if (this.canvas) {
            this.player.draw(this.canvas);
            this.currentLevel.draw(this.canvas);
        }
        

        // ======================================================

        requestAnimationFrame(this.mainLoop);
    }


    public componentDidMount() {
        this.canvas = new Canvas();

        if (!this.canvas) return;
        if (!this.canvas.canvas) return;

        this.canvas.canvas.addEventListener("mousemove", (e: MouseEvent) => {
            if (this.canvas)
            if (e.clientX - this.canvas?.getCanvasRect().left < this.canvas.getScreenWidth() - this.player.getWidth())
            this.player.setX(e.clientX - this.canvas.getCanvasRect().left);
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

        // const music: any = new ChiptuneJsPlayer(new ChiptuneJsConfig(-1));
        // music.load('music/chiptune_no_170.mod', (buffer: any) => {
        //     music.play(buffer);
        // });
    }


    public render(): JSX.Element {
        
        const switchGameStateTo = this.props.switchGameState;

        return (
            <div className="Game">
                <p>GAME</p>
                <button className="menu-button" onClick={ () => switchGameStateTo(StateType.MainMenu) }>BACK TO MAIN MENU</button>
                <div className="canvas-main">
                    <canvas id="gameCanvas" width="640" height="480"></canvas>
                </div>
            </div>
        );
    }

}


export default Game;
