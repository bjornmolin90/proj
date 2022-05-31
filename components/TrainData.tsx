import { useState, useEffect } from 'react';
import trainInfoModel from "../models/traininfo";
import ShowMap from "./ShowMap.tsx";

export default function TrainData({delays, setDelays, stations, setStations, navigation}) {
  const delayList = []
  const stationList = []
  useEffect(() => {
      async function allDelays() {
         setDelays(await trainInfoModel.getDelays());
     }
     allDelays()
  }, []);

  useEffect(() => {
      async function allStations() {
          setStations(await trainInfoModel.getStations());
      }
      allStations()
  }, []);

  delays.map((delay, index) => {
    let timeDiff;
    if (typeof delay.FromLocation !== "undefined") {
        timeDiff = diff(delay.AdvertisedTimeAtLocation, delay.EstimatedTimeAtLocation)
        delayList.push({"Code": delay.FromLocation[0].LocationName, "Delay" : timeDiff, "Nr": delay.AdvertisedTrainIdent, "To": delay.ToLocation[0].LocationName});
         }
    });

    let coors;
    let codes = []
    let allStations = new Object();
    delayList.forEach(element => {
        codes.push(element["Code"])
    });
    stations.map((station, index) => {
        allStations[station.LocationSignature] = station.AdvertisedLocationName;
        if (codes.includes(station.LocationSignature)) {
            coors = coord(station.Geometry.WGS84)
            stationList.push({"Name": station.AdvertisedLocationName, "Lat": parseFloat(coors[0]), "Long": parseFloat(coors[1]), "Code": station.LocationSignature})
        }
      });

  function diff(time1, time2) {
      adv = new Date(time1);
      est = new Date(time2);
      return (est.getTime() - adv.getTime()) / 1000;
  };

  function coord(coors) {
      let long = coors.split(" ")[1].replace("(", "")
      let lat = coors.split(" ")[2].replace(")", "")
      return [lat, long]
  };

  return (
    <ShowMap delayList={delayList} stationList={stationList} allStations={allStations} navigation={navigation} />
  );

}
