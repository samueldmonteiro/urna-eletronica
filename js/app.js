import VotingMachine from "./classes/VotingMachine.js";

const urna = new VotingMachine();

console.log(urna.getStages());

urna.configureControls();

urna.startVoting();