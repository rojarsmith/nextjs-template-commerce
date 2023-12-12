const sitemap = () => {
    return [
        {
            url: 'http://localhost:3000',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        }
    ]
};

export default sitemap;