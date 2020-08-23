import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";

import { Success } from "./lib/Response/Success";
import { ActivitiesRouter } from "./api/activities/ActivitiesRouter";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));

const Router = express.Router();

app.use(express.static(__dirname));
app.use(express.static(path.resolve("../dist-client")));

app.use("/api", Router);
app.use("/api/activities", ActivitiesRouter);

Router.get("/", async (req, res) => {
    res.send(new Success(200));
});

app.get('/*',  (req, res) => {
    res.sendFile(path.resolve('../dist-client/index.html'));
  });

app.listen(port, () => {
    console.log(`Example app listening at port:${port}`);
});
