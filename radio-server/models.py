from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Table, select
from sqlalchemy.orm import sessionmaker
import db
import logging
from flask import Flask, jsonify, request, send_file, Response, make_response

engine, metadata = db.get_connection()
Session = sessionmaker(engine)

mixes_table = Table('mixes', metadata, autoload=True)
shows_table = Table('shows', metadata, autoload=True)


class Archive():
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
        
class Schedule():
    def get_schedule():
        pass

class StreamingObject():
    def get_streaming_object():
        pass