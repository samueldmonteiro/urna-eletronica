import { stages } from "../../../data.js";

export default class VotingMachineControl {

    currentClick = 0;
    digit = '';
    block = false;
    votes = {};
    stages = null;
    currentStage = null;
    isNull = false;

    constructor(votingMachineContainer) {
        this.container = votingMachineContainer;
    }

    getStages() {
        return stages;
    }

    getStage(stage) {
        return stages[stage + 1];
    }

    getCurrenStage() {
        return stages[this.currentStage - 1];
    }

    getCandidateByDigit(digit) {

        let candidate = null;
        stages.forEach(stage => {
            stage.candidates.forEach(c => {
                if (c.number == digit) {
                    candidate = c;
                }
            });
        });

        return candidate;
    }

    startVoting() {
        this.votes = {};
        this.currentStage = 1;
        this.currentClick = 0;
        this.digit = '';

        this.showVotingScreen();
    }

    checkVote() {

        let result = false;
        this.getStages().forEach(stage=>{
            stage.candidates.forEach(candidate=>{
                if(this.getCurrenStage() == stage &&  candidate == this.getCandidateByDigit(this.digit)){
                    result = true;
                    return;
                }
            })
        });

        return result;
        // if(this.getCandidateByDigit(this.digit))
        // return this.getCandidateByDigit(this.digit) || null;
    }

    nextStage() {
        this.currentStage = this.currentStage + 1;
        this.digit = '';
        this.currentClick = 0;
        this.block = false;
    }

    addVote(vote) {
        const office = this.getCurrenStage().office;
        console.log("Voto", vote);
        this.votes[office] = vote;

        console.log(this.votes);
    }

    confirmVote() {

        if(!this.getCurrenStage()){
            return;
        }

        if (this.isNull) {
            console.log('voto nulo');
            this.nullVote();
            this.isNull = false;
        }else{
            this.addVote(this.getCandidateByDigit(this.digit));
        }

        this.nextStage();
        if(!this.getCurrenStage()){
            console.log('acabou');
            this.endScreen();
            return;
        }

        this.showVotingScreen();

    }

    nullVote() {
        const currentOffice = this.getCurrenStage().office;
        this.addVote(null);
    }

}

