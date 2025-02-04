document.addEventListener("DOMContentLoaded", () => {
    const saveButtons = document.querySelectorAll(".save-button");

    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || {};

    function updateButtonText(button, isSaved) {
        button.textContent = isSaved ? "Unsave" : "Save";
    }

    saveButtons.forEach((button) => {
        const recipeId = button.dataset.recipeId;
        const isSaved = !!savedRecipes[recipeId];
        updateButtonText(button, isSaved);

        button.addEventListener("click", () => {
            const recipeData = {
                id: recipeId,
                name: button.dataset.recipeName,
                img: button.dataset.recipeImg,
                link: button.dataset.recipeLink,
            };

            if (savedRecipes[recipeId]) {
                delete savedRecipes[recipeId];
                updateButtonText(button, false);
            } else {
                savedRecipes[recipeId] = recipeData;
                updateButtonText(button, true);
            }

            localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
        });
    });
});

if (window.location.pathname.includes("saved-recipes.html")) {
    const savedRecipesList = document.getElementById("saved-recipes-list");
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || {};
    
    Object.values(savedRecipes).forEach((recipe) => {
        const imgSrc = recipe?.img || "photos/default.jpg";
        const recipeName = recipe?.name || "Untitled Recipe";
        const recipeLink = recipe?.link || "#";

        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-box");

        recipeCard.innerHTML = `
          <div class="recipe-card">
                <a href="${recipeLink}"><img  alt="${recipeName}" src="${imgSrc}"></a>
                <h3>${recipeName}</h3>
                 <a href="${recipeLink}" class="view-recipe">View Recipe</a>
            </div>
        `;

        savedRecipesList.appendChild(recipeCard);
    });

    if (Object.keys(savedRecipes).length === 0) {
        savedRecipesList.innerHTML = "<p>No recipes saved yet!</p>";
    }
}