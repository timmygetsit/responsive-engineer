const fs = require('fs');
const path = require('path');

const dir = 'benchmarks/responsive-content-composition';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const template = (title, body) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 0; box-sizing: border-box; }
    * { box-sizing: inherit; }
  </style>
</head>
<body>
${body}
</body>
</html>`;

const benchmarks = [
  {
    name: '01-over-padded-card.html',
    title: 'Over-Padded Card',
    body: `  <div style="padding: clamp(16px, 5vw, 64px); background: #eee;">
    <div style="padding: clamp(16px, 5vw, 48px); background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <h2>Card Title</h2>
      <p>This card has excessive padding on mobile viewports which squishes the content into a very narrow column.</p>
    </div>
  </div>`
  },
  {
    name: '02-nested-container-padding.html',
    title: 'Nested Container Padding Explosion',
    body: `  <div style="padding: clamp(8px, 4vw, 32px);">
    <div style="padding: clamp(8px, 4vw, 32px);">
      <div style="padding: clamp(8px, 4vw, 32px); background: #f9f9f9; border: 1px solid #ccc;">
        <h2>Content</h2>
        <p>Multiple nested containers compound horizontal padding, removing usable width on mobile.</p>
      </div>
    </div>
  </div>`
  },
  {
    name: '03-long-action-social.html',
    title: 'Long Action + Social Icons',
    body: `  <div style="display: flex; gap: clamp(16px, 4vw, 32px); padding: 24px; align-items: center; justify-content: space-between; background: #fafafa; flex-wrap: wrap;">
    <button style="padding: 14px 24px; font-size: 16px; white-space: normal; flex: 1 1 auto; min-height: 44px; margin-bottom: 8px;">&larr; Back to News and Announcements</button>
    <div style="display: flex; gap: 16px; flex: 0 0 auto;">
      <div style="width: 24px; height: 24px; background: #ccc; border-radius: 50%;"></div>
      <div style="width: 24px; height: 24px; background: #ccc; border-radius: 50%;"></div>
      <div style="width: 24px; height: 24px; background: #ccc; border-radius: 50%;"></div>
    </div>
  </div>`
  },
  {
    name: '04-long-button-label.html',
    title: 'Long Button Label',
    body: `  <div style="padding: 24px; width: 100%; max-width: 600px; margin: auto;">
    <button style="padding: 16px 32px; font-size: 18px; width: 100%; white-space: normal; min-height: 44px; word-wrap: break-word;">Subscribe to our Monthly Enterprise Newsletter for Updates</button>
  </div>`
  },
  {
    name: '05-dense-action-toolbar.html',
    title: 'Dense Action Toolbar',
    body: `  <div style="display: flex; gap: 16px; padding: 24px; background: #eee; flex-wrap: wrap;">
    <button style="min-height: 44px; padding: 8px 16px; flex: 1 1 auto;">Edit Profile</button>
    <button style="min-height: 44px; padding: 8px 16px; flex: 1 1 auto;">Change Password</button>
    <button style="min-height: 44px; padding: 8px 16px; flex: 1 1 auto;">Manage Notifications</button>
    <button style="min-height: 44px; padding: 8px 16px; flex: 1 1 auto;">Billing</button>
    <button style="min-height: 44px; padding: 8px 16px; flex: 1 1 auto;">Danger Zone</button>
  </div>`
  },
  {
    name: '06-card-content-hierarchy.html',
    title: 'Card Content Hierarchy',
    body: `  <div style="display: flex; padding: clamp(16px, 4vw, 32px); gap: clamp(16px, 4vw, 32px); border: 1px solid #ddd; max-width: 800px; margin: 32px auto; flex-wrap: wrap;">
    <div style="flex: 1 1 300px;">
      <span style="color: #666; text-transform: uppercase; font-size: 12px;">Article Category • 5 min read</span>
      <h2 style="margin: 8px 0;">Understanding the Implications of Large Language Models in Production</h2>
      <p style="color: #444;">A comprehensive deep dive into the architecture, deployment, and scaling of transformers in enterprise environments.</p>
    </div>
    <div style="flex: 1 1 200px;">
      <img src="placeholder.jpg" alt="Thumbnail" style="width: 100%; height: auto; aspect-ratio: 4/3; background: #ccc; object-fit: cover;">
      <button style="width: 100%; margin-top: 16px; padding: 12px; min-height: 44px;">Read Full Report</button>
    </div>
  </div>`
  },
  {
    name: '07-mobile-content-prioritization.html',
    title: 'Mobile Content Prioritization',
    body: `  <div style="padding: clamp(16px, 4vw, 24px); display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: clamp(16px, 4vw, 32px);">
    <div>
      <h2>Primary Dashboard Content</h2>
      <div style="height: 300px; background: #eee;">Chart goes here</div>
    </div>
    <aside style="background: #f9f9f9; padding: 24px;">
      <h3>Secondary Metadata</h3>
      <ul>
        <li>Last synced: 2 mins ago</li>
        <li>Active users: 1,204</li>
        <li>CPU Load: 45%</li>
      </ul>
      <p>This sidebar takes up significant space and could be collapsed or moved on mobile.</p>
    </aside>
  </div>`
  },
  {
    name: '08-long-heading-metadata.html',
    title: 'Long Heading and Metadata',
    body: `  <div style="padding: 32px; max-width: 800px; margin: auto;">
    <h1 style="font-size: clamp(24px, 6vw, 48px); line-height: 1.1; margin-bottom: 16px; word-wrap: break-word;">The Unprecedented Growth of Asynchronous Multi-Agent Systems in 2026</h1>
    <div style="display: flex; gap: 24px; flex-wrap: wrap; color: #666; border-bottom: 1px solid #eee; padding-bottom: 24px; margin-bottom: 24px;">
      <span>Published by: Dr. Jonathan Harker, PhD</span>
      <span>Date: July 27, 2026</span>
      <span>Institution: University of Advanced Computation</span>
      <span>DOI: 10.1234/async.agents.2026</span>
    </div>
    <p>Body text goes here...</p>
  </div>`
  },
  {
    name: '09-multiple-horizontal-actions.html',
    title: 'Multiple Horizontal Actions',
    body: `  <div style="padding: 24px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
    <h2>Data Table Viewer</h2>
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <button style="min-height: 44px; padding: 8px 16px;">Filter</button>
      <button style="min-height: 44px; padding: 8px 16px;">Sort</button>
      <button style="min-height: 44px; padding: 8px 16px;">Export CSV</button>
      <button style="min-height: 44px; padding: 8px 16px;">Export PDF</button>
      <button style="min-height: 44px; padding: 8px 16px;">Share</button>
    </div>
  </div>`
  },
  {
    name: '10-no-change-composition.html',
    title: 'No-Change Composition',
    body: `  <div style="padding: 16px; max-width: 600px; margin: auto;">
    <h1 style="font-size: 24px; margin-bottom: 8px;">A Properly Scaled Mobile Layout</h1>
    <p style="font-size: 16px; line-height: 1.5; color: #333;">This layout already has appropriate padding, font sizes, and readable wrapping. It doesn't need to be forced to maximum density.</p>
    <button style="width: 100%; padding: 12px; font-size: 16px; margin-top: 16px;">Continue</button>
  </div>`
  }
];

benchmarks.forEach(b => {
  fs.writeFileSync(path.join(dir, b.name), template(b.title, b.body));
});
console.log('Successfully created 10 benchmark HTML files.');
