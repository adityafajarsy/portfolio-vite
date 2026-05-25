import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './style.module.scss';
import Articles from '../../components/Articles';

const mockArticles = {
    'starting-and-growing-a-career-in-web-design': {
        title: "Starting and Growing a Career in Web Design",
        date: "Apr 8, 2022",
        readTime: "5 min",
        heroImage: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop",
        accessoryImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
        content: [
            {
                type: 'paragraph',
                text: "As the internet continues to develop and grow exponentially, jobs related to the industry do too, particularly those that relate to web design and development. The prediction is that by 2029, the job outlook for these two fields will grow by 8%—significantly faster than average. Whether you're seeking salaried employment or aiming to work in a freelance capacity, a career in web design can offer a variety of employment arrangements, competitive salaries, and opportunities to utilize both technical and creative skill sets."
            },
            {
                type: 'heading',
                text: "What does a career in web design involve?"
            },
            {
                type: 'paragraph',
                text: "A career in website design can involve the design, creation, and coding of a range of website types. Other tasks will typically include liaising with clients and discussing website specifications, incorporating feedback, working on graphic design and image editing, and enabling multimedia features such as audio and video. Requiring a range of creative and technical skills, web designers may be involved in work across a range of industries, including software companies, IT consultancies, web design companies, corporate organizations, and more. In contrast with web developers, web designers tend to play a more creative role, crafting the overall vision and design of a site, and determining how to best incorporate the necessary functionality."
            }
        ]
    },
    'create-a-landing-page-that-performs-great': {
        title: "Create a Landing Page That Performs Great",
        date: "Mar 15, 2022",
        readTime: "4 min",
        heroImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
        accessoryImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
        content: [
            {
                type: 'paragraph',
                text: "Landing pages are a crucial part of any digital marketing strategy. They are designed to convert visitors into leads or customers by focusing on a specific goal or call to action. In this article, we will explore the key elements of a high-performing landing page."
            },
            {
                type: 'heading',
                text: "Keep it simple and focused"
            },
            {
                type: 'paragraph',
                text: "The best landing pages are simple and focused. Remove navigation links and other distractions that might lead visitors away from your call to action. Make sure your value proposition is clear and easy to understand."
            }
        ]
    },
    'how-can-designers-prepare-for-the-future': {
        title: "How Can Designers Prepare for the Future?",
        date: "Feb 28, 2022",
        readTime: "6 min",
        heroImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
        accessoryImage: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=800&auto=format&fit=crop",
        content: [
            {
                type: 'paragraph',
                text: "The field of design is constantly evolving, driven by new technologies, changing user expectations, and shifting business needs. To stay ahead of the curve, designers must be proactive in updating their skills and embracing new trends."
            },
            {
                type: 'heading',
                text: "Embrace artificial intelligence"
            },
            {
                type: 'paragraph',
                text: "Artificial intelligence is already making its mark on the design world, automating repetitive tasks and providing new tools for creativity. Designers who learn to work alongside AI will have a significant advantage in the future job market."
            }
        ]
    }
};

export default function ArticleDetail() {
    const { slug } = useParams<{ slug: string }>();
    const article = slug && mockArticles[slug as keyof typeof mockArticles] 
        ? mockArticles[slug as keyof typeof mockArticles] 
        : mockArticles['starting-and-growing-a-career-in-web-design']; // Fallback

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    return (
        <main className={styles.pageWrapper}>
            <div className={styles.gridWrapper}>
                <div className={styles.gridBackground}></div>
            </div>

            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <Link to="/" className={styles.toBlogBtn}>to blog ↗</Link>
                    
                    <h1 className={styles.title}>{article.title}</h1>
                    
                    <div className={styles.mobileMeta}>
                        <span className={styles.metaItem}>
                            <span className={styles.mobileMetaLabel}>date published</span>
                            <span className={styles.mobileMetaValue}>{article.date}</span>
                        </span>
                        <span className={styles.mobileMetaLabel}>/</span>
                        <span className={styles.metaItem}>
                            <span className={styles.mobileMetaLabel}>reading time</span>
                            <span className={styles.mobileMetaValue}>{article.readTime}</span>
                        </span>
                    </div>
                    
                    <img src={article.heroImage} alt={article.title} className={styles.heroImage} />
                    
                    <div className={styles.articleContent}>
                        {article.content.map((block, index) => {
                            if (block.type === 'paragraph') {
                                return <p key={index}>{block.text}</p>;
                            }
                            if (block.type === 'heading') {
                                return <h2 key={index}>{block.text}</h2>;
                            }
                            return null;
                        })}
                        
                        <img src={article.accessoryImage} alt="Accessory" className={styles.accessoryImage} />
                        
                        <p>In addition to technical skills, web designers also need a strong understanding of user experience (UX) and user interface (UI) principles. They must be able to create sites that are not only visually appealing but also easy to navigate and use. This often involves conducting user research, creating wireframes and prototypes, and running usability tests.</p>
                        
                        <h2>The Importance of Continuous Learning</h2>
                        
                        <p>The web design industry is constantly changing, with new technologies, frameworks, and best practices emerging all the time. To stay relevant, web designers must be committed to continuous learning. This might involve taking online courses, attending workshops and conferences, or simply staying up to date with industry blogs and publications.</p>
                    </div>
                </div>

                <div className={styles.rightSide}>
                    <div className={styles.metaBlock}>
                        <span className={styles.metaLabel}>date published</span>
                        <span className={styles.metaValue}>{article.date}</span>
                    </div>
                    <div className={styles.metaBlock}>
                        <span className={styles.metaLabel}>reading time</span>
                        <span className={styles.metaValue}>{article.readTime}</span>
                    </div>
                </div>
            </div>

            <div className={styles.seeArticlesSection}>
                <Articles excludeSlug={slug} disableScrollHighlight={true} />
            </div>
        </main>
    );
}
