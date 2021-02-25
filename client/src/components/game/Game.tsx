import React from 'react';
import './Game.scss';

import { IMainMenuChoice } from './GameModel';
import { Canvas, GameState, StateType } from '../../core/Engine';
import { GameManager } from '../../core/Engine';


class Game extends React.Component<IMainMenuChoice, GameState> {

    private canvas?: Canvas;
    private gameState: GameState = { gameState: StateType.Game};

    private gameManager: GameManager;

    

    public constructor(props: any) {
        super(props);

        this.gameManager = new GameManager();

        this.state = {gameState: StateType.Game};

        window.oncontextmenu = () => {
            // console.log("No context menu.");
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
        
    }


    public componentDidMount(): void {
        this.canvas = new Canvas();

        if (!this.canvas) return;
        if (!this.canvas.canvas) return;

        this.gameManager.startGame(this.canvas);



        // window.addEventListener("keydown", (e: KeyboardEvent)=> {
        //     console.log(e);
        //     if (e.key  == ' ') {
        //         console.log("SPACJA!");
        //         this.music.pause();
        //     }
        // });


        // ============= CHIPTUNE ===========
        // declare var ChiptuneJsPlayer: any;
        // declare var ChiptuneJsConfig: any;
        // const music: any = new ChiptuneJsPlayer(new ChiptuneJsConfig(-1));
        // music.load('music/chiptune_no_170.mod', (buffer: any) => {
        //     music.play(buffer);
        // });
        // ==================================
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
