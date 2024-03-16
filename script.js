const url = "https://fakestoreapi.com/products";

document.addEventListener("DOMContentLoaded", function(){
    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        data.forEach(function(resim){
            // console.log(resim)
            ekranaYazdir(resim)
        })
    })
})

const row = document.querySelector(".row");
const ekranaYazdir = (resim) => {
    row.innerHTML += `
    <div class="yükseklik col-12 col-md-6 col-lg-4 mb-4">
        <div class="card boyut">
            <img width="200px" height="350px" src="${resim.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title text-secondary fw-bold fs-4">${resim.title}</h5>
            <p class="card-price text-secondary fw-bold fs-6">${resim.price}₺</p>
            <a id="addBtn" href="#" class="konum btn btn-danger d-block">Sepete Ekle</a>
            </div>
        </div>
    </div>
    `
}


// ! Ürünler içerisinde isme göre filtreleme yapmak için;

const form = document.querySelector("form");
const searchInput = document.querySelector("#searchInput");

form.addEventListener("submit", function(e){
    e.preventDefault();
    let searchText = searchInput.value.trim().toLowerCase();
    // console.log(searchText);
    searchInput.value = "";

    let cards = document.querySelectorAll(".col-lg-4");
    // console.log(cards);

    cards.forEach(function(card){
        let title = card.querySelector(".card-title");
        if(title.innerHTML.trim().toLowerCase().includes(searchText)){
            card.style.display = "block";
        }else{
            card.style.display = "none";
        }
    })
})


// ! Sepete Ekle Butonuna Bastığımda Değeri artıracak kodlar

row.addEventListener("click", function(e){
    if(e.target.id.includes("addBtn")){
        const littleBox = document.querySelector(".little-box");
        littleBox.innerHTML++;

        let parentDiv = e.target.parentElement.parentElement;
        // console.log(parentDiv);
        sepeteEkle(parentDiv);
    }
});



// ! Sepet İçindeki İşlemler
const sepeteEkle = (parentDiv) => {
    const li = document.querySelector(".modal-li");
    const productName = parentDiv.children[1].children[0].innerHTML;
    const price = parentDiv.children[1].children[1].innerHTML;
    const image = parentDiv.children[0].src
    // console.log(image)

    const ürünBilgisi = document.createElement("div");
    ürünBilgisi.classList.add("ürün-bilgisi","d-flex", "align-items-center","justify-content-around");

    ürünBilgisi.innerHTML += `
    <div class="fotograf">
    <img width="220px" height="220px" src="${image}" alt="">
    </div>
    <div class="baslik text-secondary fw-bold fs-6">${productName}</div>
    <div class="butonlar d-flex align-items-center">
    <button id="arttir" class="btn btn-outline-success">+</button>
    <span class="adet mx-2 fw-bold fs-3 text-secondary">1</span>
    <button id="azalt" class="btn btn-outline-danger">-</button>
    </div>
    <div class="fiyat fw-bold text-secondary fs-5">${price}</div>
    <div class="toplamFiyat fw-bold text-secondary fs-5">${price}</div>
    <i id="icon" class="fa-solid fa-square-xmark fs-3"></i>
    `

    li.append(ürünBilgisi);


    // ! Sepet içerisindeki arttır ve azalt butonlarının kodları
    const arttir = ürünBilgisi.querySelector("#arttir");
    const azalt = ürünBilgisi.querySelector("#azalt");
    const adet = ürünBilgisi.querySelector(".adet");
    const toplamFiyat = ürünBilgisi.querySelector(".toplamFiyat");

    arttir.addEventListener("click", function(){
        adet.innerHTML++;
        toplamFiyat.innerHTML = `${adet.innerHTML * parseFloat(price)}₺`
    })

    azalt.addEventListener("click", function(){
        if(adet.innerHTML != 0){
            adet.innerHTML--;
            toplamFiyat.innerHTML = `${adet.innerHTML * parseFloat(price)}₺`
        }
    })
}

// ! Sepetteki çarpı butonuna bastığımda elemanları sildirmek için;
document.addEventListener("click", function(e){
    if(e.target.id.includes("icon")){
        console.log(e.target.parentElement);
        let productElement = e.target.parentElement;
        productElement.remove()

        const littleBox = document.querySelector(".little-box");
        if(littleBox.innerHTML != 0){
            littleBox.innerHTML--;
        }
    }
}) 





