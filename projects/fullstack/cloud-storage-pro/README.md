# Cloud Storage Pro

A fully functional cloud storage platform with file management, folder navigation, sharing, and preview capabilities.

## Features

- **File Upload**: Upload files using the File API with support for images and text files
- **Folder Management**: Create, navigate, and delete folders with hierarchical structure
- **Breadcrumb Navigation**: Easy navigation through folder hierarchy
- **File Preview**: View images and text files directly in the browser
- **File Sharing**: Generate encrypted share links for files
- **Encryption Simulation**: Mock end-to-end encryption for shared files
- **File Management**: Delete files and folders
- **Download Files**: Export files from the storage
- **Storage Statistics**: Track total files, storage used, and shared files

## Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **File API**: Browser File API for file upload simulation
- **Styling**: Cyberpunk theme with neon colors (#00ffff, #ff00ff, #00ff41)
- **Fonts**: Orbitron, Rajdhani
- **Storage**: localStorage for files and folders persistence

## How to Use

### File Management
1. Click "Upload File" to add files from your computer
2. Files are processed using the browser's File API
3. Images and text files can be previewed
4. Click on any file to preview its content

### Folder Organization
1. Click "New Folder" to create folders
2. Click on folders to navigate inside
3. Use breadcrumb navigation to move back
4. Delete folders to remove them and their contents

### File Sharing
1. Click "Share" button on any file
2. File is marked as shared with encryption enabled
3. Copy the generated share link
4. Link expiration time is displayed (7 days)

### File Preview
1. Click on any file to open preview
2. Images are displayed directly
3. Text files show content
4. Download or share from preview modal

## Demo Files

The app includes 5 demo files:
- Project Plan.pdf
- Design.png
- Notes.txt
- Budget.xlsx
- README.md

All data persists in localStorage, maintaining your files and folder structure across sessions.
