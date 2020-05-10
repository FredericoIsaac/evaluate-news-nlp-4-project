async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    const form = document.getElementById('name');
    const suggestionvalidate = document.getElementById("helpValidate")
    let formText = form.value
    
    if(Client.checkForName(formText)){
            form.className = "valid";
            suggestionvalidate.style.cssText = ""
    // GET request that the response is the info passed through SDK    
    const serverUrl = `http://localhost:5500/sentiment/${formText}`;
    const response = await fetch(serverUrl);
    const responseJson = await response.json()
    
    // Dinamically change UI
    const categoryTag = document.getElementById("category");
    categoryTag.textContent = responseJson.category;

    const polarityTag = document.getElementById("polarity");
    polarityTag.textContent = responseJson.polarity;

    const textTag = document.getElementById("text");
    textTag.textContent = responseJson.text;
    }else{
        form.className = "invalid";
        suggestionvalidate.style.cssText = "color: white; font-size: 1.5em; text-decoration: underline";
    }
    
    
    
    
    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })
    
}
export { handleSubmit }



