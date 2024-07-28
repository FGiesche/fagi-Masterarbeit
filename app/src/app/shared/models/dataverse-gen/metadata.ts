/* eslint-disable*/
import { at_eventMetadata } from "./entities/at_Event";
import { at_eventregistrationMetadata } from "./entities/at_EventRegistration";
import { contactMetadata } from "./entities/Contact";

export const Entities = {
  at_Event: "at_event",
  at_EventRegistration: "at_eventregistration",
  Contact: "contact",
};

// Setup Metadata
// Usage: setMetadataCache(metadataCache);
export const metadataCache = {
  entities: {
    at_event: at_eventMetadata,
    at_eventregistration: at_eventregistrationMetadata,
    contact: contactMetadata,
  },
  actions: {
  }
};