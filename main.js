
Hooks.on("ready", function() {
  console.log("reaper bs.");
});


import "./sheetMods.js";
import "./craftingUI.js";


import { potionRecipes } from "./recipes.js";
import { initializeInventory } from "./inventory.js";
import { addDependency } from "./dependencies.js";
import { TreeNode } from "./TreeNode.js";
import { ingredientGraph } from "./ingredientGraph.js";
import {craftingStack} from "./craftingStack.js";
import { getActorInventory } from "./inventory.js";


Hooks.once('init', () => {
 initializeInventory();
 Hooks.on("ready", function() {
  console.log("Potion Crafting System Initialized");
});
  
});












