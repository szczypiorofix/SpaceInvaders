import React from 'react';
import './MainMenu.scss';
import { IMainMenuChoice, StateType } from '../../core/GameState';


class MainMenu extends React.Component<IMainMenuChoice, {}> {


    public constructor(props: any) {
        super(props);
    }

    public render(): JSX.Element {
        const switchGameStateTo = this.props.switchGameState;
        return (
            <div className="MainMenu">
                <h1>SPACE INVADERS</h1>
                <div className="menu-buttons">
                    <button className="menu-button" onClick={ () => switchGameStateTo(StateType.Game) } >START NEW GAME</button>
                    <button className="menu-button" onClick={ () => switchGameStateTo(StateType.Settings) } >SETTINGS</button>
                </div>
            </div>
        );
    }

}

export default MainMenu;
