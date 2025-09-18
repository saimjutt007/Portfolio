import type { PortfolioData } from '../types';

// Helper to extract app ID and construct an icon URL from App Store / Google Play links
const getIconFromStoreLink = (link?: string): string | undefined => {
  if (!link) return undefined;

  try {
    const url = new URL(link);
    
    // Google Play Store
    // e.g., https://play.google.com/store/apps/details?id=com.company.app
    if (url.hostname === 'play.google.com') {
      const appId = url.searchParams.get('id');
      if (appId) return `https://unavatar.io/google-play/${appId}`;
    }

    // Apple App Store
    // e.g., https://apps.apple.com/us/app/app-name/id123456789
    if (url.hostname === 'apps.apple.com') {
      const pathParts = url.pathname.split('/');
      // The app ID is usually the last part of the path, prefixed with 'id'
      const appIdWithPrefix = pathParts.pop() || '';
      if (appIdWithPrefix.startsWith('id')) {
          const appId = appIdWithPrefix.substring(2);
          return `https://unavatar.io/apple-app-store/${appId}`;
      }
    }
  } catch (e) {
    console.error(`Invalid URL provided for icon fetching: ${link}`, e);
    return undefined;
  }
  
  return undefined;
};


// Helper function to create a URL-friendly slug for placeholders
const slugify = (text: string): string =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove non-word chars, but keep spaces and hyphens
    .replace(/[\s_-]+/g, '-') // collapse whitespace and underscores to a single hyphen
    .replace(/^-+|-+$/g, ''); // remove leading/trailing hyphens

const games = [
    { 
    name: 'Home Cleanup 3D: Cleaning Game', 
    link: 'https://play.google.com/store/apps/details?id=com.esoter.free.homedoor.cleaner.games',
    icon:'https://play-lh.googleusercontent.com/cUv3a5JtCmcfvUtkknjjEioAvZEqWdXXjKCrPM9fGL-kYgMkbFp_UiNlKQYN07HwZu8=w240-h480-rw',
    gameplay: 'https://youtube.com/shorts/lxEQD044z5Y?si=gqLUXoLRqxPwei4t',
    summary: 'Experience the satisfaction of deep cleaning in this immersive 3D simulation, tackling messy rooms with a variety of tools to restore them to pristine condition.',
    
  },
   { 
    name: 'Escape Prisoner #804', 
    link: 'https://play.google.com/store/apps/details?id=com.ZirobStudio.EscapePrisoner804',
    gameplay: 'https://youtube.com/shorts/kI5cOi4xg_g?feature=share',
    summary: 'Engage in a high-stakes prison escape adventure, solving intricate puzzles and employing stealth tactics to outsmart guards and secure your freedom.',
    icon: 'https://play-lh.googleusercontent.com/Lo0Azo3yNxz42mQCsM_2inWmqUfBaQUU_6swxEvs20vzR-w6pdPyJ_8W6mIW9DToLS9g=w240-h480-rw',
  },

  { 
    name: 'Patch Designer',
    link: 'https://apps.apple.com/gr/app/patch-designer/id6739249079',
    gameplay: 'https://www.youtube.com/watch?v=gC5rIxFeaUU',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/96/37/38/963738b7-1f24-2bd0-e545-f41f2bb3a1c6/AppIcon-1x_U007emarketing-0-7-0-85-220-0.png/434x0w.webp',
    summary: 'Design and customize unique embroidered patches in this creative DIY simulator. Choose from a variety of threads, fabrics, and patterns to create your own wearable art.'
  
  },
  
  { 
    name: 'Grillz DIY', 
    link: 'https://apps.apple.com/gr/app/grillz-diy/id6503436473',
    gameplay: 'https://youtube.com/shorts/fym-_Cn6Txw?si=sXSEDvx5BmNhTVG4',
    icon:'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/70/ac/b5/70acb58d-4b22-7be1-beec-d5efb8590dcf/AppIcon-1x_U007emarketing-0-7-0-85-220-0.png/434x0w.webp',
    summary: 'Become a celebrity dentist and design custom, sparkling grillz for your clients in this creative and satisfying DIY fashion simulation game.',
  },
  
  { 
    name: 'Horse Care Beauty Salon',
    gameplay:'https://youtube.com/shorts/YIprKGPhEIQ?si=V5r4iS9qD25US-mW',
    icon:'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/c6/6d/e6/c66de6bb-8e9c-f0bc-b629-cda435dc74bc/AppIcon-1x_U007emarketing-0-7-0-85-220-0.png/434x0w.webp',
    link: 'https://apps.apple.com/gr/app/horse-care-beauty-salon/id6504992325',
    summary: 'Run your own equestrian beauty salon! Groom, style, and care for beautiful horses, preparing them for shows and photoshoots in this charming makeover game.'
  },
  
  { 
    name: 'WashiTape Fashion Designer', 
    link: 'https://apps.apple.com/gr/app/washi-tape-fashion-designer/id1629295173',
    gameplay: 'https://youtube.com/shorts/8ttmEzCBxRY?si=IdRqFW-r7jXnGfN6',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/58/9a/e7/589ae7e7-e1dc-2792-82d9-328b2ad03c10/AppIcon-1x_U007emarketing-0-7-0-85-220-0.png/434x0w.webp',
    summary: 'Design stunning outfits and accessories using colorful Washi tape, creating unique patterns and styles in a relaxing and artistic fashion game.',
  },
  { 
    name: 'Pixel Press', 
    link: 'https://apps.apple.com/gr/app/pixel-press/id6736611581',
    gameplay: 'https://youtube.com/shorts/9q4NhwxfQkI?feature=share',
    summary: 'Unleash your creativity by designing unique pixel art on t-shirts and various items, bringing your digital creations to life in a fun and interactive way.',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/a4/bd/72/a4bd7299-636f-a81b-4ac7-e70fe54f1133/AppIcon-1x_U007emarketing-0-7-0-85-220-0.png/434x0w.webp.'
  }
  ,

  { 
    name: 'PickyPadMatch', 
    link: 'https://apps.apple.com/gr/app/picky-pad-match/id6670608269',
    icon:'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/a7/03/70/a70370e0-82f5-7f68-064d-689bfc32bc0c/AppIcon-1x_U007emarketing-0-7-0-85-220-0.png/434x0w.webp',
    gameplay:'https://youtube.com/shorts/0OeSvUI97tI?si=52y1uf95it8ftZjn',
    summary: 'Challenge your matching skills in this engaging puzzle game where you connect and clear colorful pads to achieve high scores and progress through levels.',
  },
  { 
    name: 'Fashion Race',
    link: 'https://apps.apple.com/gr/app/fasion-race/id6479694417',
    gameplay: 'https://youtube.com/shorts/8vkiBBDV9-Y?si=CNmmB1q2tmIgjHhq',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/ab/21/44/ab2144a5-4044-3ff6-0727-657c3b44403d/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/434x0w.webp',
    summary: 'Strut down the runway in a high-speed fashion competition. Choose the right outfits to overcome obstacles and impress the judges to become the ultimate style icon.'
  },
  { 
    name: 'My Stylish Store', 
    link: 'https://apps.apple.com/gr/app/my-stylish-shop/id6478495576',
    gameplay: 'https://youtube.com/shorts/JVI0RJI9zp4?si=Myd77d_wOIiUJii7',
    icon:'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/d4/b5/28/d4b52845-8ee5-bb0d-bffb-70c3d3125d0f/AppIcon-1x_U007emarketing-0-7-0-85-220-0.png/434x0w.webp',
    summary: 'Manage your own fashion boutique by styling customers, curating trendy collections, and growing your business into a chic style empire.',
  },
  { 
    name: 'Connect Couples', 
    link: 'https://apps.apple.com/gr/app/connect-couples/id6476555997',
    gameplay: '',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/10/22/46/102246c8-2d86-d5bc-b0b0-1053592cab8f/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/434x0w.webp',
    summary: 'Solve challenging path-finding puzzles by drawing lines to reunite couples, navigating obstacles to bring them together.',
  },
  { 
    name: 'Friendship Bracelet Trade & Swap',
    link: 'https://apps.apple.com/gr/app/friendship-bracelet-trade-swap/id6475718007',
    gameplay: '',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/46/9b/d8/469bd8b2-4a9e-7185-dc6a-189fdf1061ef/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/434x0w.webp',
    summary: 'Create, trade, and collect virtual friendship bracelets. Master different knotting techniques, fulfill orders, and swap your colorful creations with friends.'
  },
  { 
    name: 'Friendship Bracelet Crossword',
    link: 'https://apps.apple.com/gr/app/friendship-bracelet-crossword/id6473388200',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/46/9b/d8/469bd8b2-4a9e-7185-dc6a-189fdf1061ef/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/434x0w.webp',
    gameplay: 'https://youtube.com/shorts/D32PZ7op6IU?si=NbvNNW38NuYEBy86',
    summary: 'Combine the relaxing fun of friendship bracelets with brain-teasing crossword puzzles. Solve word challenges to unlock new patterns and colors for your bracelet designs.'
  },
  { 
    name: 'DIY Signboard', 
    link: 'https://apps.apple.com/gr/app/diy-signboard/id6449289568',
    gameplay: 'https://youtube.com/shorts/mjCO0X1L_hM?feature=share',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/75/ed/bc/75edbc43-9052-2db0-ed21-b56f417ddda9/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/434x0w.webp',
    summary: 'Express your artistic side by designing and crafting custom signboards using a variety of tools, colors, and decorations in this creative simulator.',
  },
  { 
    name: 'Guess Whooo?', 
    link: 'https://apps.apple.com/gr/app/guess-whooo/id6447434052',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/ef/49/19/ef491914-5e87-3e2b-0a34-c29b5108d73a/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/434x0w.webp',
    gameplay: '',
    summary: "Test your deduction skills in this classic guessing game by asking clever questions to uncover the opponent's mystery character before they guess yours.",
  },
];

const personalProjectsData = [
    {
        name: 'Fast Grid Maker 2D',
        summary: [
            'A high-performance Unity editor tool for rapid 2D level design.',
            'Enables painting, erasing, and configuring grid-based levels with custom tile sets.',
            'Significantly speeds up prototyping for puzzle and strategy games.'
        ],
    },
    {
        name: 'Grid Level Editor GUI',
        summary: [
           'A custom Unity Editor Window that provides an intuitive GUI for level creation.',
           'Features tile painting, object placement with metadata, and level serialization.',
           'Empowers level designers to create content without writing code.',
        ],
    },
    {
        name: 'Generic Match 3 Template',
        summary: [
            'A robust and extensible C# template for creating match-3 games in Unity.',
            'Features a flexible grid system, customizable match rules, and object pooling.',
            'Provides a solid, performant foundation for any match-3 project.'
        ],
    },
    {
        name: 'Multi Camera Scalers for Mobile',
        summary: [
            'An essential Unity utility to handle diverse mobile aspect ratios.',
            'Dynamically adjusts camera properties to ensure consistent UI and gameplay visuals.',
            'Guarantees a correct presentation on all devices, from standard phones to tablets.'
        ],
    },
    {
        name: 'Dialogue System with NPC',
        summary: [
            'A data-driven dialogue system for Unity using ScriptableObjects for easy authoring.',
            'Supports branching conversations, event triggers, and quest integration.',
            'Empowers writers to create rich narrative experiences with minimal code.'
        ],
    },
    {
        name: 'Touch Empty',
        summary: [
            'Game is coming soon on playstore.'
        ],
    },
    {
        name: 'Memory Clash',
        summary: [
            'Game is coming soon on playstore.'
        ],
    },
];

export const portfolioData: PortfolioData = {
  name: 'Saim Zafar',
  title: 'Game Developer / Gameplay Programmer',
  email: 'saimjutt2280@gmail.com',
  socials: {
    github: 'https://github.com/saimjutt007',
    linkedin: 'https://linkedin.com/in/saim-zafar-997051215',
  },
  hero: {
    taglines: {
      technical: 'Mobile Gameplay Programmer — shipping engaging experiences for millions of players.',
      narrative: 'I write the code that makes you miss your bus stop.',
    },
  },
  about: {
    leads: {
      technical: 'I specialize in developing engaging gameplay systems for the hyper-casual mobile market, with a strong focus on DIY, simulation, and puzzle genres.',
      narrative: 'I enjoy the challenge of rapid prototyping and bringing satisfying, snackable game ideas to life for a massive audience.',
    },
    bullets: [
      'Expertise in Unity (C#) for mobile game development (iOS & Android).',
      'Proven ability to ship titles quickly in a fast-paced, agile environment.',
      'Shipped over 15 mobile titles, accumulating millions of downloads across the App Store and Google Play.',
    ],
  },
  workStyle: "I am a versatile and results-driven programmer, adept at collaborating with design and art teams to transform concepts into polished, market-ready games. I thrive on tight deadlines and iterative development, focusing on creating intuitive mechanics and optimizing performance for a wide range of mobile devices.",
  highlightedProjects: games.map((game: any) => {
    const storeIcon = getIconFromStoreLink(game.link);
    const imagePath = game.icon || storeIcon || `https://picsum.photos/seed/${slugify(game.name)}/400/400`;
    
    return {
      title: game.name,
      summary: game.summary || 'A creative and engaging mobile game available on the App Store.',
      image: imagePath,
      links: {
        demo: game.link,
        video: game.gameplay,
      },
    };
  }),
  personalProjects: personalProjectsData.map((project) => {
    return {
        title: project.name,
        summary: project.summary,
    }
  }),
  experience: [
    {
      role: 'Senior Gameplay Programmer',
      company: 'BQ Gamz',
      duration: 'Mar 2023 - Mar 2025',
      responsibilities: [
        'Led gameplay development for multiple high-traffic mobile titles in the DIY, simulation, and fashion genres, from prototype to global launch.',
        'Architected and implemented core mechanics, including crafting systems, character customization, and interactive mini-games.',
        'Optimized game performance across a wide range of iOS and Android devices, focusing on memory usage, draw calls, and battery life.',
        'Collaborated closely with designers to iterate on game feel and player feedback, ensuring a fun and engaging user experience.',
        'Integrated third-party SDKs for analytics, advertising, and in-app purchases.',
      ],
    },
    {
      role: 'Game Developer',
      company: 'DuoLabz',
      duration: 'Sep 2022 - Fab 2023',
      responsibilities: [
        'Developed and maintained gameplay features for a portfolio of hyper-casual puzzle and arcade games.',
        'Implemented UI screens, player controls, and level progression systems using Unity and C#.',
        'Participated in regular code reviews to maintain code quality and share knowledge within the team.',
        'Assisted in debugging and resolving technical issues reported by QA and players.',
      ],
    },
  ],
  skills: [
    {
      category: 'Engines',
      skills: [
        { name: 'Unity' },
      ],
    },
    {
      category: 'Languages',
      skills: [
        { name: 'C#' },
        { name: 'C++' },
        { name: 'Python' },
        { name: 'JavaScript' },
        { name: 'HLSL/ShaderLab' },
      ],
    },
    {
      category: 'Technologies',
      skills: [
        { name: 'Gameplay Systems' },
        { name: 'AI' },
        { name: 'Performance Optimization' },
        { name: 'UI Programming' },
        { name: 'Physics Programming' },
      ],
    },
    {
      category: 'Tools & Platforms',
      skills: [
        { name: 'Blender' },
        { name: 'Slack' },
        { name: 'Gitlab' },
        { name: 'Trello' },
        { name: 'Visual Studio' },
        { name: 'Miro' },
        { name: 'Notion' },
      ],
    },
  ],
  education: [
    {
      degree: 'B.S. in Computer Science',
      institution: 'University of Centeral Punjab',
      year: '(2018 - 2022)',
      details: '4 years',
    },
     {
      degree: 'Intermediate in Computer Science',
      institution: 'Punjab Group of Colleges',
      year: '(2016 - 2018)',
      details: '2 years',
    }
  ],
  contact: {
    availability: 'Get in Touch. Located in PKT (UTC+5). Phone no. +92 313 7845777.',
  },
};