import React from 'react';
import './GameSettings.scss';
import { StateType } from '../../core/Engine';
import { IMainMenuChoice } from '../game/GameModel';


export default class GameSettings extends React.Component<IMainMenuChoice, {}> {

    public constructor(props: any) {
        super(props);
    }


    public render(): JSX.Element {
        const switchGameStateTo = this.props.switchGameState;
        return (
            <div className="Settings">
                <h1>GAME SETTINGS</h1>
                <button className="menu-button" onClick={ () => switchGameStateTo(StateType.MainMenu) } >BACK TO MAIN MENU</button>
            </div>
        );
    }

}
