// import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { /*faAndroid, faApple,*/ faXTwitter } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';
import Logo from '../HeeaderComponent/Logo';
import FooterPage from './FooterPage';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top d-flex justify-content-between align-items-center">
                    <div>
                        <Logo />
                    </div>
                    <div className="footer-editor">
                        <h2><span>সম্পাদক :</span> আহমেদ হাসান ইমরান</h2>
                    </div>
                </div>

                <div className="footer-mid">
                    <div className="row">
                        <div className="col-12 col-md-4 col-lg-5 pt-3">
                            <ul className="footer-links">
                                <li><a href="./national">জাতীয়</a></li>
                                <li><a href="./city-news">নগর জীবন</a></li>
                                <li><a href="./country">দেশগ্রাম</a></li>
                                <li><a href="./international-news">পূর্ব-পশ্চিম</a></li>
                                <li><a href="./entertainment">শোবিজ</a></li>
                                <li><a href="./chayer-desh">চায়ের দেশ</a></li>
                                <li><a href="./first-page">প্রথম পাতা</a></li>
                                <li><a href="./sport-news">মাঠে ময়দানে</a></li>
                                <li><a href="./last-page">পেছনের পৃষ্ঠা</a></li>
                                <li><a className="text-danger" target="_blank" href="http://www.ebdpratidin.com">ই-পেপার</a></li>
                                <li><a className="text-danger" target="_blank" href="https://www.bd-pratidin.com/northamerica/">ইউএসএ এডিশন</a></li>
                                <li><a className="text-danger" target="_blank" href="https://www.bd-pratidin.com/uk/">ইউকে এডিশন</a></li>
                            </ul>
                        </div>

                        <div className="col-12 col-md-4 col-lg-4 pt-3"></div>

                        <div className="col-12 col-md-4 col-lg-3 pt-3">
                            <div className="app-info">
                                <h3>মোবাইল অ্যাপ ডাউনলোড করুন</h3>
                                <div className="app-buttons">
                                    {/* <a target="_blank" href="https://play.google.com/store/apps/details?id=com.bangladesh.pratidin">
                                        <FontAwesomeIcon icon={faAndroid} size="2x" />
                                    </a>
                                    <a target="_blank" href="https://apps.apple.com/us/app/bangladesh-pratidin/id1056949757">
                                        <FontAwesomeIcon icon={faApple} size="2x" /> 
                                    </a> */}
                                </div>
                                <ul className="social-links mt-3">
                                    <li><a href="https://www.instagram.com/bdpdigital" target="_blank"><i className="bi bi-instagram"></i></a></li>
                                    <li><a href="https://twitter.com/bdpdigital" target="_blank">
                                        <FontAwesomeIcon icon={faXTwitter} size="lg" />
                                    </a></li>
                                    <li><a href="https://www.youtube.com/channel/UC0g7R-oqBXYZDIE8yPgT6rA/videos" target="_blank"><i className="bi bi-youtube"></i></a></li>
                                    <li><a href="https://www.facebook.com/dailybangladeshpratidin/" target="_blank"><i className="bi bi-facebook"></i></a></li>
                                    <li>আমাদের সঙ্গে থাকুন</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <FooterPage />
                    {/* <div className="container d-flex justify-content-between align-items-center">
                        <ul className="footer-bottom-links list-inline mb-0">
                            <li className="list-inline-item px-2"><a href="./page/contactus">যোগাযোগ</a></li>
                            <li className="list-inline-item px-2"><a href="./page/privacy-policy">গোপনীয়তা নীতি</a></li>
                            <li className="list-inline-item px-2"><a href="./file/Rate_Card_2022.pdf" target="_blank">বিজ্ঞাপনের মূল্য তালিকা</a></li>
                        </ul>
                        <p className="mb-0 copyright">স্বত্ব © ২০২৪ পূবের কলম</p>
                    </div> */}
                </div>

            </div>
        </footer>
    );
};

export default Footer;
