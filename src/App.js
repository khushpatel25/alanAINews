import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";
import { Typography } from "@material-ui/core";

import useStyles from "./style";
import NewsCards from "./components/NewsCards/NewsCards";

const alanKey =
  "51abf1183e2abe2164b115f23fce94412e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const classes = useStyles();
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  useEffect(() => {
    const alanBtnInstance = alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newsHeadLines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prevArticle) => prevArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];
          console.log({ parsedNumber, article });
          if (parsedNumber > 20 || number > 20) {
            alanBtnInstance.playText("Please try that again.");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtnInstance.playText("Opening...");
          } else {
            alanBtnInstance.playText("Please try that again...");
          }
        }
        else if (command === 'back'){
          setNewsArticles(articles)
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}>
              <Typography variant="h5" component="h2">
                Try saying: <br />
                <br />
                Open article number [4]
              </Typography>
            </div>
            <div className={classes.card}>
              <Typography variant="h5" component="h2">
                Try saying: <br />
                <br />
                Go back
              </Typography>
            </div>
          </div>
        ) : null}
        <img
          src="https://miro.medium.com/max/600/1*CJyCnZVdr-EfgC27MAdFUQ.jpeg"
          className={classes.alanLogo}
          alt="alan logo"
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;
