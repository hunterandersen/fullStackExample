export default function generateID(idLength) {
    let id = "";
    for (let i = 0; i < idLength; i++) {
        //Imperfect number generation
        //If you want safely generated id's look into the built-in "crypto" object in JS
        //https://developer.mozilla.org/en-US/docs/Web/API/Crypto

        const randInt = Math.floor(Math.random() * 9);
        id += randInt;
    }

    //This produces an id with the type of Number
    //Your database might use string id's, so you'd leave it as is
    return Number(id);
}