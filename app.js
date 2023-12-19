let el;

async function randomimage() {
    try {
        const output = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const information = await output.json();
        el = information.meals[0];
        console.log('API Response:', information);
        const Mealinformation = information.meals[0];
        const imageUrl = Mealinformation.strMealThumb;
        const imagename = Mealinformation.strMeal;
        return { imageUrl, imagename };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

function updationofimage(imageUrl, imagename) {
    const randommealimage = document.getElementById('randommealimage');
    const nameofdish = document.getElementById('nameofdish');
    randommealimage.src = imageUrl;
    nameofdish.innerText = imagename;
}

async function refresh() {
    const { imageUrl, imagename } = await randomimage();
    updationofimage(imageUrl, imagename);
}

window.onload = refresh;

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
        if (information.Meals[0][`strIngredients${i}`]!=""){
            let a = information.Meals[0][`strIngredients${i}`]
            // console.log
            unorderedlist.innerHTML+=`<li>${a}</li>`
        }

    }

  }
  catch (error){
    console.log("error in fetching data",error)
  }
}

randommealimage.addEventListener('click',function(){
    console.log("Hello")
    modalingredients(el)
    mainModal.style.display = "block";

})

