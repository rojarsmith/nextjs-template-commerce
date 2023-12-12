const robots = () => {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: 'http://localhost:3000/sitemap.xml',
    }
}

export default robots;