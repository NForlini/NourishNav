import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

const localizer = momentLocalizer(moment);
const DraggableCalendar = withDragAndDrop(Calendar);

export default function CalendarComponent() {
  const [events, setEvents] = useState([]);

  const onEventResize = (data) => {
    const { start, end, event } = data;
    const updatedEvent = { ...event, start, end };
    updateEvent(updatedEvent);
  };

  const onEventDrop = (data) => {
    const { start, end, event } = data;
    const updatedEvent = { ...event, start, end };
    updateEvent(updatedEvent);
  };

  const updateEvent = (updatedEvent) => {
    const updatedEvents = events.map((ev) =>
      ev.id === updatedEvent.id ? updatedEvent : ev
    );
    setEvents(updatedEvents);
  };

  const handleKeyDown = (e, slotInfo) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const newEvent = {
        id: events.length + 1,
        start: slotInfo.start,
        end: moment(slotInfo.start).add(1, "hour").toDate(),
        title: e.target.value,
      };
      setEvents([...events, newEvent]);
      e.target.value = ""; // Clear input after adding event
    }
  };

  return (
    <div>
      <DraggableCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        selectable
        onSelectSlot={(slotInfo) => {
          const eventName = prompt("Enter event name:");
          if (eventName) {
            const newEvent = {
              id: events.length + 1,
              start: slotInfo.start,
              end: moment(slotInfo.start).add(1, "hour").toDate(),
              title: eventName,
            };
            setEvents([...events, newEvent]);
          }
        }}
        style={{ height: "50vh", width: "50vw" }}
      />
    </div>
  );
}
