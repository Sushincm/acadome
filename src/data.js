
export const navLinks = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About Us", href: "/about-us" },
  { id: "courses", label: "Our Courses", href: "/our-courses" },
  { id: "gallery", label: "Gallery", href: "/gallery" },
  { id: "contact", label: "Contact Us", href: "/contact-us" },
];

export const heroData = {
  title: "Empowering individuals with cutting-edge financial management skills",
  description:
    "Step into Global Careers with Fully Free Internship Opportunities in Gulf Countries. Practical training designed for job-ready professionals in India and GCC markets.",
  buttonText: "Learn more",
  buttonLink: "/contact-us",
};

export const aboutData = {
  tag: "About Us",
  title: "About ACADOME",
  descriptionParts: [
    { text: "At ACADOME, we build industry-ready", isImage: false },
    { imageSrc: "/images/about-1.jpg", alt: "Training", isImage: true },
    {
      text: "accounting professionals. Through practical training",
      isImage: false,
    },
    { imageSrc: "/images/about-2.jpg", alt: "Software Mastery", isImage: true },
    {
      text: "and software mastery, we prepare careers for real corporate",
      isImage: false,
    },
    { imageSrc: "/images/about-3.jpg", alt: "Corporate", isImage: true },
    { text: "environments.", isImage: false },
  ],
  buttonText: "Read more",
  buttonLink: "/about-us",
  story: {
    title: "Our Story",
    content: [
      "Founded with a vision to bridge the gap between academic learning and industry requirements, ACADOME has emerged as a premier institute for financial and accounting excellence. We recognized that many graduates possessed theoretical knowledge but lacked the practical skills needed in today's fast-paced corporate world, especially in the competitive GCC markets.",
      "Our journey began with a small group of dedicated CA and MBA professionals who wanted to share their real-world experience. Over the years, we have trained hundreds of students, transforming them into job-ready professionals equipped with the latest software tools and international accounting standards.",
      "Today, ACADOME stands for quality, practical expertise, and career-oriented training. We don't just teach accounting; we build careers that last."
    ]
  },
  missionVision: {
    mission: {
      title: "Our Mission",
      content: "To empower aspiring accountants and finance professionals with practical, industry-aligned training and global certifications, enabling them to excel in domestic and international job markets."
    },
    vision: {
      title: "Our Vision",
      content: "To be the leading global destination for practical financial education, recognized for creating the most skilled and industry-ready accounting professionals."
    }
  },
  whyChoose: [
    { title: "Expert Training", content: "Learn from certified professionals with years of industry experience." },
    { title: "Competitive Edge", content: "Gain skills that set you apart in the global job market." },
    { title: "Job-Oriented Approach", content: "Every module is designed with hiring requirements in mind." },
    { title: "Practical Experience", content: "Apply your knowledge through real-world projects and internships." }
  ]
};

export const wwoHeaderData = {
  tag: "What We Offer",
  title: "Master Financial Management with Expert-Led Training at ACADOME",
};

export const wwoCards = [
  {
    id: "internship",
    title: "Free Internship in Gulf Countries",
    description:
      "Step into Global Careers with Fully Free Internship Opportunities in Gulf Countries. Gain real industry exposure and develop practical skills in accounting and taxation through structured hands-on experience.",
    buttonText: "Learn more",
    buttonLink: "/contact-us",
  },
  {
    id: "workshops",
    title: "Professional Workshops",
    description:
      "Expert-led sessions designed to strengthen taxation knowledge, compliance practices, and strategic financial planning for working professionals.",
    buttonText: "Learn more",
    buttonLink: "/contact-us",
  },
  {
    id: "seminars",
    title: "Seminar Sessions",
    description:
      "Scenario-driven seminars focused on practical tax planning and financial management, tailored for professionals and aspiring accountants.",
    buttonText: "Learn more",
    buttonLink: "/contact-us",
  },
];

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
    imageSrc: "/images/course1.webp",
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
    imageSrc: "/images/course2.webp",
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
    imageSrc: "/images/course3.webp",
  },
];

export const benefitsHeaderData = {
  tag: "Why Choose Us",
  title: "Core Benefits and Advantages",
  description: "Join ACADOME and leverage a diverse spectrum of elite frameworks designed to elevate your professional trajectory from the classroom out into the corporate sphere.",
};

export const benefitsCards = [
  {
    id: "01",
    num: "01",
    title: "Hands-On Training",
    description: "Strengthen your skills with guided projects, case studies, and exercises designed to mirror real-world accounting work.",
    iconId: "wrench"
  },
  {
    id: "02",
    num: "02",
    title: "Industry-Relevant Curriculum",
    description: "Master the latest accounting standards, essential tools, and proven practices aligned with modern industry expectations.",
    iconId: "book"
  },
  {
    id: "03",
    num: "03",
    title: "Experienced Instructors",
    description: "Learn from certified professionals with years of real industry exposure, hands-on experience, and personal mentorship.",
    iconId: "user"
  },
  {
    id: "04",
    num: "04",
    title: "Flexible Learning Options",
    description: "Choose from convenient online sessions or in-person classes, with schedules tailored to fit both students and working professionals.",
    iconId: "calendar"
  }
];

export const mentorsHeaderData = {
  tag: "OUR MENTORS",
  title: "Elevating Your Path to Excellence",
  subtext: "Learn from industry experts with years of experience and a passion for teaching.",
};

export const mentorsData = [
  {
    id: 1,
    name: "CA Rajeesh Chinnan",
    credentials: "ACA, ACMA(UK), CGMA",
    role: "Faculty",
    image: "/images/Team/CA Rajeesh Chinnan.jpg",
  },
  {
    id: 2,
    name: "CA Vinod Valooparambil",
    credentials: "ACA, GMPE (IIM Indore)",
    role: "Faculty",
    image: "/images/Team/CA Vinod Valooparambil.jpg",
  },
  {
    id: 3,
    name: "CA Ajeesh Gopalan",
    credentials: "ACA",
    role: "Faculty",
    image: "/images/Team/CA Ajeesh Gopalan.jpg",
  },
  {
    id: 4,
    name: "Akshay K.S",
    credentials: "CA Inter",
    role: "Faculty",
    image: "/images/Team/Akshay K.S.jpg",
  },
  {
    id: 5,
    name: "Justin Davis",
    credentials: "CA Inter",
    role: "Faculty",
    image: "/images/Team/Justin Davis.jpg",
  },
  {
    id: 6,
    name: "Soumya Sasikumar",
    credentials: "MBA",
    role: "Faculty",
    image: "/images/Team/Soumya Sasikumar.jpg",
  },
];

export const reviewsHeaderData = {
  tag: "STUDENT REVIEWS",
  title: "What Our Students Say",
};

export const reviewsData = [
  {
    id: 1,
    name: "Marshal",
    quote: "My experience at ACADOME was amazing. The Certified Comprehensive Accounting Program was practical and covered all the key aspects I needed. The instructors brought real-world insights, leaving me confident and ready for new challenges in accounting.",
    program: "CCAP — Certified Comprehensive Accounting Program",
    image: "https://i.pravatar.cc/150?u=marshal",
  },
  {
    id: 2,
    name: "Anju",
    quote: "Joining ACADOME's Certified Comprehensive Accounting Program was a great decision and a refreshment to my career. The curriculum was clear, and the instructors were supportive. I highly recommend it to anyone pursuing accounting.",
    program: "CCAP — Certified Comprehensive Accounting Program",
    image: "https://i.pravatar.cc/150?u=anju",
  },
  {
    id: 3,
    name: "Hena",
    quote: "Joining ACADOME's CCAP was a pivotal step in my career. The comprehensive curriculum and the knowledgeable instructors provided me with a robust understanding of accounting principles. I highly recommend this program.",
    program: "CCAP — Certified Comprehensive Accounting Program",
    image: "https://i.pravatar.cc/150?u=hena",
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

export const placementHeaderData = {
  tag: "PLACEMENTS",
  title: "We Don't Stop At Training",
  subtext: "Our dedicated placement cell works tirelessly to bridge the gap between your skills and your dream career.",
};

// NOTE: These are placeholder stats. Please confirm exact numbers with the client before go-live.
export const placementStats = [
  {
    id: 1,
    number: "200",
    suffix: "+",
    label: "STUDENTS PLACED",
    subLabel: "Growing network of successful alumni"
  },
  {
    id: 2,
    number: "GCC",
    suffix: "",
    label: "INTERNATIONAL REACH",
    subLabel: "Kuwait, UAE, Qatar, Bahrain"
  },
  {
    id: 3,
    number: "100",
    suffix: "%",
    label: "JOB-ORIENTED COURSES",
    subLabel: "Every course designed for hiring"
  },
  {
    id: 4,
    number: "Alumni",
    suffix: "",
    label: "NETWORK",
    subLabel: "Active WhatsApp + referral community"
  }
];

export const placementFeatures = [
  {
    id: 1,
    title: "Resume & Interview Prep",
    description: "Personalised CV support and mock interviews to get you ready for real hiring rounds.",
    icon: "document"
  },
  {
    id: 2,
    title: "Employer Tie-Ups",
    description: "Direct connections with accounting firms, corporates, and GCC businesses actively hiring our graduates.",
    icon: "handshake"
  },
  {
    id: 3,
    title: "GCC Placement & Free Internship",
    description: "Step into Global Careers with Fully Free Internship Opportunities in Gulf Countries, plus guidance on work visa, documentation, and job applications.",
    icon: "airplane"
  }
];

export const galleryHeaderData = {
  tag: "LIFE AT ACADOME",
  title: "A Glimpse into our World",
  subtext: "Experience the vibrant energy and practical learning environment at ACADOME.",
};

export const galleryCategories = ["All", "Classrooms", "Workshops", "Graduation", "Campus"];

// Placeholder stats for gallery. Please update with real photos (Classrooms, Workshops, Graduation, Campus)
export const galleryImages = [
  { id: 1, src: "/images/gallary/webp/gallery-1.webp", category: "Classrooms", caption: "Accounting Session", h: 400 },
  { id: 2, src: "/images/gallary/webp/gallery-2.webp", category: "Workshops", caption: "Hands-on Training", h: 400 },
  { id: 3, src: "/images/gallary/webp/gallery-3.webp", category: "Campus", caption: "Student Interaction", h: 400 },
  { id: 4, src: "/images/gallary/webp/gallery-4.webp", category: "Graduation", caption: "Success Moments", h: 400 },
  { id: 5, src: "/images/gallary/webp/gallery-5.webp", category: "Classrooms", caption: "Smart Class Learning", h: 400 },
  { id: 6, src: "/images/gallary/webp/gallery-6.webp", category: "Workshops", caption: "Industry Expert Talk", h: 400 },
  { id: 7, src: "/images/gallary/webp/gallery-7.webp", category: "Campus", caption: "Campus Life", h: 400 },
  { id: 8, src: "/images/gallary/webp/gallery-8.webp", category: "Classrooms", caption: "Practical Lab", h: 400 },
  { id: 9, src: "/images/gallary/webp/gallery-9.webp", category: "Workshops", caption: "Corporate Preparedness", h: 400 },
  { id: 10, src: "/images/gallary/webp/gallery-10.webp", category: "Campus", caption: "Discussion Hub", h: 400 },
  { id: 11, src: "/images/gallary/webp/gallery-11.webp", category: "Graduation", caption: "Achievement", h: 400 },
  { id: 12, src: "/images/gallary/webp/gallery-12.webp", category: "Classrooms", caption: "Faculty Guidance", h: 400 },
  { id: 13, src: "/images/gallary/webp/gallery-13.webp", category: "Workshops", caption: "Soft Skills Training", h: 400 },
  { id: 14, src: "/images/gallary/webp/gallery-14.webp", category: "Campus", caption: "ACADOME Premises", h: 400 },
  { id: 15, src: "/images/gallary/webp/gallery-15.webp", category: "Classrooms", caption: "Morning Session", h: 400 },
  { id: 16, src: "/images/gallary/webp/gallery-16.webp", category: "Workshops", caption: "Tally Mastery", h: 400 },
  { id: 17, src: "/images/gallary/webp/gallery-17.webp", category: "Campus", caption: "Collaboration Space", h: 400 },
  { id: 18, src: "/images/gallary/webp/gallery-18.webp", category: "Graduation", caption: "Graduation Batch", h: 400 },
  { id: 19, src: "/images/gallary/webp/gallery-19.webp", category: "Classrooms", caption: "Interactive Teaching", h: 400 },
  { id: 20, src: "/images/gallary/webp/gallery-20.webp", category: "Workshops", caption: "SAP Module Training", h: 400 },
  { id: 21, src: "/images/gallary/webp/gallery-21.webp", category: "Campus", caption: "Student Lounge", h: 400 },
  { id: 22, src: "/images/gallary/webp/gallery-22.webp", category: "Classrooms", caption: "Accounting Basics", h: 400 },
  { id: 23, src: "/images/gallary/webp/gallery-23.webp", category: "Workshops", caption: "Peer Learning", h: 400 },
  { id: 24, src: "/images/gallary/webp/gallery-24.webp", category: "Campus", caption: "Library Area", h: 400 },
  { id: 25, src: "/images/gallary/webp/gallery-25.webp", category: "Graduation", caption: "Convocation Ceremony", h: 400 },
  { id: 26, src: "/images/gallary/webp/gallery-26.webp", category: "Classrooms", caption: "Evening Batch", h: 400 },
  { id: 27, src: "/images/gallary/webp/gallery-27.webp", category: "Workshops", caption: "Resume Workshop", h: 400 },
  { id: 28, src: "/images/gallary/webp/gallery-28.webp", category: "Campus", caption: "Entrance View", h: 400 },
  { id: 29, src: "/images/gallary/webp/gallery-29.webp", category: "Classrooms", caption: "Focused Study", h: 400 },
  { id: 30, src: "/images/gallary/webp/gallery-30.webp", category: "Workshops", caption: "Interview Prep", h: 400 },
  { id: 31, src: "/images/gallary/webp/gallery-31.webp", category: "Campus", caption: "Main Corridor", h: 400 },
  { id: 32, src: "/images/gallary/webp/gallery-32.webp", category: "Graduation", caption: "Certificate Pride", h: 400 },
  { id: 33, src: "/images/gallary/webp/gallery-33.webp", category: "Classrooms", caption: "Digital Learning", h: 400 },
  { id: 34, src: "/images/gallary/webp/gallery-34.webp", category: "Workshops", caption: "Case Study Analysis", h: 400 },
  { id: 35, src: "/images/gallary/webp/gallery-35.webp", category: "Campus", caption: "Student Hub", h: 400 },
  { id: 36, src: "/images/gallary/webp/gallery-36.webp", category: "Graduation", caption: "Final Farewell", h: 400 },
];

export const contactData = {
  header: {
    tag: "Get in Touch",
    title: "Connect with Our Expert Team",
    description: "Have questions about our programs or need career guidance? Reach out to us today.",
  },
  details: [
    { label: "India Phone", value: "+91 9778914198", type: "tel" },
    { label: "Kuwait Phone 1", value: "+965 69606980", type: "tel" },
    { label: "Kuwait Phone 2", value: "+965 63336967", type: "tel" },
    { label: "Email", value: "info@acadome.in", type: "email" },
    { label: "Address", value: "Chowallur Tower, Room No. 52/1067/35, 3rd floor, West Fort, Civil Lane, Opp. Mar Augin Thoovana Church, Thrissur, Kerala — 680004", type: "text" },
  ],
};

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
