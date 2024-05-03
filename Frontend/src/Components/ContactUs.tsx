import 'bootstrap/dist/css/bootstrap.css';
import './ContactUs.css';
import Footer from './Footer';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
function ContactUs(){
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const navigate = useNavigate();
  const [contact, setContact] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let body = {
        name: formData.name,
        email:formData.email,
        subject:formData.subject,
        message: formData.message
      }
      const response = await axios.post(`https://localhost:7254/api/ContactUs`,body);
      setContact(true);
      window.location.reload();
    } catch (error) {
      console.error('Error sending message ', error);
    }
  };
     
    return(
        <div>
          <Header/>
             <section id="contact" className="contact">
      <div className="container" data-aos="fade-up">

        <div className="section-header">
          <h2>Contact Us</h2>
          <p>Do you have any question?Do not hesitate to contact us directly.Our team will come back to you within matter of hours to help you</p>
        </div>

        <div className="row gx-lg-0 gy-4">

          <div className="col-lg-4">

            <div className="info-container d-flex flex-column align-items-center justify-content-center">
              <div className="info-item d-flex">
                <i className="bi bi-geo-alt flex-shrink-0"></i>
                <div>
                  <h4>Location:</h4>
                  <p>A108 Adam Street, New York, NY 535022</p>
                </div>
              </div>

              <div className="info-item d-flex">
                <i className="bi bi-envelope flex-shrink-0"></i>
                <div>
                  <h4>Email:</h4>
                  <p>info@example.com</p>
                </div>
              </div>

              <div className="info-item d-flex">
                <i className="bi bi-phone flex-shrink-0"></i>
                <div>
                  <h4>Call:</h4>
                  <p>+1 5589 55488 55</p>
                </div>
              </div>
            </div>

          </div>

          <div className="col-lg-8">
            <form action="forms/contact.php" method="post" role="form" className="php-email-form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 form-group">
                  <input type="text" name="name" className="form-control" 
                  id="name" placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange} required/>
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" className="form-control" 
                  name="email" id="email"
                   placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange} required/>
                </div>
              </div>
              <div className="form-group mt-3">
                <input type="text" className="form-control" name="subject" 
                id="subject"
                placeholder="Subject"
                value={formData.subject}
                      onChange={handleChange} required/>
              </div>
              <div className="form-group mt-3">
                <textarea className="form-control" name="message" id="message" placeholder="Message" 
                value={formData.message}
                onChange={handleChange} required/>
              </div>
              <div className="my-3">
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div className="text-center"><button type="submit">Send Message</button></div>
            </form>
          </div>

        </div>

      </div>
    </section>
    <Footer/>
        </div>
    );
  }

  export default ContactUs;