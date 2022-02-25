
/*Darkmode*/
function changeTheme() {
   var element = document.body;
   element.classList.toggle("dark-mode");
}





//burger-menu
const burgerMenu = () => {
   const burger = document.querySelector('.burger');
   const navUL = document.querySelector('.navbar__ulnavlinks');


   burger.addEventListener('click', () => {
      navUL.classList.toggle('show');
})
}

burgerMenu();







//List Products
let productsData = [

      { Produkt: "Tomaten", Preis: 2.50, Anzahl: 23, inCart: 0},
      { Produkt: "Kartoffel", Preis: 3.50, Anzahl: 12, inCart: 0},
      { Produkt: "Paprika", Preis: 1.50, Anzahl: 22, inCart: 0},
      { Produkt: "Gurken", Preis: 1.15, Anzahl: 37, inCart: 0},
      { Produkt: "Bananen", Preis: 1.20, Anzahl: 25, inCart: 0},
      { Produkt: "Kirschen", Preis: 1.99, Anzahl: 11, inCart: 0},
      { Produkt: "Trauben", Preis: 1.50, Anzahl: 26, inCart: 0},
      { Produkt: "Auberginen", Preis: 3.50, Anzahl: 18, inCart: 0},
      { Produkt: "Petersillien", Preis: 2.15, Anzahl: 15, inCart: 0}
   ];

   

function loadTableData(productsData){
   const tableBody = document.getElementById('products__data_id');
   let dataHtml = '';
   let counter = 0;


   for(let i of productsData){
      dataHtml += `<tr><td>${i.Produkt}</td><td>${i.Preis} €</td><td>${i.Anzahl}</td><td><a onclick="cartNumbers(productsData[${counter}]); totalCost(productsData[${counter}]);" class="add-cart" href="#">in den Warenkorb</a></td></tr>`;
      counter++;
   }


   tableBody.innerHTML = dataHtml;
}


//Shopping Cart
/*
let cartButtons = document.querySelectorAll('#products__data_id .add-cart');
console.log(cartButtons);

for (let i=0; i < cartButtons.length; i++){
   console.log("this is a button")
   cartButtons[i].addEventListener('click', () => {
      cartNumbers();
   })
} */


function cartNumbers(product){
   let productNumbers =sessionStorage.getItem('cartNumbers');

   productNumbers = parseInt(productNumbers);
   
   if(productNumbers){
      sessionStorage.setItem('cartNumbers', productNumbers + 1);
      document.querySelector('.navbar__navlinks span').textContent = productNumbers + 1;
   } else{
      sessionStorage.setItem('cartNumbers', 1);
      document.querySelector('.navbar__navlinks span').textContent = 1;
   }

   setItems(product);
}


function setItems(product){
   let cartItems = sessionStorage.getItem('productsInCart');
   cartItems = JSON.parse(cartItems);
   
   if(cartItems != null){
      
      if(cartItems[product.Produkt] == undefined){
         cartItems = {
            ...cartItems, 
            [product.Produkt]: product
         }
      }
      cartItems[product.Produkt].inCart += 1;
   }else{
      product.inCart = 1;
      cartItems = {
         [product.Produkt]: product
      }
   }
   

   sessionStorage.setItem("productsInCart", JSON.stringify(cartItems));
}




function onLoadcartNumbers(){
   let productNumbers = sessionStorage.getItem('cartNumbers');

   if(productNumbers){
      document.querySelector('.navbar__navlinks span').textContent = productNumbers;
   }
}


onLoadcartNumbers();



//costs table
function totalCost(product){
  let cartCost = sessionStorage.getItem('totalCost');

  product.Anzahl -= 1;
  loadTableData(productsData);

  if(cartCost != null){
     cartCost = parseFloat(cartCost);
     sessionStorage.setItem("totalCost", cartCost + product.Preis);
  }else{
   sessionStorage.setItem("totalCost", product.Preis);
  }
}

function displayCart(){
   let cartItems = sessionStorage.getItem("productsInCart");
   cartItems = JSON.parse(cartItems);
   let productContainer = document.querySelector(".shoppingcart__costtable-list");

   console.log(cartItems);
   if(cartItems && productContainer){
      productContainer.innerHTML = '';
      Object.values(cartItems).map(item => {
         productContainer.innerHTML += `
            <div class="product"><ion-icon name="close-circle-outline"></ion-icon><span>${item.Produkt}</span></div>
            <div class="price">${item.Preis}</div>
            <div class="quantity">
               <ion-icon name="arrow-back-circle-outline"></ion-icon>
               <span>${item.inCart}</span>
               <ion-icon name="arrow-forward-circle-outline"></ion-icon>
            </div>
            `
      })
   }

}


displayCart();







//Sort function
let isAscending = false;


function sortColumn(columnName){

   if(isAscending==true){
      isAscending = !isAscending;
      productsData = productsData.sort((a,b) => a[columnName] > b[columnName] ? 1 : -1)
   }else{
      isAscending = true;
      productsData = productsData.sort((a,b) => a[columnName] < b[columnName] ? 1 : -1)
   }

   loadTableData(productsData);
}






