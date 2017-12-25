# lifesim

learning ai with learning ai.

## abstract

ID3 decision tree, seeded via a "life support" bootstrap algorithm. sims must maintain 4 interwoven stats, and the weights of how these effect each other is tuned manually. the decision is an action that would affect one or many of the stats. if the stat drops to a sufficiently negative position, the sim is considered dead. the sims do not die otherwise.

roughly based on Maxim's The Sims motives/actions design documents.

implemented modularly via individual webworkers.

## building

this is a regular create-react-app project (except it's inferno, which is react without training wheels.) see README_CRA.md for more specific instructions.

**Development**
```
  yarn # npm i
  yarn start # npm start
```

**Production**
```
  yarn # npm i
  yarn build # npm run build
```

## directory structure

 - main web app lives in `/src`
 - webworkers live in `/public/ai-*.js`

## postmortem

this was my first foray into AI and WebWorkers, and I view it quite successful and there's still a long way to go to learn this stuff. 

i was going to extend this to support a few different learning models, however, I lost interest after 3 twitch streams building this.