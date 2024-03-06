export function classNameStyled(classNames, styles, preClassNames) {
  // "btn btn-primary" => ["btn", "btn-primary"]
  const classList = classNames ? classNames.split(" ") : [];

  // "blue bold" => ["blue", "bold"]
  const preClassList = preClassNames ? preClassNames.split(" ") : [];

  // ["btn", "btn-primary"] => ["btn", "btn-primary", "btn-primary-123"]
  const classListStyled = classList.map(
    (className) => styles[className] || className
  );

  // ["blue", "bold"] => ["blue", "bold-456"]
  const preClassListStyled = preClassList.map(
    (className) => styles[className] || className
  );

  // ["btn", "btn-primary", "btn-primary-123", "blue", "bold", "bold-456"] => "btn btn-primary btn-primary-123 blue bold bold-456" 原来是list，现在是终极要的class
  return [...preClassListStyled, ...classListStyled].join(" ");
}
/**
 *这里涉及到CSS模块（CSS Modules）的概念，这是一种CSS文件的编写和管理方式，特别是在使用如React这样的JavaScript框架时。我将一步步解释这个概念和它的目的，以及为什么和怎样进行类名的转换。

为什么要使用CSS模块？
在传统的全局CSS中，所有样式规则都是全局生效的，这意味着任何地方的CSS规则都可以影响到页面上的任何元素，只要它们的选择器匹配。这容易导致样式冲突，尤其是在大型或者多人协作的项目中。

CSS模块解决了这个问题。它通过确保每个CSS类名都是唯一的，来避免样式冲突。这样，你就可以在不同的组件中重复使用相同的类名，而不用担心它们会相互影响。

CSS模块是如何工作的？
当你使用CSS模块时，构建工具（如Webpack、Parcel等）会自动将CSS文件中的类名转换成唯一的标识符。这些唯一的标识符通常是原始类名的基础上添加了一些额外的字符串，比如哈希值，以确保它们的唯一性。

styles对象是什么？
styles对象不是系统自带的。它是你在JavaScript文件中，通过导入一个CSS模块文件得到的。这个对象的每个键都对应一个原始的类名，而每个值都是这个类名转换后的唯一标识符。
 */

/**
 * 这里懂了，这第二个styles只是专门重名。例如下面的例子：
 *   const classNames = classNameStyled         (recipeListClassNames, styles, "container");
第一个子的class，第三个是大的，然后如果没有子就是空，有就传进去，然后用styles[]这样使用，因为前面是import styles from。。。，所以这里styles只是专门起了个同样名字的props
 */
