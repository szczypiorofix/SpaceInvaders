export class SFX {

    private audio: HTMLAudioElement[];
    private maxAudioItems: number = 10;
    private currentAudioItem: number = 0;

    constructor(f: string) {
        this.audio = [];
        for (let i: number = 0; i < this.maxAudioItems; i++) {
            this.audio.push(new Audio(f));
        }

    }

    public play() {
        // console.log("Playing audio item: " + this.currentAudioItem);
        this.audio[this.currentAudioItem].play();
        this.currentAudioItem++;
        if (this.currentAudioItem > this.maxAudioItems - 1) {
            this.currentAudioItem = 0;
        }
    }


}