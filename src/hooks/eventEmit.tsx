import { onMounted, onBeforeUnmount } from "@vue/composition-api";

function eventEmit<K extends keyof GlobalEventHandlersEventMap>(
  el: HTMLBaseElement | Window,
  eventType: K,
  listener: EventListenerOrEventListenerObject
) {
  onMounted(() => {
    addEvent();
  });

  onBeforeUnmount(() => {
    removeEvent();
  });

  function addEvent() {
    el.addEventListener(eventType, listener);
  }

  function removeEvent() {
    el.removeEventListener(eventType, listener);
  }
}

export default eventEmit;
