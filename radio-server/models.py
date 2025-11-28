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


        archive_count_sql = """
           SELECT COUNT(*) from mixes
           INNER JOIN shows on mixes.showid=shows.showid
           WHERE (TIMESTAMPDIFF(SECOND, mixes.airdate, TIMESTAMP(NOW())) >= 0)
        """


        try:
            archive = []
            with Session() as session:
                rows = session.execute(archive_sql)

                num_mixes = session.execute(archive_count_sql).fetchone()[0]
                num_pages = int(num_mixes/items_limit)

                for row in rows:
                    dict = {
                    'mixName': row[0],
                    'showName': row[1],
                    'mixKey': db.getResourceURL(row[2], row[9]),
                    'description': row[3],
                    'genre': [row[4], row[5], row[6], row[7]],
                    'image': db.getResourceURL(row[8], row[10]),
                    'showslug': row[11],
                    'explicit': row[12],
                    'tracklistid': row[13], 
                    'airdate': row[14],
                    'location': row[15],
                    'hostName': row[16],
                    'guest': row[17],
                    'live': row[18],
                    'mixid': row[19]
                    }

                    archive.append(dict)

            return jsonify({
                'archive': archive,
                'numPages': num_pages
                })
    
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