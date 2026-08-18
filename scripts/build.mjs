import { copyFile, rm, mkdir, writeFile } from "node:fs/promises";

await rm("_site", {
  recursive: true,
  force: true,
});

await mkdir("_site/assets/", { recursive: true });

await copyFile("src/index.html", "_site/index.html");
await copyFile("src/assets/projects.js", "_site/assets/script.js");
await copyFile("src/projects.json", "_site/projects.json");
await copyFile("src/robots.txt", "_site/robots.txt");
await copyFile("src/sitemap.xml", "_site/sitemap.xml");

await writeFile("_site/.nojekyll", "");
