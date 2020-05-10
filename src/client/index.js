import { checkForName } from "./js/nameChecker"
import { handleSubmit } from "./js/formHandler"



import './styles/resets.scss'
import './styles/base.scss'
import './styles/form.scss'
import './styles/footer.scss'
import './styles/header.scss'
import  logo from "./imgLogoAylien.png";

console.log(checkForName);

const logoPlace = document.getElementById("imgLogoAylien")
    logoPlace.setAttribute("src",logo)

export {
    checkForName,
    handleSubmit
}
