
export enum StateType {
    SplashMenu,
    MainMenu,
    Game,
    Settings,
    HallOfFame,
    GameLoose
}

export interface GameState {
    gameState: StateType;
}
