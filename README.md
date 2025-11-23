# Project Archive

A digital archive for managing and showcasing student projects from the Department of Computer Science and Design.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Ruby** (required for [Jekyll](https://jekyllrb.com/))
- **Node.js** (required for [Tailwind CSS](https://tailwindcss.com/))

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/violetto-rose/csd-project-archive.git
   cd csd-project-archive
   ```

2. **Install Ruby dependencies:**

   ```bash
   gem install bundler
   bundle install
   ```

3. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

### Running the Project Locally

You need to run both the CSS watcher and the Jekyll server in separate terminals:

1. **Start Tailwind CSS in watch mode:**

   ```bash
   npm run watch:css
   ```

2. **Start the Jekyll server:**
   ```bash
   bundle exec jekyll serve
   ```

Visit [http://localhost:4000](http://localhost:4000) to view the site.

## Before Committing

**Reminder:** Before committing your changes, make sure to build the latest CSS:

```bash
npm run build:css
```

This ensures your production CSS is updated and committed.

## Managing Content

All project batch data is managed in Markdown files in the `_batches/` directory.

1. Open (or create) the appropriate file: `_batches/batch-XX.md`
2. Update the front matter with the relevant links:
   ```yaml
   ---
   title: "Batch 01"
   journal_link: "https://..."
   ppt_link: "https://..."
   code_link: "https://..."
   report_link: "https://..."
   ---
   ```
3. Add or update the project description and team members in the Markdown body.

## License

This project is open source under the [MIT License](LICENSE).
