import React from 'react';
import { X, ShieldCheck, Mail, Phone, MapPin, AlertCircle, FileText, Lock } from 'lucide-react';

export type LegalModalType = 'privacy' | 'terms' | 'refund' | 'safety' | 'about' | 'contact' | null;

interface LegalModalsProps {
  type: LegalModalType;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ type, onClose }) => {
  if (!type) return null;

  const contentMap: Record<NonNullable<LegalModalType>, { title: string; subtitle: string; body: React.ReactNode }> = {
    about: {
      title: 'About Best Sathi',
      subtitle: 'Premium Indian Matrimonial Discovery (bestsathi.com)',
      body: (
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <p>
            <strong>Best Sathi</strong> is an editorial matrimonial discovery service established to help individuals and families discover meaningful, values-aligned life partnerships across India and global Indian communities.
          </p>
          <p>
            Unlike impersonal swipe apps or cluttered boards, Best Sathi emphasizes quality over volume. Every sample and member profile presents comprehensive backgrounds, authentic life aspirations, educational rigor, and family context.
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h5 className="font-bold text-xs text-rose-600 uppercase tracking-wider">Our Core Pillars</h5>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Intentional Discovery:</strong> Curated profiles with deep demographic, career, and value insights.</li>
              <li><strong>Privacy First:</strong> Contact details are protected and accessible only under verified consent and active membership tiers.</li>
              <li><strong>Cultural Dignity:</strong> A design that honors Indian family traditions while embracing modern career ambitions.</li>
            </ul>
          </div>
        </div>
      )
    },
    contact: {
      title: 'Contact Best Sathi',
      subtitle: 'Concierge Member Assistance & Editorial Inquiries',
      body: (
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <p>
            Have a question regarding membership tiers, profile curation, or partnership demonstrations? Our team is at your service.
          </p>
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50">
              <Mail className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900">Concierge Email</div>
                <div>support@bestsathi.com</div>
                <div className="text-[11px] text-slate-500">Typically replies within 4 business hours</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50">
              <Phone className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900">Member Helpline (Simulated Demo)</div>
                <div>+91 80 4910 8800</div>
                <div className="text-[11px] text-slate-500">Mon – Sat: 9:30 AM to 6:30 PM IST</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50">
              <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900">Editorial & Executive Office</div>
                <div>Best Sathi Media & Matrimonial Services</div>
                <div>Prestige Meridian, MG Road, Bengaluru, Karnataka 560001</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'Commitment to User Data Confidentiality and Consent',
      body: (
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p>
            At <strong>Best Sathi</strong> (bestsathi.com), member confidentiality is paramount. This policy describes how demonstration and registration data are handled:
          </p>
          <h5 className="font-bold text-slate-900">1. Data Minimization</h5>
          <p>We collect only required matrimonial discovery parameters such as education, profession, city, age, and lifestyle preferences.</p>
          <h5 className="font-bold text-slate-900">2. Locked Contact Details</h5>
          <p>Direct contact credentials (telephone numbers, personal email addresses, guardian contacts) are hidden behind privacy controls and never made public to general website visitors.</p>
          <h5 className="font-bold text-slate-900">3. Prototype Demonstration Notice</h5>
          <p>This deployment is an interactive demonstration. Demonstration profiles are curated sample fictional records. No real personal credit details or financial records are stored.</p>
        </div>
      )
    },
    terms: {
      title: 'Terms & Conditions',
      subtitle: 'Platform Usage Agreement & Code of Conduct',
      body: (
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <h5 className="font-bold text-slate-900">1. Eligibility</h5>
          <p>Membership is strictly restricted to adults who are 18 years of age or older and legally eligible for marriage under applicable laws.</p>
          <h5 className="font-bold text-slate-900">2. Respectful Conduct</h5>
          <p>Members agree to communicate courteously and respectfully. Harassment, commercial solicitation, obscene messages, or deceptive misrepresentations are strictly prohibited.</p>
          <h5 className="font-bold text-slate-900">3. Demonstration Context</h5>
          <p>Best Sathi is currently displayed as a prototype concept for evaluation. Simulated payment features do not constitute commercial transactions.</p>
        </div>
      )
    },
    refund: {
      title: 'Membership & Refund Policy',
      subtitle: 'Transparent Demo Packages & Subscription Terms',
      body: (
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p>
            Best Sathi offers three straightforward membership packages: <strong>CONNECT (₹299)</strong>, <strong>PREMIUM (₹699)</strong>, and <strong>ROYAL (₹1,499)</strong>.
          </p>
          <h5 className="font-bold text-slate-900">Demo Mode Simulation</h5>
          <p>All transactions simulated in this demonstration environment are complimentary and for evaluation purposes. No real money is charged to any card.</p>
          <h5 className="font-bold text-slate-900">Production Commercial Policy</h5>
          <p>In production, memberships carry validity periods of 30 to 180 days. Subscriptions that have not initiated messaging unlocks can request a full refund within 48 hours of purchase.</p>
        </div>
      )
    },
    safety: {
      title: 'Safety & Verification Guidelines',
      subtitle: 'Best Practices for Safe and Dignified Matrimonial Discovery',
      body: (
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-[11px] text-amber-900">
              Never share financial information, bank accounts, UPI PINs, or transfer money to anyone met on any matrimonial platform.
            </div>
          </div>
          <h5 className="font-bold text-slate-900">Guidelines for Members & Families:</h5>
          <ul className="list-disc pl-5 space-y-1">
            <li>Take time to converse through the Best Sathi platform before exchanging private phone numbers.</li>
            <li>Involve parents or elder family members early in the mutual conversation.</li>
            <li>For initial in-person meetings, always select well-lit, public locations such as reputable cafés or restaurants.</li>
            <li>Independently verify academic and professional credentials prior to solemnizing commitments.</li>
          </ul>
        </div>
      )
    }
  };

  const current = contentMap[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-rose-600 font-bold">
              {current.subtitle}
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900 mt-0.5">
              {current.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-800 p-1.5 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {current.body}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-black rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
