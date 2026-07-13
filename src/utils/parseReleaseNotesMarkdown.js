import { marked } from 'marked';

const getMetadataValue = (section, key) => {
  const match = section.match(new RegExp(`\\| ${key} \\| (.+?) \\|`));
  return match ? match[1].trim() : '';
};

const parsePostDate = (dateStr) => {
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) {
    return dateStr;
  }
  return parsed.toISOString().substring(0, 10);
};

const normalizeVersion = (version) => version.replace(/^v/i, '');

const configureMarkedRenderer = () => {
  const renderer = new marked.Renderer();
  const defaultLink = renderer.link.bind(renderer);

  renderer.link = (href, title, text) => {
    const link = defaultLink(href, title, text);
    if (href && (href.startsWith('http') || href.startsWith('mailto:'))) {
      return link.replace('<a ', '<a target="_blank" rel="noreferrer" ');
    }
    return link;
  };

  marked.setOptions({
    renderer,
    gfm: true,
    breaks: false,
  });
};

configureMarkedRenderer();

const markdownToHtml = (markdown) => marked.parse(markdown || '');

const parseReleaseNoteSection = (section) => {
  const titleMatch = section.match(/^# CCDI Data Catalog Release (.+)/m);
  const dateMatch = section.match(/^### (.+?) \| Release Notes/m);
  const metadataStart = section.search(/\n\| Property \| Value \|\s*\n/);

  if (!titleMatch || metadataStart === -1) {
    return null;
  }

  const headerEndMatch = section.match(/^### .+ \| Release Notes\s*\n/m);
  const headerEnd = headerEndMatch
    ? section.indexOf(headerEndMatch[0]) + headerEndMatch[0].length
    : section.indexOf('\n') + 1;

  const bodyMarkdown = section.substring(headerEnd, metadataStart).trim();
  const version = normalizeVersion(getMetadataValue(section, 'version'));
  const dateStr = dateMatch ? dateMatch[1].trim() : '';

  return {
    release_key: getMetadataValue(section, 'id'),
    title: titleMatch[0].replace(/^# /, '').trim(),
    version,
    post_date: parsePostDate(dateStr),
    content_type: getMetadataValue(section, 'contentType'),
    description: markdownToHtml(bodyMarkdown),
    slug: getMetadataValue(section, 'slug'),
    log_type: 1,
  };
};

export default function parseReleaseNotesMarkdown(markdownText) {
  const sections = markdownText.split(/\n(?=# CCDI Data Catalog Release )/);

  return sections
    .map(parseReleaseNoteSection)
    .filter(Boolean)
    .sort((a, b) => new Date(b.post_date) - new Date(a.post_date))
    .map((item, index) => ({
      ...item,
      id: index + 1,
    }));
}
