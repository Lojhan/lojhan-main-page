# Contributing to the Documentation

Thank you for your interest in contributing to our documentation! This guide will help you understand how to add or modify content effectively.

## Content Structure

Our documentation is bilingual, with content available in both English (en-US) and Portuguese (pt-BR). The content is organized as follows:

```map
public/content/
├── en-US/     # English content
│   ├── README.md
│   ├── golang/
│   │   ├── README.md
│   │   ├── struct_tags.md
│   │   └── ...
│   └── dotnet/
│       └── ...
└── pt-BR/     # Portuguese content
    ├── README.md
    ├── golang/
    │   ├── README.md
    │   ├── struct_tags.md
    │   └── ...
    └── dotnet/
        └── ...
```

## Contribution Guidelines

### General Principles

1. **Bilingual Content** - All content should be available in both English and Portuguese
2. **Technical Accuracy** - Ensure all technical information is correct and up-to-date
3. **Clear Examples** - Include practical code examples when appropriate
4. **Consistent Style** - Follow the established style and formatting guidelines

### Adding New Content

When adding new content, please follow these steps:

1. **Create both language versions** - Content must be added in both `/en-US/` and `/pt-BR/` directories
2. **Maintain parallel structure** - Keep the same file paths and names across both language versions
3. **Include proper metadata** - Add appropriate headers and metadata to both versions
4. **Link properly** - Ensure all internal links work in both language versions

### Formatting Guidelines

- Use Markdown for all documentation
- Include a clear title at the top of each document
- Use proper heading hierarchy (# for title, ## for main sections, etc.)
- Format code examples with proper syntax highlighting:
  ```go
  // Example Go code
  func example() string {
      return "This is an example"
  }
  ```

## Pull Request Process

### Before Creating a PR

1. **Check existing content** - Ensure your contribution doesn't duplicate existing material
2. **Test locally** - Make sure your changes render correctly in the site

### Creating a Pull Request

1. Fork the repository
2. Create a new branch for your changes
3. Make your changes to both language versions
4. Commit your changes with clear, descriptive commit messages
5. Push your changes to your fork
6. Submit a pull request to the main repository

### PR Description

When submitting a pull request, please include:

- A clear description of what your PR adds or changes
- Confirmation that you've added the content in both languages
- Any additional context that would help reviewers

### Review Process

After submitting your PR:

1. Maintainers will review your changes
2. You may receive feedback requesting changes
3. Once approved, your content will be merged into the main documentation

## Translation Guidelines

When creating content in both languages:

- Don't simply use machine translation
- Adapt examples and explanations to be culturally appropriate
- Maintain the same technical accuracy in both versions
- If you're only fluent in one language, you can submit in that language and request help with translation

Thank you for contributing to making our documentation better for everyone!

## Authors:

- [Lojhan](https://github.com/Lojhan)