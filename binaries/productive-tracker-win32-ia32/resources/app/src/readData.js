const fs = require("fs");

const getItems = () => {
    const data = fs.readFileSync("./data/items.json").toString('utf-8');
    if (data) {
        return JSON.parse(data);
    }
    return null;
}

const saveItems = (data) => {
    if (data) {
        return fs.writeFileSync("./data/items.json", JSON.stringify(data));
    }
    return null;
}

exports.getItems = getItems;
exports.saveItems = saveItems;