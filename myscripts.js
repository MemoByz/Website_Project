
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

      { Produkt: "Tomaten", Preis: 2.50, Anzahl: 23},
      { Produkt: "Kartoffel", Preis: 3.50, Anzahl: 12},
      { Produkt: "Paprika", Preis: 1.50, Anzahl: 22},
      { Produkt: "Gurken", Preis: 1.15, Anzahl: 37},
      { Produkt: "Bananen", Preis: 1.20, Anzahl: 25},
      { Produkt: "Kirschen", Preis: 1.99, Anzahl: 11},
      { Produkt: "Trauben", Preis: 1.50, Anzahl: 26},
      { Produkt: "Auberginen", Preis: 3.50, Anzahl: 18},
      { Produkt: "Petersillien", Preis: 2.15, Anzahl: 15}
   ];



function loadTableData(productsData){
   const tableBody = document.getElementById('products__data_id');
   let dataHtml = '';


   for(let data of productsData){
      dataHtml += `<tr><td>${data.Produkt}</td><td>${data.Preis}</td><td>${data.Anzahl}</td><td><a id="add-cart-id" class="add-cart" href="#">in den Warenkorb</a></td></tr>`;
   }

   tableBody.innerHTML = dataHtml;
}







//Shopping Cart
let carts = document.querySelectorAll('.add-cart');


for (let i=0; i < carts.length; i++){
   carts[i].addEventListener('click', () => {
      cartNumbers();
   })
}






function cartNumbers(){
   let productNumbers =sessionStorage.getItem('cartNumbers');

   productNumbers = parseInt(productNumbers);

   if(productNumbers){
      sessionStorage.setItem('cartNumbers', productNumbers + 1);
      document.querySelector('.navbar__navlinks span').textContent = productNumbers + 1;
   } else{
      sessionStorage.setItem('cartNumbers', 1);
      document.querySelector('.navbar__navlinks span').textContent = 1;
   }
}




function onLoadcartNumbers(){
   let productNumbers = sessionStorage.getItem('cartNumbers');

   if(productNumbers){
      document.querySelector('.navbar__navlinks span').textContent = productNumbers;
   }
}


onLoadcartNumbers();








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






