async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)
    
    //formText = "https://www.bucketlistly.blog/posts/best-travel-blogs-design"
    
    const serverUrl = `http://localhost:5500/sentiment/${formText}`;
    const response = await fetch(serverUrl);
    const responseJson = await response.json()
    .then(function(responseJson){
            console.log(responseJson.category);
          });
    
    
    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })
}
export { handleSubmit }



