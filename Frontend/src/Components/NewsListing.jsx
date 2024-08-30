import React from 'react';
import { Card } from 'react-bootstrap';

const NewsListing = ({ item }) => {
  return (
    <Card style={{ marginTop: "5px" }}>
      <Card.Body style={{ display: "flex", alignItems: "center", paddingRight: "0" }}>
        <a href="single-news-1.html">
          <Card.Img
            variant="top"
            src={getPictureUrl(item.picture)}
            style={{ height: "100px", width: "150px", marginRight: "10px" }}
            className="img-opacity-hover"
          />
        </a>
        <Card.Title>
          <a href="single-news-2.html" style={{ textDecoration: "none" }} dangerouslySetInnerHTML={{ __html: `${item.title}` }}></a>
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default NewsListing;
