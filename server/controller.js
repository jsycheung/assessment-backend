let nextAvailableID = 0;
let name = "Tim";
let allQuotes = [
  {
    category: "inspiration",
    quotes: [
      name +
        ", " +
        "What lies behind you and what lies in front of you, pales in comparison to what lies inside of you.",
      name +
        ", " +
        "Not having the best situation, but seeing the best in your situation is the key to happiness.",
      name +
        ", " +
        "We must let go of the life we have planned, so as to accept the one that is waiting for us.",
    ],
  },
  {
    category: "encouragement",
    quotes: [
      "Believe you can and you're halfway there!",
      "Wake up determined, go to bed satisfied!",
      "You do not find the happy life. You make it!",
    ],
  },
  {
    category: "warning",
    quotes: [
      "One thorn of experience is worth a whole wilderness of warning",
      "If you can't be a good example, then be a terrible warning.",
      "Open your mind before you open your mouth.",
    ],
  },
];

let userQuotes = [];

module.exports = {
  getCompliment: (req, res) => {
    const compliments = [
      "Gee, you're a smart cookie!",
      "Cool shirt!",
      "Your Javascript skills are stellar.",
    ];

    // choose random compliment
    let randomIndex = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndex];

    res.status(200).send(randomCompliment);
  },
  getFortune: (req, res) => {
    const fortunes = [
      "A friend asks only for your time not your money.",
      "A new perspective will come with the new year.",
      "Do you know that the busiest person has the largest amount of time?",
      "Go take a rest; you deserve it.",
      "If you wish to see the best in others, show the best of yourself.",
    ];

    let randomIndex = Math.floor(Math.random() * fortunes.length);
    let randomFortune = fortunes[randomIndex];
    res.status(200).send(randomFortune);
  },
  createQuote: (req, res) => {
    console.log("request received");
    for (let i = 0; i < allQuotes.length; i++) {
      if (allQuotes[i].category === req.body.category) {
        let randomIndex = Math.floor(
          Math.random() * allQuotes[i].quotes.length
        );
        let randomQuote = allQuotes[i].quotes[randomIndex];
        let userQuoteObj = {
          id: nextAvailableID,
          quoteContent: randomQuote,
        };
        if (name != "Tim") {
          userQuoteObj.quoteContent =
            name + userQuoteObj.quoteContent.slice("Tim".length);
        }
        userQuotes.push(userQuoteObj);
        console.log(userQuotes);
        res.status(200).send(userQuotes);
        nextAvailableID += 1;
        return;
      }
    }
  },
  updateQuote: (req, res) => {
    for (let i = 0; i < userQuotes.length; i++) {
      userQuotes[i].quoteContent = userQuotes[i].quoteContent.slice(
        name.length
      );
    }
    name = req.body.name;
    for (let i = 0; i < userQuotes.length; i++) {
      userQuotes[i].quoteContent = name + userQuotes[i].quoteContent;
    }
    console.log(userQuotes);
    res.status(200).send(userQuotes);
  },
  deleteQuote: (req, res) => {
    const id = parseInt(req.params.id, 10);
    userQuotes.splice(id, 1);
    res.status(200).send(userQuotes);
  },
};
