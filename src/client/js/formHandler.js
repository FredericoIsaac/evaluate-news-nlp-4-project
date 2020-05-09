async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)
    formText= "John is a very good football player!"
    const serverUrl = `http://localhost:8081/sentiment/${formText}`;
    const response = await fetch(serverUrl);
    try{
    const responseJson = await response.json();
    console.log(responseJson);
    }catch(error){
        console.log("error", error);
    }
    






    console.log("::: Form Submitted :::")
    fetch('http://localhost:8080/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })
}
export { handleSubmit }

