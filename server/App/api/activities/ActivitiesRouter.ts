import { Router } from "express";

import { getActivity } from "../../GPXParser";
import { DEBUG_USER_ID } from "../../constants";
import { Success } from "../../lib/Response/Success";
import { RequestError } from "../../lib/Response/Errors";
import { ActivitiesRepository } from "./ActivitiesRepository";
import db from "../../db/initKnex";
import { ActivitiesService } from "./ActivitiesService";
import { log } from "../../log";

export const ActivitiesRouter = Router();

const activitiesRepository = new ActivitiesRepository(db);
const activitiesService = new ActivitiesService(activitiesRepository);

ActivitiesRouter.post("/upload", async (req, res) => {
    try {
        const activity = await getActivity(req.body.data, DEBUG_USER_ID);
        await activitiesService.insertActivity(
            {
                activity,
                userId: DEBUG_USER_ID
            },
            res
        );
    } catch (e) {
        log(e);
        return res.send(new RequestError(400, `Invalid file ${e.message}`));
    }
    res.send(new Success(200));
});
