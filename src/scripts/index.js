import '../styles/main.scss';
import {Game} from './game';

window.onload = () => new Game(document.getElementById('app'));
