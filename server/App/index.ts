import express from "express";
import cors from "cors";
import morgan from "morgan";

import { getGPXasJSON } from "./stravaGPXParser";
import { Success } from "./Response/Success";
import { RequestError } from "./Response/Errors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const Router = express.Router();

app.use("/api", Router);

Router.get("/", async (req, res) => {
    res.send(new Success(200));
});

Router.post("/upload", async (req, res) => {
    try {
        const data = await getGPXasJSON(req.body.data);
        res.send(new Success(200, data));
    } catch (e) {
        res.send(new RequestError(400, `Invalid file ${e.message}`));
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
