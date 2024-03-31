import { ReactNode } from "react";

interface Bullet {
  title: string;
  desc: string;
  icon: string; // Image URL
}

interface Benefit {
  title: string;
  desc: string;
  image: string; // Image URL
  bullets: Bullet[];
}

const benefitOne: Benefit = {
  title: "Highlight your benefits",
  desc: "You can use this space to highlight your first benefit or a feature of your product. It can also contain an image or Illustration like in the example along with some bullet points.",
  image: "url_to_image.png", // Replace with URL of the image
  bullets: [
    {
      title: "Enhanced Operational Efficiency",
      desc: "Then explain the first point briefly in one or two lines.",
      icon: "url_to_image1.png", // Replace with URL of the first image
    },
    {
      title: "Improve acquisition",
      desc: "Here you can add the next benefit point.",
      icon: "url_to_image2.png", // Replace with URL of the second image
    },
    {
      title: "Drive customer retention",
      desc: "This will be your last bullet point in this section.",
      icon: "url_to_image3.png", // Replace with URL of the third image
    },
  ],
};

const benefitTwo: Benefit = {
  title: "Offer more benefits here",
  desc: "You can use this same layout with a flip image to highlight your rest of the benefits of your product. It can also contain an image or Illustration as above section along with some bullet points.",
  image: "url_to_image.png", // Replace with URL of the image
  bullets: [
    {
      title: "Mobile Responsive Template",
      desc: "Nextly is designed as a mobile first responsive template.",
      icon: "url_to_image4.png", // Replace with URL of the fourth image
    },
    {
      title: "Powered by Next.js & TailwindCSS",
      desc: "This template is powered by latest technologies and tools.",
      icon: "url_to_image5.png", // Replace with URL of the fifth image
    },
    {
      title: "Dark & Light Mode",
      desc: "Nextly comes with a zero-config light & dark mode. ",
      icon: "url_to_image6.png", // Replace with URL of the sixth image
    },
  ],
};

export { benefitOne, benefitTwo };
