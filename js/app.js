import VotingMachine from "./modules/classes/VotingMachine/VotingMachine.js";

const urna = new VotingMachine();

console.log(urna);
urna.configureControls();
urna.startVoting();