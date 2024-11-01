
const loadAllPhone = async (states, brandName) => {
    // console.log(brandName);
    document.getElementById('spinner').style.display = 'none';


    // connect with .then api
    // fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`)
    // .then(res=>res.json())
    // .then(data=>console.log(data))

    // connect API with Async await
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brandName ? brandName : "iphone"}`);
    const data = await response.json();

    // console.log(data);

    if (states) {
        displayAllPhones(data.data);
    }
    else {
        displayAllPhones(data.data.slice(0, 6));
    }

}

const displayAllPhones = (phones) => {

    // document.getElementById('phones-container').innerHTML="";

    const phoneContainer = document.getElementById('phones-container');
    phones.forEach(phone => {
        const { brand, image, slug, phone_name } = phone;
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card mt-2 py-2 bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src=${image} />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${brand}</h2>
    <p>${slug}</p>
    <div class="card-actions justify-end">
      <button onclick="phoneDetails('${slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>
</div>
        `
        phoneContainer.appendChild(div)
    });
}





const handelShowAll = () => {
    loadAllPhone(true);
}



const phoneDetails =  async (slugs) => {
    const response= await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`);
    const data= await response.json();
    console.log(data.data);

    const {brand,slug}=data.data;

    const modalContainer=document.getElementById('modal-container');
    modalContainer.innerHTML=`

      <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <h3 class="text-lg font-bold">${brand}</h3>
      <p class="py-4">${slug}</p>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
    
    `

    my_modal_5.showModal()

}




const handelSearch = () => {
    // call spinner 
    document.getElementById('spinner').style.display = 'block';
    const brandName = document.getElementById('input-field').value;
    // setTime out function call
    setTimeout(() => {
        loadAllPhone(false, brandName)
    }, 3000);
}



// globally call loadData
loadAllPhone(false, "iphone")



const phone = {

    brand: "Apple ",
    image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg",
    phone_name: "iPhone 13 mini",
    slug: "apple_iphone_13_mini-11104"
}


