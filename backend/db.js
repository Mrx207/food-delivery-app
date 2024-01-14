const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://gofood:DeshRush916%40@cluster0.3z7f8rp.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const mongoDB = async () => {
  await mongoose.connect(mongoURI, async (err, res) => {
    if (err) console.log("Error", err);
    else {
      const fetched_data = await mongoose.connection.db.collection(
        "food_items"
      );
      fetched_data.find({}).toArray(async function (err, data) {
        const foodCategory = await mongoose.connection.db.collection(
          "food_category"
        );
        foodCategory.find({}).toArray(function (err, catData) {
          if (err) console.log("err", err);
          else {
            global.food_items = data;
            global.foodCategory = catData;
          }
        });
      });
    }
  });
};

module.exports = mongoDB;
