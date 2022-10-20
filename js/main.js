// ---VARIABBLES--
const base_url = "https://api.shrtco.de/v2/";
const btn = document.getElementById('btn');
const urlInput = document.getElementById('url');
const resultDiv = document.getElementById('result')

// ---------FETCH-------
const fetchData = async(endpoint) =>{
    const webAdd = `${base_url}${endpoint}`;
    let response =  await fetch(webAdd);
    response = await response.json()
    return response.result; 
}

// --------MENU MOBILE-------
const menuContainer = document.getElementById("nav__menu");
const openMenu = () => {
    if(menuContainer.classList.contains("nav_open")){
        menuContainer.classList.remove("nav_open");
    }else{
        menuContainer.classList.add("nav_open");
    }
}

// -----------ACORTAR URL--------------
const submitListener = async(e) => {
    try{
        const value = urlInput.value
        btn.innerHTML ="Loading...";
        const response  = await fetchData("shorten?url="+ value);
        formatResult(response.short_link3, value)
        urlInput.value = "";
    }catch(e){
        throw new Error(e.message)
    }finally{
        btn.innerHTML ="Shorten It!";
    }
}
// ------MOSTRAR RESULTADO-----
const formatResult = (shortUrl, originalUrl) => {
    const div = document.createElement('div');
    div.classList.add("result__wrapper");
    const content = `
        <ul class="flex result__list">
            <li> <a href="${originalUrl}">${originalUrl}</a></li>
            <li> <a id="copiar" href="${shortUrl}">${shortUrl}</a></li>
            <li> <a class="btn btn--cyan"  onClick="return copyUrl('copiar')" href="#">Copy</a></li>
        </ul>
    `;
    div.innerHTML = content;
    resultDiv.appendChild(div);
}
// --------COPIAR URLS------
const copyUrl = (copiar) =>{
    let aux = document.createElement("textarea");
    aux.innerHTML = document.getElementById(copiar).innerHTML
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
}