import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

os.makedirs('public/assets', exist_ok=True)
pdf_path = 'public/assets/Abhishek_Kumar_Verma_Resume.pdf'

doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    leftMargin=36,
    rightMargin=36,
    topMargin=36,
    bottomMargin=36
)

styles = getSampleStyleSheet()

# Custom styles
header_title = ParagraphStyle(
    'HeaderTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=18,
    leading=22,
    textColor=colors.HexColor('#0f172a'),
    spaceAfter=4
)

header_sub = ParagraphStyle(
    'HeaderSub',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=13,
    textColor=colors.HexColor('#334155'),
    spaceAfter=10
)

sec_heading = ParagraphStyle(
    'SecHeading',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=11,
    leading=14,
    textColor=colors.HexColor('#0f172a'),
    spaceBefore=8,
    spaceAfter=2
)

entry_title = ParagraphStyle(
    'EntryTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=9.5,
    leading=13,
    textColor=colors.HexColor('#0f172a')
)

entry_sub = ParagraphStyle(
    'EntrySub',
    parent=styles['Normal'],
    fontName='Helvetica-Oblique',
    fontSize=8.5,
    leading=12,
    textColor=colors.HexColor('#475569')
)

body_bullet = ParagraphStyle(
    'BodyBullet',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=11.5,
    leftIndent=12,
    firstLineIndent=-8,
    textColor=colors.HexColor('#1e293b'),
    spaceAfter=2
)

story = []

# Header
story.append(Paragraph("<b>Abhishek Kumar Verma</b>", header_title))
story.append(Paragraph("Email: akverma834001@gmail.com &nbsp;&nbsp;|&nbsp;&nbsp; Mobile: +91-797 9901 895 &nbsp;&nbsp;|&nbsp;&nbsp; Ranchi, India<br/>LinkedIn: linkedin.com/in/abhishek-kumar-verma-834001as &nbsp;&nbsp;|&nbsp;&nbsp; GitHub: github.com/akverma834001", header_sub))
story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#0f172a'), spaceAfter=8))

# Education
story.append(Paragraph("<b>EDUCATION</b>", sec_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#94a3b8'), spaceAfter=4))
story.append(Paragraph("<b>Sarala Birla University</b> &nbsp;&mdash;&nbsp; Ranchi, India &nbsp;&nbsp;(August 2023 &ndash; May 2027)", entry_title))
story.append(Paragraph("<i>Bachelor of Technology &ndash; Computer Science Engineering; GPA: 7.57</i>", entry_sub))
story.append(Paragraph("<b>Courses:</b> Operating Systems, Data Structures, Analysis Of Algorithms, Artificial Intelligence, Machine Learning, Networking, Databases", body_bullet))
story.append(Spacer(1, 4))

# Skills Summary
story.append(Paragraph("<b>SKILLS SUMMARY</b>", sec_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#94a3b8'), spaceAfter=4))
story.append(Paragraph("&bull; <b>Languages:</b> C, C++, Python, JavaScript", body_bullet))
story.append(Paragraph("&bull; <b>Technical Skills:</b> MS Excel, Word, PowerPoint, React.js, Node.js, Flask, MySQL, HTML5, CSS3, OpenCV, TensorFlow, Keras, Fast API", body_bullet))
story.append(Paragraph("&bull; <b>Platforms:</b> Github, Firebase, VS Code, Google Cloud / Vertex AI", body_bullet))
story.append(Paragraph("&bull; <b>Soft Skills:</b> Leadership, Problem-solving, Communication, Team Collaboration, Analytical Thinking, Time Management, Public Speaking, Event Management", body_bullet))
story.append(Spacer(1, 4))

# Experience
story.append(Paragraph("<b>EXPERIENCE</b>", sec_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#94a3b8'), spaceAfter=4))

# CCL
story.append(Paragraph("<b>Central Coalfield Limited - Ranchi</b> &nbsp;&mdash;&nbsp; Onsite (Full-time) &nbsp;&nbsp;[June 2026 &ndash; July 2026]", entry_title))
story.append(Paragraph("<i>IT Intern</i>", entry_sub))
story.append(Paragraph("&bull; <b>Enterprise Portal Development:</b> Built modular internal dashboards to streamline intra-departmental workflow reporting and asset tracking across mining divisions.", body_bullet))
story.append(Paragraph("&bull; <b>Database & REST API Optimization:</b> Designed and integrated secure Restful endpoints with Oracle SQL/PostgreSQL databases to automate daily coal dispatch and inventory data synchronization.", body_bullet))
story.append(Paragraph("&bull; <b>System Automation & Monitoring:</b> Implemented automated background scripts and scheduled services to reduce manual log compilation time and improve system uptime monitoring.", body_bullet))
story.append(Spacer(1, 3))

# CodeAlpha
story.append(Paragraph("<b>CodeAlpha</b> &nbsp;&mdash;&nbsp; Remote (Part-time, Contractual) &nbsp;&nbsp;[August 2026 &ndash; Present]", entry_title))
story.append(Paragraph("<i>Python Developer Intern</i>", entry_sub))
story.append(Paragraph("&bull; <b>Automated Data Processing Pipelines:</b> Developed end-to-end Python scripts leveraging Pandas and NumPy to parse, clean, and transform unstructured datasets for downstream analytics.", body_bullet))
story.append(Paragraph("&bull; <b>Core Application Development:</b> Built interactive CLI and GUI-based utility tools, incorporating modular architecture, robust error-handling, and unit tests to ensure code reliability.", body_bullet))
story.append(Paragraph("&bull; <b>Algorithm Optimization & Web Scraping:</b> Designed automated scrapers using BeautifulSoup and Requests to extract targeted web data.", body_bullet))
story.append(Spacer(1, 3))

# Codestamp
story.append(Paragraph("<b>Codestamp Technology - Ranchi</b> &nbsp;&mdash;&nbsp; Onsite (Full-time) &nbsp;&nbsp;[June 2025 &ndash; July 2025]", entry_title))
story.append(Paragraph("<i>IT Intern</i>", entry_sub))
story.append(Paragraph("&bull; <b>Data Integrity & Document Verification:</b> Executed daily data entry and verified 1,000+ internal documents and records.", body_bullet))
story.append(Paragraph("&bull; <b>Quality Control & Stakeholder Reporting:</b> Conducted systematic quality checks on operational logs, collaborating with key department stakeholders to generate and deliver weekly audit and performance reports.", body_bullet))
story.append(Paragraph("&bull; <b>Compliance & Confidentiality Management:</b> Enforced strict organizational data security and compliance protocols, safeguarding sensitive stakeholder information and maintaining zero privacy breach incidents.", body_bullet))
story.append(Spacer(1, 4))

# Projects
story.append(Paragraph("<b>PROJECTS</b>", sec_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#94a3b8'), spaceAfter=4))
story.append(Paragraph("&bull; <b>AI-Based Interview Evaluation System</b> (NLP, Machine Learning, Web Development): Developed an AI-powered platform to evaluate candidate resumes and interview responses using TF-IDF and Cosine Similarity, with automated resume parsing and question generation. <i>Tech: React, FastAPI, Python, NLP, Machine Learning (March '26)</i>", body_bullet))
story.append(Paragraph("&bull; <b>Campus Central &ndash; Smart College Coordination Platform</b> (Web Development, AI, Cloud Computing): Developed a centralized platform for managing college coordination, student communication, and academic activities with AI-powered assistance and real-time data management. <i>Tech: Firebase, Google Gemini API, Vertex AI, JavaScript, HTML, CSS (August '24)</i>", body_bullet))
story.append(Paragraph("&bull; <b>Umang Sports Meet Web App</b> (Web Development, Database Management): Developed a sports-meet management platform featuring house-wise leaderboards, event results, schedules, student lookup, QR-based attendance, notifications, and Excel export with a dedicated management interface. <i>Tech: HTML, CSS, JavaScript, Firebase, QR Code, Excel Integration (March '25)</i>", body_bullet))
story.append(Spacer(1, 4))

# Achievements
story.append(Paragraph("<b>ACHIEVEMENTS</b>", sec_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#94a3b8'), spaceAfter=4))
story.append(Paragraph("&bull; <b>National Finalist &ndash; SIH 2024:</b> Recognized as a national finalist for developing an innovative technology-based solution at the national-level hackathon. (November '24)", body_bullet))
story.append(Paragraph("&bull; <b>GDG on Campus Lead &ndash; Sarala Birla University:</b> Led technical community initiatives, organizing developer-focused events, workshops, and student engagement activities. (October '25 &ndash; May '26)", body_bullet))
story.append(Paragraph("&bull; <b>Selected &ndash; UPEN Student Exchange Program - 2026:</b> Selected for an international student exchange opportunity, demonstrating academic excellence and global exposure. (April '26)", body_bullet))
story.append(Paragraph("&bull; <b>Core Organizing Member &ndash; Under-7 Chess Tournament (2025 & 2026):</b> Played a key role in organizing and coordinating the Under-7 Chess Tournament for two consecutive years, managing event operations and participant coordination. (March '25 & July '26)", body_bullet))
story.append(Spacer(1, 4))

# Certifications & Courses
story.append(Paragraph("<b>CERTIFICATIONS &amp; COURSES</b>", sec_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#94a3b8'), spaceAfter=4))
story.append(Paragraph("&bull; Data Structures &amp; Algorithms (DSA) &ndash; Udemy &ndash; June, 2025", body_bullet))
story.append(Paragraph("&bull; Career Edge &ndash; AI Foundation &ndash; TCS iON &ndash; August, 2026", body_bullet))
story.append(Paragraph("&bull; SQL Analytics &amp; BI on Databricks &ndash; Databricks (via Simplilearn SkillUp) &ndash; August, 2026", body_bullet))
story.append(Paragraph("&bull; AI Literacy &amp; Foundations in Generative AI &ndash; IBM SkillsBuild &ndash; August, 2026", body_bullet))
story.append(Paragraph("&bull; Cyber Job Simulation &ndash; Deloitte (via Forage) &ndash; August, 2026", body_bullet))
story.append(Spacer(1, 4))

# Volunteer Experience
story.append(Paragraph("<b>VOLUNTEER EXPERIENCE</b>", sec_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#94a3b8'), spaceAfter=4))
story.append(Paragraph("&bull; <b>Campus Lead at Google Developer Groups on Campus SBU:</b> Led the campus developer community, organizing workshops, hackathons &amp; technical bootcamps. (Oct 2025 &ndash; May 2026)", body_bullet))
story.append(Paragraph("&bull; <b>Group Lead at National Service Scheme (NSS) SBU:</b> Directed student volunteer units in organizing social outreach, blood donation, etc. (Jul 2024 &ndash; Jun 2025)", body_bullet))
story.append(Paragraph("&bull; <b>Event Volunteer at Vocal for Local NGO:</b> Managed event logistics and vendor outreach to support regional artisans. (Jul 2021 &ndash; Present)", body_bullet))

doc.build(story)
print("Resume PDF generated successfully at", pdf_path)
