//collection: action figures

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

  // const actionfigures = db.collection('actionfigures');


const actionfigureSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    abilities: [{type: String, lowercase: true, trim: true}],
    // mainEnemies: [{
    //   name: { type: String, required: true, unique: true },
    // }],
    bio: { type: String, required: true, unique: true },
});

const ActionFigure = mongoose.model('ActionFigure', actionfigureSchema);

module.exports = ActionFigure;
