import React from "react";
import styles from "./index.module.scss";
import { classNameStyled } from "@/utils";

import Button from "@/components/Button";
import Header from "@/components/Header";
import Panel from "@/components/Panel";

const RecipeList = (props) => {
  const {
    //从app传进来，然后解构赋值，到自组建，再在子组建接受
    recipes,
    selectedRecipeId,
    lastSelectedRecipeId,
    handleRecipeSelect,
    handleRecipeDelete,
    handleRecipeAdd,
    recipeListClassNames,
  } = props;

  const classNames = classNameStyled(recipeListClassNames, styles, "container");
  return (
    <div className={classNames}>
      <div className={styles["title"]}>Topcoder Recipe Book</div>
      <div className={styles["add"]}>
        <Button className="btn-big" onClick={() => handleRecipeAdd()}>
          Add Recipe
        </Button>
      </div>
      <div>
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.id}
            {...recipe}
            selectedRecipeId={selectedRecipeId}
            lastSelectedRecipeId={lastSelectedRecipeId}
            handleRecipeSelect={handleRecipeSelect}
            handleRecipeDelete={handleRecipeDelete}
          />
        ))}
      </div>
      <div className={styles["add"]}>
        <Button className="btn-big" onClick={() => {}}>
          Add Recipe
        </Button>
      </div>
    </div>
  );
};

const Recipe = (props) => {
  const {
    id, //id是app里的uuid来的
    name,
    servings,
    cookTime,
    instructions,
    ingredients,
    className,
    selectedRecipeId,
    lastSelectedRecipeId,
    handleRecipeSelect,
    handleRecipeDelete,
    ...rest
  } = props;

  const [chosen, setChosen] = React.useState(false);
  const [lastChosen, setLastChosen] = React.useState(false);

  const [recipeClassNameList, setRecipeClassNameList] = React.useState([
    "recipe",
  ]);

  const [recipeClassName, setRecipeClassName] = React.useState();
  //这里不能用recipeClassNameList，应该用setRecipeClassNameList本身有的，随便起个名字就行，例如list，“list”就代表着他本身的recipeClassNameList，通过“list”再去产生变化，而不是用recipeClassNameList直接往里扔，就不能这样写，否则会出现bug
  //如果拿recipeClassNameList就是上一个，上一个的“快照”，这个跟“list”可能是不同的，你在这个上面做的操作你到时候就会产生一系列的问题，所以你就拿它本身里边这个 list 是绝对错不了的。
  function addClassName(className) {
    removeClassName(className);
    setRecipeClassNameList((list) => [...list, className]);
  }
  //如果用set 方法，会把原来的顺序干掉，所以不用set。直接先remove。你把上一个东西的快照拿来，这跟你原来的list可能是不同的。随便起一个名，代表他本身的list不要用recipeClassNameList直接往里扔。

  function removeClassName(className) {
    setRecipeClassNameList((list) => list.filter((name) => name !== className));
  }

  React.useEffect(() => {
    chosen ? addClassName("chosen") : removeClassName("chosen");
  }, [chosen]);
  //说白了就是两种class
  React.useEffect(() => {
    lastChosen ? addClassName("last-chosen") : removeClassName("last-chosen");
  }, [lastChosen]);
  //判断id是否等于选中的id，然后改变另一个chosen或lastchosen的state，就会联动
  React.useEffect(() => {
    id === selectedRecipeId ? setChosen(true) : setChosen(false);
  }, [id, selectedRecipeId]);

  React.useEffect(() => {
    id === lastSelectedRecipeId ? setLastChosen(true) : setLastChosen(false);
  }, [id, lastSelectedRecipeId]);
  //这里是控制添加删除classNameStyled
  React.useEffect(() => {
    setRecipeClassName(
      classNameStyled(className, styles, recipeClassNameList.join(" "))
    );
  }, [recipeClassNameList]);

  return (
    <div className={styles["recipe_container"]}>
      <div className={recipeClassName} onClick={() => handleRecipeSelect(id)}>
        <Header header_info={name} id={id} deleteHandler={handleRecipeDelete} />
        <Panel />
      </div>
    </div>
  );
};

export default RecipeList;
