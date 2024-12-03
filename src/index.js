import "./styles.css";
import uiController from "./scripts/uiController";
import storageManager from "./scripts/dataModule";

storageManager().initalizeLocalStorage();
const ui = uiController();
ui.init();