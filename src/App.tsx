import {
  BadgeCheck,
  CalendarCheck,
  Camera,
  Check,
  ChevronRight,
  Clock3,
  CreditCard,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

type LeadForm = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  treatmentGoal: string;
  timeline: string;
  financing: string;
  source: string;
};

const initialForm: LeadForm = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  treatmentGoal: "Missing one or more teeth",
  timeline: "As soon as possible",
  financing: "Yes, I want financing options",
  source: "Website Funnel",
};

const benefits = [
  "Free same-day implant consultation",
  "Free 3D smile scan and treatment preview",
  "Flexible monthly payment options",
  "Modern Austin clinic with advanced imaging",
];

const processSteps = [
  {
    title: "Scan",
    copy: "A fast 3D smile scan helps the team evaluate bone structure, bite, and implant options.",
    icon: Camera,
  },
  {
    title: "Plan",
    copy: "Meet with a dental implant team to review your goals, treatment path, and estimated investment.",
    icon: Stethoscope,
  },
  {
    title: "Schedule",
    copy: "Choose a convenient visit time and get clear next steps before you leave the consultation.",
    icon: CalendarCheck,
  },
];

const testimonials = [
  {
    name: "Maria R.",
    text: "The scan made everything easy to understand. I finally knew what my options were.",
  },
  {
    name: "James T.",
    text: "Professional, warm, and upfront about financing. The visit felt premium without pressure.",
  },
  {
    name: "Denise K.",
    text: "I booked after years of waiting. The consultation gave me confidence to move forward.",
  },
];

function App() {
  const [form, setForm] = useState<LeadForm>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const qualifiedScore = useMemo(() => {
    let score = 0;
    if (form.treatmentGoal.includes("Missing")) score += 35;
    if (form.timeline.includes("soon") || form.timeline.includes("30"))
      score += 30;
    if (form.financing.includes("Yes")) score += 20;
    if (form.phone && form.email) score += 15;
    return score;
  }, [form]);

  const updateField = (field: keyof LeadForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    const payload = {
      ...form,
      businessName: "BrightSmile Dental Clinic",
      offer: "Free Dental Implant Consultation + Free 3D Smile Scan",
      location: "Austin, Texas",
      qualifiedScore,
      submittedAt: new Date().toISOString(),
    };

    try {
      const webhookUrl = import.meta.env.VITE_GHL_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      setStatus("sent");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-pearl text-ink">
      <Hero
        form={form}
        status={status}
        updateField={updateField}
        submitLead={submitLead}
      />
      <TrustBar />
      <ProblemSolution />
      <Process />
      <Proof />
      <FinalCta />
    </main>
  );
}

function Hero({
  form,
  status,
  updateField,
  submitLead,
}: {
  form: LeadForm;
  status: "idle" | "sending" | "sent" | "error";
  updateField: (field: keyof LeadForm, value: string) => void;
  submitLead: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  return (
    <section className="hero-photo min-h-[92svh] text-white">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a
          href="#"
          className="flex items-center gap-3"
          aria-label="BrightSmile Dental Clinic home"
        >
          <span className="grid h-11 w-11 place-items-center rounded bg-mint text-teal">
            <Sparkles size={24} aria-hidden="true" />
          </span>
          <span>
            <span className="block text-lg font-bold leading-tight">
              BrightSmile
            </span>
            <span className="block text-xs font-medium uppercase tracking-[0.18em] text-mint">
              Dental Clinic
            </span>
          </span>
        </a>
        <a
          href="tel:+15125550198"
          className="inline-flex h-11 items-center gap-2 rounded border border-white/30 px-3 text-sm font-semibold backdrop-blur transition hover:bg-white hover:text-ink"
        >
          <Phone size={17} aria-hidden="true" />
          <span className="hidden sm:inline">(512) 555-0198</span>
        </a>
      </nav>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-12 pt-6 sm:px-8 lg:grid-cols-[1.05fr_0.75fr] lg:items-end lg:pb-16">
        <div className="max-w-3xl py-6 lg:py-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded border border-mint/50 bg-white/10 px-3 py-2 text-sm font-semibold text-mint backdrop-blur">
            <MapPin size={16} aria-hidden="true" />
            Austin, Texas Dental Implant Consultations
          </div>
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.04] sm:text-5xl lg:text-6xl">
            Free dental implant consultation plus 3D smile scan.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/86 sm:text-xl">
            Discover whether implants are right for you with advanced 3D
            imaging, a clear treatment plan, and flexible financing options
            starting at $3,500+.
          </p>
          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 text-sm font-semibold text-white"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded bg-mint text-teal">
                  <Check size={17} aria-hidden="true" />
                </span>
                {benefit}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#booking"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded bg-coral px-6 py-3 text-base font-bold text-white shadow-soft transition hover:bg-[#c95c50]"
            >
              Book Your Free Consultation Today
              <ChevronRight size={19} aria-hidden="true" />
            </a>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-mint">
              <Clock3 size={17} aria-hidden="true" />
              Limited scan appointments this week
            </span>
          </div>
        </div>

        <BookingForm
          form={form}
          status={status}
          updateField={updateField}
          submitLead={submitLead}
        />
      </div>
    </section>
  );
}

function BookingForm({
  form,
  status,
  updateField,
  submitLead,
}: {
  form: LeadForm;
  status: "idle" | "sending" | "sent" | "error";
  updateField: (field: keyof LeadForm, value: string) => void;
  submitLead: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  const fieldClass =
    "h-12 w-full rounded border border-ink/15 bg-white px-3 text-sm text-ink outline-none transition placeholder:text-ink/45 focus:border-teal focus:ring-4 focus:ring-teal/12";

  return (
    <form
      id="booking"
      onSubmit={submitLead}
      className="rounded bg-white p-5 text-ink shadow-soft sm:p-6"
    >
      <div className="mb-5">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal">
          Claim your free scan
        </p>
        <h2 className="mt-2 text-2xl font-bold">Request an appointment</h2>
        <p className="mt-2 text-sm leading-6 text-ink/70">
          A BrightSmile coordinator will contact you to confirm availability.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className={fieldClass}
          required
          placeholder="First name"
          value={form.firstName}
          onChange={(event) => updateField("firstName", event.target.value)}
        />
        <input
          className={fieldClass}
          required
          placeholder="Last name"
          value={form.lastName}
          onChange={(event) => updateField("lastName", event.target.value)}
        />
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <input
          className={fieldClass}
          required
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={(event) => updateField("phone", event.target.value)}
        />
        <input
          className={fieldClass}
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
        />
      </div>

      <label
        className="mt-4 block text-sm font-semibold"
        htmlFor="treatmentGoal"
      >
        What best describes your smile goal?
      </label>
      <select
        id="treatmentGoal"
        className={`${fieldClass} mt-2`}
        value={form.treatmentGoal}
        onChange={(event) => updateField("treatmentGoal", event.target.value)}
      >
        <option>Missing one or more teeth</option>
        <option>Loose or uncomfortable dentures</option>
        <option>Broken or failing teeth</option>
        <option>Cosmetic smile makeover</option>
      </select>

      <label className="mt-4 block text-sm font-semibold" htmlFor="timeline">
        How soon do you want to explore treatment?
      </label>
      <select
        id="timeline"
        className={`${fieldClass} mt-2`}
        value={form.timeline}
        onChange={(event) => updateField("timeline", event.target.value)}
      >
        <option>As soon as possible</option>
        <option>Within 30 days</option>
        <option>In 1 to 3 months</option>
        <option>Just researching</option>
      </select>

      <label className="mt-4 block text-sm font-semibold" htmlFor="financing">
        Interested in flexible financing?
      </label>
      <select
        id="financing"
        className={`${fieldClass} mt-2`}
        value={form.financing}
        onChange={(event) => updateField("financing", event.target.value)}
      >
        <option>Yes, I want financing options</option>
        <option>No, I plan to pay directly</option>
        <option>Not sure yet</option>
      </select>

      <input type="hidden" value={form.source} name="source" />
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded bg-teal px-5 py-3 text-base font-bold text-white transition hover:bg-[#106c68] disabled:cursor-wait disabled:opacity-70"
      >
        <CalendarCheck size={19} aria-hidden="true" />
        {status === "sending"
          ? "Sending request..."
          : "Book Your Free Consultation Today"}
      </button>
      {status === "sent" && (
        <p className="mt-3 rounded bg-mint px-3 py-2 text-sm font-semibold text-teal">
          Request received. Our Austin team will follow up shortly.
        </p>
      )}
      {status === "error" && (
        <p className="mt-3 rounded bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
          Something went wrong. Please call (512) 555-0198.
        </p>
      )}
      <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-ink/58">
        <ShieldCheck size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
        Your information is used only to coordinate your consultation.
      </p>
    </form>
  );
}

function TrustBar() {
  return (
    <section className="border-b border-ink/10 bg-white">
      <div className="mx-auto grid max-w-7xl gap-4 px-5 py-5 sm:grid-cols-3 sm:px-8">
        {[
          ["4.9 average patient rating", Star],
          ["Advanced 3D imaging included", Camera],
          ["Flexible financing available", CreditCard],
        ].map(([text, Icon]) => (
          <div
            key={text as string}
            className="flex items-center gap-3 text-sm font-bold"
          >
            <Icon size={20} className="text-copper" aria-hidden="true" />
            {text as string}
          </div>
        ))}
      </div>
    </section>
  );
}

function ProblemSolution() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal">
          Implants can feel complex
        </p>
        <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
          Get clear answers before committing to treatment.
        </h2>
        <p className="mt-4 text-lg leading-8 text-ink/72">
          Missing teeth, failing dental work, and uncomfortable dentures can
          affect how you eat, speak, and smile. BrightSmile gives you a precise
          first step with no consultation fee.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          [
            "Know if you are a candidate",
            "Review implant options with a trained treatment coordinator and imaging-informed recommendations.",
          ],
          [
            "See the path forward",
            "Understand timing, visits, and what your smile restoration could involve.",
          ],
          [
            "Plan around your budget",
            "Explore financing conversations early so cost does not stay a mystery.",
          ],
          [
            "Move quickly if ready",
            "Same-day consultations help qualified patients take the next step without waiting weeks.",
          ],
        ].map(([title, copy]) => (
          <article
            key={title}
            className="rounded border border-ink/10 bg-white p-5 shadow-sm"
          >
            <BadgeCheck className="text-teal" size={24} aria-hidden="true" />
            <h3 className="mt-4 text-lg font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/68">{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="bg-mint/70 py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal">
            What happens next
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            A Premium Consultation, Built For Clarity.
          </h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {processSteps.map(({ title, copy, icon: Icon }, index) => (
            <article key={title} className="rounded bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded bg-teal text-white">
                  <Icon size={23} aria-hidden="true" />
                </span>
                <span className="text-sm font-bold text-copper">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/68">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.82fr_1fr] lg:items-center">
        <div className="overflow-hidden rounded bg-white shadow-soft">
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1100&q=82"
            alt="Modern dental consultation room with dental chair and equipment"
            className="h-full min-h-[360px] w-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal">
            Social proof
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Trusted care for adults ready to smile again.
          </h2>
          <div className="mt-6 grid gap-4">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.name}
                className="rounded border border-ink/10 bg-white p-5 shadow-sm"
              >
                <div
                  className="mb-3 flex gap-1 text-copper"
                  aria-label="Five star review"
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="text-base leading-7 text-ink/78">
                  "{testimonial.text}"
                </blockquote>
                <figcaption className="mt-3 text-sm font-bold">
                  {testimonial.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-ink px-5 py-14 text-white sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-mint">
            Free scan spots are limited
          </p>
          <h2 className="mt-3 text-3xl font-bold">
            Book your BrightSmile consultation today.
          </h2>
          <p className="mt-3 leading-7 text-white/76">
            Get a clear implant plan, 3D imaging, and financing guidance in one
            visit.
          </p>
        </div>
        <a
          href="#booking"
          className="inline-flex min-h-[52px] shrink-0 items-center justify-center gap-2 rounded bg-coral px-6 py-3 text-base font-bold text-white transition hover:bg-[#c95c50]"
        >
          <MessageCircle size={19} aria-hidden="true" />
          Request My Free Scan
        </a>
      </div>
    </section>
  );
}

export default App;
