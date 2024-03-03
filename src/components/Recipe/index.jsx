import styles from "./index.module.scss";
import { classNameStyled } from "@/utils"; //不是default，要带括号

import Button from "@/components/Button";
import Header from "@/components/Header";
import Panel from "@/components/Panel";

const RecipeList = (props) => {
  const { recipes, selectRecipeId, recipeListClassNames } = props;

  const classNames = classNameStyled(recipeListClassNames, styles, "container");

  return (
    <div className={classNames}>
      <div className={styles["title"]}>Topcoder Recipe Book</div>
      <div className={styles["add"]}>
        <Button className="btn-big" onClick={() => {}}>
          Add Recipe
        </Button>
      </div>
      <div>
        {recipes.map((recipe) => {
          return <Recipe key={recipe.id} {...recipe} />;
        })}
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
    id,
    name,
    servings,
    cookTime,
    instructions,
    ingredients,
    className,
    ...rest
  } = props;

  return (
    <div className={styles["recipe_container"]}>
      <div onClick={() => {}}>
        <Header />
        <Panel />
      </div>
    </div>
  );
};

export default RecipeList;
