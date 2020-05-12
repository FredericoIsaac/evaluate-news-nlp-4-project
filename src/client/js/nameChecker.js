function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    const regexUrl = /^((((https?:)?\/\/(www\.)?)?(.+))\.([a-z]{2,8})(\/)?(\/.+)?)$/;
    if(regexUrl.test(inputText)){
        return true
    }else{
        return false
    }
}

export { checkForName }

//confire url with regex