import { Canvas, Enemy, EnemyType, Spaceship, Wall, WallType } from './';


export interface Level {
    id: number;
    name: string;
    enemiesCount: number;
    enemies: Enemy[],
    enemyType: EnemyType;
    difficulty: number;
    wallCount: number;
    walls: Wall[],
    update: () => void;
    draw: (canvas: Canvas) => void;
}


export class LevelGenerator {

    private levels: Level[];
    private idCount: number = 0;
    private player?: Spaceship;

    constructor() {
        this.levels = [];
    }

    public createLevel(name: string, eC: number, diff: number, eT: EnemyType, player: Spaceship): Level {

        this.player = player;

        let en: Enemy[] = [];
        for (let i:number = 0; i < eC; i++) {
            en.push(new Enemy(eT, 120 + (i * 40), 10 ));
        }

        if (this.player) this.player.setEnemies(en);

        let w: Wall[] = [];
        for (let i: number = 0; i < 3; i++) {
            w.push(new Wall(WallType.TYPE1, 170 + (i * 120), 360, 0));
        }

        let level: Level = {
            id: this.idCount,
            name: name,
            difficulty: diff,

            enemiesCount: eC,
            enemyType: eT,
            enemies: en,

            wallCount: 3,
            walls: w,

            update: () => {
                for (let i:number = 0; i < eC; i++) {
                    level.enemies[i].update(player);
                }
                for (let i: number = 0; i < 3; i++) {
                    level.walls[i].update();
                }
            },
            draw: (canvas: Canvas) => {
                for (let i:number = 0; i < eC; i++) {
                    level.enemies[i].draw(canvas);
                }
                for (let i: number = 0; i < 3; i++) {
                    level.walls[i].draw(canvas);
                }
            }

        }

        this.levels.push(level);

        this.idCount++;

        return level;
    }

}
