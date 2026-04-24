export const coursesHeaderData = {
  tag: "Courses",
  title: "Courses Available at ACADOME",
};

export const coursesTabsData = [
  {
    id: "ccap",
    tabLabel: "CCAP",
    durationInfo: "2 Months + Internship",
    title: "Certified Comprehensive Accounting Program",
    description:
      "A dynamic 2-month course to equip you with essential skills for a career in accounting.",
    topics: [
      "Manual Accounting",
      "Zoho Books",
      "M.S Excel",
      "GST & TDS (Foundation Level)",
    ],
    buttonText: "Enroll Now",
    buttonLink: "/contact-us",
    whatsappMessage: "Hi ACADOME, I'm interested in the CCAP (Certified Comprehensive Accounting Program). Could you provide more details?",
    imageSrc: "/images/ccap.webp",
  },
  {
    id: "dafa",
    tabLabel: "DAFA",
    durationInfo: "6 Months + Internship",
    title: "Diploma in Advanced Financial Accounting",
    description:
      "An immersive 6-month experience combining foundational knowledge with advanced accounting practices.",
    topics: [
      "Manual Accounting",
      "Tally Prime",
      "M.S Excel",
      "Odoo",
      "Zoho Books",
      "Quickbooks",
      "Sage 50",
      "Xero",
      "SAP-FICO",
      "GST, GCC VAT & TDS",
    ],
    buttonText: "Enroll Now",
    buttonLink: "/contact-us",
    whatsappMessage: "Hi ACADOME, I'm interested in the DAFA (Diploma in Advanced Financial Accounting). Could you provide more details?",
    imageSrc: "/images/dafa.webp",
  },
  {
    id: "sap",
    tabLabel: "SAP FICO",
    durationInfo: "3 Months",
    title: "SAP FICO",
    description:
      "Training in Financial Accounting (FI) and Controlling (CO) within SAP ERP. Prepares for SAP Authorized Certification.",
    topics: [
      "Enterprise Structure",
      "General Ledger Accounting",
      "Accounts Payable/Receivable",
      "Asset Accounting",
      "Cost Center Accounting",
    ],
    buttonText: "Enroll Now",
    buttonLink: "/contact-us",
    whatsappMessage: "Hi ACADOME, I'm interested in the SAP FICO course. Could you provide more details?",
    imageSrc: "/images/sap.webp",
  },
];

export const certificationHeaderData = {
  tag: "CERTIFICATION",
  title: "Credentials That Open Doors",
  subtext: "Every course backed by recognised certifications, preparing you for global excellence.",
};

export const certificationCards = [
  {
    id: "rsdca",
    badge: "National",
    issuer: "RSDCA",
    title: "RSDCA Certification",
    description: "Nationally recognised credential validating your accounting and finance skills, endorsed by a reputed institution.",
    logo: "/images/certificate.png",
    type: "national"
  },

  {
    id: "sap",
    badge: "Global",
    issuer: "SAP Global",
    title: "SAP Authorised Certification",
    description: "The SAP FICO course prepares you for the globally recognised SAP exam — opens doors to ERP consulting roles worldwide.",
    icon: "sap",
    type: "global"
  }
];

export const courseComparisonData = {
  columns: ["Feature", "CCAP", "DAFA", "SAP FICO"],
  rows: [
    { label: "Duration", values: ["2 Months", "6 Months", "3 Months"] },
    { label: "Level", values: ["Beginner to Intermediate", "Advanced Diploma", "Specialized Professional"] },
    { label: "Certifications", values: ["RSDCA", "RSDCA + Diploma", "SAP Global Ready"] },
    { label: "Internship", values: ["Included", "Included", "Not Included"] },
    { label: "Ideal For", values: ["Fresh Graduates", "Career Switchers", "ERP Consultants"] }
  ]
};

export const courseFaqs = [
  {
    question: "What is the eligibility for the CCAP course?",
    answer: "Any graduate or student pursuing graduation in commerce (B.Com, BBA, etc.) can join the CCAP course."
  },
  {
    question: "Is the internship provided during the course?",
    answer: "Yes, our CCAP and DAFA programs include a structured internship phase to provide real-world industry exposure."
  },
  {
    question: "Are the certificates globally recognized?",
    answer: "Yes, our RSDCA certificates are recognized nationally and are accepted for GCC and international employment."
  },
  {
    question: "Do you provide job placement support?",
    answer: "Absolutely. We have a dedicated placement cell that helps with resume building, interview prep, and connecting with employers in India and GCC."
  },
  {
    question: "Can I join SAP FICO without an accounting background?",
    answer: "While an accounting background is helpful, our SAP FICO module starts with foundations. However, basic financial knowledge is recommended."
  },
  {
    question: "What software tools will I learn?",
    answer: "Depending on the course, you will master tools like Tally Prime, SAP, Zoho Books, QuickBooks, and Excel for accounting."
  }
];
