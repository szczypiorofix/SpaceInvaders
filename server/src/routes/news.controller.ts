import express, { NextFunction, Request, Response, Router } from "express";
import { MongoHelper } from "../helpers";
import { News } from "../models";

const newsRouter: Router = express.Router();

/**
 * GET api/news - get all news from database
 */
newsRouter.get("/", (request: Request, response: Response, next: NextFunction) => {
  MongoHelper.connect()
    .then(() => {
      News.find({}, "date text", { sort: { date: -1 } }, (err, results) => {
        if (err) {
          const responseToClient: any = {
            data: [],
            error: err,
            msg: "Ooops! Something went wrong, mister.",
            statusCode: 404,
          };
          response
            .status(responseToClient.statusCode)
            .json(responseToClient)
            .end();
        } else {
          const responseToClient: any = {
            data: results,
            error: undefined,
            msg: "Success",
            statusCode: 200,
          };
          response
            .status(responseToClient.statusCode)
            .json(responseToClient)
            .end();
        }
      });
    })
    .catch(err => console.error(err));
});

/**
 * POST api/news - insert user info into database
 */
newsRouter.post("/", (request: Request, response: Response, next: NextFunction) => {
  const text: string | undefined = request.body.text;

  if (!text) {
    const responseToClient: any = {
      data: [],
      error: "No text in header!",
      msg: "Ooops! Something went wrong, mister.",
      statusCode: 400,
    };
    response
      .status(responseToClient.statusCode)
      .json(responseToClient)
      .end();
  }

  MongoHelper.connect()
    .then(() => {
      const responseToClient: any = {
        data: [],
        error: undefined,
        msg: "Success - new information has been added to news database.",
        statusCode: 200,
      };
      const date = new Date();
      const newNews = new News({ date, text });
      newNews
        .save()
        .then(() => {
          console.info("New post has been added.");
          response
            .status(responseToClient.statusCode)
            .json(responseToClient)
            .end();
        })
        .catch(err => {
          console.error(err);
          const errorStatus: any = {
            data: [],
            error: err,
            msg: "Error",
            statusCode: 400,
          };
          response
            .status(errorStatus.statusCode)
            .json(errorStatus)
            .end();
        });
    })
    .catch(err => {
      console.error(err);
      const errorStatus: any = {
        data: [],
        error: err,
        msg: "Error",
        statusCode: 400,
      };
      response
        .status(errorStatus.statusCode)
        .json(errorStatus)
        .end();
    });
});

export { newsRouter };
