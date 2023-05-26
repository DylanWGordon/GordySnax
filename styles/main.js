
let searches = [];
let favoritesArray = JSON.parse(localStorage.getItem('fave'))
let favBackup=[]
let toDoArray = JSON.parse(localStorage.getItem('toDo'))
let toDoBackup=[]
function btnsAndPages() {

    //monster function to bring up detailed recipe
    function expandFunc(expandBtn, obj) {
        //expand button
        expandBtn.addEventListener('click', () => {
            let titleDiv = document.createElement('div');
            titleDiv.id = 'titleDiv';
            popup.append(titleDiv);
            let expanded = document.createElement('div');
            expanded.id = 'expanded';
            popup.append(expanded);
            //hide main, show popup
            currentPage.classList.remove('display');
            popup.classList.add('display');
            //generate left side
            let recipeLeft = document.createElement('div')
            recipeLeft.id = 'left';
            recipeLeft.classList.add('recipePage')
            //left side header

            let titleH3 = document.createElement('h3')
            titleH3.textContent = obj['title']
            titleDiv.append(titleH3)
            let closeDiv = document.createElement('div')
            closeDiv.id = 'closeDiv'
            let closeBtn = document.createElement('button')
            closeBtn.id = 'closeBtn';
            closeBtn.textContent = 'X'
            closeBtn.addEventListener('click', () => {
                popup.classList.remove('display');
                popup.innerHTML = '';
                currentPage.classList.add('display')
            })
            closeDiv.append(closeBtn)
            titleDiv.append(closeDiv)
            //left side picture
            let thumbDiv = document.createElement('div')
            thumbDiv.id = 'thumbnailDiv'
            recipeLeft.append(thumbDiv)
            let thumbnail = document.createElement('img')
            thumbnail.src = obj['image'];
            thumbnail.classList.add('thumbnail')
            //left side diet/ingredients
            let dietIng = document.createElement('div')
            dietIng.id = 'dietIng'
            let dietDiv = document.createElement('div')
            dietDiv.id = 'dietDiv'
            let dietInfo = document.createElement('ul')
            dietInfo.id = 'dietInfo'
            let dietH4 = document.createElement('h4');
            dietH4.textContent = 'Dietary Info:';
            dietDiv.append(dietH4)
            //generate diets
            for (let j = 0; j < obj['diets'].length; j++) {
                let diet = document.createElement('li')
                diet.textContent = obj['diets'][j];
                dietInfo.append(diet)
            }
            dietDiv.append(dietInfo)
            thumbDiv.append(thumbnail)
            //generate ingredients
            let ingredientsDiv = document.createElement('div')
            ingredientsDiv.id = 'ingredientsDiv'
            let ingredients = document.createElement('ul')
            let ingH4 = document.createElement('h4')
            ingH4.textContent = 'Ingredients:'
            ingH4.style.textAlign = 'center'
            ingredientsDiv.append(ingH4)
            //iterate through ingredients
            for (let j = 0; j < obj['extendedIngredients'].length; j++) {
                let ing = document.createElement('li');
                ing.textContent = obj['extendedIngredients'][j]['original']
                ing.style.fontSize = '80%'
                ingredients.append(ing)
            }
            //appending ingredients/dieting
            let likeBtnDiv = document.createElement('div')
            likeBtnDiv.classList.add('likeBtnDiv')
            let addToDo = document.createElement('button')
            addToDo.classList.add('liked')
            addToDo.id='addToDo'
            toDoArray.includes(obj)?addToDo.textContent='remove from ToDo':addToDo.textContent='Add to ToDo'
            let addFave = document.createElement('button')
            addFave.classList.add('liked')
            favoritesArray.includes(obj)?addFave.textContent='remove from Favorites' : addFave.textContent = 'Add to favorites'
            addFave.id='addFave'
            likeBtnDiv.append(addToDo)
            likeBtnDiv.append(addFave)
            thumbDiv.append(likeBtnDiv)
            ingredientsDiv.append(ingredients)
            dietIng.append(ingredientsDiv)
            dietIng.append(dietDiv)
            recipeLeft.append(dietIng)

            //generate right side
            let recipeRight = document.createElement('div')
            recipeRight.id = 'right';
            recipeRight.classList.add('recipePage')
            //div for steps
            let stepDiv = document.createElement('div')
            stepDiv.id = 'stepDiv';
            let steps = document.createElement('ol');
            steps.id = 'steps'
            //generate recipe steps
            for (let j = 0; j < obj['analyzedInstructions'].length; j++) {
                for (let k = 0; k < obj['analyzedInstructions'][j]['steps'].length; k++) {
                    let step = document.createElement('li');
                   
                    step.textContent = obj['analyzedInstructions'][j]['steps'][k]['step'];
                    steps.append(step)
                }

                stepDiv.append(steps);
                recipeRight.append(stepDiv)
                expanded.append(recipeLeft)
                expanded.append(recipeRight)
                

            }
            // console.log(document.querySelector('#addFave'))
            addFave.addEventListener('click', ()=>{
                if(currentPage == homePage){
                favoritesPage.innerHTML=''
                if(!favoritesArray.includes(obj)){
                favoritesArray.push(obj)
                localStorage.setItem('fave', JSON.stringify(favoritesArray))
                } else {
                    alert(`That's already on your favorites list.`)
                }
            }else {
                let deleteMe=favoritesArray.indexOf(obj);
                favoritesArray.splice(deleteMe, 1)
                localStorage.setItem('fave', JSON.stringify(favoritesArray))
            }
              })
              // let addToDo= document.querySelector('#addToDo')
                  addToDo.addEventListener('click', ()=>{
                    if(currentPage == homePage){
                    toDoPage.innerHTML=''
                    if(!toDoArray.includes(obj)){
              toDoArray.push(obj)
              localStorage.setItem('toDo', JSON.stringify(toDoArray))
            } else {
                alert(`That's already on your To Do list.`)
            }
        } else {
            let deleteMe = toDoArray.indexOf(obj);
            toDoArray.splice(deleteMe, 1)
            localStorage.setItem('toDo', JSON.stringify(toDoArray))
        }
                  })
             
    
        })

    }
//thumbnail populating function
    function makeThumbs(page, object, phID) {
        for (let i = 0; i < object.length; i++) {
            let myRecipe = object[i]
            searches.push(object[myRecipe])
            let recipeCard = document.createElement('div');
            recipeCard.classList.add('recipeCard')
            let recipeTitle = document.createElement('h2');
            recipeTitle.style.margin = 'auto'
            recipeTitle.textContent = myRecipe['title']
            let recipePreview = document.createElement('img')
            recipePreview.src = myRecipe['image']
            expandBtn = document.createElement('button')
            expandBtn.classList.add('expand')
            expandBtn.textContent = 'View Recipe'
            page.append(recipeCard)
            recipeCard.append(recipeTitle)
            recipeCard.append(recipePreview)
            recipeCard.append(expandBtn)
            expandFunc(expandBtn, myRecipe)
            console.log(myRecipe)
        }
    }


    //searchbar and tab functionality
    //necessary evil
    const searchBar = document.querySelector('#searchBar');
    const searchBtn = document.querySelector('#searchBtn');
    const homePage = document.querySelector('#homePage')
    const favoritesPage = document.querySelector('#favoritesPage')
    const toDoPage = document.querySelector('#toDoPage')
    let tabBtns = document.querySelectorAll('.tablinks')
    let currentPage = homePage;

    const popup = document.querySelector('#popup')

    //api key object
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '74c1321ca0msh5727ae544d66dfep160113jsn704ac568f189',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    //search button ajax on click; Clear homePage, add Thumbs
    searchBtn.addEventListener('click', async function () {
        homePage.innerHTML= ''
        const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=${searchBar.value}&intolerances=gluten&excludeIngredients=eggs&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=popularity&sortDirection=asc&offset=0&number=10&limitLicense=false&ranking=2`;
            const response = await fetch(url, options);
            const result = await response.json();
            makeThumbs(homePage, result['results'], '#homePh')


        console.log(searchBar.value)
    })

    //iterate through tabs
    for (let i = 0; i < tabBtns.length; i++) {
        let targetPage;
    
        //tabs click event to change page
        tabBtns[i].addEventListener('click', () => {
            //home:
            if (tabBtns[i].id == 'homeBtn') {
            targetPage = homePage;
        }
        //Favorites:
         else if (tabBtns[i].id == 'likedBtn') {
            targetPage = favoritesPage; 
            favoritesPage.innerHTML=''
            makeThumbs(favoritesPage, favoritesArray, '#likedPh')
        }
        //ToDo:
        else if (tabBtns[i].id == 'toDoBtn') {
            targetPage = toDoPage
            toDoPage.innerHTML=''
            makeThumbs(toDoPage, toDoArray, '#toDoPh')  
            console.log(toDoArray)
    }

                //Return button if display=true
            if (popup.classList.contains('display')) {
                popup.classList.remove('display')
                currentPage.classList.add('display')
                let returnBtn = document.createElement('button')
                returnBtn.id = 'returnBtn';
                returnBtn.textContent = 'recipe'

                //return event listener
                returnBtn.addEventListener('click', () => {
                    popup.classList.add('display');
                    currentPage.classList.remove('display')
                    tabs.removeChild(returnBtn)
                })
                tabs.append(returnBtn)
            }


            //ChangePage
            if (targetPage == currentPage) {
                console.log('oops')
            } else {

                currentPage.classList.remove('display')
                targetPage.classList.add('display')
                currentPage = targetPage

            }
        })
    }
}

btnsAndPages()



