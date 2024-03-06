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

  const [lastSelectedRecipeId, setLastSelectedRecipeId] = useState();
  //这里影响到两个地方，所以最好写在这，然后把function传到子组键，否则子需要这个方法它得重新写
  //在recipes里面寻找id等于我们select的id，所以整体的内容就被找到了
  //这个是选内容
  function handleSelectRecipe() {
    return recipes.find((recipe) => recipe.id === selectedRecipeId);
  }
  //如果被选中，并且你的id不等于上个selectid，在选中别人的时候，刚才选中（上一个）的就变成了last了，
  //然后必须排除一种情况，就是自己点自己，就是if里面的内容
  //其实就是套娃，先把setLast设置成selectid，然后把id设置为新的setselected
  //这个是选状态
  function handleRecipeSelect(id) {
    if (selectedRecipeId && id !== selectedRecipeId) {
      setLastSelectedRecipeId(selectedRecipeId);
    }
    setSelectedRecipeId(id);
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId !== null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
    }
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
    // 不等于他的留下，等于他的都干掉
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidV4(),
      name: "New",
      servings: 1,
      cookTime: "1:00",
      instructions: ["New Instruction 1", "New Instruction 2"],
      ingredients: [
        {
          id: uuidV4(),
          name: "demo",
          amount: "1 Tbs",
        },
      ],
    };
    handleRecipeSelect(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  }

  // React.useEffect(() => {
  //   console.log('selectedRecipeId', selectedRecipeId);
  //   console.log('lastSelectedRecipeId', lastSelectedRecipeId);
  // }, [selectedRecipeId, lastSelectedRecipeId])

  return (
    <>
      <RecipeList
        recipes={recipes}
        selectedRecipeId={selectedRecipeId}
        lastSelectedRecipeId={lastSelectedRecipeId}
        handleRecipeSelect={handleRecipeSelect}
        handleRecipeDelete={handleRecipeDelete}
        handleRecipeAdd={handleRecipeAdd}
      />
      {selectedRecipeId && <EditorPanel />}
    </>
  );
};

export default App;
// 1，有了数据，传到 RecipeList 里边，
// 2，在 RecipeList 里面map 一项一项打开
// 3. 打开的目的是在 Recipe 里面一项一项罗列（解构赋值）
