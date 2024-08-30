import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Http from '../Http';


const NavBar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${Http}/menubar`)
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  // console.log("svdcvj",data);
  

  return (
    <Navbar bg="light" expand="md" className="border-top border-bottom">
      <Container>
        {/* <Navbar.Brand href="#home">Menu</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">
              <i className="text-secondary bi bi-house-fill" />
            </Nav.Link>

            {data && data.map((item,index)=>{
              return <Link key={index} to={`/category/${item._id}`} className="nav-link">{item.itemName}</Link>
            })}

            


            {/* <Nav.Link href="country">দেশগ্রাম</Nav.Link>
            <Nav.Link href="international-news">পূর্ব-পশ্চিম</Nav.Link>
            <Nav.Link href="sports">মাঠে ময়দানে</Nav.Link>
            <Nav.Link href="entertainment">শোবিজ</Nav.Link>
            <Nav.Link href="economy">বাণিজ্য</Nav.Link>
            <Nav.Link href="islam">ইসলামী জীবন</Nav.Link>
            <Nav.Link href="online/todaynews" className="text-success">শিরোনাম</Nav.Link> */}



            <NavDropdown title="অন্যান্য" id="nav-dropdown">
              <NavDropdown.Item href="campus-online">ক্যাম্পাস</NavDropdown.Item>
              <NavDropdown.Item href="corporate-corner">কর্পোরেট কর্নার</NavDropdown.Item>
              <NavDropdown.Item href="health-tips">হেলথ কর্নার</NavDropdown.Item>
              <NavDropdown.Item href="life">জীবন ধারা</NavDropdown.Item>
              <NavDropdown.Item href="open-air-theater">মুক্তমঞ্চ</NavDropdown.Item>
              <NavDropdown.Item href="mixter">পাঁচফোড়ন</NavDropdown.Item>
              <NavDropdown.Item href="tech-world">টেক ওয়ার্ল্ড</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="আজকের পত্রিকা" id="nav-dropdown2" className="text-danger">
              <NavDropdown.Item href="printversion">হোম</NavDropdown.Item>
              <NavDropdown.Item href="first-page">প্রথম পাতা</NavDropdown.Item>
              <NavDropdown.Item href="last-page">পেছনের পৃষ্ঠা</NavDropdown.Item>
              <NavDropdown.Item href="city">নগর জীবন</NavDropdown.Item>
              <NavDropdown.Item href="country-village">দেশগ্রাম</NavDropdown.Item>
              <NavDropdown.Item href="sport-news">মাঠে ময়দানে</NavDropdown.Item>
              <NavDropdown.Item href="entertainment-news">শোবিজ</NavDropdown.Item>
              <NavDropdown.Item href="editorial">সম্পাদকীয়</NavDropdown.Item>
              <NavDropdown.Item href="various">রকমারি</NavDropdown.Item>
              <NavDropdown.Item href="news">খবর</NavDropdown.Item>
              <NavDropdown.Item href="international">পূর্ব-পশ্চিম</NavDropdown.Item>
              <NavDropdown.Item href="horoscope">আজকের রাশি</NavDropdown.Item>
              <NavDropdown.Item href="money-market-business">অর্থ-বাজার-বাণিজ্য</NavDropdown.Item>
              <NavDropdown.Item href="health">স্বাস্থ্য</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="সংস্করণ" id="nav-dropdown3">
              <NavDropdown.Item href="northamerica/" target="_blank">ইউএসএ এডিশন</NavDropdown.Item>
              <NavDropdown.Item href="uk" target="_blank">ইউকে এডিশন</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
