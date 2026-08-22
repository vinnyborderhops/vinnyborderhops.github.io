async function loadProjects() {
  const container = document.getElementById("projects");

  try {
    const response = await fetch("assets/data/projects.json");

    if (!response.ok) {
      throw new Error(`Failed to load projects: ${response.status}`);
    }

    const projects = await response.json();

    projects.forEach((project, index) => {
      container.append(createProjectCard(project, index));
    });
  } catch (error) {
    console.error(error);

    const message = document.createElement("p");
    message.className = "text-sm text-stone-400";
    message.textContent = "Unable to load projects.";

    container.append(message);
  }
}

function createProjectCard(project, index) {
  const card = document.createElement("a");

  card.className = "group project-card";

  card.href = project.url;
  card.target = "_blank";
  card.rel = "noopener noreferrer";
  card.setAttribute("aria-label", `View ${project.title}`);

  const number = String(index + 1).padStart(2, "0");

  const header = document.createElement("div");
  header.className = "project-card-header";

  const metadata = document.createElement("span");
  metadata.className = "project-card-meta";
  metadata.textContent = `${number} / ${project.category}`;

  const arrow = document.createElement("span");
  arrow.className = "project-card-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";

  header.append(metadata, arrow);

  const title = document.createElement("h3");
  title.className = "project-card-title";
  title.textContent = project.title;

  const description = document.createElement("p");
  description.className = "project-card-description";
  description.textContent = project.description;

  const languages = document.createElement("div");
  languages.className = "project-card-tags";
  languages.setAttribute("aria-label", "Languages used");

  for (const language of project.languages ?? []) {
    const tag = document.createElement("span");

    tag.className = "project-card-tag";

    tag.textContent = language;

    languages.append(tag);
  }

  card.append(header, title, description, languages);

  return card;
}

loadProjects();
