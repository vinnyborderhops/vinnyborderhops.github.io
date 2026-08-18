async function loadProjects() {
  const container = document.getElementById("projects");

  try {
    const response = await fetch("projects.json");

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

  card.className =
    "group flex min-h-64 flex-col rounded-2xl border border-stone-800 " +
    "bg-stone-900/60 p-6 transition hover:-translate-y-1 " +
    "hover:border-orange-400/70 hover:bg-stone-900 focus:outline-none " +
    "focus-visible:ring-2 focus-visible:ring-orange-400 " +
    "focus-visible:ring-offset-4 focus-visible:ring-offset-stone-950";

  card.href = project.url;
  card.target = "_blank";
  card.rel = "noopener noreferrer";
  card.setAttribute("aria-label", `View ${project.title}`);

  const number = String(index + 1).padStart(2, "0");

  const header = document.createElement("div");
  header.className = "mb-8 flex items-start justify-between gap-4";

  const metadata = document.createElement("span");
  metadata.className =
    "font-mono text-xs uppercase tracking-widest text-stone-500";
  metadata.textContent = `${number} / ${project.category}`;

  const arrow = document.createElement("span");
  arrow.className =
    "text-xl text-stone-500 transition group-hover:-translate-y-0.5 " +
    "group-hover:translate-x-0.5 group-hover:text-orange-400";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";

  header.append(metadata, arrow);

  const title = document.createElement("h3");
  title.className = "text-xl font-semibold text-white";
  title.textContent = project.title;

  const description = document.createElement("p");
  description.className = "mt-3 flex-1 text-sm leading-6 text-stone-400";
  description.textContent = project.description;

  const languages = document.createElement("div");
  languages.className = "mt-7 flex flex-wrap gap-2";
  languages.setAttribute("aria-label", "Languages used");

  for (const language of project.languages ?? []) {
    const tag = document.createElement("span");

    tag.className =
      "rounded-full border border-stone-700 px-3 py-1 " +
      "font-mono text-xs text-stone-300";

    tag.textContent = language;

    languages.append(tag);
  }

  card.append(header, title, description, languages);

  return card;
}

loadProjects();
