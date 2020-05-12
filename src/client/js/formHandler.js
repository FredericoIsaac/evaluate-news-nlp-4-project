
const postServer = async (url, data) => {
    const response = await fetch(url,{
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    try{
        const dataSent = await response.json();
        return dataSent;
    }catch(error){
        console.log("error",error);
    };
};

const updateUI = async () => {
   const getData = await fetch("/all");
   try{
    const responseJson = await getData.json();
    const categoryTag = document.getElementById("category");
    categoryTag.textContent = responseJson.category;

    const polarityTag = document.getElementById("polarity");
    polarityTag.textContent = responseJson.polarity;

    const textTag = document.getElementById("text");
    textTag.textContent = responseJson.text; 
   }catch(error){
       console.log("error",error);
   };
};

async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    const form = document.getElementById('name');
    const suggestionvalidate = document.getElementById("helpValidate")
    let formText = form.value

   if(Client.checkForName(formText)){
            let requestBody = {
                url: formText
            };
    form.className = "valid";
    suggestionvalidate.style.cssText = ""
    postServer("http://localhost:5500/add",requestBody)
    .then(function(){
    // Dinamically change UI 
        updateUI()
    });  
    // Else if wrong format url input
    }else{
    form.className = "invalid";
    suggestionvalidate.style.cssText = "color: white; font-size: 1.5em; text-decoration: underline";
    }
    
    
    /*console.log("::: Form Submitted :::")
    fetch('http://localhost:5500/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })*/
    
};

export { handleSubmit, updateUI, postServer}



