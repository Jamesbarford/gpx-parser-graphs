import { Router } from "express";

import { getActivity } from "../../GPXParser";
import { Success } from "../../lib/Response/Success";
import { RequestError } from "../../lib/Response/Errors";
import { ActivitiesRepository } from "./ActivitiesRepository";
import db from "../../db/initKnex";
import { ActivitiesService } from "./ActivitiesService";
import { log } from "../../log";
import { parseAsNumberOrThrow } from "../../GPXParser/lib/parsers/parsers";

export const ActivitiesRouter = Router();

const activitiesRepository = new ActivitiesRepository(db);
const activitiesService = new ActivitiesService(activitiesRepository);


ActivitiesRouter.get("/:userId/", async (req, res) => {
    try {
        const userId = req.params.userId;

        const response = await activitiesService.getAll({ userId });

        return res.send(new Success(200, response));
    } catch (e) {
        log(e);
        return res.send(new RequestError(400, e.message));
    }
});

ActivitiesRouter.get("/count/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const response = await activitiesService.getCount({ userId });

        return res.send(new Success(200, response));
    } catch (e) {
        log(e);
        return res.send(new RequestError(400, e.message));
    }
});


ActivitiesRouter.post("/upload", async (req, res) => {
    try {
        const userId = req.body.userId;
        const activity = await getActivity(req.body.data, userId);

        await activitiesService.insertActivity({ activity, userId });

        return res.send(new Success(204));
    } catch (e) {
        log(e);
        return res.send(new RequestError(400, e.message));
    }
});

ActivitiesRouter.get("/range/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const month = parseAsNumberOrThrow(req.query.month);
        const year = parseAsNumberOrThrow(req.query.year);

        const response = await activitiesService.getActivitiesForMonth({ userId, month, year });

        return res.send(new Success(200, response));
    } catch (e) {
        log(e);
        return res.send(new RequestError(400, e.message));
    }
});

ActivitiesRouter.get("/userId/:userId/date/:date", async (req, res) => {
    try {
        const userId = req.params.userId;
        const date = req.params.date;
        const response = await activitiesService.getSingle({ userId, date });

        return res.send(new Success(200, response));
    } catch (e) {
        log(e);
        return res.send(new RequestError(400, e.message));
    }
});
