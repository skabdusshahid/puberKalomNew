import { useState } from 'react';
import Http from '../../Http';



const AddPage = () => {
    const [pageName, setPageName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!pageName.trim()) {
            alert('Page name cannot be empty');
            return;
        }

        const pageData = { name: pageName.trim() };
        setLoading(true);

        try {
            const response = await fetch(`${Http}/pages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pageData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server error response:', errorText);
                alert('Error submitting page: ' + errorText);
                setLoading(false);
                return;
            }

            const result = await response.json();
            alert(result.message);
            setPageName('');
        } catch (error) {
            console.error('Error submitting page:', error.message);
            alert('Error submitting page: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-page">
            <h1>Add New Page</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Page Name:</label>
                    <input
                        type="text"
                        value={pageName}
                        onChange={(e) => setPageName(e.target.value)}
                        disabled={loading}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default AddPage;


