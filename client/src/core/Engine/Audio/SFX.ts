
// import { Audio as A} from './Audio';

import { SIE_Audio } from "./SIE_Audio";

export class SFX extends SIE_Audio {

    private audio: HTMLAudioElement[];
    private maxAudioItems: number = 10;
    private currentAudioItem: number = 0;

    constructor(f: string) {
        super(f);
        this.audio = [];
        for (let i: number = 0; i < this.maxAudioItems; i++) {
            this.audio.push(new Audio(f));
        }

    }

    public play(): any {
        this.audio[this.currentAudioItem].play();
        this.currentAudioItem++;
        if (this.currentAudioItem > this.maxAudioItems - 1) {
            this.currentAudioItem = 0;
        }
    }

    public pause(): void {

    }

    public stop(): void {
        
    }
    
}
