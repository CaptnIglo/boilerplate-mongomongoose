require("dotenv").config();
let mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    default: "Hans",
  },
  age: {
    type: Number,
    unique: false,
    default: 52,
  },

  favoriteFoods: {
    type: [String],
    unique: false,
    default: ["pizza"],
  },
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  var person = new Person({
    name: "Peter",
    age: 15,
    favoriteFoods: ["cheese", "chocolate"],
  });
  person.save(function (err, data) {
    if (err) {
      console.error(err);
    }
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  arrayOfPeople.forEach(function (person) {
    var person = new Person({
      name: person.name,
      age: person.age,
      favoriteFoods: person.favoriteFoods,
    });
    person.save(function (err, data) {
      if (data) {
        done(null, data);
      }
      if (err) {
        console.error(err);
      }
    });
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, personByName) {
    if (err) {
      console.error(err);
    }
    done(null, personByName);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, personByFood) {
    if (err) {
      console.error(err);
    }
    done(null, personByFood);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, personById) {
    if (err) {
      console.error(err);
    }
    done(null, personById);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId, function (err, person) {
    if (err) {
      console.error(err);
    }
    person.favoriteFoods.push(foodToAdd);
    person.save(function (err, data) {
      if (data) {
        done(null, data);
      }
      if (err) {
        console.error(err);
      }
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    function (err, updatedDoc) {
      if (err) console.error(err);
      done(null, updatedDoc);
    },
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, removedDoc) {
    if (err) console.error(err);
    done(null, removedDoc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function (err, response) {
    if (err) console.error(err);
    done(null, response);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec(function (err, response) {
      if (err) console.error(err);
      done(null, response);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
