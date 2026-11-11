# Ashiqur Rahman Saron

**Computer Science researcher working across machine learning, computer vision, and language technology.**

I recently completed a BSc in Computer Science and Engineering at American International University-Bangladesh with a **4.00/4.00 CGPA**, ranking in the top 1% of my class. I am a Research Assistant with the Machine Learning Group at Qatar University and lead computer-vision and augmented-reality research at NEDAAS Lab.

I am especially interested in biomedical imaging, low-resource Bangla NLP, and assistive technology: practical machine learning that makes useful tools more accessible.

## Portfolio

Explore my work, research, publications, experience, and contact details:

**[ashiqursaron.netlify.app](https://ashiqursaron.netlify.app)**

## Selected work

- **BanglaSuicideBERT** — Compared BanglaBERT and XLM-RoBERTa for suicide-risk detection in Bangla social-media text; BanglaBERT achieved 96.21% accuracy. [Read the paper](https://ieeexplore.ieee.org/document/11429305).
- **Image to Bangla text** — A vision-transformer pipeline that turns images into Bangla descriptions to support mobility for visually impaired people. [Read the paper](https://drive.google.com/file/d/1k4Ph2_uZ5576vbxJzjNwrjH-uCk5SwkS/view?usp=sharing).
- **Able Sign** — An AI-driven, gesture-controlled robotics project. [View the source](https://github.com/ashiqursaron/Able_Sign).
- **Rice Leaf Disease Detection** — A lightweight YOLOv8 model designed to run on Jetson Nano. [View the source](https://github.com/ashiqursaron/Rice_Leaf_Detection_YOLOv8).

The portfolio website includes more projects, publications, experience, awards, and certifications.

## Interests and tools

**Research:** Machine learning · Computer vision · Biomedical imaging · Bangla NLP · Assistive technology

**Tools:** Python · PyTorch · TensorFlow · Keras · OpenCV · Transformers · YOLOv8 · Hugging Face · NumPy · Pandas · C++ · MATLAB

## Connect

- [LinkedIn](https://www.linkedin.com/in/ashiqur-saron)
- [GitHub](https://github.com/ashiqursaron)
- [Hugging Face](https://huggingface.co/ashiqurSaron)
- [Email](mailto:ashiqursaron@gmail.com)
- [Download my CV](public/Ashiqur_Rahman_Saron_CV.pdf)

## Run the portfolio locally

This site is built with React and Vite. You need [Node.js LTS](https://nodejs.org/).

```bash
npm install
npm run dev
```

Vite prints a local URL in the terminal. Open it in your browser; edits are reflected as you save.

To create and preview a production build:

```bash
npm run build
npm run preview
```

The production files are written to `dist/`. The live site is hosted on Netlify; the repository also includes an `npm run deploy` script for GitHub Pages.

## Updating the portfolio

Most portfolio text and profile details are maintained in [`src/data/portfolio.js`](src/data/portfolio.js). It contains the profile, site metadata, homepage content, projects, timeline, publications, awards, certifications, and contact-form settings. Follow the examples and comments in that file when adding or editing entries.

- Replace the portrait at `public/images/portrait.jpg` or update the `photo` value.
- Replace the CV at `public/Ashiqur_Rahman_Saron_CV.pdf` or update the `cv` value.
- Add project images in `public/projects/` and use a root-relative path such as `/projects/example.png`.
- Site metadata and search/social preview files are generated from `src/data/portfolio.js` during a build; do not edit generated metadata by hand.

The interface and behavior live in `src/kinetic/`. Change those files when a request affects layout, styling, or interactions rather than just portfolio content. See [`.github/copilot-instructions.md`](.github/copilot-instructions.md) for project-specific guidance for future code changes.
