const clickIcon =document.querySelector('#add-cart')
const openCart =document.querySelector('.cart')
const cartClose =document.querySelector('#close')


clickIcon.addEventListener('click',()=>{
    openCart.classList.add('cart-active')
});


cartClose.addEventListener('click',()=>{
    openCart.classList.remove('cart-active')
});


document.addEventListener('DOMContentLoaded',loadCloths);

function loadCloths(){
    loadContent();
}

const loadContent=()=>{
    // remove cloth from cart

     let clickRemoveBtn = document.querySelectorAll('.cart-remove');

     clickRemoveBtn.forEach((item)=>{
        item.addEventListener('click',removeItem);
     });


     let qtyElement = document.querySelectorAll('.cart-quantity');

     qtyElement.forEach((item)=>{
        item.addEventListener('change',changeQty);
     });


     let cartAdd = document.querySelectorAll('#cart-icon');

        cartAdd.forEach((item)=>{
      item.addEventListener('click',cart);  
     });
     updateTotal(); 

    }


    let clickBuyButton = document.querySelectorAll('.buyOrder');

    clickBuyButton.forEach((item)=>{
       item.addEventListener('click',buyBtn);
    });

    

     
 

    //  remove item in cart
     function removeItem(){ 
        if(confirm('Are You Sure to Remove')){
         let titles =this.parentElement.querySelector('.cart-cloth-title').innerHTML;
         itemList=itemList.filter(el=>el.title != titles);
         this.parentElement.remove()}
         loadCloths();
     }

    // change qty in cart

     function changeQty(){ 
        if(isNaN(this.value) || this.value<1){
            this.value=1;
        }
        loadCloths();
     }


     //buy button
    
     function buyBtn() {
      if (itemList.length<=0) {
        alert('There No Order to Place Yet!\nPlease Make an Order First');
        return
      }
     const content=document.querySelector('.cart-content')
     content.innerHTML="";
     alert('Your Order Placed Successfully ');
     itemList=[];
     loadCloths();
     }



   let itemList=[];

     function cart(){
        let cloth = this.parentElement;
   let title =cloth.querySelector('.cloth-title').innerHTML;
   let price =cloth.querySelector('.price').innerHTML;
   let imgSrc =cloth.querySelector('.img-property').src;




  let productNew={title,price,imgSrc}
// check Product already exist in cart

  if(itemList.find((element)=>element.title==productNew.title)){
        alert('Product Already Exist');

        return; 
  }
  
  else{
    itemList.push(productNew);
  }







//--------------//-----------------//
   let newProductCart=createCartProduct(title,price,imgSrc);

   let element=document.createElement('div');
   element.innerHTML=newProductCart;
   let cartBasket =document.querySelector('.cart-content');
   cartBasket.append(element);
   loadCloths();
   
}




const createCartProduct=(title,price,imgSrc)=>{
    return `
    <div class="cart-box">
     <img src="${imgSrc}" class="cart-img">
      <div class="detail-box">
          <div class="cart-cloth-title">${title}</div> 
          <div class="price-box">
               <div class="cart-price"> ${price}</div>
               <div class="cart-amt"> ${price}</div> 
          </div>
          <input type="number" value="1" class="cart-quantity">
      </div>
      <i class="fa-solid fa-trash-can cart-remove" style="color: #e63808;"></i>
 </div>
 `;
   
}


function updateTotal(){
    const cartItems=document.querySelectorAll('.cart-box');
    const totalPrice=document.querySelector('.total-price');

    let total=0;
    
    cartItems.forEach(item=>{
       let priceElement=item.querySelector('.cart-price');
       let price=parseFloat(priceElement.innerHTML.replace('₹','' ))
       let qty=item.querySelector('.cart-quantity').value;
       total+=(price*qty); 
       item.querySelector('.cart-amt').innerHTML='₹'+(price*qty);
    })

    totalPrice.innerHTML='₹'+total;

    //product cart count


    const proCount=document.querySelector('.cart-count');
    let count = itemList.length;
    proCount.innerHTML=count;


    if(count==0){
      proCount.style.display='none';
    }

    else{
      proCount.style.display='block';

    }
}


let subMenu=document.getElementById('open');

function toggleMenu(){
subMenu.classList.toggle('open-menu');
}


const logOut=()=>{
  localStorage.removeItem("name");
  localStorage.removeItem("email");
 window.location.href='loginpage.html'}
