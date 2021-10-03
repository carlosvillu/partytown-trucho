let res, port
function requestHandler (evt) {
  if(!evt.request.url.includes('__MAIN_THREAD__')) {
    return fetch(evt.request)
  }

  return new Promise(async (resolve) => {
    res = resolve
    const payload = await evt.request?.text()
    // 3) Enviamos al Main Thread nuestra QUERY
    port.postMessage({payload})
  })
}

self.addEventListener('message', evt => {

  switch(evt?.data?.type) {
    case 'INIT_PORT': {
      [port] = evt.ports
      break;
    }
    case 'MAIN_THREAD': {
      // 5) REspondemos a nuesta petición AJAX con la respuesta que viene del Main Thread
      return res(new Response(JSON.stringify(evt.data.payload), {'Content-Type': 'plain/text'}))
    }
    default: {
      console.error('UNKOWN TYPE', evt?.data?.type)
    }
  }

})

self.addEventListener('install', function() {
  self.skipWaiting();
});

self.addEventListener('fetch', async evt => {
  evt.respondWith(requestHandler(evt))
})

