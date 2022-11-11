import { stages } from "./data.js";

export default class VotingMachine {

    container = document.querySelector('.urna-container')
    currentClick = 0
    digit = ''

    constructor(votes = null, stages = null, currentStage = null) {
        this.votes = null;
        this.stages = null;
        this.currentStage = null;
    }

    getStages() {
        console.log(this.container)
        return stages;
    }

    getStage(stage) {
        return stages[stage];
    }

    getCurrenStage() {
        return stages[this.currentStage];
    }

    startVoting() {
        this.votes = null;
        this.currentStage = 1;
        this.currentClick = 0;
        this.digit = '';

        this.showVotingScreen();
    }

    nextStage() {
        this.currentStage += 1;
    }

    showVotingScreen() {

        const stage = this.getCurrenStage();

        document.querySelectorAll('.show-candidate').forEach(element => {
            element.classList.remove('show-candidate');
            element.classList.add('hide-candidate');
        });

        const digitsContainer = this.container.querySelector('.window .digits-area');
        digitsContainer.innerHTML = null;

        for (let i = 1; i < stage.numberOfDigits; i++) {

            const digit = document.createElement('div');
            digit.classList.add('digit');
            digit.setAttribute('digit', i);
            digitsContainer.appendChild(digit);
        }
    }

    showCandidate(candidate) {
        document.querySelectorAll('.hide-candidate').forEach(element => {
            element.classList.add('show-candidate');
            element.classList.remove('hide-candidate');
        });
    }

    configureControls() {
        this.container.querySelectorAll('.digits .digit').forEach(digit => {
            digit.addEventListener("click", e => {

                if ((this.currentClick + 2) == this.getCurrenStage().numberOfDigits) {
                    console.log("digito:", this.digit);
                    return;
                }

                const digit = e.currentTarget.innerText;
                this.currentClick += 1;
                this.digit += digit;
                this.container.querySelector(`.window .digit:nth-of-type(${this.currentClick})`).innerText = digit;
            });
        });

        this.container.querySelector('#blankVote').addEventListener('click', e => {
            console.log('branco')
        });

        this.container.querySelector('#fixVote').addEventListener('click', e => {
            console.log('corrige')

        });

        this.container.querySelector('#confirmVote').addEventListener('click', e => {
            console.log('confirma')

        });
    }
}

