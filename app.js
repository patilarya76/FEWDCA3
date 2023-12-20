let el;

//giving functinality to the close button of the modal
const closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener('click',function(){
    modal.style.display = "none";
})

//using API key by fetch method to diaplay the randomimage
async function randomimage() {
    try {
        const output = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const information = await output.json();
        console.log('API Response:', information);
        const Mealinformation = information.meals[0];
        const imageUrl = Mealinformation.strMealThumb;
        const imagename = Mealinformation.strMeal;
        el = Mealinformation.idMeal;
        console.log(el)
        return { imageUrl, imagename };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

//giving functionality of random meal image
function updationofimage(imageUrl, imagename) {
    const randommealimage = document.getElementById('randommealimage');
    const nameofdish = document.getElementById('nameofdish');
    randommealimage.src = imageUrl;
    nameofdish.innerText = imagename;
}

// giving refresh functionality
async function refresh() {
    const { imageUrl, imagename } = await randomimage();
    updationofimage(imageUrl, imagename);
}

window.onload = refresh;

// giving input box the API key so that the searched category will be displayed
async function placeholder() {
    const inputbox = document.getElementById('placeholder').value;
    const API = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${inputbox}`;

    try {
        const output = await fetch(API);
        const information = await output.json();
        display(information.meals);

    } catch (error) {
        console.error("There's an error:", error);
    }
}

// assigning the function to display the  meals
function display(Meals) {
    const results = document.getElementById('latest');
    results.innerHTML = '';

    Meals.forEach(Meal => {
        const latestimages = document.createElement('img');
        latestimages.src = Meal.strMealThumb;
        const nameofthedish = document.createElement('p');
        nameofthedish.textContent = Meal.strMeal;

        const displayresult = document.createElement('div');
        displayresult.appendChild(latestimages);
        displayresult.appendChild(nameofthedish);

        results.appendChild(displayresult);
    });
}

//MODAL
const randommealimage=document.getElementById('randommealimage')
const modal= document.getElementById('modal');
const unorderedlist= document.getElementById('unorderedlist');
const mainModal= document.querySelector('.mainmodal');

async function modalingredients(el){
  unorderedlist.innerHTML=""
  try{
    let output= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${el}`);
    let information= await output.json();
    for (let i=1;i<21;i++){
        if (information.meals[0][`strIngredient${i}`]!=""){
            // console.log(information.meals[0])
            let a = information.meals[0][`strIngredient${i}`]
            // console.log
            unorderedlist.innerHTML+=`<li>${a}</li>`
        }

    }

  }
  catch (error){
    console.log("error in fetching data",error)
  }
}
//onlclick to the image so that ingredients will be displayed
console.log(randommealimage)
randommealimage.addEventListener('click',function(){
    // console.log("Hello")
    modalingredients(el)
    modal.style.display = "block";

})

