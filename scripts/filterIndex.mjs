// https://cdn.jsdelivr.net/gh/o-murphy/a7pIndex@master/assets/profiles.json

import fs from 'fs';


const fileBuffer = fs.readFileSync('assets/profiles.json');
const jsonObject = JSON.parse(fileBuffer);

// Filter function
const filterIndex = (data, criteria) => {
    return data.filter(item => {
        // For each item, check if all criteria are met
        return Object.keys(criteria).every(key => {
            return item[key] === criteria[key];
        });
    });
};


console.log(filterIndex(
    jsonObject.profiles,
    {
        caliber: jsonObject.uniqueKeys.calibers[0],
        weight: 745
    }
))

