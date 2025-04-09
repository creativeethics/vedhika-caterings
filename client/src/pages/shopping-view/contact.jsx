import React from 'react'
import contactBanner from "../../assets/contactus-banner.jpg"
import Footer from '@/components/ui/footer'

const ContactUs = () => {
  return (
    <div>
      <img src={contactBanner} alt="Contact Us Banner" className="w-full object-cover" />

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Contact Form */}
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6">Have a Question? Let Us Know!</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">E-mail</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(123) 456-7890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Event Location</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Venue or address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">No. of Guests</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Approximate number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us more about your event..."
                ></textarea>
              </div>

              <div className="text-left">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Google Map */}
          <div className="w-full h-96 lg:h-full">
            <iframe
              title="Event Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0193215781263!2d-122.41941568468108!3d37.77492927975983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085815e9b594e45%3A0xdda4b34a6b672e25!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1616143551732!5m2!1sen!2sus"
              width="100%"
              height="100%"
              className="rounded-2xl border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ContactUs
