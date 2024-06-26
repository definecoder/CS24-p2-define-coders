class Forum {
  final String id;
  final String name;
  final String profilePic;
  final String article;
  final String topic;
  final String question;
  final String supportArea;
  final String description;
  final String location;
  final String upvote;
  final String downvote;
  final String comment;
  final List<String> imgList;
  final String commentPic1;
  final String commentPic2;
  final String comment1;
  final String comment2;

  Forum({
    required this.id,
    required this.name,
    required this.profilePic,
    required this.article,
    required this.topic,
    required this.question,
    required this.supportArea,
    required this.description,
    required this.location,
    required this.upvote,
    required this.downvote,
    required this.comment,
    required this.imgList,
    required this.commentPic1,
    required this.commentPic2,
    required this.comment1,
    required this.comment2
  });
}

final List<String> dummyGurbage = [
  "assets/images/garbage1.jpg",
  "assets/images/garbage2.jpg",
  "assets/images/garbage12.png",
  "assets/images/garbage4.png",
  "assets/images/garbage5.png",
  "assets/images/garbage6.png",
  "assets/images/garbage7.png",
  "assets/images/garbage8.png",
  "assets/images/garbage9.png",
  "assets/images/garbage10.png",
  "assets/images/garbage3.png",

];


final List<String> dummyHeadlines = [
  "Combatting Plastic Pollution: Small Changes, Big Impact",
  "Food Waste: The Silent Threat to Sustainability",
  "E-Waste: Managing the Digital Detritus",
  "Water Conservation: Preserving Our Most Precious Resource",
  "Air Quality Awareness: Clearing the Path to Cleaner Air",
  "Textile Waste: Rethinking Fashion's Footprint",
  "Biodiversity Loss: Protecting Earth's Rich Tapestry of Life",
  "Plight of the Pollinators: Securing Our Food Future",
  "Ocean Acidification: The Other CO2 Problem",
  "Urban Sprawl: Balancing Growth with Green Spaces"


];

final List<String> dummyArticles = [
  "Plastic pollution is a global crisis, suffocating our oceans, harming marine life, and contaminating our food chain. Every year, millions of tons of plastic waste are discarded improperly, leading to devastating consequences for our environment. However, by making small changes in our daily lives, we can collectively make a big impact in reducing plastic waste. From carrying reusable bags and water bottles to saying no to single-use plastics, every action counts. Let's pledge to be more mindful of our plastic consumption and strive towards a cleaner, healthier planet.",
  "Food waste is a pressing issue that often goes unnoticed but poses a significant threat to sustainability. In a world where millions suffer from hunger, it's alarming that one-third of all food produced globally goes to waste. Not only does this waste contribute to greenhouse gas emissions and landfill overflow, but it also represents a squandering of valuable resources such as water and land. By adopting practices like meal planning, proper storage, and composting, we can minimize food waste and create a more sustainable food system for future generations.",
  "In our digital age, electronic waste, or e-waste, has become a mounting concern. With rapid technological advancements, electronic devices have shorter lifespans, leading to a surge in discarded gadgets and appliances. Improper disposal of e-waste poses risks to both human health and the environment due to the presence of hazardous materials like lead, mercury, and cadmium. To address this issue, responsible recycling and proper disposal methods are crucial. Let's strive to extend the lifespan of our electronics through repair, donation, and recycling, ensuring a cleaner and safer future.",
  "Water scarcity is a looming threat exacerbated by climate change and unsustainable consumption patterns. Despite water covering over 70% of the Earth's surface, only a small fraction is accessible freshwater. Wasteful practices like excessive irrigation, leaky faucets, and inefficient industrial processes contribute to water wastage on a massive scale. By adopting water-saving technologies, practicing mindful usage, and supporting water conservation initiatives, we can safeguard this precious resource for future generations and ensure equitable access to clean water for all.",
  "Air pollution is a silent killer, contributing to a myriad of health problems and environmental degradation. From vehicle emissions and industrial activities to deforestation and burning fossil fuels, various human activities degrade air quality and harm public health. Increasing awareness about the sources and impacts of air pollution is crucial in fostering collective action towards cleaner air. By advocating for cleaner energy sources, reducing vehicle emissions, and supporting policies that prioritize air quality, we can breathe easier and create a healthier environment for all living beings.",
  "The fashion industry is one of the largest contributors to environmental pollution, with textile waste posing a significant challenge. Fast fashion's rapid production cycles and disposable mentality lead to mountains of discarded clothing each year. These garments often end up in landfills or incinerators, releasing harmful chemicals and greenhouse gases into the atmosphere. To combat textile waste, embracing sustainable fashion practices such as upcycling, clothing swaps, and supporting eco-conscious brands is essential. By rethinking our approach to fashion, we can minimize waste and promote a more circular economy in the garment industry.",
  "Biodiversity loss is a silent crisis threatening ecosystems and species worldwide. Human activities such as deforestation, habitat destruction, and overexploitation of natural resources have led to a staggering decline in biodiversity. The loss of species not only diminishes the beauty and resilience of our planet but also disrupts vital ecosystem services like pollination and water purification. Conservation efforts, habitat restoration, and sustainable land management practices are crucial in halting biodiversity loss and preserving the intricate web of life on Earth. Let's work together to protect and restore biodiversity for the well-being of present and future generations.",
  "Pollinators, including bees, butterflies, and birds, play a vital role in our food system by facilitating the pollination of crops and wild plants. However, pollinator populations are declining at an alarming rate due to habitat loss, pesticide exposure, and climate change. Without pollinators, many of the fruits, vegetables, and nuts we rely on for sustenance would cease to exist. To safeguard pollinators and ensure food security, we must create pollinator-friendly habitats, reduce pesticide use, and raise awareness about the importance of these vital species. By protecting pollinators, we can secure our food future and cultivate a more resilient agricultural system.",
  "Ocean acidification, often referred to as the other CO2 problem, is a consequence of increased carbon dioxide absorption by the world's oceans. This process leads to a decrease in seawater pH, threatening marine life and ecosystems. Coral reefs, shellfish, and planktonic organisms are particularly vulnerable to the effects of ocean acidification, with potential ripple effects throughout the marine food web. Mitigating ocean acidification requires reducing carbon emissions, protecting marine habitats, and promoting sustainable ocean management practices. By addressing this lesser-known but equally critical issue, we can safeguard the health and resilience of our oceans for generations to come.",
  "Urban sprawl, characterized by rapid and unplanned expansion of cities into surrounding areas, poses significant challenges to environmental sustainability and quality of life. As cities grow, valuable green spaces are lost, leading to habitat fragmentation, air and water pollution, and increased carbon emissions. However, smart urban planning and sustainable development practices can help mitigate the negative impacts of urban sprawl. By prioritizing compact, walkable communities, preserving green infrastructure, and implementing green building standards, cities can foster a healthier and more resilient urban environment. Let's strive to strike a balance between urban growth and the preservation of green spaces for the well-being of both people and the planet.",
  "The fashion industry is one of the largest contributors to environmental pollution, with textile waste posing a significant challenge. Fast fashion's rapid production cycles and disposable mentality lead to mountains of discarded clothing each year. These garments often end up in landfills or incinerators, releasing harmful chemicals and greenhouse gases into the atmosphere. To combat textile waste, embracing sustainable fashion practices such as upcycling, clothing swaps, and supporting eco-conscious brands is essential. By rethinking our approach to fashion, we can minimize waste and promote a more circular economy in the garment industry.",




];

List<Forum> dummyForumList = [
  Forum(
    id: '1',
    name: 'John Doe',
    profilePic: "assets/images/propic1.png",
    article: dummyArticles[0],
    topic: 'Wastage',
    question: 'Combatting Plastic Pollution: Small Changes, Big Impact',
    supportArea: 'Dhanmondi, Bangladesh',
    description: 'I am passionate about traveling and learning about different cultures.',
    location: 'Mohakhali',
    upvote: '50',
    downvote: '20',
    comment: '25',
    imgList: [dummyGurbage[0], dummyGurbage[1], dummyGurbage[2]],
    comment1: 'Mohakhali',
    comment2: '50',
    commentPic1: '20',
    commentPic2: '25',
  ),
  Forum(
    id: '2',
    name: 'Alice Smith',
    profilePic: "assets/images/propic19.png",
    article: dummyArticles[1],
    topic: 'Event',
    question: dummyHeadlines[2],
    supportArea: 'Gulshan, Bangladesh',
    description: 'I love cooking and experimenting with different recipes.',
    location: 'Lamabazar',
    upvote: '80',
    downvote: '5',
    comment: '30',
    imgList: [dummyGurbage[3], dummyGurbage[1], dummyGurbage[2]],
    comment1: 'Mohakhali',
    comment2: '50',
    commentPic1: '20',
    commentPic2: '25',
  ),
  Forum(
    id: '3',
    name: 'Bob Johnson',
    profilePic: "assets/images/propic2.png",
    article: dummyArticles[2],
    topic: 'Clean Day',
    question: dummyHeadlines[3],
    supportArea: 'Banani, Bangladesh',
    description: 'I am a software engineer with experience in various programming languages.',
    location: 'Dighirpar',
    upvote: '90',
    downvote: '10',
    comment: '40',
    imgList: [dummyGurbage[3], dummyGurbage[4], dummyGurbage[5]],
    comment1: 'Mohakhali',
    comment2: '50',
    commentPic1: '20',
    commentPic2: '25',
  ),
  Forum(
    id: '4',
    name: 'Emily Brown',
    profilePic: "assets/images/propic18.png",
    article: dummyArticles[3],
    topic: 'Awareness',

    question: dummyHeadlines[4],
    supportArea: 'Uttara, Bangladesh',
    description: 'I am a photography enthusiast looking to improve my skills.',
    location: 'Bondor',
    upvote: '70',
    downvote: '15',
    comment: '20',
    imgList: [dummyGurbage[6], dummyGurbage[7], dummyGurbage[8]],
    comment1: 'Mohakhali',
    comment2: '50',
    commentPic1: '20',
    commentPic2: '25',
  ),
  Forum(
    id: '5',
    name: 'Michael Wilson',
    profilePic: "assets/images/propic3.png",
    article: dummyArticles[4],
    topic: 'Air Pollution',
    question: dummyHeadlines[5],
    supportArea: 'Mirpur, Bangladesh',
    description: 'I am a nutritionist passionate about promoting healthy eating habits.',
    location: 'Akhaliya',
    upvote: '60',
    downvote: '12',
    comment: '35',
    imgList: [dummyGurbage[9], dummyGurbage[10], dummyGurbage[1]],
    comment1: 'Mohakhali',
    comment2: '50',
    commentPic1: '20',
    commentPic2: '25',
  ),
  Forum(
    id: '6',
    name: 'Sophia Lee',
    profilePic: "assets/images/propic17.png",
    article: dummyArticles[6],
    topic: 'Health',
    question: dummyHeadlines[2],
    supportArea: 'Baridhara, Bangladesh',
    description: 'I am a travel enthusiast who loves exploring new destinations.',
    location: 'SUST',
    upvote: '85',
    downvote: '8',
    comment: '28',
    imgList: [dummyGurbage[2], dummyGurbage[3], dummyGurbage[4]],
    comment1: 'Mohakhali',
    comment2: '50',
    commentPic1: '20',
    commentPic2: '25',
  ),
  Forum(
    id: '7',
    name: 'Daniel Garcia',
    profilePic: "assets/images/propic4.png",
    question: dummyHeadlines[7],
    article: dummyArticles[6],
    topic: 'Waste',
    supportArea: 'Mohakhali, Bangladesh',
    description: 'I have been practicing meditation for years and want to share its benefits with others.',
    location: 'Banani',
    upvote: '95',
    downvote: '3',
    comment: '50',
    imgList:[dummyGurbage[8], dummyGurbage[9], dummyGurbage[10]],
    comment1: 'Mohakhali',
    comment2: '50',
    commentPic1: '20',
    commentPic2: '25',
  ),
  Forum(
    id: '8',
    name: 'Olivia Martinez',
    profilePic: "assets/images/propic16.png",
    question: dummyHeadlines[8],
    article: dummyArticles[7],
    topic: 'Health',
    supportArea: 'Panthapath, Bangladesh',
    description: 'I have started multiple successful businesses and can provide valuable insights.',
    location: 'Motijheel',
    upvote: '75',
    downvote: '18',
    comment: '22',
    imgList:[dummyGurbage[2], dummyGurbage[0], dummyGurbage[1]],
    comment1: 'Mohakhali',
    comment2: '50',
    commentPic1: '20',
    commentPic2: '25',
  ),
  Forum(
    id: '9',
    name: 'Ethan Taylor',
    profilePic: "assets/images/propic5.png",
    question: dummyHeadlines[2],
    article: dummyArticles[8],
    topic: '',
    supportArea: 'Khilgaon, Bangladesh',
    description: 'I am an avid hiker and have explored many hiking trails around the world.',
    location: 'Chittogaong Road',
    upvote: '55',
    downvote: '25',
    comment: '15',
    imgList: [dummyGurbage[4], dummyGurbage[6], dummyGurbage[8]],
    comment1: 'Mohakhali',
    comment2: '50',
    commentPic1: '20',
    commentPic2: '25',
  ),
  Forum(
    id: '10',
    name: 'Ava Rodriguez',
    profilePic: "assets/images/propic13.png",
    question: dummyHeadlines[3],
    article: dummyArticles[0],
    topic: '',
    supportArea: 'Banani, Bangladesh',
    description: 'I am a student who has developed effective study techniques over the years.',
    location: 'Dholaikhaal',
    upvote: '65',
    downvote: '30',
    comment: '18',
    imgList: [dummyGurbage[10], dummyGurbage[2], dummyGurbage[3]],
    comment1: 'Mohakhali',
    comment2: '50',
    commentPic1: '20',
    commentPic2: '25',
  ),
];
