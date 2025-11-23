# Project Archive 2022

A digital archive website designed to manage and showcase student projects from the 2022 batch. Built with **Jekyll** and styled with **Tailwind CSS**, featuring a clean, file-system inspired aesthetic.

## 🚀 Features

- **Batch Management**: Organized structure for 15+ student batches.
- **Artifact Tracking**: Dedicated sections for Journals, Presentations, Source Code/Deployment, and Reports.
- **Responsive Design**: Mobile-friendly layout with a collapsible sidebar.
- **Static & Fast**: Zero-config deployment to GitHub Pages.
- **Custom Styling**: "Archive" theme using the _Space Mono_ typeface.

## 🛠️ Tech Stack

- **Core**: [Jekyll](https://jekyllrb.com/) (Static Site Generator)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Font**: [Space Mono](https://fonts.google.com/specimen/Space+Mono)

## 🏁 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Ruby** (for Jekyll)
- **Node.js** (for Tailwind CSS)

### Installation

1.  **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd project-archive-2022-batch
    ```

2.  **Install Ruby dependencies**:

    ```bash
    gem install bundler
    bundle install
    ```

3.  **Install Node dependencies**:
    ```bash
    npm install
    ```

### Running Locally

To work on the site, you need to run two processes (or run them sequentially):

1.  **Build CSS** (Watch mode):

    ```bash
    npm run watch:css
    ```

2.  **Start Jekyll Server**:
    ```bash
    bundle exec jekyll serve
    ```

Visit `http://localhost:4000` to view the site.

## 📝 Managing Content

Content is managed via Markdown files in the `_batches/` directory.

1.  Open `_batches/batch-XX.md`.
2.  Update the **Front Matter** with links:
    ```yaml
    ---
    title: "Batch 01"
    journal_link: "https://..."
    ppt_link: "https://..."
    code_link: "https://..."
    report_link: "https://..."
    ---
    ```
3.  Update the description and team members in the markdown body.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
