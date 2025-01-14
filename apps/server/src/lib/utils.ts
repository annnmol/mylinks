import { NextFunction, Request, Response } from "express";

//custom imports
import { PORT } from "./config";

export async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const healthCheckLogging = (request: Request, response: Response) => {
  console.log(`[Health Check] ---Server is running at PORT: ${PORT}`);
  response.send(`[Health Check] --- Hello! Server is running at PORT: ${PORT}`);
  response.end();
};

export const errorHandlingLogging = (request: Request, response: Response) => {
  const error = new Error("route not found");
  console.error(`Route not found`);
  response.status(404).json({
    message: error.message,
  });
};

export const incomingRequestLogging = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.info(
    `REQUEST METHOD: [${request.method}] - URL: [${
      request.url
    }] - BODY: ${JSON.stringify(request.body)}`
  );

  response.on("finish", () => {
    console.info(
      `RESPONSE METHOD: [${request.method}] - URL: [${request.originalUrl}] - STATUS: [${response.statusCode}]`
    );
  });

  next();
};

export const excludeKeys = (obj: any, keys: string[]): any => {
  const newObj = { ...obj };
  keys?.forEach((key: string) => {
    delete newObj?.[key];
  });
  return newObj;
};
