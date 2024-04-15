import { useState } from 'react';

function ContactPage() {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div>
    <h2>Contact</h2>
    <p>Vous pouvez me contacter en remplissant le formulaire ci-dessous :</p>
    <form action="mailto:damien.riandiere.etu@univ-lemans.fr" method="post">
        <div>
            <label htmlFor="subject">Sujet :</label>
            <input type="text" id="subject" name="subject" required></input>
        </div>
        <div className="div-with-margins">
            <label htmlFor="message">Message : </label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
        </div>
        <button type="submit">Envoyer</button>
    </form>
    </div>
  );
}

export default ContactPage;