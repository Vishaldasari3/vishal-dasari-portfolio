// Shared portfolio content. Keep this data aligned with article bodies in blog-posts-data.js.
window.VD_DATA = {
  "roles": [
    {
      "title": "Senior Associate Software Engineer III",
      "company": "JPMorgan Chase & Co. — Wilmington, DE",
      "dates": "Nov 2021 – Present",
      "bullets": [
        "Led migration of on-prem application servers to Amazon EKS and the database layer from SQL Server to Aurora PostgreSQL for the Daily Revenue Reporting platform, cutting infrastructure cost and operational overhead.",
        "Re-architected a monolithic Angular application into four independent React micro-frontends built on JPMorgan’s Salt Design System.",
        "Upgraded the platform from Java 17 to Java 21, migrated the test suite to JUnit 5, and added Playwright automation across UI and service layers.",
        "Introduced a Redis caching layer for high-traffic reporting queries and directed CI/CD and infrastructure-as-code strategy using Jenkins, Spinnaker, and Terraform.",
        "Refactored and rewrote core reporting services for better performance, cutting query latency and easing read load on Aurora during peak reporting cycles.",
        "Owns incident management for the platform — triaging production issues and remediating security findings — while mentoring junior and mid-level engineers."
      ]
    },
    {
      "title": "Software Engineer",
      "company": "Vanguard Group of Investments — Malvern, PA",
      "dates": "Aug 2018 – Nov 2021",
      "bullets": [
        "Migrated Vanguard’s Australian site to Amazon ECS while upgrading the frontend to Angular 10 and backend to Java 11.",
        "Built Spring Boot services and JAX-RS APIs powering real-time fund pricing and performance data for individual and institutional investors.",
        "Introduced Redis-backed caching for high-traffic fund pricing pages and led adoption of a Selenium/JUnit regression suite across the international site portfolio."
      ]
    },
    {
      "title": "Software Engineer",
      "company": "FedEx Services — Collierville, TN",
      "dates": "Sep 2017 – Aug 2018",
      "bullets": [
        "Built GFBO (Global FedEx Billing Online), a web-based invoicing platform serving customers across 5 regions (US, Canada, APAC, EMEA, LAC).",
        "Implemented RESTful and SOAP web services (JAX-RS/JAX-WS) with reusable JAXB-based transformation utilities, reducing duplicate integration code.",
        "Developed UI components with AngularJS, JSP, and jQuery, and validated services with JUnit, SoapUI, and ReadyAPI."
      ]
    },
    {
      "title": "Application Developer Intern",
      "company": "Defence Research & Development Laboratory (DRDL) — Hyderabad, India",
      "dates": "Jan 2014 – Apr 2014",
      "bullets": [
        "Designed a Java-based GUI application for real-time monitoring of temperature and pressure sensor data.",
        "Built software integration between embedded hardware sensors and desktop applications.",
        "Implemented database storage using MySQL for historical sensor analysis."
      ]
    }
  ],
  "projects": [
    {
      "title": "Daily Revenue Reporting — Cloud & Platform Modernization",
      "summary": "Migrated the Daily Revenue Reporting platform to Amazon EKS and Aurora PostgreSQL, modernizing its Java backend and CI/CD pipeline.",
      "tags": [
        "Java",
        "Spring Boot",
        "AWS EKS",
        "Aurora PostgreSQL",
        "MFE"
      ],
      "details": [
        "Migrated on-prem application servers to Amazon EKS and the database layer from SQL Server to Aurora PostgreSQL, cutting infrastructure and licensing cost.",
        "Designed and maintained RESTful APIs in Java and Spring Boot, backed by SQL Server, across all phases of the SDLC.",
        "Upgraded the runtime from Java 17 to Java 21 and migrated the JUnit test suite to JUnit 5, aligning the codebase with current language and testing standards.",
        "Introduced a Redis caching layer for high-traffic reporting queries, easing read load on Aurora during peak reporting cycles.",
        "Directed CI/CD and infrastructure-as-code strategy using Jenkins, Spinnaker, Maven, and Terraform.",
        "Re-architected a monolithic Angular app into four independent React micro-frontends built on JPMorgan’s Salt Design System."
      ]
    },
    {
      "title": "Internal Spring Boot Framework",
      "summary": "Core contributor to an internal Spring Boot platform framework adopted across multiple JPMorgan engineering teams.",
      "tags": [
        "Kafka",
        "Spring Boot",
        "Java",
        "Open Service Broker API"
      ],
      "details": [
        "Designed and implemented Kafka-based event-driven messaging capabilities within the framework, providing reusable integration patterns adopted by multiple teams.",
        "Built new feature capabilities for an Open Service Broker API application using Java and Spring Boot.",
        "Wrote JUnit test cases for framework components, championing test coverage standards across the team.",
        "Served as a technical point of contact for cross-team architecture discussions and design reviews on the framework."
      ]
    },
    {
      "title": "Hadoop to Databricks & AWS Migration",
      "summary": "Modernized a legacy on-prem Hadoop data pipeline into a cloud-native Databricks/Delta Lake architecture.",
      "tags": [
        "Databricks",
        "Apache NiFi",
        "AWS S3",
        "Delta Lake"
      ],
      "details": [
        "Led modernization of a legacy Hadoop-based pipeline to Databricks and Apache NiFi, migrating large-scale datasets into AWS S3.",
        "Orchestrated ingestion and transformation flows with Apache NiFi, and built Delta tables, clusters, and workflows in Databricks.",
        "Enabled self-service analytics for multiple downstream teams, reducing processing time and operational overhead versus the legacy Hadoop cluster."
      ]
    },
    {
      "title": "Vanguard Global International Sites",
      "summary": "Modernization of customer-facing international investment platforms, spanning personal investor, retail, institutional, and B2B lines.",
      "tags": [
        "Angular 10",
        "Java 11",
        "AWS ECS",
        "Redis",
        "JAX-RS"
      ],
      "details": [
        "Migrated Vanguard’s Australian site (vanguard.com.au) to Amazon ECS while upgrading the frontend to Angular 10 and backend to Java 11.",
        "Built Spring Boot services and JAX-RS APIs powering real-time fund pricing and performance data — mutual fund and ETF pricing, index fund NAVs, and historical performance — for global investors.",
        "Introduced Redis-backed caching for high-traffic fund pricing pages, improving responsiveness during peak market hours.",
        "Led adoption of a Selenium/JUnit regression suite across the international site portfolio, and covered Angular components using Karma and Jasmine."
      ]
    },
    {
      "title": "GFBO — FedEx Global Billing Online",
      "summary": "Worldwide web-based billing platform serving customers across 5 regions (US, Canada, APAC, EMEA, LAC).",
      "tags": [
        "Java",
        "AngularJS",
        "SOAP",
        "REST",
        "Oracle"
      ],
      "details": [
        "Built and maintained FedEx’s Global Billing Online (GFBO) platform across specification, design, integration, testing, and deployment.",
        "Developed and integrated RESTful and SOAP web services (JAX-RS/JAX-WS) with reusable JAXB-based transformation utilities, reducing duplicate integration code.",
        "Implemented backend services and SQL/PL-SQL solutions on Oracle databases, using Log4J for application logging and debugging.",
        "Automated builds and deployments to WebLogic using Jenkins and Ant build scripts."
      ]
    },
    {
      "title": "Wireless Sensor Parameter Logger",
      "summary": "Real-time sensor monitoring and data logging system built for missile systems testing at DRDL.",
      "tags": [
        "Java",
        "Struts",
        "MySQL",
        "Embedded",
        "GUI"
      ],
      "details": [
        "Designed, developed, and tested a Java-based GUI (Struts, jQuery, Applets) for real-time monitoring of temperature and pressure sensor data.",
        "Performed embedded coding to interface sensor hardware with the GUI software.",
        "Persisted readings to a MySQL database for historical analysis and reporting.",
        "Delivered the full lifecycle: requirements, design, implementation, testing, and defect resolution."
      ]
    }
  ],
  "certs": [
    {
      "title": "Oracle Certified Professional, Java SE 6 Programmer",
      "issuer": "Oracle",
      "logo": "/assets/oracle-logo.png",
      "dateLine": "Issued Dec 2014",
      "url": "https://www.credly.com/badges/52eb2a7f-63b1-4c54-b4ab-526a04508538/linked_in",
      "skills": [
        "Java SE",
        "Object-Oriented Programming",
        "Core Java",
        "Exception Handling",
        "Collections Framework"
      ]
    },
    {
      "title": "AWS Certified Developer – Associate",
      "issuer": "Amazon Web Services (AWS)",
      "logo": "/assets/aws-cert-logo.png",
      "dateLine": "Issued Aug 2022 · Expires Aug 2025",
      "url": "https://www.credly.com/badges/f8d81104-7adb-4b20-a226-496688c27bb3/linked_in_profile",
      "skills": [
        "AWS Lambda",
        "DynamoDB",
        "Cloud Development",
        "CI/CD",
        "API Gateway",
        "IAM & Security",
        "S3",
        "Serverless Architecture"
      ]
    },
    {
      "title": "AI Skills Fest 2026",
      "issuer": "Microsoft",
      "logo": "/assets/ms-ai-fest-logo.png",
      "dateLine": "Issued Jun 2026",
      "url": "https://www.credly.com/badges/ec2dc74a-8b6e-4145-adec-252a12bfe392/linked_in_profile",
      "skills": [
        "Artificial Intelligence",
        "Applied AI",
        "Generative AI Tools",
        "AI Agents",
        "Workflow Automation",
        "Prompt Engineering",
        "Microsoft Copilot",
        "LLMs"
      ]
    },
    {
      "title": "Machine Learning with Python — Level 1",
      "issuer": "IBM",
      "logo": "/assets/ibm-logo.png",
      "dateLine": "Issued Oct 2020",
      "url": "https://www.credly.com/badges/d7306259-7f46-452b-ad6d-d018bfa8b266?source=linked_in_profile",
      "skills": [
        "Machine Learning",
        "Python",
        "Scikit-learn",
        "Supervised Learning",
        "Model Evaluation",
        "Regression",
        "Classification"
      ]
    },
    {
      "title": "Python for Data Science",
      "issuer": "IBM",
      "logo": "/assets/ibm-logo.png",
      "dateLine": "Issued Aug 2020",
      "url": "https://www.credly.com/badges/51fbee59-d6ef-47d5-97e4-caa17f87e3f8?source=linked_in_profile",
      "skills": [
        "Python",
        "Data Science",
        "Pandas",
        "NumPy",
        "Data Visualization",
        "Jupyter Notebooks",
        "Matplotlib",
        "Data Cleaning"
      ]
    },
    {
      "title": "Build a Face Recognition Application using Python",
      "issuer": "HCL GUVI",
      "logo": "/assets/hcl-logo.png",
      "dateLine": "Issued Apr 2021",
      "credentialId": "1S8919K5e072680BL6",
      "url": "https://www.guvi.in/verify-certificate?id=1S8919K5e072680BL6",
      "skills": [
        "Computer Vision",
        "OpenCV",
        "Python",
        "Image Processing",
        "Face Detection"
      ]
    }
  ],
  "skills": [
    {
      "name": "Java",
      "size": 108,
      "hue": 264,
      "light": 40,
      "category": "backend"
    },
    {
      "name": "Spring Boot",
      "size": 96,
      "hue": 264,
      "light": 36,
      "category": "backend"
    },
    {
      "name": "Python",
      "size": 90,
      "hue": 264,
      "light": 46,
      "category": "backend"
    },
    {
      "name": "JavaScript",
      "size": 80,
      "hue": 264,
      "light": 50,
      "category": "backend"
    },
    {
      "name": "SQL",
      "size": 62,
      "hue": 264,
      "light": 56,
      "category": "backend"
    },
    {
      "name": "PL-SQL",
      "size": 56,
      "hue": 264,
      "light": 58,
      "category": "backend"
    },
    {
      "name": "Hibernate",
      "size": 68,
      "hue": 264,
      "light": 58,
      "category": "backend"
    },
    {
      "name": "Spring MVC",
      "size": 56,
      "hue": 264,
      "light": 52,
      "category": "backend"
    },
    {
      "name": "Spring IOC",
      "size": 52,
      "hue": 264,
      "light": 54,
      "category": "backend"
    },
    {
      "name": "Flask",
      "size": 60,
      "hue": 264,
      "light": 48,
      "category": "backend"
    },
    {
      "name": "SQLAlchemy",
      "size": 58,
      "hue": 264,
      "light": 42,
      "category": "backend"
    },
    {
      "name": "J2EE",
      "size": 54,
      "hue": 264,
      "light": 62,
      "category": "backend"
    },
    {
      "name": "JAX-RS",
      "size": 50,
      "hue": 264,
      "light": 66,
      "category": "backend"
    },
    {
      "name": "JAX-WS",
      "size": 50,
      "hue": 264,
      "light": 64,
      "category": "backend"
    },
    {
      "name": "SLF4J",
      "size": 48,
      "hue": 264,
      "light": 54,
      "category": "backend"
    },
    {
      "name": "Logback",
      "size": 48,
      "hue": 264,
      "light": 56,
      "category": "backend"
    },
    {
      "name": "Angular",
      "size": 78,
      "hue": 305,
      "light": 40,
      "category": "frontend"
    },
    {
      "name": "React",
      "size": 74,
      "hue": 305,
      "light": 44,
      "category": "frontend"
    },
    {
      "name": "TypeScript",
      "size": 68,
      "hue": 305,
      "light": 48,
      "category": "frontend"
    },
    {
      "name": "Next.js",
      "size": 64,
      "hue": 305,
      "light": 52,
      "category": "frontend"
    },
    {
      "name": "HTML5",
      "size": 54,
      "hue": 305,
      "light": 56,
      "category": "frontend"
    },
    {
      "name": "CSS3",
      "size": 54,
      "hue": 305,
      "light": 58,
      "category": "frontend"
    },
    {
      "name": "Node.js",
      "size": 60,
      "hue": 305,
      "light": 60,
      "category": "frontend"
    },
    {
      "name": "AngularJS",
      "size": 56,
      "hue": 305,
      "light": 58,
      "category": "frontend"
    },
    {
      "name": "Salt Design System",
      "size": 58,
      "hue": 305,
      "light": 38,
      "category": "frontend"
    },
    {
      "name": "Bootstrap",
      "size": 50,
      "hue": 305,
      "light": 62,
      "category": "frontend"
    },
    {
      "name": "jQuery",
      "size": 48,
      "hue": 305,
      "light": 64,
      "category": "frontend"
    },
    {
      "name": "Kafka",
      "size": 82,
      "hue": 195,
      "light": 38,
      "category": "data"
    },
    {
      "name": "Aurora PostgreSQL",
      "size": 76,
      "hue": 195,
      "light": 42,
      "category": "data"
    },
    {
      "name": "Redis",
      "size": 70,
      "hue": 195,
      "light": 46,
      "category": "data"
    },
    {
      "name": "Databricks",
      "size": 70,
      "hue": 195,
      "light": 50,
      "category": "data"
    },
    {
      "name": "Oracle",
      "size": 68,
      "hue": 195,
      "light": 36,
      "category": "data"
    },
    {
      "name": "SQL Server",
      "size": 64,
      "hue": 195,
      "light": 54,
      "category": "data"
    },
    {
      "name": "Apache NiFi",
      "size": 62,
      "hue": 195,
      "light": 60,
      "category": "data"
    },
    {
      "name": "MySQL",
      "size": 60,
      "hue": 195,
      "light": 58,
      "category": "data"
    },
    {
      "name": "Pandas",
      "size": 56,
      "hue": 195,
      "light": 44,
      "category": "data"
    },
    {
      "name": "NumPy",
      "size": 52,
      "hue": 195,
      "light": 46,
      "category": "data"
    },
    {
      "name": "Apache Airflow",
      "size": 56,
      "hue": 195,
      "light": 64,
      "category": "data"
    },
    {
      "name": "JDBC",
      "size": 52,
      "hue": 195,
      "light": 48,
      "category": "data"
    },
    {
      "name": "Cassandra",
      "size": 50,
      "hue": 195,
      "light": 66,
      "category": "data"
    },
    {
      "name": "AWS EKS",
      "size": 84,
      "hue": 230,
      "light": 38,
      "category": "cloud"
    },
    {
      "name": "Terraform",
      "size": 74,
      "hue": 230,
      "light": 56,
      "category": "cloud"
    },
    {
      "name": "Docker",
      "size": 72,
      "hue": 230,
      "light": 44,
      "category": "cloud"
    },
    {
      "name": "ECS",
      "size": 58,
      "hue": 230,
      "light": 50,
      "category": "cloud"
    },
    {
      "name": "Fargate",
      "size": 54,
      "hue": 230,
      "light": 52,
      "category": "cloud"
    },
    {
      "name": "Jenkins",
      "size": 66,
      "hue": 230,
      "light": 62,
      "category": "cloud"
    },
    {
      "name": "AWS S3",
      "size": 64,
      "hue": 230,
      "light": 40,
      "category": "cloud"
    },
    {
      "name": "IAM",
      "size": 52,
      "hue": 230,
      "light": 46,
      "category": "cloud"
    },
    {
      "name": "CloudWatch",
      "size": 52,
      "hue": 230,
      "light": 48,
      "category": "cloud"
    },
    {
      "name": "Spinnaker",
      "size": 58,
      "hue": 230,
      "light": 34,
      "category": "cloud"
    },
    {
      "name": "AWS RDS",
      "size": 56,
      "hue": 230,
      "light": 60,
      "category": "cloud"
    },
    {
      "name": "Maven",
      "size": 50,
      "hue": 230,
      "light": 54,
      "category": "cloud"
    },
    {
      "name": "Gradle",
      "size": 48,
      "hue": 230,
      "light": 56,
      "category": "cloud"
    },
    {
      "name": "Bamboo",
      "size": 52,
      "hue": 230,
      "light": 68,
      "category": "cloud"
    },
    {
      "name": "Linux",
      "size": 58,
      "hue": 230,
      "light": 42,
      "category": "cloud"
    },
    {
      "name": "GAIA",
      "size": 48,
      "hue": 230,
      "light": 64,
      "category": "cloud"
    },
    {
      "name": "PCF",
      "size": 46,
      "hue": 230,
      "light": 66,
      "category": "cloud"
    },
    {
      "name": "JUnit 5",
      "size": 62,
      "hue": 160,
      "light": 42,
      "category": "tools"
    },
    {
      "name": "Mockito",
      "size": 54,
      "hue": 160,
      "light": 44,
      "category": "tools"
    },
    {
      "name": "Selenium",
      "size": 58,
      "hue": 160,
      "light": 48,
      "category": "tools"
    },
    {
      "name": "Playwright",
      "size": 54,
      "hue": 160,
      "light": 50,
      "category": "tools"
    },
    {
      "name": "Git",
      "size": 60,
      "hue": 160,
      "light": 38,
      "category": "tools"
    },
    {
      "name": "GitHub",
      "size": 60,
      "hue": 160,
      "light": 40,
      "category": "tools"
    },
    {
      "name": "TestContainers",
      "size": 50,
      "hue": 160,
      "light": 54,
      "category": "tools"
    },
    {
      "name": "RestAssured",
      "size": 48,
      "hue": 160,
      "light": 56,
      "category": "tools"
    },
    {
      "name": "WireMock",
      "size": 46,
      "hue": 160,
      "light": 60,
      "category": "tools"
    },
    {
      "name": "JMeter",
      "size": 46,
      "hue": 160,
      "light": 62,
      "category": "tools"
    },
    {
      "name": "Bitbucket",
      "size": 54,
      "hue": 160,
      "light": 44,
      "category": "tools"
    },
    {
      "name": "Jira",
      "size": 52,
      "hue": 160,
      "light": 50,
      "category": "tools"
    },
    {
      "name": "Confluence",
      "size": 50,
      "hue": 160,
      "light": 52,
      "category": "tools"
    },
    {
      "name": "Splunk",
      "size": 56,
      "hue": 160,
      "light": 62,
      "category": "tools"
    },
    {
      "name": "Grafana",
      "size": 54,
      "hue": 160,
      "light": 34,
      "category": "tools"
    },
    {
      "name": "Prometheus",
      "size": 52,
      "hue": 160,
      "light": 36,
      "category": "tools"
    },
    {
      "name": "Postman",
      "size": 56,
      "hue": 160,
      "light": 66,
      "category": "tools"
    },
    {
      "name": "Swagger",
      "size": 52,
      "hue": 160,
      "light": 46,
      "category": "tools"
    },
    {
      "name": "Bruno",
      "size": 48,
      "hue": 160,
      "light": 52,
      "category": "tools"
    },
    {
      "name": "IntelliJ",
      "size": 52,
      "hue": 160,
      "light": 56,
      "category": "tools"
    },
    {
      "name": "Eclipse",
      "size": 50,
      "hue": 160,
      "light": 58,
      "category": "tools"
    },
    {
      "name": "VS Code",
      "size": 52,
      "hue": 160,
      "light": 40,
      "category": "tools"
    },
    {
      "name": "PyCharm",
      "size": 48,
      "hue": 160,
      "light": 42,
      "category": "tools"
    },
    {
      "name": "STS",
      "size": 46,
      "hue": 160,
      "light": 44,
      "category": "tools"
    },
    {
      "name": "GitHub Copilot",
      "size": 68,
      "hue": 340,
      "light": 44,
      "category": "ai"
    },
    {
      "name": "Prompting",
      "size": 62,
      "hue": 340,
      "light": 50,
      "category": "ai"
    },
    {
      "name": "Automating",
      "size": 62,
      "hue": 340,
      "light": 56,
      "category": "ai"
    },
    {
      "name": "Agents",
      "size": 60,
      "hue": 340,
      "light": 40,
      "category": "ai"
    }
  ],
  "categories": [
    {
      "key": "backend",
      "label": "Languages & Backend",
      "hue": 264
    },
    {
      "key": "frontend",
      "label": "Frontend & Web",
      "hue": 305
    },
    {
      "key": "data",
      "label": "Data & Messaging",
      "hue": 195
    },
    {
      "key": "cloud",
      "label": "Cloud & DevOps",
      "hue": 230
    },
    {
      "key": "tools",
      "label": "Testing & Tools",
      "hue": 160
    },
    {
      "key": "ai",
      "label": "AI & Productivity",
      "hue": 340
    }
  ],
  "posts": [
    {
      "slug": "code-worked-but-wrong",
      "category": "tech",
      "title": "The Code Worked. But It Was Still Wrong.",
      "excerpt": "What a 2am production incident taught me about the gap between code that runs and software that lasts.",
      "tag": "Tech",
      "hue": 10,
      "date": "Aug 2026",
      "readTime": "3 min read",
      "coverImg": "/assets/blog-code-worked-cover.jpg"
    },
    {
      "slug": "emotional-side-of-engineering",
      "category": "personal",
      "title": "Nobody Talks About the Emotional Side of Being a Software Engineer",
      "excerpt": "Imposter syndrome, the pressure to always be learning, and what actually separates confident engineers from everyone else.",
      "tag": "Career",
      "hue": 320,
      "date": "Aug 2026",
      "readTime": "3 min read",
      "coverImg": "/assets/blog-emotional-engineer-cover.jpg"
    },
    {
      "slug": "api-vs-mcp",
      "category": "tech",
      "title": "API vs MCP: Will MCP Replace APIs?",
      "excerpt": "A plain-English look at what each one actually does — with real banking examples, and an honest answer at the end.",
      "tag": "Tech",
      "hue": 150,
      "date": "Aug 2026",
      "readTime": "3 min read",
      "coverImg": "/assets/blog-api-mcp-cover.jpg"
    },
    {
      "slug": "first-trip-home",
      "category": "personal",
      "title": "The First Trip Back: Five Years, One Homecoming",
      "excerpt": "Five years without a visit, and what it actually felt like to land — the quiet at the gate, a smaller house, three weeks that were somehow enough.",
      "tag": "Personal",
      "hue": 28,
      "date": "Jul 2026",
      "readTime": "2 min read",
      "coverImg": "/assets/blog-first-trip-cover.jpg"
    },
    {
      "slug": "ai-agents-reshaping-tech",
      "category": "tech",
      "title": "How AI Agents Are Reshaping Programming and Technology Automation",
      "excerpt": "From autocomplete to owning entire workflows — what changes when software starts making judgment calls.",
      "tag": "Tech",
      "hue": 200,
      "date": "Jul 2026",
      "readTime": "2 min read",
      "coverImg": "/assets/blog-ai-agents-cover.jpg"
    },
    {
      "slug": "what-is-happiness",
      "category": "personal",
      "title": "What Does It Mean to Be Happy in Life?",
      "excerpt": "A Buddhist framework splits happiness into four parts — and the most important one has nothing to do with money.",
      "tag": "Life",
      "hue": 95,
      "date": "Jul 2026",
      "readTime": "2 min read",
      "coverImg": "/assets/blog-happiness-cover.jpg"
    },
    {
      "slug": "a-decade-of-moving",
      "category": "personal",
      "title": "Leaving Home: What Ten Years Away From India Actually Felt Like",
      "excerpt": "Visa paperwork, culture shock, and the ordinary, unglamorous kind of missing someone across a very long distance.",
      "tag": "Personal",
      "hue": 340,
      "date": "May 2026",
      "readTime": "2 min read",
      "coverImg": "/assets/blog-post-cover.jpg"
    },
    {
      "slug": "ai-in-2026",
      "category": "tech",
      "title": "What Coding With AI Agents Actually Looks Like in 2026",
      "excerpt": "Less typing, more deciding — a year of working alongside agents changed the actual shape of my job.",
      "tag": "Tech",
      "hue": 264,
      "date": "Apr 2026",
      "readTime": "2 min read",
      "coverImg": "/assets/blog-ai-coding-cover.jpg"
    }
  ]
};
