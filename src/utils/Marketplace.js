const getRandomInt = require('./utils.js').getRandomInt

class Marketplace {
  constructor(techLevel, drought) {
    this.items = {
      "Water": [drought ? 100 : 30, 3, 4, 0],
      "Furs": [250, 10, 10, 0],
      "Food": [100, 5, 5, 1],
      "Ore": [350, 20, 10, 2],
      "Games": [250, -10, 5, 3],
      "Fire arms": [1250, -75, 100, 3],
      "Medicine": [650, -20, 10, 4],
      "Machines": [900, -30, 5, 4],
      "Narcotics": [3500, -125, 150, 5],
      "Robots": [5000, -150, 100, 6]
    }  

    this.techLevel = techLevel
    this.availibleItems = {}
    for (const itemName in this.items) {
      if (this.items[itemName][3] <= techLevel) {
        this.availibleItems[itemName] = this.getScaledValue(itemName)
      }
    }

  }

  getScaledValue (itemName) {
    const [value, increasePerLevel, range, minLevel] = this.items[itemName]
    const randomScalar = getRandomInt(0, range + 1);
    const scalar = (randomScalar) / 100;
    const addOrSubtract = Math.random() >= 0.5;
    let scaledValue = 0;
    if (addOrSubtract) {
      scaledValue = (value + increasePerLevel * (this.techLevel - minLevel) + (value * scalar));
    } else {
      scaledValue = (value + increasePerLevel * (this.techLevel - minLevel) - (value * scalar));
    }

    scaledValue = scaledValue * 100;
    scaledValue = Math.round(scaledValue);
    scaledValue = scaledValue / 100;
    return Math.abs(scaledValue.toFixed(2));
  }
}

module.exports = Marketplace