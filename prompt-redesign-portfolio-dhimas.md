# PROMPT - REDESIGN PORTFOLIO DHIMAS NURHIDAYAT + ADMIN DASHBOARD

## 1. ROLE

Kamu bertindak sebagai **Senior Full-Stack Engineer + UI/UX Designer + Product Designer**.

Saya memiliki website portfolio pribadi yang saat ini sudah berjalan:

**https://dhimas-portofolio.vercel.app/**

Saya ingin melakukan **redesign besar-besaran**, bukan sekadar mengganti warna atau mempercantik beberapa section.

Target akhirnya adalah sebuah portfolio developer yang:

- terlihat profesional dan dibuat dengan sengaja;
- interaktif tetapi tidak berlebihan;
- terasa seperti website personal developer, bukan template AI;
- tidak terlihat seperti "AI slop";
- tidak menggunakan gradient berlebihan;
- tidak menggunakan efek glow/neon berlebihan;
- memiliki hierarchy visual yang jelas;
- responsive;
- cepat;
- accessible;
- mudah dikembangkan;
- memiliki **admin dashboard/CMS internal** untuk mengubah isi portfolio tanpa mengedit source code.

---

# 2. KONDISI WEBSITE SAAT INI

Website saat ini memiliki struktur utama:

- Navbar
- Hero
- About Me
- Personal Information
- Education
- Teaching Experience
- GitHub Statistics
- GitHub Activity
- Projects
- Technical Skills
- Full Stack Development Focus
- Currently Learning
- Contact
- Footer

Informasi yang saat ini tampil antara lain:

- Nama: Dhimas Nurhidayat
- Role: Full Stack Developer
- Informatics student
- Universitas Pembangunan Jaya
- Skills seperti React, Next.js, Node.js, Laravel, MySQL
- Education
- Teaching experience
- Projects dari GitHub
- Technical skills
- Contact information
- GitHub
- LinkedIn

Jangan menganggap struktur saat ini sudah final.

**Analisis terlebih dahulu repository yang ada.**

Cari tahu:

1. framework yang digunakan;
2. struktur folder;
3. routing;
4. component architecture;
5. styling;
6. data source;
7. database jika sudah ada;
8. API jika sudah ada;
9. authentication jika sudah ada;
10. deployment configuration;
11. environment variables;
12. integrasi GitHub;
13. bagian mana yang reusable;
14. bagian mana yang sebaiknya di-refactor.

**Jangan langsung menulis ulang seluruh project tanpa memahami existing codebase.**

---

# 3. TUJUAN UTAMA REDESIGN

Saya ingin portfolio ini berubah dari:

> "portfolio template modern dengan hero gradient dan card"

menjadi:

> **personal developer website yang terasa seperti produk nyata milik seorang developer.**

Desain harus mempunyai karakter.

Jangan membuat desain yang terlihat seperti hasil prompt:

> "Create a modern AI portfolio website with purple-blue gradients, glowing cards, glassmorphism, floating blobs, huge text, and futuristic effects."

**HINDARI pendekatan tersebut.**

Saya justru ingin desain yang lebih:

- editorial;
- technical;
- clean;
- confident;
- structured;
- human;
- functional;
- slightly experimental;
- tetapi tetap profesional.

---

# 4. ARAH VISUAL

## Prinsip utama

Gunakan:

- solid colors;
- neutral surfaces;
- strong typography;
- borders;
- spacing;
- grid;
- subtle shadows;
- subtle motion;
- clear hierarchy;
- interesting layout;
- micro-interactions.

Hindari:

- gradient background besar;
- gradient text di hampir semua heading;
- glowing border;
- neon;
- glassmorphism berlebihan;
- floating blobs;
- terlalu banyak rounded cards;
- background penuh dekorasi;
- animasi yang bergerak terus;
- terlalu banyak icon;
- terlalu banyak pill/badge;
- layout yang terlihat generik dari AI website generator.

---

# 5. REKOMENDASI DESIGN LANGUAGE

Gunakan pendekatan **editorial-tech portfolio**.

Contoh karakter:

- background netral;
- typography besar tetapi tidak absurd;
- layout grid;
- section dengan pembatas/border;
- numbering section;
- small metadata;
- monospace typography hanya untuk technical metadata;
- penggunaan whitespace yang baik;
- asymmetric layout pada beberapa section;
- project case study sebagai fokus utama;
- interaksi yang muncul karena user melakukan sesuatu.

Contoh struktur visual:

```text
01 / INTRODUCTION
-------------------------------------

Dhimas Nurhidayat
Full Stack Developer

Saya membangun ...

[View Projects] [Contact]

Based in Indonesia
Available for selected projects
```

Kemudian:

```text
02 / SELECTED WORK
-------------------------------------

01
Project Name
Description
Tech Stack
Role

[large project preview]

02
Project Name
...
```

Tidak harus persis seperti contoh tersebut.

Gunakan sebagai arah visual.

---

# 6. WARNA

Buat color system yang sederhana.

Contoh:

### Light Mode

- background: off-white / white
- foreground: near-black
- muted foreground: gray
- border: light gray
- primary: satu warna accent yang kuat
- destructive: red
- success: green

### Dark Mode

- background: near-black / charcoal
- foreground: off-white
- muted foreground: gray
- border: dark gray
- primary: satu accent color

**Jangan menggunakan banyak accent color.**

Pilih SATU accent utama.

Misalnya:

- electric blue
- cobalt
- orange
- lime
- red
- violet

Tetapi pilih salah satu.

Tidak perlu membuat:

```text
blue → purple → pink gradient
```

di seluruh halaman.

---

# 7. TYPOGRAPHY

Typography harus menjadi bagian utama dari desain.

Gunakan kombinasi:

### Primary

Sans-serif modern dan readable.

### Secondary

Monospace hanya untuk:

- code;
- metadata;
- technology;
- numbering;
- technical label;
- small UI details.

Jangan menggunakan monospace untuk seluruh website.

Heading harus kuat tetapi tidak menggunakan font-size berlebihan hanya untuk terlihat "modern".

---

# 8. INTERAKSI

Saya ingin website interaktif, tetapi interaction harus mempunyai tujuan.

Gunakan micro-interactions seperti:

- hover project preview;
- cursor-aware image movement secara sangat subtle;
- image reveal;
- project card expansion;
- smooth section transition;
- active navigation indicator;
- scroll progress;
- command menu;
- keyboard shortcuts;
- copy email;
- copy project link;
- filter projects berdasarkan technology;
- expandable experience;
- timeline interaction;
- animated number hanya jika berguna;
- view transition;
- hover preview.

Hindari:

- parallax berlebihan;
- objek bergerak terus;
- animasi random;
- spinning icons;
- excessive spring animation;
- animation delay di setiap element;
- animasi hanya untuk terlihat "AI generated".

Semua motion harus cepat dan subtle.

Gunakan `prefers-reduced-motion`.

---

# 9. NAVBAR

Redesign navbar.

Jangan menggunakan navbar template standar yang hanya:

```text
Home About Projects Skills Contact
```

Pertimbangkan:

- logo/name di kiri;
- navigation di tengah atau kanan;
- status availability;
- theme toggle;
- command menu;
- mobile navigation;
- sticky navigation.

Contoh:

```text
DHIMAS.N
              Work  About  Experience  Contact
              ● Available
```

Atau buat pendekatan lain yang lebih kuat.

Navbar harus terasa bagian dari identitas portfolio.

---

# 10. HERO SECTION

Hero harus lebih memorable.

Jangan hanya:

```text
Halo, Saya Dhimas
Full Stack Developer
Saya tertarik membuat website...
```

Buat copy yang lebih profesional dan personal.

Hero harus menjawab:

1. siapa saya;
2. apa yang saya kerjakan;
3. value saya;
4. bagaimana melihat pekerjaan saya.

Contoh arah:

```text
DHIMAS NURHIDAYAT

FULL STACK DEVELOPER

I build web applications, backend systems,
and practical digital products.

Based in Indonesia.
Currently studying Informatics at Universitas Pembangunan Jaya.

[View Selected Work]
[Let's Talk]
```

Gunakan konten asli dari portfolio.

**Jangan mengarang pengalaman yang tidak ada.**

---

# 11. ABOUT

Jangan membuat About sebagai paragraf panjang.

Gunakan layout yang lebih editorial.

Contoh:

```text
ABOUT

I am an Informatics student focused on
full-stack development and practical software systems.

01
Education
Universitas Pembangunan Jaya

02
Focus
Full Stack Development

03
Currently
Student / Freelancer
```

Tambahkan timeline atau metadata jika relevan.

---

# 12. EXPERIENCE

Buat Experience menjadi timeline yang jelas.

Contoh:

```text
2025
HTML Course
B3 - Belajar Bareng BASIC

Role
Instructor

What I did
...
```

Experience harus bisa dibuka/ditutup jika diperlukan.

Pastikan data ini nanti berasal dari database/CMS.

---

# 13. PROJECTS - SECTION TERPENTING

Projects harus menjadi bagian paling kuat dari portfolio.

Jangan hanya menggunakan grid card biasa.

Buat project showcase yang memungkinkan user memahami:

- masalah;
- solusi;
- kontribusi saya;
- technology;
- hasil;
- link;
- repository;
- screenshots;
- role;
- status.

Gunakan layout seperti:

```text
01

PROJECT NAME
Short description

ROLE
Full Stack Developer

STACK
Next.js / Laravel / MySQL

[Project Image]

View Case Study →
```

Project detail dapat memiliki route:

```text
/projects/[slug]
```

Project detail page harus memiliki:

- title;
- summary;
- hero image;
- project metadata;
- problem;
- solution;
- architecture;
- role;
- technology;
- key features;
- screenshots;
- challenges;
- result;
- GitHub;
- live demo;
- related projects.

Jika project belum memiliki data lengkap, jangan mengarang.

---

# 14. PROJECT FILTER

Tambahkan filtering jika jumlah project cukup banyak.

Contoh:

```text
ALL
WEB
AI
IOT
BACKEND
MOBILE
```

Filter berdasarkan data sebenarnya.

Gunakan URL query jika masuk akal:

```text
/projects?category=ai
```

---

# 15. SKILLS

Jangan menggunakan progress bar:

```text
React 70%
Next.js 75%
Laravel 80%
```

Progress bar pada skill developer biasanya terlihat subjektif dan kurang informatif.

Ganti dengan:

### Frontend

React
Next.js
TypeScript
Tailwind CSS

### Backend

Node.js
Laravel
REST API

### Database

MySQL
MongoDB

### Tools

Git
GitHub
Figma
VS Code

Bisa tambahkan:

- years/experience jika memang valid;
- project count;
- related projects;

tetapi jangan mengarang angka.

---

# 16. GITHUB

GitHub section harus digunakan jika datanya benar-benar berhasil diambil.

Jika API gagal:

- jangan tampilkan loading selamanya;
- jangan tampilkan data palsu;
- tampilkan fallback state;
- berikan link ke GitHub.

Bisa menampilkan:

- contribution activity;
- repositories;
- stars;
- languages;
- recent activity.

Jangan membuat dashboard GitHub terlalu besar sampai mengalahkan project portfolio.

---

# 17. CONTACT

Contact harus sederhana.

Informasi:

- email;
- LinkedIn;
- GitHub;
- location;
- optional WhatsApp;
- contact form.

Contact form harus memiliki:

```text
Name
Email
Subject
Message
Submit
```

Tambahkan:

- validation;
- loading state;
- success state;
- error state;
- spam protection jika backend memungkinkan.

Jangan menggunakan:

```text
hello@example.com
```

sebagai fallback yang terlihat oleh user.

Gunakan data asli dari CMS.

---

# 18. ADMIN DASHBOARD / CMS

Ini merupakan bagian penting dari redesign.

Buat route terpisah:

```text
/admin
```

Dashboard tidak boleh terlihat oleh visitor biasa.

Harus memiliki authentication.

Contoh:

```text
/admin/login
/admin
/admin/profile
/admin/projects
/admin/experience
/admin/education
/admin/skills
/admin/socials
/admin/settings
```

---

# 19. ADMIN DASHBOARD DESIGN

Saya ingin dashboard menggunakan **shadcn/ui** sebagai design system.

Saya juga mempertimbangkan **Shadcn Studio** untuk mempercepat pembuatan dashboard.

Shadcn Studio boleh digunakan sebagai sumber:

- dashboard shell;
- sidebar;
- data table;
- forms;
- dialogs;
- cards;
- settings;
- command menu;
- admin components.

Tetapi:

**JANGAN copy seluruh template lalu membiarkan demo/default UI.**

Semua harus di-customize agar sesuai dengan portfolio Dhimas.

Shadcn Studio menyediakan component variants dan admin dashboard patterns yang cocok untuk kebutuhan ini, sedangkan shadcn/ui sendiri menyediakan komponen composable yang dapat dimiliki dan dikustomisasi langsung di project.

---

# 20. ADMIN SIDEBAR

Contoh:

```text
DHIMAS CMS

Overview

CONTENT
  Profile
  Projects
  Experience
  Education
  Skills
  Testimonials

SETTINGS
  Social Links
  Contact
  Site Settings
  Appearance

SYSTEM
  Preview Website
  Logout
```

Jangan membuat sidebar terlalu ramai.

---

# 21. ADMIN OVERVIEW

Dashboard overview dapat menampilkan:

```text
Portfolio Overview

Projects        12
Experiences      5
Skills          18
Messages         7
```

Kemudian:

- recent projects;
- recent messages;
- content status;
- quick actions;
- website preview.

Jangan membuat chart hanya supaya terlihat seperti dashboard.

Chart hanya digunakan jika ada data yang memang bermakna.

---

# 22. CRUD PROJECT

Admin harus dapat:

### Create

Menambah project.

### Read

Melihat daftar project.

### Update

Mengubah project.

### Delete

Menghapus project dengan confirmation dialog.

Fields minimal:

```text
title
slug
shortDescription
description
category
role
technologies
thumbnail
images
githubUrl
liveUrl
featured
status
order
createdAt
updatedAt
```

Status:

```text
draft
published
archived
```

Tambahkan drag-and-drop ordering jika mudah diterapkan.

---

# 23. CRUD EXPERIENCE

Fields:

```text
title
company
type
location
startDate
endDate
description
responsibilities
technologies
order
featured
```

---

# 24. CRUD EDUCATION

Fields:

```text
institution
degree
field
startDate
endDate
description
logo
order
```

---

# 25. CRUD SKILLS

Fields:

```text
name
category
icon
description
order
featured
```

Kategori:

```text
Frontend
Backend
Database
DevOps
Tools
Other
```

---

# 26. PROFILE MANAGEMENT

Admin dapat mengubah:

```text
name
headline
bio
location
availability
email
phone
profileImage
resume
```

Hero website harus mengambil data dari sini.

Jangan hard-code profile data di banyak component.

---

# 27. SOCIAL LINKS

Admin dapat mengubah:

```text
GitHub
LinkedIn
Instagram
Email
WhatsApp
Website
```

Gunakan dynamic configuration.

---

# 28. SITE SETTINGS

Admin dapat mengatur:

```text
Site title
Site description
SEO title
SEO description
OG image
favicon
theme
accent color
availability status
```

---

# 29. PREVIEW SYSTEM

Admin sebaiknya memiliki tombol:

```text
Preview Website
```

dan jika memungkinkan:

```text
Preview Draft
```

Sehingga konten yang belum dipublish bisa diperiksa terlebih dahulu.

---

# 30. DATABASE

Jangan langsung membuat database baru tanpa memeriksa project existing.

Pertama:

1. cek apakah database sudah ada;
2. cek ORM;
3. cek schema;
4. cek API;
5. cek environment variables.

Jika belum ada database, pilih solusi yang paling cocok dengan architecture existing.

Prioritas:

- PostgreSQL;
- Prisma/Drizzle jika cocok;
- Supabase jika cocok dengan deployment architecture;
- atau database existing jika sudah tersedia.

**Jangan mengganti architecture hanya karena teknologi baru terlihat lebih populer.**

---

# 31. AUTHENTICATION ADMIN

Admin dashboard harus protected.

Minimal:

```text
/admin/login
```

Tidak boleh ada user biasa yang bisa mengakses CRUD.

Gunakan authentication yang sesuai dengan architecture existing.

Simpan credentials secara aman.

Jangan hard-code:

```text
email
password
secret
```

di source code.

Gunakan environment variables / secure authentication.

Tambahkan:

- session handling;
- logout;
- protected routes;
- unauthorized state.

Jika memungkinkan tambahkan role:

```text
admin
```

---

# 32. RESPONSIVE

Portfolio harus optimal untuk:

- desktop;
- laptop;
- tablet;
- mobile.

Jangan hanya mengecilkan desktop layout.

Mobile harus mempunyai layout yang memang dirancang untuk mobile.

Admin dashboard juga harus responsive.

---

# 33. ACCESSIBILITY

Pastikan:

- semantic HTML;
- keyboard navigation;
- focus state;
- aria-label jika diperlukan;
- color contrast;
- accessible dialogs;
- accessible forms;
- reduced motion;
- image alt text.

Jangan mengorbankan accessibility demi visual.

---

# 34. PERFORMANCE

Perhatikan:

- image optimization;
- lazy loading;
- code splitting;
- server/client component boundary;
- caching;
- API calls;
- unnecessary re-render;
- animation performance.

Jangan menggunakan library berat hanya untuk satu animasi sederhana.

---

# 35. SEO

Implementasikan:

- title;
- description;
- Open Graph;
- Twitter card;
- canonical;
- sitemap;
- robots;
- structured metadata jika relevan.

Project detail juga harus mempunyai metadata dinamis.

---

# 36. COMPONENT ARCHITECTURE

Buat reusable components.

Contoh:

```text
components/
├── ui/
├── layout/
├── navigation/
├── portfolio/
│   ├── hero/
│   ├── about/
│   ├── projects/
│   ├── experience/
│   ├── skills/
│   └── contact/
├── admin/
│   ├── dashboard/
│   ├── projects/
│   ├── experience/
│   └── settings/
```

Sesuaikan dengan existing project.

Jangan membuat satu file component berisi ribuan baris.

---

# 37. DESIGN SYSTEM

Gunakan shadcn/ui sebagai primitive/design system.

Prioritaskan:

- Button
- Card
- Badge
- Dialog
- Sheet
- Dropdown Menu
- Command
- Form
- Input
- Textarea
- Select
- Tabs
- Table
- Data Table
- Sidebar
- Tooltip
- Toast/Sonner
- Skeleton
- Alert Dialog
- Breadcrumb

Gunakan Tailwind sesuai architecture project.

Jangan membuat komponen baru jika shadcn/ui sudah memiliki primitive yang cocok.

Namun jangan memaksakan shadcn ke semua bagian marketing portfolio.

Portfolio publik boleh memiliki custom components yang lebih editorial.

---

# 38. SHADCN STUDIO

Gunakan **Shadcn Studio sebagai accelerator**, bukan sebagai identitas visual final.

Gunakan jika membantu untuk:

- admin shell;
- dashboard;
- tables;
- forms;
- settings;
- navigation;
- reusable components.

Kemudian:

1. ambil component;
2. sesuaikan tokens;
3. sesuaikan spacing;
4. sesuaikan typography;
5. sesuaikan radius;
6. sesuaikan color;
7. hapus bagian demo;
8. integrasikan dengan database.

Jangan meninggalkan branding atau demo content dari template.

---

# 39. RADIUS & CARD STYLE

Jangan semua element menggunakan:

```css
rounded-2xl
```

Gunakan hierarchy.

Misalnya:

- buttons: medium radius;
- input: medium radius;
- cards: small/medium radius;
- major containers: subtle radius;
- some editorial sections: no radius.

Gunakan border sebagai struktur visual.

---

# 40. ANIMATION SYSTEM

Gunakan satu animation philosophy.

Contoh:

- 150–250ms micro interaction;
- 300–500ms page transition;
- ease-out;
- subtle transform;
- opacity;
- height.

Jangan setiap component mempunyai animasi berbeda.

---

# 41. DARK/LIGHT MODE

Implementasikan dark/light mode dengan baik.

Dark mode bukan:

```text
black + neon gradient
```

Gunakan neutral dark surfaces.

Light mode bukan:

```text
white + giant colorful gradient
```

Gunakan off-white dan typography yang kuat.

Theme preference harus disimpan.

---

# 42. CONTENT MANAGEMENT FLOW

Flow yang diinginkan:

```text
Admin Login
      ↓
Dashboard
      ↓
Edit Content
      ↓
Save Draft
      ↓
Preview
      ↓
Publish
      ↓
Public Portfolio
```

Jika implementasi draft/publish terlalu kompleks untuk tahap pertama, minimal:

```text
Admin
 ↓
Edit
 ↓
Save
 ↓
Public Website updates
```

Tetapi architecture harus memungkinkan draft/publish ditambahkan kemudian.

---

# 43. PUBLIC / ADMIN DATA FLOW

Idealnya:

```text
                 ┌──────────────┐
                 │ Admin Panel  │
                 └──────┬───────┘
                        │
                        ↓
                 ┌──────────────┐
                 │ API / Server │
                 └──────┬───────┘
                        │
                        ↓
                 ┌──────────────┐
                 │  Database    │
                 └──────┬───────┘
                        │
                        ↓
                 ┌──────────────┐
                 │ Public Site  │
                 └──────────────┘
```

Jangan menyimpan data portfolio utama di banyak tempat.

---

# 44. DATA VALIDATION

Gunakan schema validation.

Semua admin forms harus memiliki:

- required validation;
- URL validation;
- email validation;
- date validation;
- character limit;
- meaningful error messages.

Jangan hanya mengandalkan frontend validation.

---

# 45. IMAGE MANAGEMENT

Portfolio membutuhkan:

- profile image;
- project thumbnails;
- project screenshots;
- optional company/institution logos.

Gunakan image storage yang sesuai architecture.

Jangan menyimpan file binary besar langsung di database.

Database menyimpan URL/reference.

---

# 46. EMPTY / ERROR / LOADING STATES

Semua halaman dynamic harus memiliki:

### Loading

Skeleton yang sesuai layout.

### Empty

Contoh:

```text
No projects published yet.
```

### Error

Contoh:

```text
Something went wrong.
Try again.
```

### Success

Contoh:

```text
Project updated successfully.
```

Jangan hanya mengandalkan console.log.

---

# 47. ADMIN UX

Admin harus terasa seperti CMS kecil yang benar-benar bisa digunakan.

Contoh:

```text
Projects

[+ New Project]

Search projects...

Project        Status       Updated       Actions
----------------------------------------------------
ATCS Dashboard Published    2 days ago    ...
HandyBOT       Draft        5 days ago    ...
IoT Chicken    Published    1 week ago    ...
```

Actions:

```text
Edit
Duplicate
Preview
Archive
Delete
```

Delete harus menggunakan confirmation dialog.

---

# 48. SEARCH / COMMAND MENU

Tambahkan command menu jika architecture memungkinkan.

Shortcut:

```text
Cmd/Ctrl + K
```

Contoh:

```text
Search...

Go to Projects
Go to Experience
Go to Skills
Open Website
Toggle Theme
```

Ini akan memberikan interaksi yang terasa seperti developer tool tanpa menjadi gimmick.

---

# 49. PUBLIC PROJECT INTERACTION

Contoh interaksi:

Saat hover project:

```text
View case study →
```

Preview image bergerak sedikit.

Saat click:

```text
/project/atcs-dashboard
```

Detail page muncul.

Gunakan View Transition jika sesuai dan aman.

---

# 50. NO AI SLOP RULES

Ini WAJIB.

Jangan menghasilkan desain dengan ciri-ciri berikut:

❌ purple-blue gradient everywhere

❌ giant glowing text

❌ glassmorphism everywhere

❌ random floating circles

❌ excessive rounded cards

❌ 10+ badges dalam satu section

❌ "AI-powered" wording yang tidak relevan

❌ generic phrases seperti:

> "Crafting digital experiences that inspire and innovate."

❌ generic developer illustrations

❌ random 3D objects

❌ excessive blobs

❌ excessive shadow

❌ excessive animation

❌ fake statistics

❌ fake client logos

❌ fake testimonials

❌ fake experience

❌ fake project metrics

❌ skill percentage bars yang tidak memiliki dasar

❌ dashboard chart tanpa data bermakna

❌ lorem ipsum

❌ placeholder content yang tertinggal di production

---

# 51. DATA INTEGRITY

Ini sangat penting.

Gunakan data yang memang tersedia.

Jika informasi belum tersedia:

- buat field kosong;
- tampilkan optional section;
- minta data melalui admin;
- atau jangan tampilkan.

**Jangan mengarang pengalaman kerja, client, achievement, revenue, user count, project metrics, atau testimonial.**

---

# 52. SEO CONTENT

Gunakan konten natural.

Hindari keyword stuffing seperti:

```text
Best Full Stack Developer Indonesia
Professional Web Developer Expert
Top Modern Web Development
```

Tuliskan seperti portfolio manusia.

---

# 53. IMPLEMENTATION STRATEGY

Jangan langsung mengubah semuanya sekaligus.

Lakukan tahap berikut.

## Phase 1 - Audit

Analisis existing codebase.

Output:

- architecture;
- dependency;
- current routes;
- data flow;
- database;
- APIs;
- reusable components;
- technical debt.

## Phase 2 - Design System

Buat:

- colors;
- typography;
- spacing;
- radius;
- shadows;
- motion;
- responsive breakpoints.

Implementasikan shadcn/ui.

## Phase 3 - Public Portfolio

Redesign:

1. Navbar
2. Hero
3. About
4. Experience
5. Projects
6. Skills
7. GitHub
8. Contact
9. Footer

## Phase 4 - Project Detail

Implement:

```text
/projects/[slug]
```

## Phase 5 - Backend/CMS

Implement:

```text
/admin/login
/admin
/admin/profile
/admin/projects
/admin/experience
/admin/education
/admin/skills
/admin/settings
```

## Phase 6 - Database

Implement schema sesuai kebutuhan.

## Phase 7 - Authentication

Protect `/admin`.

## Phase 8 - Integration

Hubungkan public portfolio dengan CMS.

## Phase 9 - QA

Test:

- desktop;
- mobile;
- tablet;
- keyboard;
- loading;
- error;
- empty;
- authentication;
- CRUD;
- image upload;
- SEO.

## Phase 10 - Production

Pastikan:

- build berhasil;
- no TypeScript errors;
- no ESLint errors yang relevan;
- no broken links;
- no console errors;
- no placeholder content;
- no leaked secrets;
- no fake data.

---

# 54. IMPORTANT DEVELOPMENT RULE

Sebelum coding:

**JANGAN langsung membuat implementasi berdasarkan asumsi.**

Lakukan:

```text
Inspect repository
        ↓
Understand architecture
        ↓
Plan changes
        ↓
Identify reusable code
        ↓
Identify breaking changes
        ↓
Implement
        ↓
Test
        ↓
Refine
```

Jika ada existing backend/database:

**reuse jika masih masuk akal.**

Jangan mengganti seluruh backend hanya untuk mendapatkan architecture yang terlihat lebih modern.

---

# 55. OUTPUT YANG SAYA INGINKAN DARI AI

Saat mulai mengerjakan project, berikan saya:

## Step 1

Audit existing project.

## Step 2

Berikan rekomendasi architecture.

## Step 3

Berikan design direction.

## Step 4

Implement redesign.

## Step 5

Implement admin dashboard.

## Step 6

Implement database/API/auth jika diperlukan.

## Step 7

Connect CMS → public website.

## Step 8

Test seluruh flow.

## Step 9

Berikan ringkasan file yang diubah.

## Step 10

Berikan cara menjalankan project.

---

# 56. ACCEPTANCE CRITERIA

Project dianggap selesai jika:

### Public website

- [ ] terlihat berbeda secara signifikan dari versi lama;
- [ ] tidak terasa seperti template AI;
- [ ] tidak menggunakan gradient berlebihan;
- [ ] responsive;
- [ ] accessible;
- [ ] fast;
- [ ] project menjadi fokus utama;
- [ ] project detail tersedia;
- [ ] dark/light mode berfungsi;
- [ ] navigation berfungsi;
- [ ] contact berfungsi;
- [ ] tidak ada fake data.

### Admin

- [ ] `/admin/login` tersedia;
- [ ] authentication berfungsi;
- [ ] dashboard tersedia;
- [ ] profile CRUD/edit tersedia;
- [ ] project CRUD tersedia;
- [ ] experience CRUD tersedia;
- [ ] education CRUD tersedia;
- [ ] skills CRUD tersedia;
- [ ] social links dapat diubah;
- [ ] site settings dapat diubah;
- [ ] data tersimpan persistent;
- [ ] public website membaca data dari backend/database;
- [ ] delete menggunakan confirmation;
- [ ] loading/error/success states tersedia.

### Technical

- [ ] TypeScript clean;
- [ ] no broken routes;
- [ ] no hardcoded secrets;
- [ ] no unnecessary dependencies;
- [ ] reusable components;
- [ ] proper validation;
- [ ] proper error handling;
- [ ] SEO metadata;
- [ ] responsive;
- [ ] production build berhasil.

---

# 57. FINAL DESIGN PRINCIPLE

Prioritaskan:

> **Identity > clarity > usability > interaction > decoration**

Website ini tidak perlu terlihat seperti website startup.

Ini adalah portfolio pribadi seorang developer.

Saya ingin ketika recruiter, dosen, client, atau developer lain membuka website ini, mereka langsung merasa:

> "Ini website seseorang yang benar-benar membangun software."

Bukan:

> "Ini template portfolio AI."

Buat desain yang **tenang, kuat, teknikal, personal, dan punya karakter.**

---

# 58. REKOMENDASI TEKNOLOGI

Jika sesuai dengan existing project, gunakan:

```text
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui
Shadcn Studio
```

Untuk admin:

```text
shadcn/ui
React Hook Form
Zod
TanStack Table
```

Untuk database/ORM gunakan yang sesuai existing architecture.

Jika belum ada:

```text
PostgreSQL
Prisma atau Drizzle
```

atau gunakan Supabase jika memang cocok dengan deployment dan kebutuhan project.

Untuk animation:

```text
CSS transitions
Framer Motion / Motion
```

hanya jika memang diperlukan.

Jangan menambahkan library hanya untuk efek visual sederhana.

---

# 59. REFERENSI SHADCN

Gunakan dokumentasi resmi shadcn/ui sebagai sumber utama untuk primitive dan blocks.

Official:

https://ui.shadcn.com/

Shadcn blocks:

https://ui.shadcn.com/blocks

Shadcn Studio:

https://shadcnstudio.com/

Gunakan Shadcn Studio untuk mempercepat development, tetapi tetap lakukan custom design sehingga hasil akhir tidak terlihat seperti template default.

---

# 60. INSTRUKSI TERAKHIR UNTUK AI

**Mulai dengan AUDIT, bukan coding.**

Jangan langsung generate 20 component baru.

Jangan menghapus existing functionality sebelum memahami dependency-nya.

Jangan mengganti database tanpa alasan.

Jangan membuat fake data.

Jangan membuat gradient-heavy UI.

Jangan membuat dashboard hanya untuk terlihat keren.

Jangan membuat animasi tanpa tujuan.

Jangan berhenti setelah UI selesai.

Pastikan:

```text
UI
↓
UX
↓
Backend
↓
Database
↓
Authentication
↓
CMS
↓
Public Website
↓
Production
```

semuanya benar-benar terhubung.

Target akhir:

**A real, maintainable, interactive developer portfolio with a real admin CMS - not an AI-generated visual mockup.**
