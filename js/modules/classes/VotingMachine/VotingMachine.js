import VotingMachineControl from "./VotingMachineControl.js";

export default class VotingMachine extends VotingMachineControl {

    constructor(votingMachineContainer = document.querySelector('.urna-container')) {
        super(votingMachineContainer);
    }

    showCandidate() {

        const candidate = this.getCandidateByDigit(this.digit);

        this.container.querySelector(".helper").style = 'opacity: 1 !important;';
        this.container.querySelector(".voting-screen .image img").src = 'assets/images/' + candidate.img;
        this.container.querySelector(".voting-screen .name span").innerText = candidate.name;
        this.container.querySelector(".voting-screen .party span").innerText = candidate.party;

        document.querySelectorAll('.hide-candidate').forEach(element => {
            element.classList.add('show-candidate');
            element.classList.remove('hide-candidate');
        });
    }

    showVotingScreen() {

        const stage = this.getCurrenStage();
        console.log(stage);

        this.container.querySelector('.voting-screen .office').innerText = stage.office;
        this.container.querySelector('.action-message').style.opacity = 0;
        this.container.querySelector(".helper").style = 'opacity: 0 !important;';
        document.querySelectorAll('.show-candidate').forEach(element => {
            element.classList.remove('show-candidate');
            element.classList.add('hide-candidate');
        });

        this.startDigitsArea();
    }

    inexistentCandidate() {
        this.container.querySelector('.action-message').innerText = 'Candidato Inexistente';
        this.container.querySelector('.action-message').style.opacity = 1;
    }

    startDigitsArea() {

        const stage = this.getCurrenStage();
        const digitsContainer = this.container.querySelector('.window .digits-area');
        digitsContainer.innerHTML = null;

        for (let i = 1; i <= stage.numberOfDigits; i++) {

            const digit = document.createElement('div');
            digit.classList.add('digit');
            digit.setAttribute('digit', i);
            digitsContainer.appendChild(digit);
        }
    }

    configureControls() {
        this.container.querySelectorAll('.digits .digit').forEach(digit => {
            digit.addEventListener("click", e => {

                if (!this.block) {
                    const digit = e.currentTarget.innerText;
                    this.currentClick += 1;
                    this.digit += digit;
                    this.container.querySelector(`.window .digit:nth-of-type(${this.currentClick})`).innerText = digit;
                }

                if ((this.currentClick) == this.getCurrenStage().numberOfDigits) {
                    console.log("digito:", this.digit);
                    this.block = true;

                    if (!this.checkVote()) {
                        this.digitNoExists = true;
                        this.inexistentCandidate();
                    } else {
                        this.showCandidate();
                    }
                }
            });
        });

        this.container.querySelector('#blankVote').addEventListener('click', _ => {
            this.confirmNullVote();
        });

        this.container.querySelector('#fixVote').addEventListener('click', e => {
            this.digit = '';
            this.block = false;
            this.currentClick = 0;
            this.isNull = false;
            this.showVotingScreen();
        });

        this.container.querySelector('#confirmVote').addEventListener('click', _ => {
            this.confirmVote();
        });
    }

    confirmNullVote() {
        this.showVotingScreen();
        this.container.querySelector(".helper").style = 'opacity: 1 !important;';
        this.container.querySelector('.action-message').innerText = 'Voto Nulo';
        this.container.querySelector('.action-message').style.opacity = 1;
        this.isNull = true;
    }

    endScreen() {
        this.container.querySelectorAll(".window div").forEach(element => {
            element.style.opacity = '0';
        });

        this.container.querySelector(".end-screen").style.diplay = 'flex';
        this.container.querySelector(".end-screen").style.opacity = '1';

    }
}