import { Request, Response } from "express";
import knex from "../database/connection";

class PlacesController {
  async index(request: Request, response: Response) {
    const places = await knex("places").select("*");
    return response.json(places);
  }

  async create(request: Request, response: Response) {
    const {
      title,
      description,
      times,
      region,
      weather,
      country,
    } = request.body;

    const trx = await knex.transaction();

    const place = {
      image: request.file.filename,
      title,
      description,
      times,
      region,
      weather,
      country,
    };

    const insertedIds = await trx("places").insert(place);
    await trx.commit();

    return response.json({
      id: insertedIds,
      ...place,
    });
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const place = await knex("places").where("id", id).first();
    if (!place) {
      return response.status(400).json({ message: "Place not found" });
    }

    const serializedPlace = {
      ...place,
      image_url: `http://192.168.0.109:3333/uploads/${place.image}`,
    };

    return response.json({ place: serializedPlace });
  }
}

export default PlacesController;
