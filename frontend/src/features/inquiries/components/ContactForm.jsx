function ContactForm() {
  return (
    <section id="contact" className="contact">
      <h2>Contact Us</h2>

      <div className="contact-body">
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="4"
              placeholder="Tell us about your property needs"
            />
          </div>
          <button type="submit">Send</button>
        </form>

        <div className="contact-info">
          <div>
            <h3>Company Name</h3>
            <p>123 Main Street, Suite 400</p>
            <p>New York, NY 10001</p>
          </div>
          <div>
            <h3>Phone</h3>
            <p>+1 234 567 8900</p>
          </div>
          <div>
            <h3>Email</h3>
            <p>hello@realestate.com</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
