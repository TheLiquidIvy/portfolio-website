// ==================== PORTFOLIO API CLIENT ====================

class PortfolioAPI {
    constructor() {
        this.baseURL = window.location.origin + '/api/';
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
        
        console.log('[API] Portfolio API client initialized');
    }

    async fetch(endpoint) {
        // Check cache first
        const cached = this.cache.get(endpoint);
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            console.log(`[API] Returning cached data for ${endpoint}`);
            return cached.data;
        }

        try {
            const response = await fetch(this.baseURL + endpoint);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Cache the result
            this.cache.set(endpoint, {
                data: data,
                timestamp: Date.now()
            });
            
            console.log(`[API] Fetched data from ${endpoint}`);
            return data;
        } catch (error) {
            console.error(`[API] Error fetching ${endpoint}:`, error);
            throw error;
        }
    }

    // Get complete portfolio data
    async getPortfolio() {
        return this.fetch('portfolio.json');
    }

    // Get all projects
    async getProjects() {
        return this.fetch('projects.json');
    }

    // Get project by ID
    async getProject(id) {
        const data = await this.getProjects();
        return data.projects.find(p => p.id === id);
    }

    // Get projects by category
    async getProjectsByCategory(category) {
        const data = await this.getProjects();
        return data.projects.filter(p => p.category === category);
    }

    // Get all blog posts
    async getBlogPosts() {
        return this.fetch('blog.json');
    }

    // Get blog post by ID
    async getBlogPost(id) {
        const data = await this.getBlogPosts();
        return data.blog_posts.find(p => p.id === id);
    }

    // Get blog posts by category
    async getBlogPostsByCategory(category) {
        const data = await this.getBlogPosts();
        return data.blog_posts.filter(p => p.category === category);
    }

    // Get all skills
    async getSkills() {
        return this.fetch('skills.json');
    }

    // Get skills by category
    async getSkillsByCategory(category) {
        const data = await this.getSkills();
        const categoryData = data.skills.find(c => c.category === category);
        return categoryData ? categoryData.skills : [];
    }

    // Get statistics
    async getStats() {
        return this.fetch('stats.json');
    }

    // Clear cache
    clearCache() {
        this.cache.clear();
        console.log('[API] Cache cleared');
    }

    // Get cache info
    getCacheInfo() {
        return {
            size: this.cache.size,
            entries: Array.from(this.cache.keys())
        };
    }
}

// Create global instance
window.portfolioAPI = new PortfolioAPI();

// Example usage functions
window.portfolioAPI.examples = {
    // Display all projects
    displayProjects: async function() {
        const data = await window.portfolioAPI.getProjects();
        console.log('Projects:', data.projects);
        return data.projects;
    },

    // Display blog posts
    displayBlogPosts: async function() {
        const data = await window.portfolioAPI.getBlogPosts();
        console.log('Blog Posts:', data.blog_posts);
        return data.blog_posts;
    },

    // Display skills
    displaySkills: async function() {
        const data = await window.portfolioAPI.getSkills();
        console.log('Skills:', data.skills);
        return data.skills;
    },

    // Display stats
    displayStats: async function() {
        const data = await window.portfolioAPI.getStats();
        console.log('Stats:', data.stats);
        return data.stats;
    },

    // Get frontend projects only
    getFrontendProjects: async function() {
        const projects = await window.portfolioAPI.getProjectsByCategory('frontend');
        console.log('Frontend Projects:', projects);
        return projects;
    },

    // Get fullstack projects only
    getFullstackProjects: async function() {
        const projects = await window.portfolioAPI.getProjectsByCategory('fullstack');
        console.log('Fullstack Projects:', projects);
        return projects;
    }
};

console.log('[API] Portfolio API module loaded');
console.log('[API] Use window.portfolioAPI to access the API');
console.log('[API] Try: portfolioAPI.examples.displayProjects()');
