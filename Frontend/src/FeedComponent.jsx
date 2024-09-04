import { useEffect, useState } from "react";

import Http from "./Http";

const FeedComponent = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const response = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://puberkalom.com/feed"));
        if (!response.ok) {
          throw new Error("Failed to fetch the RSS feed");
        }
        
        const data = await response.json();
        const textResponse = data.contents; // Get the raw RSS feed content
      
        const parser = new DOMParser();
        const xml = parser.parseFromString(textResponse, "application/xml");
      
        // Handle parsing errors
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
      
          // Extract image URL from description
          const description = getCDATAValue("description");
          const imgRegex = /<img src="(.*?)"/;
          const imgMatch = description.match(imgRegex);
          const imageUrl = imgMatch ? imgMatch[1] : "";
      
          return {
            title,
            category,
            date: pubDate,
            content: description, // Using description as content
            picture: imageUrl,
            tags: [], // Add tags if you have any logic to extract or generate them
            reporterName: author,
            guid,
            location: "", // Default location or extract if available
          };
        });
      
        setItems(itemsArray);
      
        // Send data to the server in chunks
        const chunkSize = 10; // Adjust chunk size as needed
        for (let i = 0; i < itemsArray.length; i += chunkSize) {
          const chunk = itemsArray.slice(i, i + chunkSize);
      
          try {
            const postData = async () => {
              const response = await fetch(`${Http}/admin-dashboard`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(chunk), // Sending the data in chunks to the server
              });
      
              if (!response.ok) {
                throw new Error("Failed to post data");
              }
      
              const result = await response.json();
              console.log(result.message); // Log the server response message
              if (result.details) {
                result.details.forEach((detail) => console.log(detail)); // Log individual messages for added or skipped items
              }
            };
      
            await postData();
          } catch (error) {
            console.error("Error posting feed data:", error);
          }
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