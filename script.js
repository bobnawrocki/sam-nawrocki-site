const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");
const form = document.querySelector("#inquiryForm");
const formError = document.querySelector("#formError");
const successMessage = document.querySelector("#successMessage");

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
}

function initReveal() {
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function buildInquiryPayload(formData) {
  return {
    brand: "sam_nawrocki_private_dining",
    source: "sam_website",
    name: formData.get("name")?.trim(),
    email: formData.get("email")?.trim(),
    phone: formData.get("phone")?.trim(),
    eventDate: formData.get("eventDate"),
    eventLocation: formData.get("eventLocation")?.trim(),
    guestCount: formData.get("guestCount"),
    occasion: formData.get("occasion")?.trim(),
    desiredExperience: formData.get("desiredExperience"),
    dietaryNeeds: formData.get("dietaryNeeds")?.trim(),
    budgetRange: formData.get("budgetRange")?.trim(),
    message: formData.get("message")?.trim(),
  };
}

async function submitInquiry(payload) {
  // TODO: Connect FunctionIQ or another backend integration here.
  // Future integration target: POST /inquiry
  // Future payload should include:
  // {
  //   "brand": "sam_nawrocki_private_dining",
  //   "source": "sam_website"
  // }
  console.info("Inquiry payload ready for future POST /inquiry integration:", payload);
}

function handleInquirySubmit(event) {
  event.preventDefault();
  formError.textContent = "";

  if (!form.checkValidity()) {
    formError.textContent = "Please complete the required fields before sending your inquiry.";
    form.reportValidity();
    return;
  }

  const payload = buildInquiryPayload(new FormData(form));
  submitInquiry(payload);

  form.hidden = true;
  successMessage.hidden = false;
  successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
}

window.addEventListener("scroll", updateHeader, { passive: true });
form?.addEventListener("submit", handleInquirySubmit);
updateHeader();
initReveal();
