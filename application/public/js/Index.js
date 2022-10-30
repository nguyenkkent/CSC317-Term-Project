

/*
<div class="product-card">
    <h4> class="prod-title" </h4>
    <img> class="prod-image src ="card.thumbnailUrl" </img>
    <div> class="prod-url" card.url == </div>

</div>    
*/
function buildCards(container, card){
    let productCard = document.createElement("div");
    productCard.setAttribute("class", "product-card");

    let productTitle = document.createElement("h4");
    productTitle.setAttribute("class", "prod-title");
    productTitle.appendChild(document.createTextNode(card.title));

    let productImage = document.createElement("img");
    productImage.setAttribute("class", "prod-img");
    productImage.setAttribute("src", card.thumbnailUrl);

    let productUrl = document.createElement("div");
    productUrl.setAttribute("class", "prod-url");
    productUrl.appendChild(document.createTextNode(card.url));

    productCard.appendChild(productTitle);
    productCard.appendChild(productImage);
    productCard.appendChild(productUrl);

    container.appendChild(productCard);
    
};

function fetchProducts(){
    fetch("https://jsonplaceholder.typicode.com/albums/2/photos")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let container = document.getElementById("product-list");//root of the node tree
            data.forEach(function(card){
                buildCards(container, card);
            });
        }); 
};



// function buildCardsUsingDOMApi(container, data){
//     let cardDiv = document.createElement("div");
//     cardDiv.setAttribute("class", "product-card");

//     let imgElement = document.createElement("img");
//     imgElement.setAttribute("class", "prod-img");
//     imgElement.setAttribute("src", data.thumbnail);

//     let prodInfoDiv = document.createElement("div");
//     prodInfoDiv.setAttribute("class", "prod-info");

//     let titleP = document.createElement("p");
//     titleP.setAttribute("class", "product-title");
//     titleP.appendChild(document.createTextNode(data.title));

//     let costP = document.createElement("p");
//     costP.setAttribute("class", "product-title");
//     costP.appendChild(document.createTextNode(data.price));  
    
//     prodInfoDiv.appendChild(titleP);
//     prodInfoDiv.appendChild(costP);

//     cardDiv.append(imgElement);
//     cardDiv.append(prodInfoDiv);

//     container.appendChild(cardDiv);
// }

// function fetchProducts(){
//     // fetch("https://jsonplaceholder.typicode.com/albums/2/photos")
//     fetch("https://dummyjson.com/products")
//         .then(function(response){
//             return response.json();
//         })
//         .then(function(data){
//             let products = data.products;
//             let container = document.getElementById("product-list");
//             products.forEach(function(product){
//                  buildCardsUsingDOMApi(container, product)
//             });
//         }); 
// };

fetchProducts()