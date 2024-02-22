import { query } from "../db";

async function getOne(id) {
    return await query("SELECT * FROM heros WHERE heroID = ?", [id]);
}

async function getAll() {
    return await query("SELECT * FROM heros");
}

async function createHero(newHero) {
    return await query(`INSERT INTO heros SET ?`, [newHero])
}

async function updateHero(updatedHero, id) {
    return await query(`UPDATE heros SET ? WHERE heroID = ?`, [updatedHero, id]);
}

async function removeHero(id) {
    return await query(`DELETE FROM heros WHERE heroID = ?`, [id]);
}

export {
    getOne, 
    getAll,
    createHero,
    updateHero,
    removeHero
}