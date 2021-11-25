import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";
// deliverables
// 1. use a state variable to hold an array of spicy foods
// looks like this is already done for us... lets take a look in the browser using our components tools to make sure...
// 2. using the array 'foods' to display each spicy food as an li
// second deliverable is now working
// 3. add a new spicy food when the button is clicked
// 4. create a handleLiClick function that will update state by removing the spicy food that was clicked
// 5. now we want handleLiClick to instead update the food click to increase its heat level...

// 6. on filter change we want the dom to update and only display the foods of that cuisine..
// currently we are automatically displaying all foods using the renderSpicyFoods function

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods); // here useState hook is used to set the 'foods' state

  // we need a state variable to determine what filter is currently in place... should start displaying all
  const [filter, setFilter] = useState("All");
  // now when we change the select option we want to update this state..

  function handleFilterSelect(event) {
    // we used the event.target.value to update the filter state
    setFilter(event.target.value);
  }

  function handleAddFood() {
    const newFood = getNewSpicyFood();
    console.log(newFood);
    // we have the food object.. how do we add it to state?
    // we need to use the setState function defined named setFoods
    setFoods([...foods, newFood]);
  }

  function handleLiClick(id) {
    // we want to use the id provided to update the food with that id by adding 1 to its heat level
    // we want our array to stay the same size... but update one of the existing food objects... sounds like a job for map... with a conditonal
    const updatedFoods = foods.map((food) => {
      // if the food we are looking at has an id that matches the id passed as a parameter... we want to add 1 to its heatLevel
      if (food.id === id) {
        return {
          ...food,
          heatLevel: food.heatLevel + 1,
        };
      } else {
        // if the id does not match we want to return the original food unchanged
        return food;
      }
    });
    // we reset the 'foods' state to be the new updated array of foods which triggers a rerender
    setFoods(updatedFoods);
  }

  // function handleLiClick(id) {
  //   // we know it takes in the id of the food clicked..
  //   // we want to keep all of the elements from foods that do not have this idea ... sounds like a job for .filter
  //   const filteredFoods = foods.filter((food) => {
  //     // keep all the foods where the foods id is not equal to the food clicked... aka remove the clicked food
  //     return food.id !== id;
  //   });
  //   // after we filtered the foods we reset the array 'foods' to equal the new array which triggers a rerender
  //   setFoods(filteredFoods);
  // }

  function renderSpicyFoods() {
    // I am going to write a function that will return an array of li elements
    return filterFoods().map((food) => {
      return (
        <li key={food.id} onClick={() => handleLiClick(food.id)}>
          {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
        </li>
      );
    });
    // not sure what to display from the food.. or how its structured.. back to the browser
  }

  function filterFoods() {
    if (filter === "All") {
      // if the filter state is set to "All" then we want to return the entire array of foods
      return foods;
    } else {
      // if it set to anything else we want to return a filtered list of foods for that cuisine
      return foods.filter((food) => {
        return food.cuisine === filter;
      });
    }
    // notice that we did not update the array that lives in state as 'foods'
    // instead we are updating our second state variable 'filter'
    // and using that to determine what foods are rendered using this function
  }

  return (
    <div>
      Filter foods:
      <select onChange={handleFilterSelect} name="filter">
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <ul>{renderSpicyFoods()}</ul>
      <button onClick={handleAddFood}>Add New Food</button> <br />
    </div>
  );
}

export default SpicyFoodList;
