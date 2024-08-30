import { Link } from 'react-router-dom'; // Import Link
import  { useState, useEffect } from 'react';
import Http from '../Http';


const FooterPage = () => {
    const [pages, setPages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const response = await fetch(`${Http}/pages`);
                if (!response.ok) {
                    const errorText = await response.text();
                    setError('Error fetching pages: ' + errorText);
                    console.error('Server error response:', errorText);
                    return;
                }

                const data = await response.json();
                setPages(data);
            } catch (error) {
                setError('Error fetching pages: ' + error.message);
                console.error('Error fetching pages:', error.message);
            }
        };

        fetchPages();
    }, []);

    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
            .replace(/^-+|-+$/g, ''); // Remove leading or trailing hyphens
    };

    return (
        <div className="footer-bottom">
            <div className="container d-flex justify-content-between align-items-center">
                <ul className="footer-bottom-links list-inline mb-0">
                    {error && <li className="list-inline-item px-2 text-danger">{error}</li>}
                    {pages.length === 0 && !error && <li className="list-inline-item px-2">Loading pages...</li>}
                    {pages.map(page => (
                        <li className="list-inline-item px-2" key={page._id}>
                            <Link to={`/${generateSlug(page.name)}`}>{page.name}</Link> {/* Use Link instead of <a> */}
                        </li>
                    ))}
                    <li className="list-inline-item px-2">
                        <a href="./file/Rate_Card_2022.pdf" target="_blank" rel="noopener noreferrer">বিজ্ঞাপনের মূল্য তালিকা</a>
                    </li>
                </ul>
                <p className="mb-0 copyright">স্বত্ব © ২০২৪ পূবের কলম</p>
            </div>
        </div>
    );
};

export default FooterPage;
