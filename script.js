document.addEventListener('DOMContentLoaded', () => {
    // Si estamos en la página del inspector, generamos el árbol al cargar
    if (document.getElementById('tree-container')) {
        generarArbolDOM();
    }
});

/**
 * Función principal para generar el árbol DOM visual.
 */
function generarArbolDOM() {
    const container = document.getElementById('tree-container');
    const selector = document.getElementById('page-selector');
    const url = selector.value;

    container.innerHTML = '<p class="loading-text">Cargando y analizando el DOM de ' + url + '...</p>';

    // Creamos un iframe oculto para cargar la página y leer su DOM
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;

    iframe.onload = () => {
        try {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            
            // Limpiamos el contenedor
            container.innerHTML = '';

            // Construimos el árbol visual
            const treeRoot = construirNodoVisual(doc.documentElement);
            container.appendChild(treeRoot);
            
        } catch (error) {
            console.error("Error al acceder al DOM del iframe:", error);
            container.innerHTML = `<p style="color:red; text-align:center; padding:2rem;">Error: No se pudo acceder al DOM. Asegúrate de que el sitio esté en un servidor (GitHub Pages) y no localmente (file://) debido a políticas de CORS.</p>`;
        } finally {
            // Eliminamos el iframe después de usarlo
            document.body.removeChild(iframe);
        }
    };

    document.body.appendChild(iframe);
}

/**
 * Función recursiva que crea la estructura HTML para representar un nodo del DOM.
 * @param {HTMLElement} elemento - El nodo del DOM a procesar.
 * @returns {HTMLElement} - El elemento HTML visual.
 */
function construirNodoVisual(elemento) {
    // Ignoramos nodos que no son etiquetas HTML
    if (elemento.nodeType !== Node.ELEMENT_NODE) {
        return null;
    }

    // Creamos el contenedor del nodo
    const wrapper = document.createElement('div');
    wrapper.className = 'dom-node-wrapper';

    // Creamos la caja del nodo (la etiqueta)
    const nodeBox = document.createElement('div');
    nodeBox.className = 'dom-node';
    
    // Extraemos el nombre de la etiqueta
    const tagName = document.createElement('span');
    tagName.className = 'tag-name';
    tagName.textContent = `<${elemento.tagName.toLowerCase()}>`;
    nodeBox.appendChild(tagName);

    // Extraemos atributos importantes (id, class) para mostrarlos
    if (elemento.id) {
        const attr = document.createElement('span');
        attr.className = 'attributes';
        attr.textContent = `id="${elemento.id}"`;
        nodeBox.appendChild(attr);
    }
    if (elemento.className && typeof elemento.className === 'string') {
        const attr = document.createElement('span');
        attr.className = 'attributes';
        attr.textContent = `class="${elemento.className}"`;
        nodeBox.appendChild(attr);
    }

    wrapper.appendChild(nodeBox);

    // Procesamos los hijos recursivamente
    const childrenContainer = document.createElement('div');
    childrenContainer.className = 'dom-children';
    
    let tieneHijos = false;

    Array.from(elemento.children).forEach(hijo => {
        const nodoHijo = construirNodoVisual(hijo);
        if (nodoHijo) {
            childrenContainer.appendChild(nodoHijo);
            tieneHijos = true;
        }
    });

    // Solo añadimos el contenedor de hijos si hay hijos
    if (tieneHijos) {
        wrapper.appendChild(childrenContainer);
    }

    return wrapper;
}