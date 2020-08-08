## Simple GPX parser & viewer

Facilitates parsing a GPX file from Garmin or Strava into JSON. The parser is wrapped by a small
nodeJS express app, data is stored in a postgres database. 

Graphs are displayed by the client, currently the ui is very bare bones. A list of uploaded activities clicking on one will display a bar chart.

## How to use

1. fire up client -> `localhost:5000`
    - `npm install`
    - `npm start`

2. fire up server -> `localhost:3000`
    - `npm install`
    - `npm start`
    
From the ui upload a GPX file, and then view the data in a chart
