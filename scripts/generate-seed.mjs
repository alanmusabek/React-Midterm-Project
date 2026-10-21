// Reproducible, authored seed data. The application imports the resulting JSON,
// never this generator. IDs remain stable across builds.
import { mkdirSync, writeFileSync } from "node:fs";

const groups = [
  {
    category: "Paper & print",
    materials: ["Paper", "Pencil", "Scissors"],
    setup:
      "Clear a flat work surface and gather the listed materials. Use cutting tools carefully on a protected surface.",
    finish:
      "Test your finished piece, adjust one fold or detail, and keep a note of what worked.",
    items: [
      [
        "A pocket-sized notebook",
        "Turn one sheet of paper into a little home for your ideas.",
        "Fold a sheet into eighths, open it, cut the middle slit, and fold the eight pages into a booklet.",
      ],
      [
        "Print with a potato stamp",
        "Make a repeating pattern with a simple handmade stamp.",
        "Draw a simple shape on a halved potato, carefully carve away its background, and stamp a painted repeat.",
      ],
      [
        "A city made of paper",
        "Build a tiny skyline for your desk using folded paper.",
        "Fold three paper tubes, flatten their bases, and cut different roof shapes before arranging a skyline.",
      ],
      [
        "An accordion travel journal",
        "Make a fold-out journal for a day worth remembering.",
        "Fold a long paper strip back and forth, glue card covers to its ends, and add a place to each panel.",
      ],
      [
        "Botanical paper silhouettes",
        "Turn the outlines of leaves into a graphic paper composition.",
        "Trace three leaves, cut the silhouettes from contrasting paper, and overlap them on a plain background.",
      ],
      [
        "A woven paper bookmark",
        "Weave two colors into a useful little reading companion.",
        "Cut equal-width strips, weave them over and under, and secure the ends to a card backing.",
      ],
      [
        "A pop-up greeting card",
        "Add an unexpected little scene inside a handmade card.",
        "Cut two parallel slits across a folded card, push the tab inward, and attach a small paper illustration.",
      ],
      [
        "Fold a paper lampshade model",
        "Explore how repeated folds change the way paper catches light.",
        "Score alternating mountain and valley folds, join the ends into a cylinder, and view it beside daylight.",
      ],
      [
        "A cut-paper portrait",
        "Describe a face using just a handful of colored shapes.",
        "Reduce a reference face to five large shapes, cut each in a different tone, and assemble the portrait.",
      ],
      [
        "Marbled paper experiments",
        "Create swirling color patterns on paper with shaving foam.",
        "Spread shaving foam in a tray, swirl in a few drops of food coloring, press paper down, and scrape it clean.",
      ],
      [
        "A miniature paper mobile",
        "Balance a collection of paper shapes in a hanging sculpture.",
        "Cut five lightweight shapes, tie them to thread, and balance them along two crossed card strips.",
      ],
      [
        "Design your own wrapping paper",
        "Give ordinary paper a personal pattern for your next gift.",
        "Choose three simple marks, repeat them with a marker, and vary their spacing across a large sheet.",
      ],
      [
        "A collage postcard",
        "Send a small visual story made from saved paper scraps.",
        "Choose a place or memory, cut five images or textures, and layer them on postcard-size card.",
      ],
      [
        "Paper bead color studies",
        "Roll colorful scraps into a small set of decorative beads.",
        "Cut long paper triangles, roll each tightly around a toothpick, and glue the final tip in place.",
      ],
      [
        "A paper bridge challenge",
        "Find out how folds can help a sheet of paper carry weight.",
        "Span two books with flat paper, then compare an accordion fold by adding coins one at a time.",
      ],
      [
        "A five-page mini zine",
        "Publish a small collection of ideas around one theme.",
        "Choose a theme, design five small panels with words and pictures, and staple a folded cover around them.",
      ],
      [
        "Geometric paper tiles",
        "Explore a repeating pattern with handmade geometric tiles.",
        "Cut identical triangles from three paper colors and rearrange them into at least four repeating patterns.",
      ],
      [
        "A folded desk organizer",
        "Turn a sturdy sheet into a tray for small desk objects.",
        "Score a square grid on card, fold its outer rows upward, and tuck or glue the corner tabs together.",
      ],
      [
        "Monoprint texture sampler",
        "Capture everyday textures in a one-off print collection.",
        "Roll washable paint thinly on a smooth tray, draw into it, and press paper onto the surface once.",
      ],
      [
        "A layered paper landscape",
        "Build depth from overlapping hills and a tiny foreground.",
        "Cut five hill profiles from light-to-dark paper and attach them with small folded spacers.",
      ],
    ],
  },
  {
    category: "Drawing",
    materials: ["Sketchbook", "Pencil", "Eraser"],
    setup:
      "Set out your sketchbook and pencil, and choose a comfortable place with natural light.",
    finish:
      "Look at the drawing from a distance and add a date and one observation in the margin.",
    items: [
      [
        "Draw your morning coffee",
        "Notice the shapes and shadows in an everyday ritual.",
        "Sketch the cup as an ellipse and cylinder, then shade three distinct values beneath and around it.",
      ],
      [
        "One object, twenty lines",
        "Capture an object with a deliberately small number of marks.",
        "Choose a shoe or mug and draw it using no more than twenty separate pencil strokes.",
      ],
      [
        "A blind contour portrait",
        "Practice looking closely by letting go of a perfect result.",
        "Draw a face with one continuous line while looking only at the subject, never the paper.",
      ],
      [
        "A window-view sketch",
        "Frame an ordinary view as a small illustrated scene.",
        "Use your window as a frame, block in the three largest shapes, and add only the most important details.",
      ],
      [
        "Build a texture library",
        "Collect a page of marks you can use in future drawings.",
        "Divide a page into nine boxes and fill each with a different repeated mark, from dots to crosshatching.",
      ],
      [
        "The negative-space chair",
        "Learn to draw the spaces between things.",
        "Draw the empty shapes between the legs and back of a chair before adding any of its outlines.",
      ],
      [
        "A five-value landscape",
        "Create depth with a limited range of pencil tones.",
        "Make a five-step shading scale, then use its values to separate sky, distant hills, and foreground.",
      ],
      [
        "Illustrate a favorite recipe",
        "Turn ingredients into a visual recipe you can keep.",
        "Draw each ingredient as a small icon and connect the icons with arrows showing the cooking sequence.",
      ],
      [
        "An imaginary house",
        "Design a home for a character with unusual habits.",
        "Choose a fictional resident, draw a house silhouette, and add three features that suit their daily routine.",
      ],
      [
        "Draw with your other hand",
        "Find a fresh line by changing a familiar habit.",
        "Draw the same small object once with each hand and compare the energy and proportion of the two sketches.",
      ],
      [
        "A tiny illustrated alphabet",
        "Make a playful alphabet from objects around you.",
        "Choose six letters and turn each letter shape into a recognizable object without losing its structure.",
      ],
      [
        "Shadows across the desk",
        "Make a drawing that follows the light rather than the objects.",
        "Outline the cast shadows on your desk and fill them with two pencil values, leaving the objects blank.",
      ],
      [
        "Three expressive trees",
        "Explore how line quality changes the character of a tree.",
        "Draw one tree with angular lines, another with loops, and a third using only broken short strokes.",
      ],
      [
        "A continuous-line still life",
        "Connect a small collection of objects in a single drawing.",
        "Arrange three objects and draw all of them without lifting your pencil from the page.",
      ],
      [
        "Invent a friendly creature",
        "Use ordinary shapes to create an original character.",
        "Combine a circle, a triangle, and a rectangle into a creature, then give it three distinct expressions.",
      ],
      [
        "An illustrated neighborhood map",
        "Map the places that give your local area its character.",
        "Mark five familiar places, connect them with simplified streets, and draw a tiny landmark for each.",
      ],
      [
        "Draw a crumpled paper mountain",
        "Study light and shadow on a subject you can make yourself.",
        "Crumple a sheet, place it under a lamp, and draw the largest light and dark triangular planes.",
      ],
      [
        "A room in one-point perspective",
        "Learn a simple system for drawing convincing indoor space.",
        "Place a vanishing point, draw a back wall, and extend the floor and ceiling edges toward that point.",
      ],
      [
        "A visual diary of your day",
        "Remember an ordinary day with six small drawings.",
        "Divide a page into six frames and draw one object or moment from each part of your day.",
      ],
      [
        "Design a personal bookplate",
        "Create an illustrated label for the inside of your books.",
        "Draw a small border, add your name, and include a symbol that represents the kinds of books you love.",
      ],
    ],
  },
  {
    category: "Photography",
    materials: ["Phone camera", "Notebook"],
    setup:
      "Charge your phone, clean the camera lens, and choose a safe place to photograph.",
    finish:
      "Select your strongest three frames and write one sentence about why each image works.",
    items: [
      [
        "A color walk in twelve photos",
        "Follow one color and see familiar streets with fresh eyes.",
        "Choose a color and take twelve photos in which that color is the main point of interest.",
      ],
      [
        "The same view, three times",
        "See how light changes the mood of one familiar scene.",
        "Photograph one fixed view in morning, midday, and evening light using the same framing.",
      ],
      [
        "A story in five frames",
        "Tell a complete small story with a sequence of photographs.",
        "Photograph an opening scene, a detail, an action, a change, and a final scene for one daily activity.",
      ],
      [
        "Reflections around you",
        "Find a second version of the world in reflective surfaces.",
        "Photograph a reflection in a window, a spoon, and a puddle, changing angle to hide your own reflection.",
      ],
      [
        "A portrait without a face",
        "Describe someone through the objects and gestures they choose.",
        "With permission, photograph a person through their hands, workspace, and one meaningful possession.",
      ],
      [
        "A miniature product shoot",
        "Make one everyday object feel carefully considered.",
        "Place an object beside a window on plain paper and compare front, side, and back lighting.",
      ],
      [
        "Patterns hiding in plain sight",
        "Find rhythm in ordinary surfaces and repeated shapes.",
        "Capture five repeated patterns and compose one image in which an interruption breaks the rhythm.",
      ],
      [
        "A low-angle world",
        "Change your perspective by bringing the camera close to the ground.",
        "Photograph the same safe scene at eye level, knee level, and just above the ground.",
      ],
      [
        "A still life in monochrome",
        "Use light and form to make a simple black-and-white image.",
        "Arrange three pale objects beside a window and convert the strongest frame to black and white.",
      ],
      [
        "Frame within a frame",
        "Use an existing opening to guide attention toward your subject.",
        "Photograph a subject through a doorway, between branches, and through a paper cutout.",
      ],
      [
        "An abstract kitchen gallery",
        "Make familiar kitchen objects look unexpectedly unfamiliar.",
        "Photograph five kitchen surfaces so closely that their shape, color, or texture becomes the subject.",
      ],
      [
        "Tell a story with shadows",
        "Let cast shadows become the main characters in your images.",
        "Use low sunlight or a desk lamp to photograph three objects through their shadows alone.",
      ],
      [
        "A study in symmetry",
        "Look for balanced compositions in everyday architecture.",
        "Find three symmetrical scenes and use the camera grid to align their centers precisely.",
      ],
      [
        "A two-color photo series",
        "Create a consistent collection by limiting your palette.",
        "Choose two colors and make a set of six photos that contain mostly those colors.",
      ],
      [
        "Photograph a moving subject",
        "Explore the difference between a frozen and a blurred moment.",
        "In a safe spot, photograph a swinging object in bright and dim light and compare motion blur.",
      ],
      [
        "A personal texture atlas",
        "Collect the surfaces that make a place feel distinctive.",
        "Photograph twelve textures at the same distance and arrange your favorites into a consistent grid.",
      ],
      [
        "A before-and-after diptych",
        "Show a small transformation in two carefully matched frames.",
        "Photograph a workspace before and after a creative task without changing the camera position.",
      ],
      [
        "Negative space photo challenge",
        "Give a small subject room to breathe in the frame.",
        "Place one subject near an edge so that at least two thirds of the photo is simple empty space.",
      ],
      [
        "A rainy-window study",
        "Turn droplets and blurred backgrounds into an abstract image.",
        "From indoors, focus on droplets on glass and compare the result with focus on the scene beyond.",
      ],
      [
        "A home photo exhibition",
        "Curate a small collection around a visual theme.",
        "Choose a theme, select six existing photographs, and order them to create a clear beginning and ending.",
      ],
    ],
  },
  {
    category: "Nature",
    materials: ["Notebook", "Pencil"],
    setup:
      "Choose a safe, accessible spot and gather materials without disturbing wildlife or protected plants.",
    finish:
      "Record what you noticed, tidy your workspace, and plan one observation for another day.",
    items: [
      [
        "A tiny open terrarium",
        "Build a small indoor landscape in a reused clear container.",
        "Add drainage pebbles, suitable potting soil, and a small purchased plant to an open jar, then water lightly.",
      ],
      [
        "A leaf-shape field guide",
        "Learn to recognize a few plants through the shapes of their leaves.",
        "Sketch five fallen leaves and label their edges, veins, and overall shapes without guessing species.",
      ],
      [
        "A windowsill seed diary",
        "Start a little growing experiment you can revisit each morning.",
        "Place a bean on a damp paper towel in a clear cup and draw its starting shape before noting daily changes.",
      ],
      [
        "Listen to your local soundscape",
        "Notice a place through sound instead of sight.",
        "Sit safely for ten minutes and mark the direction, duration, and type of every sound you hear.",
      ],
      [
        "A cloud observation journal",
        "Watch the sky as an ever-changing collection of shapes.",
        "Sketch the sky at three intervals and note cloud movement and visible changes without looking at the sun.",
      ],
      [
        "Press a fallen-leaf collection",
        "Preserve a few seasonal shapes in a simple paper collection.",
        "Place dry fallen leaves between scrap paper inside a heavy book and label the date and location.",
      ],
      [
        "A map of tiny habitats",
        "Discover how much life fits into a small outdoor area.",
        "Divide a small patch into four imagined squares and record visible plants, shade, and insects in each.",
      ],
      [
        "Make a pebble color palette",
        "Find subtle colors and patterns in ordinary stones.",
        "Study loose stones without removing them, sketch their colors, and group the sketches by warm and cool tones.",
      ],
      [
        "A sunlight map for your room",
        "Find the best places for indoor plants by following the light.",
        "Sketch your room and mark the direct sun patches at three different times of day.",
      ],
      [
        "A recycled seedling pot",
        "Give a used container a second life as a small planter.",
        "Wash a food container, add drainage holes carefully, fill with potting soil, and sow seeds at packet depth.",
      ],
      [
        "Sketch a tree through details",
        "Get to know one tree by looking closely at its parts.",
        "Draw a tree silhouette, a bark patch, and a fallen leaf on the same page and label the location.",
      ],
      [
        "A backyard biodiversity count",
        "Make a simple snapshot of the living things around you.",
        "Watch one small area for fifteen minutes and tally distinct visible birds, insects, and plant shapes.",
      ],
      [
        "Build a rain observation gauge",
        "Make a simple tool for comparing rainfall over time.",
        "Stand a straight-sided reused container outdoors securely and mark a scale on its side with a ruler.",
      ],
      [
        "A natural pattern sketchbook",
        "Find spirals, branching, and repetition in the natural world.",
        "Sketch one example each of a branching form, a radial form, and a repeated natural pattern.",
      ],
      [
        "An outdoor color gradient",
        "Arrange a palette using colors you notice on a short walk.",
        "Sketch ten observed colors and arrange the swatches from lightest to darkest after returning home.",
      ],
      [
        "A moss observation study",
        "Explore a small landscape without taking it home.",
        "Observe moss in place with a phone zoom and sketch three differences in texture, color, or height.",
      ],
      [
        "A wind-direction ribbon",
        "Make a simple moving indicator for an outdoor observation.",
        "Tie a short scrap ribbon securely to a stick away from wildlife and note its direction at three intervals.",
      ],
      [
        "Compare two soil textures",
        "Notice how different soils hold together and absorb water.",
        "Use purchased sand and potting mix in separate cups, add equal water, and compare absorption and texture.",
      ],
      [
        "A seasonal observation postcard",
        "Capture what makes this moment of the year distinctive.",
        "Choose one seasonal detail, sketch it on a card, and add the date, weather, and a short observation.",
      ],
      [
        "A nature walk question map",
        "Turn curiosity into a personal map of things to investigate.",
        "Mark five points on a short route and write one answerable observation question for each stop.",
      ],
    ],
  },
  {
    category: "Digital making",
    materials: ["Computer", "Text editor", "Browser"],
    setup:
      "Create a new project folder, open a text editor, and keep a browser ready for checking your work.",
    finish:
      "Try your result at a different window size, fix one issue, and save a short note about what you learned.",
    items: [
      [
        "Code a tiny personal homepage",
        "Introduce yourself with a simple page you made from scratch.",
        "Write an HTML page with a heading, a short bio, and three links, then style its type and spacing with CSS.",
      ],
      [
        "A generative circle poster",
        "Make a graphic poster from a few repeatable rules.",
        "Use an SVG with repeated circles, vary their size according to a simple sequence, and choose three colors.",
      ],
      [
        "Build a color-palette page",
        "Collect a set of colors in a small reusable web page.",
        "Create five CSS color swatches and label each with its hex code and a descriptive name.",
      ],
      [
        "A digital recipe card",
        "Turn a recipe you know into a readable little web page.",
        "Use HTML lists for ingredients and steps, then add a print stylesheet with comfortable margins.",
      ],
      [
        "Animate a bouncing dot",
        "Learn the basics of motion with one small CSS animation.",
        "Draw a circle with CSS and animate its vertical transform using keyframes and an ease-in-out timing curve.",
      ],
      [
        "Make a responsive photo grid",
        "Arrange a small collection of images for different screen sizes.",
        "Use your own images in a CSS grid that changes from one column to three with a media query.",
      ],
      [
        "A browser-based coin flip",
        "Build a little interactive page with an unpredictable outcome.",
        "Add a button whose JavaScript handler picks heads or tails with Math.random and displays the result as text.",
      ],
      [
        "Design an SVG landscape",
        "Draw a tiny scalable landscape using code.",
        "Combine SVG rectangles, circles, and paths to make a sky, sun, three hills, and a foreground.",
      ],
      [
        "A focus countdown timer",
        "Make a small timer for a single focused work session.",
        "Build start and reset buttons, update remaining seconds with an interval, and clear it when time reaches zero.",
      ],
      [
        "A keyboard shortcut cheat sheet",
        "Design a useful reference for the tools you use most.",
        "Choose eight shortcuts, mark keys with HTML kbd elements, and arrange them into two readable groups.",
      ],
      [
        "A CSS pattern sampler",
        "Make repeating textures with code instead of image files.",
        "Create three boxes and use repeating linear or radial CSS gradients to give each a distinct pattern.",
      ],
      [
        "A local reading list",
        "Keep track of a few books with a browser-only tool.",
        "Build a form that appends a title to an array and stores the array as JSON in localStorage.",
      ],
      [
        "Build a unit converter",
        "Create a small utility for converting centimeters and inches.",
        "Read a numeric input, calculate inches as centimeters divided by 2.54, and show a rounded result.",
      ],
      [
        "A digital mood board",
        "Arrange visual references around one creative direction.",
        "Use your own photos and color swatches in a CSS grid and add a one-sentence caption to every reference.",
      ],
      [
        "An accessible contact form",
        "Practice making a form that is clear and keyboard-friendly.",
        "Associate labels with name, email, and message fields and display helpful validation without sending data.",
      ],
      [
        "A random drawing prompt tool",
        "Make a small generator for moments when ideas feel scarce.",
        "Store ten subjects and ten styles in arrays and combine one of each when a button is clicked.",
      ],
      [
        "A personal spending chart",
        "Turn a few sample numbers into a readable visual comparison.",
        "Use invented weekly expenses and draw labeled CSS bars whose widths match their relative values.",
      ],
      [
        "A light-and-dark theme switch",
        "Explore color tokens and a useful interface preference.",
        "Define CSS custom properties for two themes and switch a root class from a labeled toggle button.",
      ],
      [
        "A responsive event invitation",
        "Create a clear invitation that works on a small screen.",
        "Build a fictional event page with a title, date, location, and schedule, using one fluid content column.",
      ],
      [
        "A mini interactive quiz",
        "Turn a subject you know into a three-question game.",
        "Store three multiple-choice questions in an array, check each response, and display a final score with feedback.",
      ],
    ],
  },
  {
    category: "Writing",
    materials: ["Notebook", "Pen", "Timer"],
    setup:
      "Find a quiet spot, open a fresh page, and set a timer for an uninterrupted first draft.",
    finish:
      "Read the piece aloud, revise one unclear sentence, and give the finished work a title.",
    items: [
      [
        "A story in exactly 100 words",
        "Tell a complete small story inside a satisfying constraint.",
        "Write a character, a desire, and an obstacle, then edit the resulting story until it contains exactly 100 words.",
      ],
      [
        "A letter to your future self",
        "Capture a snapshot of what matters to you right now.",
        "Write about one current challenge, one hope, and one detail of daily life that you want to remember.",
      ],
      [
        "Write a found poem",
        "Make something new from words that already surround you.",
        "Collect twenty words from packaging or signs and rearrange them into a short poem without adding new words.",
      ],
      [
        "A guide to an ordinary object",
        "Look at a familiar thing as if you had never seen it before.",
        "Choose a key or spoon and write instructions for its use for someone who has no idea what it is.",
      ],
      [
        "A scene told through sound",
        "Build a setting without describing anything visible.",
        "Write a scene using only sounds, dialogue, and the main character's reactions to what they hear.",
      ],
      [
        "Three versions of one memory",
        "Explore how voice changes the meaning of an event.",
        "Write one memory as a diary entry, a news report, and a message to a close friend.",
      ],
      [
        "A dialogue without explanations",
        "Let two voices reveal a relationship on their own.",
        "Write a conversation between two people who want different things using dialogue only.",
      ],
      [
        "An imaginary museum label",
        "Give an everyday object an unexpected story and significance.",
        "Choose an object on your desk and write a museum label describing its fictional history and importance.",
      ],
      [
        "A walk in five senses",
        "Turn a short walk into vivid, grounded prose.",
        "Record one detail for each sense on a familiar route and combine the details into a single scene.",
      ],
      [
        "A six-panel comic script",
        "Shape a short visual story before drawing any pictures.",
        "Write six numbered panels, giving each one action and no more than two lines of dialogue.",
      ],
      [
        "A tiny personal manifesto",
        "Put a few principles you care about into clear, memorable words.",
        "List ten things you believe about creative work, choose five, and express each in one active sentence.",
      ],
      [
        "A fictional field report",
        "Describe an invented discovery with careful observational detail.",
        "Invent a plant or creature and record its appearance, habitat, behavior, and one unanswered question.",
      ],
      [
        "An opening line collection",
        "Practice starting stories in ways that invite curiosity.",
        "Write ten first sentences, each suggesting a different unanswered question, and develop your favorite.",
      ],
      [
        "A recipe for an emotion",
        "Use the structure of a recipe to describe a feeling.",
        "Choose a feeling and write ingredients, quantities, preparation steps, and serving advice as metaphors.",
      ],
      [
        "Write from an object's point of view",
        "Tell a familiar story through an unfamiliar narrator.",
        "Choose an object that changes hands and describe one day of its life in the first person.",
      ],
      [
        "A place you know by heart",
        "Recreate a meaningful location from memory.",
        "Describe a familiar room without visiting it, then check which details your memory changed or omitted.",
      ],
      [
        "A short review with evidence",
        "Practice explaining why a creative work succeeds for you.",
        "Choose a book or film, make one clear judgment, and support it with three specific examples.",
      ],
      [
        "A scene with a missing word",
        "Discover new phrasing by avoiding an obvious piece of vocabulary.",
        "Write about rain without using rain, wet, water, storm, or umbrella, and keep the weather unmistakable.",
      ],
      [
        "A conversation with your younger self",
        "Explore how your perspective has changed over time.",
        "Write five questions from a younger version of yourself and answer each with one concrete example.",
      ],
      [
        "A postcard from an invented city",
        "Build a fictional place in a small amount of space.",
        "Invent a city, name one local custom, describe a landmark, and write a postcard about your first day there.",
      ],
    ],
  },
];

const extraMaterials = {
  "Paper & print": [
    "A4 sheet",
    "Potato,Washable paint,Carving tool,Protective cutting board",
    "Glue",
    "Card,Glue",
    "Fallen leaves,Colored paper",
    "Colored paper,Card,Glue",
    "Card,Glue",
    "Card,Ruler",
    "Portrait reference,Colored paper,Glue",
    "Shaving foam,Food coloring,Tray,Scraper",
    "Thread,Card",
    "Large paper sheet,Marker",
    "Paper scraps,Card,Glue",
    "Paper scraps,Toothpick,Glue",
    "Two books,Coins",
    "Stapler,Card",
    "Colored paper,Ruler",
    "Sturdy card,Ruler,Glue",
    "Washable paint,Roller,Smooth tray",
    "Colored paper,Glue",
  ],
  Drawing: [
    "Cup",
    "Shoe or mug",
    "Portrait subject or reference",
    "Window view",
    "Ruler",
    "Chair",
    "Landscape reference",
    "Favorite recipe",
    "Imagination",
    "Small household object",
    "Reference objects",
    "Desk lamp,Desk objects",
    "Tree reference",
    "Three household objects",
    "Imagination",
    "Local area reference",
    "Scrap paper,Desk lamp",
    "Ruler",
    "Daily observations",
    "Ruler",
  ],
  Photography: [
    "Comfortable walking route",
    "One accessible view throughout the day",
    "One everyday activity",
    "Reflective surfaces",
    "Consenting portrait subject",
    "Plain paper,Small object,Window light",
    "Patterned surfaces",
    "Safe open space",
    "Three pale objects,Window light",
    "Doorway or branches,Paper cutout",
    "Kitchen objects",
    "Desk lamp,Small objects",
    "Architectural scene",
    "Objects in two colors",
    "Swinging object,Safe open space",
    "Textured surfaces",
    "Workspace,Creative task",
    "Small object,Plain background",
    "Rainy window",
    "Your existing photos",
  ],
  Nature: [
    "Open clear jar,Drainage pebbles,Potting soil,Small purchased plant,Water",
    "Fallen leaves",
    "Bean seed,Paper towel,Clear cup,Water",
    "Safe outdoor seat",
    "Safe sky view",
    "Dry fallen leaves,Scrap paper,Heavy book",
    "Small outdoor observation area",
    "Loose stones to observe in place",
    "Room with windows",
    "Reused food container,Drainage tool,Potting soil,Seeds,Seed packet instructions",
    "Accessible tree,Fallen leaf",
    "Small outdoor observation area",
    "Straight-sided reused container,Ruler,Marker",
    "Natural objects to observe",
    "Accessible walking route,Colored pencils",
    "Moss to observe in place,Phone camera",
    "Scrap ribbon,Stick,String",
    "Purchased sand,Potting mix,Two cups,Water",
    "Card,Colored pencils",
    "Accessible route map",
  ],
  "Digital making": Array(20).fill(""),
  Writing: [
    "Word counter",
    "Envelope (optional)",
    "Packaging or signs for word references",
    "Key or spoon",
    "A quiet listening space",
    "A personal memory",
    "Two fictional characters",
    "Desk object",
    "Accessible walking route",
    "A story idea",
    "Personal reflections",
    "Imagination",
    "Story ideas",
    "A familiar recipe format",
    "An everyday object",
    "A familiar room",
    "A book or film you know",
    "A list of forbidden words",
    "Personal reflections",
    "An invented city idea",
  ],
};

const projects = groups.flatMap((group, g) =>
  group.items.map(([title, description, method], i) => ({
    id: `lab-${String(g * 20 + i + 1).padStart(3, "0")}`,
    title,
    description,
    category: group.category,
    level: i % 5 === 4 ? "Intermediate" : "Beginner",
    duration: [30, 45, 60, 90, 120][(i + g) % 5],
    budget:
      g === 3 && i === 0
        ? 15
        : g === 4 || g === 5 || g === 2
          ? 0
          : [0, 5, 10, 15][i % 4],
    materials: [
      ...new Set([
        ...group.materials,
        ...extraMaterials[group.category][i].split(",").filter(Boolean),
      ]),
    ],
    steps: [group.setup, method, group.finish],
    author: "Weekend Lab",
    featuredOrder: i * groups.length + g,
    createdAt: new Date(Date.UTC(2026, 4, 1 + g * 20 + i)).toISOString(),
    saved: false,
  })),
);

mkdirSync(new URL("../src/data/", import.meta.url), { recursive: true });
writeFileSync(
  new URL("../src/data/projects.json", import.meta.url),
  JSON.stringify(projects, null, 2) + "\n",
);
console.log(
  `Generated ${projects.length} projects with ${new Set(projects.map((p) => p.id)).size} unique IDs.`,
);
