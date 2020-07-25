## Simple GPX parser

Facilitates parsing a GPX file from Garmin or Strava into JSON. The parser is wrapper in a small
nodeJS express app. 

current response is:

```$ts

interface GPSInJSON {
    date: string // ISO format;
    runName: string;
    mins: string; // 20:41
    avgHeartRateWholeRun: number | undefined;
    distanceMiles: number;
    distanceKm: number;
    avgSpeedMile: string; // mins per mile, formatted e.g 6:43
    avgSpeedKm: string; // mins per km, formatted e.g 4:12
    avgMileSpeedArr: Array<SpeedAndDistance>;
    avgKmSpeedArr: Array<SpeedAndDistance>; // e.g 3 km = length 3.
    avgHeartRateMiles: Array<number>;
    avgHeartRateKm: Array<number>;
    allSpeedsInKm: Array<SpeedAndDistance>; // break down for the whole run between each GPS point. (huge)
}

interface SpeedAndDistance {
    speed: number; 
    distance: number;
    distanceFormat: Enum<"miles" | "km">;
    formattedSpeed: string; // miles -> 6:43, km -> 4:12
}
```

## How to use

1. fire up client -> `localhost:5000`
    - `npm install`
    - `npm start`

2. fire up server -> `localhost:3000`
    - `npm install`
    - `npm start`
    
From the ui upload a GPX file or via curl, do something with the `JSON` 🥳 
