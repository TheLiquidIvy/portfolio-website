# AI Content Generator

A fully functional AI content generation platform with multiple templates, history tracking, and export capabilities.

## Features

- **Content Templates**: 5 different content types
  - Blog Post: Complete articles with structure
  - Social Media: Posts optimized for engagement
  - Email: Professional correspondence
  - Product Description: Marketing copy
  - Code Comment: Documentation for developers

- **Mock AI Generation**: Pre-written variations with realistic delay simulation
- **Character/Word Counter**: Real-time input tracking
- **Generation History**: Last 20 generations saved locally
- **Export Functionality**: 
  - Copy to clipboard
  - Download as text file
- **Template Variations**: Multiple variations for each template type

## Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Styling**: Cyberpunk theme with neon colors (#00ffff, #ff00ff, #00ff41)
- **Fonts**: Orbitron, Rajdhani
- **Storage**: localStorage for history persistence

## How to Use

### Generate Content
1. Select a template from the sidebar (Blog, Social, Email, Product, Code)
2. Enter your topic or description in the input field
3. Watch the character and word count update
4. Click "Generate Content" button
5. Wait for the AI simulation (2 seconds)
6. View your generated content

### Templates

**Blog Post**: Creates comprehensive articles with:
- Introduction
- Multiple sections with headings
- Key benefits/best practices
- Conclusion

**Social Media**: Generates engaging posts with:
- Hooks and emoji
- Hashtags
- Call-to-action
- Multiple post formats

**Email**: Professional emails with:
- Subject lines
- Structured body content
- Professional sign-offs
- Various tones (announcement, introduction, update)

**Product Description**: Marketing copy with:
- Feature highlights
- Benefits
- Technical details
- Call-to-action

**Code Comment**: Documentation with:
- Function descriptions
- Parameters and returns
- Examples
- JSDoc format

### History & Export
1. View your last 20 generations in the sidebar
2. Click any history item to reload content
3. Use "Copy" to copy content to clipboard
4. Use "Download" to save as text file

## Demo Content

Each template includes 2-3 variations that are randomly selected, ensuring diverse and realistic AI-generated content for any topic you provide.

All generation history persists in localStorage across sessions.
