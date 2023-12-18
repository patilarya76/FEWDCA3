async function randomimage() {
    try {
       const output = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
       const information = await output.json();
       console.log('API Response:', information); // Log the API response
       const Mealinformation = information.meals[0];
       const imageUrl = Mealinformation.strMealThumb;
       const imagename = Mealinformation.strMeal;
       return { imageUrl, imagename };
    } catch (error) {
       console.error('Error fetching data:', error);
       throw error; // Rethrow the error for further debugging
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
 

async function placeholder(){
    const inputbox = document.getElementById('placeholder').value;
    const API= `www.themealdb.com/api/json/v1/1/filter.php?c=${inputbox}`;

    try{
        const output= await fetch(API);
        const information= await response.json();
        display(information.Meals);

    } catch(error){
        console.error("There's an error:", error);
    }


}

function display(Meals){
    const results= document.getElementById('latest');
    results.innerHTML='';


    Meals.forEach(Meal=>{
        const latestimages =document.createElement('image');
        latestimages.src=Meal.strMealThumb;
        const nameofthedish=document.createElement('p');
        nameofthedish.textContent=Meal.strMeal;

        const displayresult= document.createElement('div');
        displayresult.appendChild(latestimages);
        displayresult.appendChild(nameofthedish);

        results.appendChild(displayresult);

    });

}