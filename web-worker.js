self.document = {
  getElementById(id) {

    const QUERY = `document.getElementById("${id}").innerText`

    // 2) Enviamos al Service Worker la información
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/__MAIN_THREAD__', false ) // La magia está en hacer SINCRONA esta petición AJAX
    xhr.send(QUERY) // Se envia lo mismo que se pide en el punto 1)

    // Obtenemos el DOMResponse desde el Service-Worker
    const result = xhr.responseText
    return {innerText : result}
  }
}

// 1) El web worker necesita tener la MISMA API que tenemos del Main Thread sobre el DOM
// para que un script de terceros pueda ejecutarse
const DOMResponse  = document.getElementById('app').innerText
console.log(DOMResponse) // => Hola Mundo!
