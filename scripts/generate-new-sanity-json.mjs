import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const key = () => crypto.randomBytes(8).toString('hex');

const files = [
  { slug: 'privacy', title: 'PRIVACY POLICY', id: 'legal-privacy', md: 'NEW-01-privacy-policy.md' },
  { slug: 'terms', title: 'TERMS OF SERVICE', id: 'legal-terms', md: 'NEW-02-terms-of-service.md' },
  { slug: 'security', title: 'SECURITY POLICY', id: 'legal-security', md: 'NEW-03-security-policy.md' },
  { slug: 'cookies', title: 'COOKIE POLICY', id: 'legal-cookies', md: 'NEW-04-cookie-policy.md' },
  { slug: 'disclaimer', title: 'DISCLAIMER', id: 'legal-disclaimer', md: 'NEW-05-disclaimer.md' },
];

const srcDir = 'c:\\classgrid_marketting\\legal-pages-2';
const outDir = path.join(srcDir, 'new-sanity-json');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

for (const f of files) {
  const filePath = path.join(srcDir, f.md);
  if (!fs.existsSync(filePath)) continue;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const lines = raw.split(/\r?\n/);

  const sections = [];
  let currentSection = null;
  let introLines = [];
  let inIntro = true;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // H2 section header
    if (line.startsWith('## ')) {
      inIntro = false;
      const title = line.replace(/^##\s+/, '').trim();
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      currentSection = {
        _key: key(),
        id,
        title,
        content: []
      };
      sections.push(currentSection);
      continue;
    }

    if (inIntro) {
      if (line.startsWith('# ') || line.startsWith('> ') || line.startsWith('---')) continue;
      if (line.trim()) introLines.push(line.trim());
      continue;
    }

    if (!currentSection) continue;

    // H3 subheader
    if (line.startsWith('### ')) {
      currentSection.content.push({
        _key: key(),
        _type: 'block',
        style: 'h3',
        children: [{ _key: key(), _type: 'span', text: line.replace(/^###\s+/, '').trim(), marks: [] }],
        markDefs: []
      });
      continue;
    }

    // Bullet point
    if (line.startsWith('- ') || line.startsWith('* ')) {
      currentSection.content.push({
        _key: key(),
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [{ _key: key(), _type: 'span', text: line.replace(/^[-*]\s+/, '').trim(), marks: [] }],
        markDefs: []
      });
      continue;
    }

    // Numbered list
    if (/^\d+\.\s+/.test(line)) {
      currentSection.content.push({
        _key: key(),
        _type: 'block',
        style: 'normal',
        listItem: 'number',
        level: 1,
        children: [{ _key: key(), _type: 'span', text: line.replace(/^\d+\.\s+/, '').trim(), marks: [] }],
        markDefs: []
      });
      continue;
    }

    // Table line or callout
    if (line.startsWith('|') || line.startsWith('---')) continue;
    if (line.startsWith('> ')) {
      currentSection.content.push({
        _key: key(),
        _type: 'block',
        style: 'blockquote',
        children: [{ _key: key(), _type: 'span', text: line.replace(/^>\s+/, '').trim(), marks: [] }],
        markDefs: []
      });
      continue;
    }

    // Normal paragraph
    if (line.trim().length > 0) {
      currentSection.content.push({
        _key: key(),
        _type: 'block',
        style: 'normal',
        children: [{ _key: key(), _type: 'span', text: line.trim(), marks: [] }],
        markDefs: []
      });
    }
  }

  const sanityDoc = {
    _id: f.id,
    _type: 'legalPage',
    title: f.title,
    slug: { _type: 'slug', current: f.slug },
    lastUpdated: '2026-10-27T00:00:00.000Z',
    effectiveDate: '2026-10-27T00:00:00.000Z',
    intro: {
      introductionHeading: 'Introduction',
      introductionBody: introLines.join('\n\n'),
      scopeHeading: 'Scope',
      scopeBody: 'Governs all public-facing artificial intelligence services, cloud development environments, and APIs operated by Classgrid Technologies.'
    },
    sections
  };

  const outPath = path.join(outDir, `${f.slug}.json`);
  fs.writeFileSync(outPath, JSON.stringify(sanityDoc, null, 2), 'utf-8');
  console.log(`Generated Sanity JSON: ${outPath} (${sections.length} sections)`);
}

