import { useEffect, useState } from "react";

const FeedComponent = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const response = await fetch("https://cors-anywhere.herokuapp.com/https://puberkalom.com/feed", {
          headers: {
            "x-requested-with": "XMLHttpRequest",
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const textResponse = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(textResponse, "application/xml");
    
        const parseError = xml.getElementsByTagName("parsererror");
        if (parseError.length) {
          console.error("Error while parsing XML:", parseError);
          return;
        }
    
        const itemsArray = Array.from(xml.getElementsByTagName("item")).map((item) => {
          const getValue = (tag) => {
            const el = item.getElementsByTagName(tag)[0];
            return el ? el.textContent : "";
          };
    
          const getCDATAValue = (tag) => {
            const el = item.getElementsByTagName(tag)[0];
            if (el && el.childNodes.length > 0) {
              for (let node of el.childNodes) {
                if (node.nodeType === Node.CDATA_SECTION_NODE) {
                  return node.nodeValue;
                }
              }
            }
            return "";
          };
    
          const title = getCDATAValue("title");
          const pubDate = getValue("pubDate");
          const category = getValue("category");
          const guid = getValue("guid");
          const author = getCDATAValue("author");
    
          const description = getCDATAValue("description");
          const imgRegex = /<img src="(.*?)"/;
          const imgMatch = description.match(imgRegex);
          const imageUrl = imgMatch ? imgMatch[1] : "";
    
          return {
            title,
            category,
            date: pubDate,
            content: description,
            picture: imageUrl,
            tags: [],
            reporterName: author,
            guid,
            location: "",
          };
        });
    
        setItems(itemsArray);
    
        const chunkSize = 10;
        for (let i = 0; i < itemsArray.length; i += chunkSize) {
          const chunk = itemsArray.slice(i, i + chunkSize);
    
          const postData = async () => {
            try {
              const response = await fetch("http://localhost:5000/admin-dashboard", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(chunk),
              });
    
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
    
              const result = await response.json();
              if (result.details) {
                // Handle details if necessary
              }
            } catch (error) {
              console.error("Error posting feed data:", error);
            }
          };
    
          postData();
        }
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
      }
    };
    

    fetchRSS();

  }, []);

  return (
    <div>
      <h1>Latest News from Puber Kalom</h1>
      {items.length === 0 ? (
        <p>Loading...</p>
      ) : (
        items.map((item, index) => (
          <div key={index} style={{ marginBottom: "40px" }}>
            <h2>{item.title}</h2>
            <p>
              <strong>Category:</strong> {item.category}
            </p>
            <p>
              <strong>Published:</strong> {item.date}
            </p>
            <p>
              <strong>Author:</strong> {item.reporterName}
            </p>
            {item.picture && (
              <img
                src={item.picture}
                alt={item.title}
                style={{ maxWidth: "100%" }}
              />
            )}
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default FeedComponent;