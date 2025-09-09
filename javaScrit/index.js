
const history =[]

const historyShowing =(historyArray)=>{
    const historyDiv = document.getElementById("history_Loop")
    historyDiv.innerHTML = ""
    for(let item of historyArray){
        const newHistory = document.createElement("div")
        newHistory.innerHTML = `
        <div class="flex flex-row items-center justify-between">
                  <div class="text">
                    <h2 class="text-sm font-semibold">${item.treeName}</h2>
                    <p class="text-xs text-[#a39d9d]">$${item.price} x 1</p>
                    <p class="text-xs text-[#a39d9d]">${item.date}</p>
                  </div>
                  <div class="icon">
                    <i onclick="historyFilter(${item.id})" class=" fa-solid fa-xmark"></i>
                  </div>
        </div>
        `
        historyDiv.append(newHistory)
    }
    
}

const removeButtonStyle = ()=>{
 const allbtn = document.querySelectorAll('.menu_btn')
 allbtn.forEach(element => {
    element.classList.remove("active")
 });
 
}
const cardAdd =(id,name,price)=>{
    const date = new Date().toLocaleTimeString()
    const data = {
        id:id,
        treeName:name,
        price:price,
        date:date
    }
     history.push(data)
    console.log(history)
    historyShowing(history)
}
const historyFilter = (itemId) => { 
  const filtered = history.filter((el) => el.id !== itemId);
  return filtered;
};
const spaner =(status)=>{
    if(status === true){
        document.getElementById("loader").classList.remove("hidden")
        document.getElementById("card").classList.add("hidden")
        document.getElementById("model_404").classList.remove("hidden")
    }else{
        document.getElementById("loader").classList.add("hidden")
        document.getElementById("card").classList.remove("hidden")
        document.getElementById("model_404").classList.add("hidden")
    }
}
const oneCardModel =async(id)=>{
    const oneCardData =await fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    const data = await oneCardData.json()
    const cardData = data.plants
    const modelBox = document.getElementById("model_box")
    modelBox.innerHTML = `
        <div class="modal-box space-y-6" id="model_box">
            <img class="rounded-xl h-40 w-full object-cover" src="${cardData.image}" alt="">
            <h1 onclick="oneCardModel(${cardData.id})" class="text-xl font-bold cursor-pointer">${cardData.name}</h1>
            <p class="text-sm">
              ${cardData.description}
            </p>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#DCFCE7] text-[#15803D] rounded-3xl">${cardData.category}</button>
                <button ><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${cardData.price}</button>
            </div>
            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
    `
    document.getElementById("my_modal_5").showModal()
}
const makeCard =(details)=>{
    spaner(true)
    const card = document.getElementById("card")
    card.innerHTML =""
    for(const item of details){
        const createCard = document.createElement("div")
        if(item.length === 0 ){
            createCard.innerHTML =`
             <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-[60%] mt-5 mx-auto">
              <div class="col-span-3">
                <h1 class="text-4xl font-extrabold text-center mx-auto">Can't found a single item</h1>
              </div>
            `
            spaner(false)
        }
        createCard.innerHTML =`
            <div  class="item rounded-md bg-white p-3 flex flex-col gap-2">
            <img class="rounded-xl h-40 w-full object-cover" src="${item.image}" alt="">
            <h1 onclick="oneCardModel(${item.id})" class="text-xl font-bold cursor-pointer">${item.name}</h1>
            <p class="text-sm overflow-hidden text-ellipsis whitespace-normal [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
              ${item.description}
            </p>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#DCFCE7] text-[#15803D] rounded-3xl">${item.category}</button>
                <button ><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${item.price}</button>
            </div>
            <button onclick="cardAdd(${item.id},'${item.name}',${item.price})" class="text-white btn w-full rounded-3xl bg-[#15803D]">Add to Card</button>
            </div>
            `
            card.append(createCard)
        }
        spaner(false)
}
const allCard =async()=>{
   spaner(true)
   const allCard =await fetch(`https://openapi.programming-hero.com/api/plants`) 
   const data = await allCard.json()
   const allData = data.plants
   makeCard(allData)
}
allCard()
const loadCardFormCatagoryButton = async(id)=>{
    spaner(true)
    const card = await fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    const data = await card.json()
    const plants = data.plants
    removeButtonStyle()
    document.getElementById(`menu_btn_${id}`).classList.add("active")
    makeCard(plants)    
}
const loadCatagory =async()=>{
    const catagory = await fetch("https://openapi.programming-hero.com/api/categories")
    const data = await catagory.json()
    const allCatagory = data.categories

    for( const item of allCatagory){
        const ulSection = document.getElementById("catagory")
        const ul = document.createElement("div")
        ul.innerHTML = `
            <ul class="flex justify-center items-center flex-col w-full">
                <il id='menu_btn_${item.id}' onclick="loadCardFormCatagoryButton(${item.id})" class="menu_btn w-[100%] text-center hover:bg-[#22cb22] p-3 text hover:text-[white] text-[green] cursor-pointer">
                <a  class="w-full px-4 py-2 rounded text-xm md:text-sm text-center items-center">${item.category_name}</a>
                </il>
            </ul>
        `
        ulSection.append(ul)
    }

}
loadCatagory()