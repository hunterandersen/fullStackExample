import express from "express";
import generateID from "../utils/index.js";
import * as heroController from "../controllers/controller.hero.js";

const router = express.Router();

router.get("/:id?", async (req, res, next) => {
    const { id } = req.params;
    let data;

    try{
        if (id) {
            data = await heroController.getOne(id);
        } else {
            data = await heroController.getAll();
        }
    } catch (err) {
        next(err);
    }

    res.status(200).json(data);
});

router.post("/", async (req, res, next) => {
    const newHero = req.body;

    //Validate the incoming data
    const requiredFields = ["name", "description", "imgPath"];

    if (requiredFields.every((field) => newHero[field])){
        let data = {};
        if (!newHero.heroID) {
            //Generate an id if it's missing
            newHero.heroID = generateID(9);
            data.createdId = newHero.heroID;
        }

        try {
            const responseData = await heroController.createHero(newHero);
            const mergedData = {...data, ...responseData}
            res.status(200).json(mergedData);
        } catch (err) {
            next(err);
        }
    } else {
        res.status(400).end("Error: Missing required field for new hero");
    }
});

router.put("/:id", async (req, res, next) => {
    const updatedHero = req.body;
    const { id } = req.params;

    //If they provide an id on the body, then ensure that it matches the URL id
    if (updatedHero.heroID && updatedHero.heroID != id) {
        res.status(400).end("Error: Provided heroID does not match URL heroID");
        return null;
    }

    try {
        const data = await heroController.updateHero(updatedHero, id);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
    
});

router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;

    if (id) {
        try {
            const dbResponse = await heroController.removeHero(id);
            res.status(200).json(dbResponse);
        } catch (err) {
            next(err);
        }
    } else {
        res.status(400).end("No hero id provided");
    }
});

export default router;