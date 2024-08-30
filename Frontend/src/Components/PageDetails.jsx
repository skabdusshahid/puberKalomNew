import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HomeLayoutAlternative from '../Layout/HomeLayoutAlternative';
import Http from '../Http';

const PageDetails = () => {
    const { slug } = useParams(); // Get slug from URL parameters
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPage = async () => {
            console.log(`Fetching page with slug: ${slug}`); // Debug slug
            try {
                const response = await fetch(`${Http}/pages?slug=${slug}`);
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Server error response:', errorText);
                    setError('Error fetching page: ' + errorText);
                    return;
                }

                const data = await response.json();
                console.log('Page data:', data); // Debug data
                
                // Find the page with the matching slug
                const foundPage = data.find(item => generateSlug(item.name) === slug);
                
                if (foundPage) {
                    setPage(foundPage);
                } else {
                    setError('Page not found');
                }
            } catch (error) {
                console.error('Error fetching page:', error.message);
                setError('Error fetching page: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPage();
    }, [slug]);

    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
            .replace(/^-+|-+$/g, ''); // Remove leading or trailing hyphens
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!page) {
        return <p>Page not found</p>;
    }

    return (
        <HomeLayoutAlternative>
         <div className="container mt-1">
      <div className="page-details bg-light p-4 rounded shadow-sm">
        <h1 className="display-4 mb-3">{page && page.name}</h1>
        <div className="lead" dangerouslySetInnerHTML={{ __html: page.description }} />
      </div>
    </div>
        </HomeLayoutAlternative >
    );
};

export default PageDetails;
