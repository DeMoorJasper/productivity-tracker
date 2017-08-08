const mainContainer = $("main #counters");
const readData = require('electron').remote.require('../src/readData');
const items = readData.getItems();

const clickAddHours = function (e) {
    e.preventDefault();
    const itemName = $(this).parents("article").find("h3").html();
    for (let item of items) {
        if (item.name === itemName) {
            item.hours ++;
        }
    }
    fillMain();
    readData.saveItems(items);
};

const fillMain = function() {
    let result = "";
    
    for (let item of items) {
        result += '<article>';
        result += `<h3>${item.name}</h3>`;
        result += `<p class="hours">${item.hours}</p>`;
        result += '<h4>hours</h4>';
        result += '<a id="add">ADD AN HOUR</a>';
        result += '</article>';
    }

    mainContainer.html(result);
    $("a#add").on("click", clickAddHours);
};

const addItem = function(e) {
    e.preventDefault();
    const name = $(this).find("#name").val();
    let count = $(this).find("#count").val();
    if (name !== "" && count !== "" && !isNaN(count)) {
        count = parseInt(count);
        const item = {
            name: name,
            hours: count
        };
        items.push(item);
        fillMain();
        readData.saveItems(items);
    }
};

$(document).ready(function() {
    $("#addItem").on("submit", addItem);
    fillMain();
});