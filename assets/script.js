import projects from './db.js';

const container = document.getElementById('container');

// Loop through each project and create an anchor element
projects.forEach(project => {
    // Create the anchor element
    const anchor = document.createElement('a');

    // Set the required attributes
    anchor.setAttribute('href', project.link);
    // anchor.setAttribute('rel', 'noopener noreferrer');
    anchor.setAttribute('target', '_blank');

    // Set the inner text of the anchor
    anchor.textContent = project.name;

    // Append the anchor to the container
    container.appendChild(anchor);
});
