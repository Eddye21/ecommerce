function ordenar(campo, orden) {
    const url = `/ordenar?campo=${campo}&orden=${orden}`;
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Error en la respuesta del servidor');
            return response.text()
        })
        .then(html => {
            document.body.innerHTML = html
        })
        .catch(error => console.error('Error al ordenar:', error));
}
