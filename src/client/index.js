import { checkForName } from "./js/nameChecker"
import { handleSubmit } from "./js/formHandler"



import './styles/resets.scss'
import './styles/base.scss'
import './styles/form.scss'
import './styles/footer.scss'
import './styles/header.scss'
import  logo from "./imgLogoAylien.png";

console.log(checkForName);

function component(){
    const logoPlace = document.getElementById("imgLogoAylien");
    const aylienLogo = new Image();
    aylienLogo.src = logo;
    logoPlace.setAttribute(aylienLogo);

}



console.log("CHANGE!!");


export {
    checkForName,
    handleSubmit
}
