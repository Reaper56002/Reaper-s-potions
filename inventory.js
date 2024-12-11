export function initializeInventory() {
    Hooks.on("ready", function() {
        console.log("inventory is running");
    })
}

Hooks.on("createActor", async (actor, options, userId) => {
    
    if (actor.type === "character") {
        console.log("New character created. Adding starting items...");
        await actor.createEmbeddedDocuments("Item", [
            {
                name: "Red Herb",
                type: "loot", 
                system: {
                    quantity: 2
                }
            },
            {
                name: "Water",
                type: "loot",
                system: {
                    quantity: 1
                }
            }
        ]);
        console.log("Starting items added to new character.");
    }
});


export function getActorInventory(actor) {
    if (!actor || !actor.items) {
        console.error("Invalid actor provided.");
        return [];
    }
   
    return actor.items.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.system.quantity || 0,
        type: item.type
    }));

}


export function hasIngredients(actor, ingredients) {
    const inventory = getActorInventory(actor);

    return ingredients.every(req => {
        const inventoryItem = inventory.find(item => item.name === req.name);
        return inventoryItem && inventoryItem.quantity >= req.quantity;
    });
}


export async function consumeIngredients(actor, ingredients) {
    const inventory = getActorInventory(actor);

    for (const req of ingredients) {
        const inventoryItem = inventory.find(item => item.name === req.name);
        if (inventoryItem) {
            const newQuantity = inventoryItem.quantity - req.quantity;

            
            await actor.updateEmbeddedDocuments("Item", [
                { _id: inventoryItem.id, "system.quantity": Math.max(newQuantity, 0) }
            ]);
        }
    }
}


