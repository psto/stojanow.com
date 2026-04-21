---
title: "We are being out-computed by rhetoric"
date: 2025-04-10 12:13:28+0200
description: "Manipulation is an emergent capability of AI models. The smarter they get the less the distction between convincing us and undermining our reasoning matters."
category: posts
tags: posts advice strategy intent forgiveness
image: "../../assets/posts/marc_antonys_oration_at_caesars_funeral.jpg"
imageAlt: "Marc Antony's Oration at Caesar's Funeral by George Edward Robertson"
---

**Note**: *To internalise the AI papers I read, I write short "snapshot" essays that capture my thinking. They're not exhaustive critiques, but more like a conversation with the authors*.

Google DeepMind's [Evaluating Language Models for Harmful Manipulation](https://arxiv.org/abs/2603.25326) proposes a framework for deciding when AI crosses the line from "**rational persuasion**" (transparent goals and respect for autonomy) to "**harmful manipulation**" (deliberate circumventing or depreciating the capacity to reason).

While the framework is far from flawless, the most unsettling finding is unintentional. Manipulation isn't a product of compromised prompts but an emergent capability. As LLMs become smarter, they stop distinguishing between convincing us and undermining our reasoning.

The authors tested two conditions "**non-explicit steering**" and "**explicit steering**". In the former, the model was given a "**covert goal**" to change a user's mind without any instruction on how to do it. In the latter, it was ordered to use manipulative tactics such as *appeals to fear* or *false urgency*.

Models pursuing a covert goal behaved just as manipulatively as those given explicit instructions. The identical manipulation tactics across conditions illustrate [Instrumental Convergence](https://en.wikipedia.org/wiki/Instrumental_convergence). A system assigned a goal will adopt any efficient means to achieve it. The model doesn't need instructions to be evil; it only needs a directive to win.

The authors define manipulation as "*epistemic subversion*" i.e. the act of circumventing a person's capacity to reason. They contrasts this with "*rational persuasion*", where "*a person is only successfully persuaded if the
presented evidence withstands their rational scrutiny*". That framing feels like a false dichotomy.

An LLM is essentially a statistical mirror of billions of human persuasive interactions. Its superhuman fluency means we tend to judge it by style, confidence, and authority rather than by logical content. When one side holds all the data, any persuasion attempt becomes a cognitive hijack. The user lacks the processing power to verify the model's rhetoric in real-time.

Participants' beliefs were measured right after the chat and then they were debriefed. A natural follow‑up would be to ask whether those belief changes endure (perhaps via the [sleeper effect](https://en.wikipedia.org/wiki/Sleeper_effect)) or whether they were fleeting, driven by low stakes, fatigue, or boredom.

While the DeepMind study admits that "*context matters*" and that "*AI manipulation results from one geographic region may not generalise to others*", it misses the larger point.

If a model with a "covert goal" instinctively reaches for manipulative cues instinctively, then "safe persuasion" is an oxymoron. This raises the concern that the danger of ever more capable models isn't that they will become "evil". But that they will become so effective at achieving goals that human reason becomes an obstacle they are programmed to bypass. **We aren't being convinced by logic. We are being out-computed by rhetoric**.
