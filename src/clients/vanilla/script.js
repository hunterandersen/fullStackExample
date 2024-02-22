const PORT = 5555;
const herosList = document.getElementById("herosList");
const state = {
    heroData: []
}

function setState(key, newData) {
    state[key] = newData;
    updateDOM();
}

function updateDOM() {
    //Clear out the old DOM list items
    herosList.innerHTML = "";
    //If there are any heros ready to be listed, then proceed
    if (state.heroData && state.heroData.length > 0) {
        state.heroData.forEach((hero) => {
            //1. Create the elements
            const newLi = document.createElement("li");
            const newH3 = document.createElement("h3");
            const newP = document.createElement("p");
            const newImg = document.createElement("img");
            //2. Modify the elements
            newH3.textContent = hero.name;
            newP.textContent = hero.description;
            newImg.src = hero.imgPath;
            newImg.alt = hero.name
            //3. Append the elements
            newLi.append(newH3, newP, newImg);
            herosList.append(newLi);
        });
    }
}

fetch(`http://localhost:${PORT}/api/hero`)
.then(res => res.json())
.then(data => setState("heroData", data))
.catch(console.error);