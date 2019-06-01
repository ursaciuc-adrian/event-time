import http from 'http';
import url from 'url';

import Event from '../models/event.model';
import Category from '../models/category.model';

import * as reader from '../utils/reader.util';
import * as writer from '../utils/writer.util';

export class EventsController {
  public async add(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    try {
      const newObj = new Event(await reader.readJson(req));
      const saveObj = await newObj.save();

      writer.writeJson(res, saveObj);
    } catch (err) {
      writer.writeJson(res, err, 400);
    }
  }

  public async get(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    try {
      const obj = await Event.find({});

      writer.writeJson(res, obj);
    } catch (err) {
      writer.writeJson(res, err, 400);
    }
  }

  public async getByCategory(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    return new Promise((resolve, reject) => {
      const queryData = url.parse(req.url, true).query;
      let addedEvents = [];
      try {
        const request = require('request');
        request({
          uri: 'https://www.eventbriteapi.com/v3/events/search/?categories=' + queryData.id,
          headers: { 'Authorization': 'Bearer ANYLLDVFBO24ROUAOV5G' },
          method: 'GET'
        }, (error, resp, body) => {
          let theBody = JSON.parse(body);
          let events = theBody.events;
          let realEvents = [];

          events.forEach(category => {
            realEvents.push(category);
          });

          realEvents.forEach(realEvent => {
            Event.count({ title: realEvent.name.text }, (err, count) => {
              if (count === 0) {
                let newObj = new Event({
                  title: realEvent.name.text,
                  description: realEvent.description.text,
                  location: '-',
                  seats: realEvent.capacity != null ? realEvent.capacity : 0,
                  coverPhoto: realEvent.logo != null ? JSON.stringify(realEvent.logo.url) : 'null',
                  date: realEvent.start.local,
                  category: realEvent.category_id // de modificat ca sa aiba referinta la un obiect de tipul categorie
                });
                addedEvents.push(realEvent);

                let saveObj = newObj.save();
              }
            })
          });

          writer.writeJson(res, JSON.stringify(addedEvents));
          resolve();
        });

      } catch (err) {
        writer.writeJson(res, err, 400);
        reject();
      }
    });
  }

  public async delete(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    const queryData = url.parse(req.url, true).query;

    try {
      const deleteObj = await Event.remove({ _id: queryData.id });

      writer.writeJson(res, deleteObj);
    } catch (err) {
      writer.writeJson(res, err, 400);
    }
  }

  public async update(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    const queryData = url.parse(req.url, true).query;

    try {
      const newObj = new Event(await reader.readJson(req));
      const updateObj = await Event.update({ _id: queryData.id }, newObj);

      writer.writeJson(res, updateObj);
    } catch (err) {
      writer.writeJson(res, err, 400);
    }
  }
}
