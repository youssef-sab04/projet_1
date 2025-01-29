// variables
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');

let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');

let mood = 'create';
let tmp ;

// get total
function getTotal() {
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value ;
        total.innerHTML = result; 
        total.style.background = ' rgba(4, 252, 248, 0.466)';     
                         }
        else { total.innerHTML = ''
            total.style.background = 'rgba(255, 0, 217, 0.24)'; 
             }  
                    }

// create product
let dataPro ;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
                                }
else {
     dataPro = [];
    }

create.onclick = function() {
    let newPro = {
        title : title.value.toLowerCase() , 
        price : price.value,
        taxes : taxes.value ,   
        ads : ads.value , 
        discount : discount.value , 
        total : total.innerHTML , 
        count : count.value ,
        category : category.value.toLowerCase() 
                 }
    if(title.value != '' && price.value != '' && category.value != '' && newPro.count<100) {
    if ( mood === 'create')  {
        if(newPro.count >1){
        for(let i=0 ; i<newPro.count ; i++)
            dataPro.push(newPro);
    }
    else { dataPro.push(newPro);}        }
         
       else {   dataPro[tmp]= newPro ;
        mood = 'create'
        create.innerHTML = 'create';
        count.style.display = 'block'
         }
         clearData();
                                        }

// save localStorage
    localStorage.setItem('product' , JSON.stringify(dataPro));
    showData ();
}

// clear inputs
function clearData() {
    title.value ='';
    price.value ='';
    taxes.value ='';
    ads.value ='';
    discount.value ='';
    total.innerHTML ='';
    count.value ='';
    category.value ='';

}

// Read 
function showData () {
    
    getTotal();
    let table = '';
    for( let i=0 ; i<dataPro.length ; i++){
     table += 
    `
        <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td> <button id="update" onclick = "updates(${i})">update</button> </td>
                        <td> <button id="delete" onclick ="deleteData(${i})" >delete</button> </td>
        </tr>
                      
    `
}
document.getElementById('tbody').innerHTML = table;
let deleteAll = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        deleteAll.innerHTML = 
        `
        <button onclick ="deleteAll()">Delete All (${dataPro.length}) </button>
        `
    }
    else { deleteAll.innerHTML = ''}
}

showData ();

// delete
function deleteData(i) {
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);

    showData ();
}

// delete all
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData ();
}

// fupdate 
function updates(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none'
    category.value = dataPro[i].category;
    create.innerHTML = 'Update';
    mood = 'Update';
    tmp = i;
    scroll ({
        top: 0 ,
        behavior: 'smooth'
    })

}

// search
let moodsearch = 'title';

function getSearchmood(id) {
    let search = document.getElementById('search');
    if(id==='ST'){
moodsearch = 'title'

    }
    else {
          moodsearch = 'category'
    }
    search.placeholder = 'Search By ' + moodsearch ;
search.focus();
search.value= '';
showData();
}

function searchprod(value){
    let table = '';
    for(let i=0 ; i<dataPro.length ; i++){
   if (moodsearch === 'title'){
       
        if(dataPro[i].title.includes(value.toLowerCase()) ){
            table += 
            `
                <tr>
                                <td>${i}</td>
                                <td>${dataPro[i].title}</td>
                                <td>${dataPro[i].price}</td>
                                <td>${dataPro[i].taxes}</td>
                                <td>${dataPro[i].ads}</td>
                                <td>${dataPro[i].discount}</td>
                                <td>${dataPro[i].total}</td>
                                <td>${dataPro[i].category}</td>
                                <td> <button id="update" onclick = "updates(${i})">update</button> </td>
                                <td> <button id="delete" onclick ="deleteData(${i})" >delete</button> </td>
                </tr>`

        
       }
   }
   else{
    
        if(dataPro[i].category.includes(value.toLowerCase()) ){
            table += 
            `
                <tr>
                                <td>${i}</td>
                                <td>${dataPro[i].title}</td>
                                <td>${dataPro[i].price}</td>
                                <td>${dataPro[i].taxes}</td>
                                <td>${dataPro[i].ads}</td>
                                <td>${dataPro[i].discount}</td>
                                <td>${dataPro[i].total}</td>
                                <td>${dataPro[i].category}</td>
                                <td> <button id="update" onclick = "updates(${i})">update</button> </td>
                                <td> <button id="delete" onclick ="deleteData(${i})" >delete</button> </td>
                </tr>`

        }
       
    }}
   document.getElementById('tbody').innerHTML = table;
}