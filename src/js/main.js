const uf = document.querySelector("#uf")
let dropdown = document.getElementById('uf');
let casos = document.getElementById('casos');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Selecionar estado';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;


const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';


uf.addEventListener("click",(e)=>{
    const options = {
        method: 'GET',
    }

fetch(url, options)
.then(  
    function(response) {  
      if (response.status !== 200) {  
        console.warn('Looks like there was a problem. Status Code: ' + 
          response.status);  
        return;  
      }
      response.json().then(function(data) {  
        let option;
    	for (let i = 0; i < data.length; i++) {
        if (dropdown.length <= 27) {
            option = document.createElement('option');
      	    option.text = data[i].nome;
      	    option.value = data[i].sigla;
            dropdown.add(option);
        }
    	}    
      });  
    }  
  )  
  .catch(function(err) { 
    console.error('Fetch Error -', err);
  })
},

uf.addEventListener("change",(e)=>{
  let search = uf.value;
  const options = {
      method: 'GET',
  }

fetch(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${search}`, options)
.then(  
  function(response) {  
    if (response.status !== 200) {  
      console.warn('Looks like there was a problem. Status Code: ' + 
        response.status);  
      return;  
    }
    response.json().then(function(data) {  
      console.log(data.cases)
      casos.value = data.cases
    });  
  }  
)  
.catch(function(err) { 
  console.error('Fetch Error -', err);
})
}

))