import express from "express";
import cors from "cors";
import morgan from "morgan";

import { Success } from "./lib/Response/Success";
import { ActivitiesRouter } from "./api/activities/ActivitiesRouter";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const Router = express.Router();

app.use("/api", Router);
app.use("/api/activities", ActivitiesRouter);

Router.get("/", async (req, res) => {
    res.send(new Success(200));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
