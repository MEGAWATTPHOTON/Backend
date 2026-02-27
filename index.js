import express from "express";
const port = 3020;
const app = express();
app.use(express.json());
let groceryList = [];
let nextId = 1;
//reach the login page
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the grocery store!");
});
//add a grocer
app.post("/grocery", (req, res) => {
  const { name, price } = req.body;
  const newItem = { id: nextId++, name, price };
  groceryList.push(newItem);
  res
    .status(200)
    .end(
      "Grocery with name: " +
        name +
        " price: " +
        price +
        " has been added to the database",
    );
});
//get the whole list
app.get("/grocery", (req, res) => {
  res.status(200).send(groceryList);
});
//get one grocer
app.get("/grocery/:id", (req, res) => {
  const item = groceryList.find(
    (grocer) => grocer.id === parseInt(req.params.id),
  );
  if (!item) {
    res.status(404).send("Error 404! Grocer not found!");
    return;
  }
  res.status(200).send(item);
});
//update grocer price
app.put("/grocery/:id", (req, res) => {
  const item = groceryList.find(
    (grocer) => grocer.id === parseInt(req.params.id),
  );
  if (!item) {
    res.status(404).send("404 Error! Grocer does not exist!");
    return;
  }
  const price = res.body;
  const oldPrice = item.price;
  item.price = price;
  res
    .status(200)
    .send(
      item.name +
        "'s price has been updated from " +
        oldPrice +
        " to " +
        item.price,
    );
});
app.delete("/grocery/:id", (req, res) => {
  const index = groceryList.findIndex(
    (grocer) => grocer.id === parseInt(req.params.id),
  );
  if (index === -1) {
    return res.status(404).send("404 Error! Grocer not found!");
  }
  const itemName = groceryList[index].name;
  groceryList.splice(index, 1);
  res.status(200).send(itemName + " has been removed from the database");
});
app.listen(port, () => {
  console.log("Listening at port: http://localhost:" + port);
});
