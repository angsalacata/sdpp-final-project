from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Table, select
from sqlalchemy.orm import sessionmaker
import db
import logging
from flask import Flask, jsonify, request, send_file, Response, make_response
import requests
import os
from dotenv import load_dotenv 
import datetime
import time
import pytz

load_dotenv(dotenv_path=".env")

engine, metadata = db.get_connection()
Session = sessionmaker(engine)

mixes_table = Table('mixes', metadata, autoload=True)
shows_table = Table('shows', metadata, autoload=True)

RADIO_CULT_URI = os.getenv('RADIO_CULT_URI')
RADIO_CULT_STATION_ID = os.getenv('RADIO_CULT_STATION_ID')
RADIO_CULT_KEY = os.getenv('RADIO_CULT_KEY')

class Archive:
    def get_archive(items_limit, offset):
        archive_sql = """
           SELECT mixes.mixname, shows.showname, mixes.bucketkey, mixes.description, mixes.genre, mixes.genre2, 
           mixes.genre3, mixes.genre4, mixes.imagekey, shows.mixfolder, shows.imagefolder, shows.showslug, mixes.explicit, 
           mixes.tracklistid, mixes.airdate, shows.location, shows.hostname, mixes.guest, mixes.live, mixes.mixid from mixes
           INNER JOIN shows on mixes.showid=shows.showid
           ORDER BY TIMESTAMP(mixes.airdate) DESC
           LIMIT %s OFFSET %s
        """ % (items_limit, offset)

        try:
            archive = []
            with Session() as session:
                rows = session.execute(archive_sql)

                for row in rows:

                    print(row)
                    print(type(row))
                    print(len(row))
                    print('\n')

                    dict = {
                    'mixName': row[1],
                    'showName': row[2],
                    'mixKey': db.getResourceURL(row[3], row[10]),
                    'description': row[4],
                    'genre': [row[5], row[6], row[7], row[8]],
                    'image': db.getResourceURL(row[9], row[11]),
                    'showslug': row[12],
                    'explicit': row[13],
                    'tracklistid': row[14], 
                    'airdate': row[15],
                    'location': row[16],
                    'hostName': row[17],
                    'guest': row[18],
                    'live': row[19],
                    'mixid': row[0]
                    }

                    archive.append(dict)
                    print(dict)

            return jsonify(archive)
    
        except Exception as e:
            logging.error("error connecting to db from /archive",)
            return jsonify({
                'errormsg': "error retrieving archive: " + str(e)
            })
        
class Schedule:    
    # startDate=<iso_timestamp>&endDate=<iso_timestamp>'
    def get_schedule():
        # grab the schedule for one week starting with day to day + 1 week
        # GET /api/station/:stationId/schedule?startDate=<iso_timestamp>&endDate=<iso_timestamp>
        api = f'{RADIO_CULT_URI}/api/station/{RADIO_CULT_STATION_ID}/schedule?'
        today = datetime.date.today()
        
        today_midnight = datetime.datetime.combine(today, datetime.time()).isoformat(timespec='microseconds')

        next_week = datetime.datetime.combine((today + datetime.timedelta(days=7)), datetime.time()).isoformat(timespec='microseconds')

        print(today_midnight)
        print(next_week)
        
        schedule_uri = f'{api}startDate={today_midnight}Z&endDate={next_week}Z'
        print(schedule_uri)

        try:
            print("ATTEMPTING TO GET SCHEDULE DATA")
            res = requests.get(schedule_uri, data={'key': RADIO_CULT_KEY})
            return res.json() 
        
        except Exception as e:
            logging.error("error grabbing schedule",)
            return jsonify({
                'errormsg': "error retrieving schedule: " + str(e)
            })
        

class StreamingObject():
    def get_streaming_object():
        # get metadata object for live schedule with GET /api/station/:stationId/schedule/live

        # append the stream url
        pass