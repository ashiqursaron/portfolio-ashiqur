/* ════════════════════════════════════════════════════════════════════
   YOUR PORTFOLIO CONTENT  —  this is the ONLY file you need to edit.
   ════════════════════════════════════════════════════════════════════

   How editing works
   ─────────────────
   • Change the text between the quote marks  '...'  and save. That's it.
   • To ADD something (a paper, a project, an award): copy one existing
     block { ... }, paste it right after it, and change the words.
   • To REMOVE something: delete its whole block { ... } including the
     trailing comma.
   • Keep the commas, quotes and brackets exactly as they are. If the
     site goes blank after an edit, you probably deleted one by accident
     — undo and try again.
   • A word wrapped in *stars* gets highlighted in the orange accent.
   • Images and files: drop them in the  public/  folder, then refer to
     them as '/images/me.jpg', '/projects/my-project.png', etc.
     (see README.md for the 2-minute walkthrough).
   • Leave any text as ''  (empty) to hide that item.

   Last synced with your CV: Nov 2026.
   ──────────────────────────────────────────────────────────────────── */


/* 1 ─ YOU ───────────────────────────────────────────────────────── */

export const person = {
  name: 'Ashiqur Rahman Saron',
  firstName: 'Ashiqur',
  initials: 'AS',                         // shown in the top-left logo
  jobTitle: 'Computer Science Researcher — Machine Learning & Computer Vision',
  email: 'ashiqursaron@gmail.com',

  // Shown in the top bar (the little live clock) and the intro screen.
  // Set showClock to false to hide the clock.
  location: 'Dhaka, Bangladesh',
  timeZone: 'Asia/Dhaka',                 // e.g. 'Asia/Qatar' for Doha
  showClock: true,

  photo: '/images/portrait.jpg',          // used in the headline
  photoAlt: 'Portrait of Ashiqur Rahman Saron',
  cv: '/Ashiqur_Rahman_Saron_CV.pdf',     // '' hides the Download CV button
};

export const socials = [
  { label: 'LinkedIn',     href: 'https://www.linkedin.com/in/ashiqur-saron' },
  { label: 'GitHub',       href: 'https://github.com/ashiqursaron' },
  { label: 'Hugging Face', href: 'https://huggingface.co/ashiqurSaron' },
];


/* 2 ─ SITE SETTINGS (link previews + Google) ─────────────────────── */

export const site = {
  // Your website address once you know it, e.g. 'https://ashiqursaron.web.app'
  // (no slash at the end). Leave '' until then — the site works fine without it,
  // but link previews (LinkedIn/WhatsApp) and the sitemap need it.
  url: 'https://ashiqursaron.netlify.app',

  title: 'Ashiqur Rahman Saron — ML & Computer Vision Researcher',
  description:
    'Ashiqur Rahman Saron is a Computer Science graduate (4.00/4.00 CGPA) researching machine learning and computer vision — Bangla NLP, assistive AI and biomedical imaging. Research Assistant at Qatar University.',
  keywords: ['Machine Learning', 'Computer Vision', 'Biomedical Imaging', 'Bangla NLP', 'Transformers', 'Deep Learning'],
  themeColor: '#0E0E0C',
};


/* 3 ─ HOMEPAGE TOP ───────────────────────────────────────────────── */

export const hero = {
  // Three lines of the big headline.
  //   {photo}  = your round photo     *stars* = orange text
  headline: [
    'Ashiqur builds',
    'AI that {photo} sees',
    '*and understands.*',
  ],

  // *Starred* phrases get brightened and underlined.
  intro:
    'Computer Science graduate (4.00/4.00 CGPA, top 1% of my class) researching *machine learning and computer vision* — from *Bangla language models* to *assistive AI*. Now a Research Assistant at Qatar University, and aiming for a Master’s in *biomedical imaging*.',

  // Text on the spinning circle. Any length works.
  badge: 'Open to MSc & research roles',
};

// The “hello in my languages” screen that plays once per visit.
// ms = how long each word stays. Delete the whole block to remove the intro.
export const introWords = [
  { t: 'Hello',        lang: 'English', code: 'en', ms: 560 },
  { t: 'হ্যালো',        lang: 'Bengali', code: 'bn', ms: 320 },
  { t: 'কেমন আছেন?',   lang: 'Bengali', code: 'bn', ms: 380 },
  { t: 'I’m Ashiqur.', lang: 'Nice to meet you', code: 'en', ms: 820 },
];

// Scrolling orange ribbon: tools you use.
export const stack = [
  'Python', 'PyTorch', 'TensorFlow', 'Keras', 'OpenCV', 'Transformers',
  'YOLOv8', 'Hugging Face', 'NumPy', 'Pandas', 'Raspberry Pi', 'Jetson Nano',
  'C++', 'MATLAB', 'React', 'Django',
];

// The big statement paragraph. *Stars* = orange.
export const manifesto =
  'I like machine learning where it *meets people* the usual tools overlook. A Bangla post most models misread. A photo a visually impaired person can’t see. A scan that deserves a *second pair of eyes.* So I build the models, then *benchmark them honestly* against every alternative, until I know what actually works.';


/* 4 ─ SELECTED WORK (the sideways-scrolling cards) ──────────────────
   Fields:  eyebrow · title · body · stats [[big, small], ...] (optional)
            stack · link {label, href} (optional) · image (optional)
   A card with  points: [...]  instead of body/stats becomes the big
   orange highlight card.                                                */

export const featured = [
  {
    eyebrow: 'Research · Bangla NLP · 2026',
    title: 'BanglaSuicideBERT',
    body:
      'Fine-tuned BanglaBERT to detect suicide risk in Bangla social media text, and compared it head-to-head with XLM-RoBERTa. BanglaBERT came out ahead.',
    stats: [['96.21%', 'accuracy'], ['2', 'transformers compared']],
    stack: 'BanglaBERT · XLM-RoBERTa · Transformers',
    link: { label: 'Paper ↗', href: 'https://ieeexplore.ieee.org/document/11429305' },
    image: '',   // e.g. '/projects/banglasuicidebert.png'
  },
  {
    eyebrow: 'Research · Assistive AI · 2025',
    title: 'Image → Bangla text',
    body:
      'A vision-transformer pipeline that turns images into Bangla sentences, built to improve everyday mobility for visually impaired people in Bangladesh.',
    stats: [],
    stack: 'Vision Transformer · Deep learning · Bangla NLG',
    link: { label: 'Paper ↗', href: 'https://drive.google.com/file/d/1k4Ph2_uZ5576vbxJzjNwrjH-uCk5SwkS/view?usp=sharing' },
    image: '',
  },
  {
    eyebrow: 'Project · Assistive robotics · 2025',
    title: 'Able Sign',
    body:
      'An AI-driven, gesture-controlled robotics system for excavators, with applications in agriculture and manufacturing.',
    stats: [],
    stack: 'YOLO · Python · ESP32',
    link: { label: 'Source ↗', href: 'https://github.com/ashiqursaron/Able_Sign' },
    image: '',
  },
  {
    eyebrow: 'Project · Agri-tech · 2025',
    title: 'Rice Leaf Disease Detection',
    body:
      'A lightweight YOLOv8 model optimised for the Jetson Nano, classifying rice leaf diseases accurately enough to make crop protection economical and scalable.',
    stats: [],
    stack: 'YOLOv8 · Jetson Nano · Computer vision',
    link: { label: 'Source ↗', href: 'https://github.com/ashiqursaron/Rice_Leaf_Detection_YOLOv8.git' },
    image: '',
  },
  {
    // Orange highlight card (has "points", no "body")
    eyebrow: 'NEDAAS Lab · Team Lead · 2026 → now',
    title: 'Heading toward biomedical imaging.',
    points: [
      'Leading computer-vision and AR research projects at NEDAAS Lab.',
      'Coordinating the team’s activities and publications.',
      'Research Assistant in multimodal ML at Qatar University.',
    ],
  },
];

// Smaller projects, shown as a list further down.
export const bench = [
  { title: 'Dragon News',   category: 'AI news app · BART summaries · React + Firebase', href: 'https://dragon-news-breaking-94881.web.app/category/1' },
  { title: 'Google Stock Prediction', category: 'LSTM forecasting · Gradio · Hugging Face', href: 'https://huggingface.co/spaces/ashiqurSaron/Google_Stock_Prediction' },
];


/* 5 ─ NUMBERS ────────────────────────────────────────────────────────
   [big number, small orange suffix, label]                               */

export const numbers = [
  ['__PAPERS__', '',  'research papers'],        // counted automatically below
  ['4.00',       '/4.00', 'CGPA · top 1% of class'],
  ['1',          '',  'Best Paper Award'],
  ['96.21',      '%', 'accuracy on Bangla suicide-risk detection'],
];


/* 6 ─ STORY (education + experience, newest first) ───────────────── */

export const timeline = [
  {
    when: 'Apr 2026 → now',
    role: 'Research Assistant',
    text: 'Qatar University Machine Learning Group, Doha. Conducting multimodal machine learning research under the supervision of Dr. Chowdhury.',
  },
  {
    when: 'Feb 2026 → now',
    role: 'Team Lead, Computer Vision & AR',
    text: 'NEDAAS Lab, Dhaka. Leading CV and ML research aimed at biomedical imaging, and coordinating team activities and publications.',
  },
  {
    when: 'Oct 2025 → Jan 2026',
    role: 'Software Engineer Intern',
    text: 'Brainicon Technology, Dhaka. Full-stack development: a React front end and a Django back end.',
  },
  {
    when: 'Aug 2022 → Apr 2026',
    role: 'BSc, Computer Science & Engineering',
    text: 'American International University-Bangladesh. Final grade 4.00/4.00, ranked in the top 1% of the graduating class.',
  },
];

// Shown next to the timeline. If you add a photo ('/images/outdoors.jpg'),
// it is shown instead of this list.
export const storyPhoto = { src: '', alt: '', caption: '' };
export const interests = [
  'Machine learning',
  'Computer vision',
  'Biomedical imaging',
  'Low-resource Bangla NLP',
  'Assistive technology',
];


/* 7 ─ PUBLICATIONS ───────────────────────────────────────────────────
   Newest first. Each: title · venue · year · summary · link              */

export const publications = [
  {
    title: 'BanglaSuicideBERT: Transformer-based suicide classification in Bangla: BanglaBERT vs. XLM-RoBERTa',
    venue: 'International Conference on Electrical, Computer & Telecommunication Engineering (ICECTE)',
    year: '2026',
    summary: 'Fine-tuned BanglaBERT for suicide-risk detection in Bangla social media text, reaching 96.21% accuracy and outperforming XLM-RoBERTa.',
    link: 'https://ieeexplore.ieee.org/document/11429305',
  },
  {
    title: 'Bengali Political Narrative Understanding via Transformer Models for Web Applications',
    venue: 'International Conference on Quantum Photonics, Artificial Intelligence, and Networking',
    year: '2026',
    summary: 'Fine-tuned an XLM-RoBERTa model to reach a 76% macro F1-score on multiclass Bengali political sentiment analysis.',
    link: 'https://drive.google.com/file/d/1EVcE6VYPDztROMaP-xsJGxIrwDRIfCMJ/view?usp=sharing',
  },
  {
    title: 'Transformer Architectures for Romanized Bangla Dialect Understanding in Resource-Constrained Conversational Systems',
    venue: 'International Conference on Quantum Photonics, Artificial Intelligence, and Networking',
    year: '2026',
    summary: 'Evaluated seven transformer models on the Vashantor dataset; multilingual architectures outperformed language-specific ones on Romanized Bangla regional dialects.',
    link: 'https://drive.google.com/file/d/1MFXJl380Pm99fYi54mHRFzsxSsojtXiA/view?usp=sharing',
  },
  {
    title: 'Machine Learning for Risk-Based Authentication: PES-Guided Model Selection in Zero Trust Environments',
    venue: 'International Conference on Quantum Photonics, Artificial Intelligence, and Networking',
    year: '2026',
    summary: 'Benchmarked machine learning models for Zero Trust risk-based authentication on a 33M-event dataset, and introduced a novel Performance-Efficiency Score.',
    link: 'https://ieeexplore.ieee.org/abstract/document/11491173/',
  },
  {
    title: 'Exploring the Barriers to Undergraduate Student Engagement with Research Papers: A Machine Learning and Statistical Analysis Approach',
    venue: 'Multimedia University Engineering Conference (MECON)',
    year: '2025',
    summary: 'Applied ML and statistical techniques to identify what stops students from engaging with research literature.',
    link: 'https://ieeexplore.ieee.org/document/11277043',
  },
  {
    title: 'Using Deep Learning Techniques for Image-to-Bangla Natural Language Text Generation to Improve Mobility for the Visually Impaired in Bangladesh',
    venue: 'International Conference on Computer, Information Technology and Intelligent Computing (CITIC)',
    year: '2025',
    summary: 'Developed a vision-transformer pipeline that converts images to Bangla text to improve accessibility for visually impaired people.',
    link: 'https://drive.google.com/file/d/1k4Ph2_uZ5576vbxJzjNwrjH-uCk5SwkS/view?usp=sharing',
  },
  {
    title: 'RAPID: Robotic Arm Platform for IoT-Driven Disabilities Support',
    venue: 'International Women in Engineering (WIE) Conference on Electrical and Computer Engineering',
    year: '2025',
    summary: 'Designed an IoT-enabled robotic assistive system with computer vision for limited gesture tracking, enabling safe and reliable human–robot interaction.',
    link: 'https://drive.google.com/file/d/1bbpP6epeOM5muloZ1jrj-QTMkwKkRdpx/view?usp=sharing',
  },
  {
    title: 'Transformers for Low-Resource Religious Hate Speech Detection: A Comparative Study on Bangla Social Media Discourse',
    venue: 'IEEE/WIC International Conference on Web Intelligence and Intelligent Agent Technology',
    year: '2025',
    summary: 'Comparative evaluation of six transformer models on Bangla Hindu–Muslim hate speech data.',
    link: 'https://drive.google.com/file/d/1yEkXjv4-9GKU2e9S3JMBmEwsavzzoQwI/view?usp=sharing',
  },
  {
    title: 'Topic Modeling Violence Against Women in Bangladesh News: A Comparative Approach with LDA, Top2Vec, and BERTopic',
    venue: 'International Women in Engineering Conference on Electrical and Computer Engineering',
    year: '2025',
    summary: 'Compared three topic-modeling algorithms on 2,000 Bangladeshi news articles using statistical and probabilistic metrics.',
    link: 'https://drive.google.com/file/d/1uCmFstsaGg6nvWgjYmmXJo-_-zJMofDZ/view',
  },
  {
    title: 'Transformer Models for Combating Cyberbullying: Comparative Evaluation on Racism and Sexism Detection',
    venue: 'International Women in Engineering Conference on Electrical and Computer Engineering',
    year: '2025',
    summary: 'Led a comparative evaluation of transformer models for two common types of toxic content.',
    link: 'https://drive.google.com/file/d/103NFe0LD20D-lEsrmvnffYFzYbfngqbJ/view',
  },
  {
    title: 'A Numerical and ML-Based Study on MHD Thermal Flow Characteristics in Wavy Enclosure with a Baffle',
    venue: 'International Conference on Mechanical Engineering and Applied Sciences',
    year: '2025',
    summary: 'Analysed thermal flow using numerical simulations combined with machine learning predictions.',
    link: 'https://drive.google.com/file/d/1pP5LXFlVNo5achfU1vKRxTiAwN9kacDC/view?usp=sharing',
  },
  {
    title: 'Scroll, Swipe, Repeat: The Cognitive and Social Impact of Short-Form Content on University Students',
    venue: 'International Conference on Mechanical Engineering and Applied Sciences',
    year: '2025',
    summary: 'Examined the cognitive and social impact of short-form content on university students, linking it to distraction and reduced attention efficiency.',
    link: 'https://drive.google.com/file/d/1iJJz3BDMMqwdwgAVMsCdpNob-h0rGH8i/view?usp=sharing',
  },
  {
    title: 'Impact of Rainwater-Based Hydroponic Farming on Urban Resource Utilization and Sustainable Development Goals (SDGs)',
    venue: 'South Asian Conference on Unfold Emerging Issues in the Context of Changing Climatic Scenario',
    year: '2024',
    summary: 'Assessed the feasibility and need for hydroponic farming in Dhaka through analysis of local rainfall patterns.',
    link: 'https://cpe-bd.org/wp-content/uploads/2024/11/2nd-conference-abstract-1.pdf',
  },
];


/* 8 ─ RECOGNITION ────────────────────────────────────────────────── */

export const awards = [
  { title: 'Best Paper Award',                                  by: 'International Conference on Computer, Information Technology and Intelligent Computing (CITIC)', when: 'Jun 2025', link: 'https://www.aiub.edu/aiub-students-win-best-paper-award-at-citic-2025-malaysia' },
  { title: 'MedTech & AI Innovation Research Proposal Grant',   by: '1st National BioMed Health ResearchCon', when: 'Aug 2025', link: 'https://www.aiub.edu/aiub-students-achieve-outstanding-success-at-the-1st-national-biomed-health-researchcon-2025' },
  { title: 'Dean’s List',                                       by: 'American International University-Bangladesh · Fall 2023-24, Spring 2023-24 & Fall 2024-25', when: 'Feb 2025', link: 'https://tinyurl.com/Ashiqur-Deans-List-Award' },
  { title: 'Participant · National Robotics Championship',      by: 'Bangladesh University of Business and Technology (BUBT)', when: 'Feb 2025', link: 'https://tinyurl.com/nrc-championship' },
  { title: 'Participant · 6th ECE Day',                         by: 'Institute of Science & Technology', when: 'Oct 2025', link: 'https://tinyurl.com/ECRCIST-Certificate-2025' },
  { title: 'Science Poster Competition · Finalist',             by: 'American International University-Bangladesh', when: 'Dec 2022', link: 'https://tinyurl.com/Physics-Poster-Competition' },
];

export const certifications = [
  { title: 'Neural Networks and Deep Learning',                 by: 'DeepLearning.AI (Coursera)', when: 'Apr 2026', link: 'https://coursera.org/share/9fd9690137b0984e3b419a5f54f090ce' },
  { title: 'Project Contribution with Git & GitHub',            by: 'Brainicon Technology', when: 'Dec 2025', link: 'https://www.brainicontech.com/certificate-verify/bti-2512-1003' },
  { title: 'Digital Skills for Students – Data Science in Python', by: 'ICT Ministry, Bangladesh', when: 'Jan 2025', link: 'https://training.edge.gov.bd/storage/certificate/student-training/certificate_678f5b6d4227e6.42211088.pdf' },
];

// Quotes from your referees. Make sure they're happy to be quoted publicly.
export const recommendations = [
  {
    quote: 'He is innovative, reliable, and has published quality papers under my guidance. I confidently recommend him for future academic and professional success.',
    name: 'Md. Mortuza Ahmmed',
    role: 'Associate Professor',
  },
  {
    quote: 'A dedicated researcher and proactive problem-solver with unique approaches.',
    name: 'Dr. Md. Saef Ullah Miah',
    role: 'Associate Professor, Additional Director [IQAC]',
  },
];


/* 9 ─ CONTACT FORM ───────────────────────────────────────────────── */

export const contact = {
  heading: 'Working on something that needs to be rigorous, not just clever?',
  topics: ['A research collaboration', 'A Master’s position', 'A job or internship', 'Just saying hi'],

  // OPTIONAL — makes the form send straight to your inbox without opening
  // an email app. Create a free account at emailjs.com and paste the three
  // values here (README.md explains how). While these are empty, pressing
  // "Send note" opens the visitor's email app with the message ready to go.
  emailjs: { serviceId: '', templateId: '', publicKey: '' },
};


/* ───────────────────────────── computed (don't edit) ───────────────── */
numbers.forEach((n) => { if (n[0] === '__PAPERS__') n[0] = String(publications.length); });
