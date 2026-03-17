import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../constants';
import { ContactFormData } from '../types';
import { Send, AlertCircle, ShieldCheck } from 'lucide-react';

const ContactForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    city: '',
    service: '',
    message: '',
    honeypot: '',
    privacyAccepted: false,
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  // URL de tu Google Script
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx0iAnw8T5nKgyZEoBlcQhuprL5gvWPt7fn0jU5i4JIi5J5h8nGKF8mFpxBx31W9bo5/exec';

  const validate = () => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.city.trim()) newErrors.city = "Zip code or City is required";
    if (!formData.service) newErrors.service = "Please select a service";
    if (!formData.privacyAccepted) newErrors.privacyAccepted = "You must agree to the privacy policy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Rechazo silencioso para bots

    if (!validate()) return;

    setStatus('submitting');

    // 1. Crear un objeto FormData para enviar a Google Sheets
    const dataToSend = new FormData();
    dataToSend.append('name', formData.name);
    dataToSend.append('phone', formData.phone);
    dataToSend.append('email', formData.email);
    dataToSend.append('city', formData.city);
    dataToSend.append('service', formData.service);
    dataToSend.append('message', formData.message);
    // Agregamos una fecha por si tu script no lo hace automático
    dataToSend.append('created_at', new Date().toISOString());

    try {
      // 2. Realizar la petición fetch al script de Google sin no-cors
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: dataToSend
      });

      if (!response.ok) {
        throw new Error('Script execution failed');
      }

      // 3. Manejar el éxito
      console.log("Formulario enviado a Google Sheets");
      navigate('/thank-you');
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: '',
        service: '',
        message: '',
        honeypot: '',
        privacyAccepted: false,
      });

    } catch (error) {
      console.error("Error enviando a Google Sheets:", error);
      setStatus('error');
      // Opcional: Mostrar alerta al usuario si falla
      alert("There was an error sending your message. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, privacyAccepted: e.target.checked }));
    if (errors.privacyAccepted) setErrors(prev => ({ ...prev, privacyAccepted: undefined }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 opacity-0 animate-fadeInDown">
      <h3 className="text-2xl font-bold text-primary mb-6 opacity-0 animate-fadeInDownDelay1">Get Your Free Quote</h3>

      {/* Honeypot field - hidden */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        className="hidden"
        autoComplete="off"
      />

      <div className="space-y-4">
        <div className="opacity-0 animate-fadeInDownDelay1">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-0 animate-fadeInDownDelay2">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              inputMode="tel"
              pattern="[0-9\-() ]*"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-0 animate-fadeInDownDelay2">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City or Zip Code *</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${errors.city ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
            />
            {errors.city && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.city}</p>}
          </div>
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service Needed *</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${errors.service ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
            >
              <option value="">Select a service...</option>
              {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
              <option value="Other">Other / Not Sure</option>
            </select>
            {errors.service && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.service}</p>}
          </div>
        </div>

        <div className="opacity-0 animate-fadeInDownDelay3">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your project..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
          ></textarea>
        </div>

        <div className="flex items-start gap-3 opacity-0 animate-fadeInDownDelay3">
          <input
            type="checkbox"
            id="privacy"
            name="privacyAccepted"
            checked={formData.privacyAccepted}
            onChange={handleCheckbox}
            className="mt-1 w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="privacy" className="text-xs text-gray-600">
            I agree to the privacy policy and consent to being contacted by phone or email regarding my inquiry.
          </label>
        </div>
        {errors.privacyAccepted && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.privacyAccepted}</p>}

        <div className="pt-2 opacity-0 animate-[fadeInDown_0.6s_ease-out_0.8s_forwards]">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-primary hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Sending...' : 'Request Free Quote'}
            {!status.includes('submit') && <Send className="w-5 h-5" />}
          </button>
          <p className="text-xs text-center text-gray-500 mt-3 flex items-center justify-center gap-1">
            <ShieldCheck className="w-4 h-4 text-green-600" /> 100% Free Estimate. Fast & Secure.
          </p>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;