import { SIE_Audio } from "./SIE_Audio";

export class Music extends SIE_Audio {

    constructor(file: string) {
        super(file);
        this.looped = false;
        this.paused = false;
    }


    public play(): void {
        this.audioElement.play();
        this.paused = false;
        this.audioElement.loop = this.looped;
    }

    public stop(): void {
        this.audioElement.pause();
        this.paused = true;
        this.audioElement.currentTime = 0;
    }

    public pause(): void {
        if (this.audioElement.paused) {
            this.audioElement.play();
            this.paused = false;
            console.log("Music unpaused");
        } else {
            this.paused = true;
            this.audioElement.pause();
            console.log("Music paused");
        }
    }


    public isPaused(): boolean {
        return this.paused;
    }

    public isLooped(): boolean {
        return this.looped;
    }

    public setLoop(looped: boolean): void {
        this.looped = looped;
    }

}
