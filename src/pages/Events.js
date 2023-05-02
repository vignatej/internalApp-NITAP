import PhotosSlider from "../eventComponents/PhotosSlider";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import EventTile from "../eventComponents/EventTile";
import { baseUrl } from "../fixed";

const Events = () => {
  const [events, setEvents] = useState({ live: [], up: [], com: [] });
  const [slides, setSlides] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const r = await fetch(`${baseUrl}/events`);
      if (!r.ok) {
        throw new Error("can't fetch");
      }
      const res = await r.json();
      console.log(res);
      const liv = [];
      const up = [];
      const com = [];
      const sli = []
      for (const i in res) {
        const st = new Date(res[i].startDateTime);
        const dat = new Date();
        const en = new Date(res[i].endDateTime);
        if (dat < st) {
          up.push(res[i]);
        } else if (st <= dat && dat <= en) {
          liv.push(res[i]);
          sli.push({url:`${baseUrl}${res[i].image}`})
        } else {
          com.push(res[i]);
        }setSlides((prev)=>{
          return {url: res[i], ...prev};
        })
      }
      setEvents({ live: liv, up: up, com: com });
      console.log(sli);
      setSlides(sli);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      {/* {events.live && slides && <PhotosSlider imagess={slides} />} */}
      <div className="mx-24 grid lg:grid-cols-3 md:grid-cols-2 gap-8 ">
        {events.live.map((item) => (
          <EventTile item={item} key={item.id} />
        ))}
        {events.up.map((item) => (
          <EventTile item={item} key={item.id} />
        ))}
        {events.com.map((item) => (
          <EventTile item={item} key={item.id} />
        ))}
      </div>
    </>
  );
};

export default Events;
