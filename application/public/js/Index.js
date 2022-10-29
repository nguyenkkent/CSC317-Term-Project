
// how to use str as html input for products.forEach(function(product));
// function fetchProducts(){
//     fetch("https://jsonplaceholder.typicode.com/albums/2/photos")
//         .then(function(response){
//             return response.json();
//         })
//         .then(function(data){
//             let products = data.products;
//             let productsHTML = "";
//             products.forEach(function(product){
//                 productsHTML = productsHTML + buildCardsUsingStrings(product)
//             });
//             document.getElementById("product-list").innerHTML = productsHTML;
//         }); 
// };


function buildCardsUsingDOMApi(container, data){
    let cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "product-card");

    let imgElement = document.createElement("img");
    imgElement.setAttribute("class", "prod-img");
    imgElement.setAttribute("src", data.thumbnail);

    let prodInfoDiv = document.createElement("div");
    prodInfoDiv.setAttribute("class", "prod-info");

    let titleP = document.createElement("p");
    titleP.setAttribute("class", "product-title");
    titleP.appendChild(document.createTextNode(data.title));

    let costP = document.createElement("p");
    costP.setAttribute("class", "product-title");
    costP.appendChild(document.createTextNode(data.price));  
    
    prodInfoDiv.appendChild(titleP);
    prodInfoDiv.appendChild(costP);

    cardDiv.append(imgElement);
    cardDiv.append(prodInfoDiv);

    container.appendChild(cardDiv);
}

function fetchProducts(){
    // fetch("https://jsonplaceholder.typicode.com/albums/2/photos")
    fetch("https://dummyjson.com/products")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let products = data.products;
            let container = document.getElementById("product-list");
            products.forEach(function(product){
                 buildCardsUsingDOMApi(container, product)
            });
        }); 
};

fetchProducts()