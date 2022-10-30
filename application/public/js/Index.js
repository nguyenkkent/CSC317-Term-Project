/*
<div class="product-card">
    <h4> class="prod-title" </h4>
    <img> class="prod-image src ="card.thumbnailUrl" </img>
    <div> class="prod-url" card.url == </div>

</div>    
*/

let numberOfProducts = 50;

function buildCards(container, card){
    let productCard = document.createElement("div");
    productCard.setAttribute("class", "product-card");
    productCard.addEventListener("click", function(ev){
        ev.currentTarget.remove();
        numberOfProducts--;

    });

    let productTitle = document.createElement("h3");
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
                numberOfProducts++;
            });
        }); 
};


fetchProducts()
console.log(numberOfProducts);