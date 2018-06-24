'use strict';

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


module.exports = {
  'port': 3000,
  'snacks': [
    {id: '1', name: 'Oranges', votes: randomInt(0, 100)},
    {id: '2', name: 'Apples', votes: randomInt(0, 100)},
    {id: '3', name: 'Beef Sticks', votes: randomInt(0, 100)},
    {id: '4', name: 'Dried Pineapple', votes: randomInt(0, 100)},
    {id: '5', name: 'Cheese Crackers', votes: randomInt(0, 100)},
    {id: '6', name: 'Oatmeal', votes: randomInt(0, 100)},
    {id: '7', name: 'Trail Mix', votes: randomInt(0, 100)},
    {id: '8', name: 'Generic Snack A', votes: randomInt(0, 100)},
    {id: '9', name: 'Generic Snack B', votes: randomInt(0, 100)}
  ],
  token: '33b55673-57c7-413f-83ed-5b4ae8d18827',
  entropyAllowed: true,
  entropyEnabled: false,
  entropyChance: 0
};
