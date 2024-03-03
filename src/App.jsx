import React, { useState, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";

import RecipeList from "@/components/Recipe";
import EditorPanel from "@/components/Editor";

const sampleRecipes = [
  {
    id: uuidV4(),
    name: "Plain Chicken",
    servings: 3,
    cookTime: "2:45",
    instructions: ["Put salt on Chicken", "Put chicken in oven", "Eat chicken"],
    ingredients: [
      {
        id: uuidV4(),
        name: "Chicken",
        amount: "2 Pounds",
      },
      {
        id: uuidV4(),
        name: "Salt",
        amount: "1 Tbs",
      },
    ],
  },
  {
    id: uuidV4(),
    name: "Plain Pork",
    servings: 5,
    cookTime: "0:45",
    instructions: ["Put paprika on Pork", "Put pork in oven", "Eat pork"],
    ingredients: [
      {
        id: uuidV4(),
        name: "Pork",
        amount: "2 Pounds",
      },
      {
        id: uuidV4(),
        name: "Paprika",
        amount: "2 Tbs",
      },
    ],
  },
  {
    id: uuidV4(),
    name: "Plain Apple Pai",
    servings: 10,
    cookTime: "3:45",
    instructions: ["Put apples in pie", "Put pie in oven", "Eat pie"],
    ingredients: [
      {
        id: uuidV4(),
        name: "Pork",
        amount: "2 Pounds",
      },
      {
        id: uuidV4(),
        name: "Paprika",
        amount: "2 Tbs",
      },
    ],
  },
];

const App = () => {
  const [recipes, setRecipes] = useState(sampleRecipes);

  const [selectedRecipeId, setSelectedRecipeId] = useState();

  return (
    <>
      <RecipeList recipes={recipes} selectedRecipeId={selectedRecipeId} />
      {selectedRecipeId && <EditorPanel />}
    </>
  );
};

export default App;
// 1，有了数据，传到 RecipeList 里边，
// 2，在 RecipeList 里面map 一项一项打开
// 3. 打开的目的是在 Recipe 里面一项一项罗列（解构赋值）
