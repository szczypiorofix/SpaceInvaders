import React from 'react';
import './HallOfFame.scss';
import { IMainMenuChoice } from '../game/GameModel';
import { StateType } from '../../core/Engine';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { faTrophy } from '@fortawesome/free-solid-svg-icons';



export default class HallOfFame extends React.Component<IMainMenuChoice, {}> {
    
    public constructor(props: any) {
        super(props);
    }


    public render(): JSX.Element {
        const switchGameStateTo = this.props.switchGameState;
        return (
            <div className="HallOfFame">
                <h1>HALL OF FAME</h1>
                <div className="div-menu-button">
                    <button className="menu-button" onClick={ () => switchGameStateTo(StateType.MainMenu) }>
                        <FontAwesomeIcon icon={ faChevronCircleLeft }/> BACK
                    </button>
                </div>
                <div className="trophy-icon">
                    <FontAwesomeIcon icon={faTrophy} />
                </div>
                <ol>
                    <li>Dupa</li>
                    <li>Dupa 2</li>
                    <li>Grogu</li>
                    <li>Zdzisek</li>
                    <li>Matka Stefana</li>
                    <li>Stefan</li>
                </ol>
            </div>
        );
    }

}
