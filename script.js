const button = document.getElementById('search-button');
button.addEventListener('click',async function(event){
    event.preventDefault();
    try{
        const input = document.getElementById('search-bar').value; 
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`);
        const data = await response.json();
        console.log(data);
    if(data.meals != null){
        let recipes = '';
        data.meals.forEach(element => {
            const instructionsArray = element.strInstructions.split('\r\n');
            let instructionsHtml = '';
            instructionsArray.forEach(instruction => {
                if(instruction.trim() !== '') {
                    instructionsHtml += `<li style="color: white;">${instruction}</li>`;
                }
            });
            recipes += `<div class="recipe">
                            <h3 style = "color: white;text-align:center">${element.strMeal}</h3>
                            <img src="${element.strMealThumb}" alt="${element.strMeal} width="200" height="200">
                            <ol>${instructionsHtml}</ol>
                        </div>`;
        });
        document.getElementById('recipes-container').innerHTML = recipes;
      } else {
        setTimeout(() => {
            alert("No recipes found. Please try again with a different keyword.");
        }, 1000);
      }
    } catch (error) {
        console.error('Error:', error.message);
    }

})