import parseReleaseNotesMarkdown from '../utils/parseReleaseNotesMarkdown';

const markdownUrl = `${process.env.REACT_APP_RELEASE_NOTES_MARKDOWN_URL}/site_announcement_log.md`;

let cachedReleaseNotes = null;

const fetchAndNormalizeReleaseNotes = async () => {
  if (cachedReleaseNotes) {
    return cachedReleaseNotes;
  }

  const response = await fetch(markdownUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch release notes markdown: ${response.status}`);
  }

  const markdownText = await response.text();
  cachedReleaseNotes = parseReleaseNotesMarkdown(markdownText);

  return cachedReleaseNotes;
};

export async function getSiteUpdates(body) {
  const allNotes = await fetchAndNormalizeReleaseNotes();
  const pageInfo = body?.pageInfo || { page: 1, pageSize: 20 };
  const page = pageInfo.page || 1;
  const pageSize = pageInfo.pageSize || 20;
  const start = (page - 1) * pageSize;
  const data = allNotes.slice(start, start + pageSize);

  return { status: 'success', data };
}

export async function getWidgetUpdates() {
  const allNotes = await fetchAndNormalizeReleaseNotes();
  const data = allNotes.slice(0, 3).map((note) => ({
    ...note,
    description: note.slug || note.description,
  }));

  return { status: 'success', data };
}
