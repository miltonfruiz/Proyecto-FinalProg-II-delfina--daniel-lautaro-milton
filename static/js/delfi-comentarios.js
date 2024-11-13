document.addEventListener('DOMContentLoaded', () => {
    const commentBar = document.getElementById('commentBar');
    const commentFormContainer = document.getElementById('commentFormContainer');
    const arrow = document.getElementById('arrow');
    const commentForm = document.getElementById('commentForm');
    const commentInput = document.getElementById('commentInput');
    const commentSection = document.getElementById('commentSection');

    // Array de comentarios ficticios
    const comments = [
        { name: 'Ana García - anagarcia23@gmail.com', text: '¡Gran artículo! Me encantó leerlo.', date: '10 noviembre 2024' },
        { name: 'Carlos López - carlitossslopez@gmail.com', text: 'Interesante punto de vista, gracias por compartir.', date: '8 noviembre 2024' }
    ];

    // Función para mostrar comentarios existentes
    function displayComments() {
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <strong>${comment.name}</strong> 
                <p>${comment.text}</p>
                <span>${comment.date}</span>
            `;
            commentSection.appendChild(commentElement);
        });
    }

    // Mostrar los comentarios al cargar la página
    displayComments();

    commentBar.addEventListener('click', () => {
        commentFormContainer.classList.toggle('visible');
        arrow.classList.toggle('rotated');
    });

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita el envío del formulario y la recarga de la página

        const newCommentText = commentInput.value.trim();
        if (newCommentText) {
            // Crear un nuevo elemento de comentario
            const newComment = document.createElement('div');
            newComment.classList.add('comment');
            const today = new Date();
            const formattedDate = `${today.getDate()} ${today.toLocaleString('es-ES', { month: 'long' })} ${today.getFullYear()}`;

            newComment.innerHTML = `
                <strong>Usuario Anónimo</strong> 
                <p>${newCommentText}</p>
                <span>${formattedDate}</span>
            `;

            // Agregar el nuevo comentario a la sección de comentarios
            commentSection.appendChild(newComment);

            // Limpiar el área de texto después de enviar
            commentInput.value = '';
        }
    });
});
