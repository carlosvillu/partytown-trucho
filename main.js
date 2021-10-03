import './style.css'

const messageChannel = new MessageChannel();
messageChannel.port1.onmessage = (event) => {
  // 4) Resolvemos la QUERY en el context del Main Thread
  navigator.serviceWorker.controller.postMessage({
    type: 'MAIN_THREAD',
    payload: eval(event.data.payload)
  });
};

window.navigator.serviceWorker.register('/service-worker.js').then(() => {
  navigator.serviceWorker.controller.postMessage({
    type: 'INIT_PORT',
  }, [messageChannel.port2]);

  new Worker('/web-worker.js')
})
