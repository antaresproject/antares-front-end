const EventEmitter2 = require('eventemitter2').EventEmitter2;

window.antaresEvents = new EventEmitter2({
  wildcard: true,
  delimiter: '::',
  newListener: true,
  maxListeners: 40,
  verboseMemoryLeak: true
});

// listeners

const systemComponents = {
  datatables: false,
  gridstack: false,
  vue: false,
  notifications: false
};

function perfLog() {
  // console.log(systemComponents);
}

antaresEvents.once('performance.gridstack_loaded', () => {
  systemComponents.gridstack = true;
  perfLog();
});

antaresEvents.once('performance.datatables_loaded', () => {
  systemComponents.datatables = true;
  perfLog();
});

antaresEvents.once('performance.vue_loaded', () => {
  systemComponents.Vue = true;
  perfLog();
});

antaresEvents.once('performance.notifications', () => {
  systemComponents.notifications = true;
  perfLog();
});

antaresEvents.onAny((event, value) => {
  // console.log(event);
});
