# @firesquad/api-sdk

Properly integrate your Nodejs apps with firesquad usign this SDK.

- [Firesquad API Knowledge Base](https://help.firesquad.io/category/627e6c7f1089aa742a648461/articles)
- [API Docs](https://firesquadio.github.io/nodejs-api-sdk/classes/Firesquad.html)

<p align="center">
  <img alt="Firesquad" src="https://app.firesquad.io/public/firesquad-logo-background.png">
</p>

### Quick Start

For getting started, Create an API Integration on [Firesquad](https://app.firesquad.io/settings/integrations/new).
After that, you can use this firesquad package:

```ts
import { Firesquad, ConversationContentMessageType } from "@firesquad/api-sdk";

export const fs = new Firesquad(
  "https://<your-account>.api.firesquad.io",
  "<your-api-id>",
  "<your-api-key>"
);

/* You can use firesquad methods after creating the instance, such as: */
fs.PostConversationItem(
  {
    internal: false,
    content: {
      message: [
        {
          type: ConversationContentMessageType.Paragraph,
          children: [{ text: "Hello, World!" }],
        },
      ],
    },
  },
  "<your-conversation-id>"
)
  /* And wait for the response */
  .then((response) => console.log(response));
```
