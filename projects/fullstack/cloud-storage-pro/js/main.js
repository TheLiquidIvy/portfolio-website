// Cloud Storage Pro - Main JavaScript

class CloudStoragePro {
    constructor() {
        this.currentFolder = null;
        this.currentFile = null;
        this.files = [];
        this.folders = [];
        this.init();
    }

    init() {
        this.loadData();
        this.initEventListeners();
        this.render();
        this.updateStats();
    }

    loadData() {
        // Load demo data
        if (!localStorage.getItem('cloud_files')) {
            this.files = [
                { id: 1, name: 'Project Plan.pdf', type: 'pdf', size: 2480, folder: null, shared: false, content: 'This is a sample PDF document containing the project plan and timeline.', date: new Date(Date.now() - 86400000).toISOString() },
                { id: 2, name: 'Design.png', type: 'image', size: 5120, folder: null, shared: true, content: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%2300ffff" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%230a0a0f" font-size="24"%3EDesign%3C/text%3E%3C/svg%3E', date: new Date(Date.now() - 172800000).toISOString() },
                { id: 3, name: 'Notes.txt', type: 'text', size: 1024, folder: null, shared: false, content: 'Meeting notes:\n\n- Discussed project timeline\n- Reviewed design mockups\n- Planned next sprint\n- Assigned tasks to team members\n\nAction items:\n1. Update documentation\n2. Review pull requests\n3. Schedule follow-up meeting', date: new Date(Date.now() - 259200000).toISOString() },
                { id: 4, name: 'Budget.xlsx', type: 'excel', size: 3072, folder: null, shared: false, content: 'Budget Spreadsheet\n\nQuarter 1: $50,000\nQuarter 2: $65,000\nQuarter 3: $70,000\nQuarter 4: $80,000\n\nTotal: $265,000', date: new Date(Date.now() - 345600000).toISOString() },
                { id: 5, name: 'README.md', type: 'markdown', size: 2048, folder: null, shared: true, content: '# Project Documentation\n\nWelcome to the project!\n\n## Features\n- Cloud storage\n- File sharing\n- Encryption\n\n## Getting Started\nUpload your files and start collaborating.', date: new Date(Date.now() - 432000000).toISOString() }
            ];
            localStorage.setItem('cloud_files', JSON.stringify(this.files));
        } else {
            this.files = JSON.parse(localStorage.getItem('cloud_files'));
        }

        if (!localStorage.getItem('cloud_folders')) {
            this.folders = [
                { id: 1, name: 'Documents', parent: null },
                { id: 2, name: 'Images', parent: null },
                { id: 3, name: 'Projects', parent: null }
            ];
            localStorage.setItem('cloud_folders', JSON.stringify(this.folders));
        } else {
            this.folders = JSON.parse(localStorage.getItem('cloud_folders'));
        }
    }

    initEventListeners() {
        document.getElementById('file-input').addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files);
        });
    }

    render() {
        this.renderFolders();
        this.renderFiles();
        this.updateBreadcrumb();
    }

    renderFolders() {
        const container = document.getElementById('folders-section');
        const folders = this.folders.filter(f => f.parent === this.currentFolder);

        if (folders.length === 0) {
            container.innerHTML = '';
            return;
        }

        container.innerHTML = folders.map(folder => `
            <div class="folder-card" onclick="app.openFolder(${folder.id})">
                <div class="item-icon">📁</div>
                <div class="item-name">${folder.name}</div>
                <div class="item-actions" onclick="event.stopPropagation()">
                    <button class="action-btn delete" onclick="app.deleteFolder(${folder.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }

    renderFiles() {
        const container = document.getElementById('files-section');
        const files = this.files.filter(f => f.folder === this.currentFolder);

        if (files.length === 0 && this.folders.filter(f => f.parent === this.currentFolder).length === 0) {
            container.innerHTML = '<div class="empty-message">No files or folders. Upload some files to get started!</div>';
            return;
        }

        container.innerHTML = files.map(file => `
            <div class="file-card" onclick="app.previewFile(${file.id})">
                <div class="item-icon">${this.getFileIcon(file.type)}</div>
                <div class="item-name">${file.name}</div>
                <div class="item-meta">
                    <span>${this.formatSize(file.size)}</span>
                    <span>${file.shared ? '🔗 Shared' : ''}</span>
                </div>
                <div class="item-actions" onclick="event.stopPropagation()">
                    <button class="action-btn" onclick="app.shareFile(${file.id})">Share</button>
                    <button class="action-btn delete" onclick="app.deleteFile(${file.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }

    getFileIcon(type) {
        const icons = {
            pdf: '📄',
            image: '🖼️',
            text: '📝',
            excel: '📊',
            markdown: '📋',
            video: '🎥',
            audio: '🎵',
            zip: '🗜️',
            code: '💻'
        };
        return icons[type] || '📎';
    }

    formatSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(1) + ' MB';
    }

    updateBreadcrumb() {
        const breadcrumb = document.getElementById('breadcrumb');
        
        if (!this.currentFolder) {
            breadcrumb.innerHTML = '<span onclick="app.navigateToFolder(null)">Home</span>';
            return;
        }

        const path = this.getFolderPath(this.currentFolder);
        breadcrumb.innerHTML = '<span onclick="app.navigateToFolder(null)">Home</span>' +
            path.map(folder => 
                ` <span onclick="app.navigateToFolder(${folder.id})">${folder.name}</span>`
            ).join('');
    }

    getFolderPath(folderId) {
        const path = [];
        let current = this.folders.find(f => f.id === folderId);
        
        while (current) {
            path.unshift(current);
            current = current.parent ? this.folders.find(f => f.id === current.parent) : null;
        }
        
        return path;
    }

    navigateToFolder(folderId) {
        this.currentFolder = folderId;
        this.render();
        this.updateStats();
    }

    openFolder(folderId) {
        this.navigateToFolder(folderId);
    }

    showCreateFolder() {
        document.getElementById('folder-modal').classList.remove('hidden');
        document.getElementById('folder-name').focus();
    }

    createFolder() {
        const name = document.getElementById('folder-name').value.trim();
        
        if (!name) {
            alert('Please enter a folder name');
            return;
        }

        const newFolder = {
            id: Date.now(),
            name,
            parent: this.currentFolder
        };

        this.folders.push(newFolder);
        this.saveFolders();
        this.closeModal('folder-modal');
        document.getElementById('folder-name').value = '';
        this.render();
        this.updateStats();
    }

    deleteFolder(folderId) {
        if (confirm('Delete this folder and all its contents?')) {
            // Delete folder and all subfolders
            const toDelete = [folderId];
            let i = 0;
            while (i < toDelete.length) {
                const subfolders = this.folders.filter(f => f.parent === toDelete[i]);
                toDelete.push(...subfolders.map(f => f.id));
                i++;
            }
            
            // Delete all files in these folders
            this.files = this.files.filter(f => !toDelete.includes(f.folder));
            
            // Delete folders
            this.folders = this.folders.filter(f => !toDelete.includes(f.id));
            
            this.saveFiles();
            this.saveFolders();
            this.render();
            this.updateStats();
        }
    }

    handleFileUpload(files) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const newFile = {
                    id: Date.now() + Math.random(),
                    name: file.name,
                    type: this.getFileType(file.name),
                    size: file.size,
                    folder: this.currentFolder,
                    shared: false,
                    content: file.type.startsWith('image/') ? e.target.result : this.extractTextContent(e.target.result, file.type),
                    date: new Date().toISOString()
                };

                this.files.push(newFile);
                this.saveFiles();
                this.render();
                this.updateStats();
            };

            if (file.type.startsWith('image/')) {
                reader.readAsDataURL(file);
            } else {
                reader.readAsText(file);
            }
        });

        document.getElementById('file-input').value = '';
    }

    getFileType(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        const typeMap = {
            pdf: 'pdf',
            png: 'image',
            jpg: 'image',
            jpeg: 'image',
            gif: 'image',
            txt: 'text',
            md: 'markdown',
            xlsx: 'excel',
            xls: 'excel',
            mp4: 'video',
            mp3: 'audio',
            zip: 'zip',
            js: 'code',
            html: 'code',
            css: 'code'
        };
        return typeMap[ext] || 'text';
    }

    extractTextContent(content, mimeType) {
        if (mimeType.startsWith('text/')) {
            return content.substring(0, 10000); // Limit size
        }
        return 'Binary file content';
    }

    previewFile(fileId) {
        this.currentFile = this.files.find(f => f.id === fileId);
        if (!this.currentFile) return;

        document.getElementById('preview-title').textContent = this.currentFile.name;
        const contentDiv = document.getElementById('preview-content');

        if (this.currentFile.type === 'image') {
            contentDiv.innerHTML = `<img src="${this.currentFile.content}" alt="${this.currentFile.name}">`;
        } else {
            contentDiv.innerHTML = `<pre style="white-space: pre-wrap; word-wrap: break-word;">${this.escapeHtml(this.currentFile.content)}</pre>`;
        }

        document.getElementById('preview-modal').classList.remove('hidden');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    shareFile(fileId) {
        const file = fileId ? this.files.find(f => f.id === fileId) : this.currentFile;
        if (!file) return;

        file.shared = true;
        this.saveFiles();

        // Generate mock share link
        const encrypted = btoa(file.name + file.id);
        const shareLink = `https://storage.cloud/share/${encrypted}`;
        
        document.getElementById('share-link').value = shareLink;
        document.getElementById('share-modal').classList.remove('hidden');
        
        this.render();
        this.updateStats();
    }

    copyShareLink() {
        const input = document.getElementById('share-link');
        input.select();
        document.execCommand('copy');
        alert('Link copied to clipboard!');
    }

    downloadFile() {
        if (!this.currentFile) return;

        const blob = new Blob([this.currentFile.content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.currentFile.name;
        a.click();
        URL.revokeObjectURL(url);
    }

    deleteFile(fileId) {
        if (confirm('Delete this file?')) {
            this.files = this.files.filter(f => f.id !== fileId);
            this.saveFiles();
            this.render();
            this.updateStats();
        }
    }

    updateStats() {
        const totalFiles = this.files.length;
        const totalSize = this.files.reduce((sum, file) => sum + file.size, 0);
        const sharedFiles = this.files.filter(f => f.shared).length;

        document.getElementById('total-files').textContent = totalFiles;
        document.getElementById('storage-used').textContent = this.formatSize(totalSize);
        document.getElementById('shared-files').textContent = sharedFiles;
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
    }

    saveFiles() {
        localStorage.setItem('cloud_files', JSON.stringify(this.files));
    }

    saveFolders() {
        localStorage.setItem('cloud_folders', JSON.stringify(this.folders));
    }
}

const app = new CloudStoragePro();
