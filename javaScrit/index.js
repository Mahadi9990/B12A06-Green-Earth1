const removeButtonStyle = ()=>{

}
const makeCard =(details)=>{
    const card = document.getElementById("card")
    card.innerHTML =""
    for(const item of details){
        console.log(item.price)
        const createCard = document.createElement("div")
        createCard.innerHTML =`
            <div class="item h-72 rounded-md bg-white p-3">${item.price}</div>
        `
        card.append(createCard)
    }
}
const loadCardFormCatagoryButton = async(id)=>{
    const card = await fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    const data = await card.json()
    const plants = data.plants

    console.log(plants)
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
                <il onclick="loadCardFormCatagoryButton(${item.id})" class="w-[100%] text-center hover:bg-[#22cb22] p-3 text hover:text-[white] text-[green]">
                <a  class="w-full px-4 py-2 rounded text-xm md:text-sm text-center items-center">${item.category_name}</a>
                </il>
            </ul>
        `
        ulSection.append(ul)
    }

}
loadCatagory()