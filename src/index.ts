import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

//middlewares
import { createTResult } from "@src/core/mappers/tresult.mapper";

//router
import apiRouter from "@src/modules/api.router";
import fileUpload from "express-fileupload";

//server
const app = express();

// 🚀 usar puerto dinámico para Railway
const PORT = process.env.PORT || 4444;

app.use([express.json(), helmet(), cors(), morgan("dev"), fileUpload()]);

app.use(
  "/swagger",
  swaggerUi.serve,
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const swaggerDocument = YAML.load(path.join(__dirname, "../../swagger.yaml"));
    const swaggerUiHandler = swaggerUi.setup(swaggerDocument);
    swaggerUiHandler(req, res, next);
  }
);

app.use("/api/v1", apiRouter);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Unhandled error:", err);
    res
      .status(err.status || 500)
      .json(createTResult<any>(null, err.message));
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
